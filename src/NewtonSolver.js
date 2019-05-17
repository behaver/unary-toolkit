'use strict';

const Derivator = require('./Derivator');

/**
 * NewtonSolver
 * 
 * 一元牛顿法求解器
 * 
 * @author 董 三碗 <qianxing@yeah.net>
 * @version 1.0.0
 */
class NewtonSolver {

  /**
   * 构造函数
   * 
   * @param {Function} options.f            原函数
   * @param {Number}   options.dx           x 微分值
   * @param {Number}   options.bias         允许偏差范围
   * @param {Number}   options.maxIteration 最大迭代次数
   */
  constructor({
    f,
    dx,
    bias,
    maxIteration,
  }) {
    this.private = {
      stepNum: 0,
    };

    this.bias = bias || 1e-7;
    this.maxIteration = maxIteration || 50;

    // 实例化线性函数微分器
    this.Derivator = new Derivator({
      f,
      dx
    })
  }

  /**
   * 设定 原函数
   * 
   * @param {Function} value 原函数
   */
  set f(value) {
    this.Derivator.f = value;
  }

  /**
   * 获取 原函数
   * 
   * @return {Function} 原函数
   */
  get f() {
    return this.Derivator.f;
  }

  /**
   * 设定 dx 微分值
   * 
   * @param {Number} value dx 微分值
   */
  set dx(value) {
    this.Derivator.dx = value;
  }

  /**
   * 获取 dx 微分值
   * 
   * @return {Number} dx 微分值
   */
  get dx() {
    return this.Derivator.dx;
  }

  /**
   * 设定 终止误差
   * 
   * @param {Number} value 终止误差
   */
  set bias(value) {
    if (typeof(value) !== 'number') throw Error('The param value should be a Number.');
    if (value <= 0) throw Error('The param value should > 0.');

    this.private.bias = value;
  }

  /**
   * 获取 终止误差
   * 
   * @return {Number} 终止误差
   */
  get bias() {
    return this.private.bias;
  }

  /**
   * 设定 最大迭代次数
   * 
   * @param {Number} value 最大迭代次数
   */
  set maxIteration(value) {
    if (typeof(value) !== 'number') throw Error('The param value should be a Number.');
    if (value <= 0) throw Error('The param value should > 0.');

    this.private.maxIteration = value;
  }

  /**
   * 获取 最大迭代次数
   * 
   * @return {Number} 最大迭代次数
   */
  get maxIteration() {
    return this.private.maxIteration;
  }

  /**
   * 获取 求解过程迭代次数
   * 
   * @return {Number} 求解过程迭代次数
   */
  get stepNum() {
    return this.private.stepNum;
  }

  /**
   * 获取 当前 x 值
   * 
   * @return {Number} 当前 x 值
   */
  get x() {
    return this.private.x;
  }

  /**
   * 获取 当前 y 值
   * 
   * @return {Number} 当前 y 值
   */
  get y() {
    return this.f(this.x);
  }

  /**
   * 获取 当前导数值
   * 
   * @return {Number} 当前导数值
   */
  get derivative() {
    return this.Derivator.get(this.x);
  }

  /**
   * 求解函数
   *
   * @param  {Number}       x 初始 x 值
   * 
   * @return {NewtonSolver}   返回 this 引用
   */
  solve(x) {
    this.private.x = x;

    for (var i = 0; i < this.maxIteration; i++) {
      let derivative = this.derivative,
          y = this.y;

      if (derivative === 0) {
        this.private.x += this.dx;
        i--;
        continue;
      }

      this.private.x = this.x - y / derivative;

      if (Math.abs(y) < this.bias) break;
    }

    this.private.stepNum = i;

    return this;
  }
}

module.exports = NewtonSolver;
