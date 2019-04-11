'use strict';

const expect = require("chai").expect;

const { SunCoordinate } = require('@behaver/solar-star-coordinate');
const { HorizontalCoordinate, SystemSwitcher } = require('@behaver/celestial-coordinate');
const { JDateRepository } = require('@behaver/jdate');

const { NewtonLinearSolver } = require('../index');

describe('#NewtonLinearSolver', () => {
  describe('#Verify', () => {
    it('1992-08-15 08:25 124°23E 40°08N', () => {
      let obGeoLong = -124.23,
          obGeoLat = 40.08,
          centerMode = 'geocentric';

      // 构造自变量为 jd 求解为 0 线性函数
      let linear = function (jd) {
        let SunPosition = new SunCoordinate(new JDateRepository(jd)),
            SunECC = SunPosition.get(),
            SS = new SystemSwitcher(SunECC),
            SunHC = SS.to('hc', {
              obTime: new JDateRepository(jd),
              obGeoLong: obGeoLong,
              obGeoLat: obGeoLat,
              centerMode: centerMode,
            });

        return SunHC.h.getDegrees();
      };

      let epoch = new JDateRepository(new Date(1992, 7, 15, 8, 25), 'date');

      let NLSolver = new NewtonLinearSolver({
        primitiveFunction: linear,
        originalX: epoch.JD,
        differentialX: 0.0006, // < 1分钟
        terminationError: 0.0002, // < 1″
      });

      // 执行求解
      NLSolver.solve();

      // console.log(NLSolver.x, NLSolver.stepNum, NLSolver.y, (new JDateRepository(NLSolver.x)).date.toLocaleString());

      let SunPosition = new SunCoordinate(new JDateRepository(NLSolver.x)),
          SunECC = SunPosition.get(),
          SS = new SystemSwitcher(SunECC),
          SunHC = SS.to('hc', {
            obTime: new JDateRepository(NLSolver.x),
            obGeoLong: obGeoLong,
            obGeoLat: obGeoLat,
            centerMode: centerMode,
          });
      
      // console.log(SunECC.epoch.JD, SunECC.l.getDegrees(), SunECC.b.getDegrees());
      console.log(SunHC.obTime.JD, SunHC.SiderealTime.obTime.JD, SunHC.h.getDegrees(), SunHC.a.getDegrees());

      SunHC.on({
        obTime: epoch,
      });

      console.log(SunHC.obTime.JD, SunHC.SiderealTime.obTime.JD, SunHC.h.getDegrees(), SunHC.a.getDegrees());

      SS = new SystemSwitcher(SunHC);

      SunECC = SS.to('ecc');
      // console.log(SunECC.epoch.JD, SunECC.l.getDegrees(), SunECC.b.getDegrees());

      // console.log(R.l.getDegrees(), SunECC.l.getDegrees());
      // console.log(R.b.getDegrees(), SunECC.b.getDegrees());
      // console.log(SunEQC.ra.getDegrees());

      // console.log(SunHC.a.getDegrees(), SunHC.h.getDegrees(), SunECC.b.getDegrees());

      // expect(R.l.getDegrees()).to.closeTo(183.26, 0.01);
    });

    it('1992-08-15 08:25 124°23E 40°08N 上升点：183.26', () => {
      let obGeoLong = -124.23,
          obGeoLat = 40.08,
          centerMode = 'geocentric',
          epoch = new JDateRepository(new Date(1992, 7, 15, 8, 25), 'date');

      let linear = function(a) {
        let HC = new HorizontalCoordinate({
              a,
              h: 0,
              obGeoLong,
              obGeoLat,
              obTime: epoch,
              centerMode,
            }),
            SS = new SystemSwitcher(HC),
            ECC = SS.to('ecc');

        return ECC.b.getDegrees();
      }

      let NLSolver = new NewtonLinearSolver({
        primitiveFunction: linear,
        originalX: 270,
        differentialX: 0.0003, // < 1分钟
        terminationError: 0.0002, // < 1″
      });

      // 执行求解
      NLSolver.solve();

      console.log(NLSolver.x, NLSolver.y);

      let HC = new HorizontalCoordinate({
            a: NLSolver.x,
            h: 0,
            obGeoLong,
            obGeoLat,
            obTime: epoch,
            centerMode,
          }),
          SS = new SystemSwitcher(HC),
          ECC = SS.to('ecc');

      expect(ECC.l.getDegrees()).to.closeTo(183.26, 0.1);
    });
  });
});