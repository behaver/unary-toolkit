'use strict';

const expect = require("chai").expect;
const { Derivator } = require('../index');

describe('#Derivator', () => {
  describe('#Verify', () => {
    it('sin函数求导', () => {
      // 实例化微分求导器，设定 sin 函数为原函数
      let df = new Derivator({
        f: Math.sin,
        dx: 1e-7,
      });

      // 获取 π 值处的导数值
      let res = df.get(Math.PI);

      expect(res).to.closeTo(-1, 1e-7); 
    });
  });
});
