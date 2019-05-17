# UnaryToolkit

[![GitHub license](https://img.shields.io/badge/license-ISC-brightgreen.svg)](#) [![npm version](https://img.shields.io/npm/v/react.svg?style=flat)](https://www.npmjs.com/package/@behaver/unary-toolkit) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](#)

## 简介

UnaryToolkit 是一个针对一元函数问题开发的数学工具包。

其中包含组件工具：

* [Derivator](/doc/Derivator.md) 微分求导组件
* [NewtonSolver](/doc/NewtonSolver.md) 牛顿法函数求解组件

## 安装

通过 npm 安装，在你的 node 项目目录下执行：

`npm install @behaver/unary-toolkit`

安装完成后，调用即可：

`const UnaryToolkit = require('@behaver/unary-toolkit');`

## 用例

```js
const { HorizontalCoordinate, SystemSwitcher } = require('@behaver/celestial-coordinate');
const { JDateRepository } = require('@behaver/jdate');
const { NewtonSolver } = require('@behaver/unary-toolkit');

/* 利用牛顿求解法，计算某观测点 1992-08-15 08:25 时黄道圈与地平圈的交点位置 */

let epoch = new JDateRepository(new Date(1992, 7, 15, 8, 25), 'date');

// 构造用于求解的一元函数
let f = function(a) {
  let HC = new HorizontalCoordinate({
    a,
    h: 0,
    obGeoLong: -124.23,
    obGeoLat: 40.08,
    obTime: epoch,
    centerMode: 'geocentric',
  });

  let SS = new SystemSwitcher(HC),
      ECC = SS.to('ecc');

  return ECC.b.getDegrees();
}

// 实例化牛顿法求解器
let NTS = new NewtonSolver({
  f: f,
  dx: 0.0003, // < 1分钟
  bias: 0.0002, // < 1″
});

// 执行求解
NTS.solve(270);

// 输出解出的 x 值
console.log(NTS.x);
```

## 许可证书

The ISC license.
