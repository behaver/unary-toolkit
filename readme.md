# LinearSolver

[![GitHub license](https://img.shields.io/badge/license-MIT-brightgreen.svg)](#) [![npm version](https://img.shields.io/npm/v/react.svg?style=flat)](https://www.npmjs.com/package/@behaver/linear-solver) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](#)

## 简介

LinearSolver 是一个用于对连续线性函数局部求解的数学工具组件。

## 安装

通过 npm 安装，在你的 node 项目目录下执行：

`npm install @behaver/linear-solver`

安装完成后，调用即可：

`const { NewtonLinearSolver } = require('@behaver/linear-solver');`

## 用例

```js
const { HorizontalCoordinate, SystemSwitcher } = require('@behaver/celestial-coordinate');
const { JDateRepository } = require('@behaver/jdate');

const { NewtonLinearSolver } = require('../index');

/* 利用牛顿线性求解法，计算黄道圈与地平圈的上升交点 */

let obGeoLong = -124.23,
    obGeoLat = 40.08,
    centerMode = 'geocentric',
    epoch = new JDateRepository(new Date(1992, 7, 15, 8, 25), 'date');

// 构造用于求解的原始线性函数
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

// 实例化牛顿线性求解器
let NLSolver = new NewtonLinearSolver({
  primitiveFunction: linear,
  originalX: 270,
  differentialX: 0.0003, // < 1分钟
  terminationError: 0.0002, // < 1″
});

// 执行求解
NLSolver.solve();

// 输出解出的 x、y 值
console.log(NLSolver.x, NLSolver.y);
```

## API

`constructor(options)`

构造函数：

* options.primitiveFunction 原函数
* options.originalX         x 初始值
* options.differentialX     x 微分值
* options.terminationError  终止误差
* options.maxCycle          最大循环次数

`set primitiveFunction(value)`

设定 原函数

`get primitiveFunction()`

获取 原函数

`set originalX(value)`

设定 初始 x 值

`get originalX()`

获取 初始 x 值

`set differentialX(value)`

设定 微分 x 值

`get differentialX()`

获取 微分 x 值

`set terminationError(value)`

设定 终止误差

`get terminationError()`

获取 终止误差

`set maxIteration(value)`

设定 最大迭代次数

`get maxIteration()`

获取 最大循环次数

`get stepNum()`

获取 求解过程迭代次数

`get x()`

获取 当前 x 值

`get y()`

获取 当前 y 值

`get gradient()`

获取 当前梯度值

`solve()`

求解函数

## 许可证书

The MIT license.