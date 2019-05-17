'use strict';

const UnaryDerivator = require('./UnaryDerivator');

/**
 * NewtonUnarySolver
 * 
 * NewtonUnarySolver 是牛顿法线性函数求解程序
 * 
 * @author 董 三碗 <qianxing@yeah.net>
 * @version 1.0.0
 */
class NewtonUnarySolver {

  /**
   * 构造函数
   * 
   * @param {Function} options.primitiveFunction 原函数
   * @param {Number}   options.originalX         x 初始值
   * @param {Number}   options.dx                x 微分值
   * @param {Number}   options.terminationError  终止误差
   * @param {Number}   options.maxIteration      最大迭代次数
   */
  constructor({
    primitiveFunction,
    originalX,
    dx,
    terminationError,
    maxIteration,
  }) {
    this.private = {
      stepNum: 0,
    };

    this.primitiveFunction = primitiveFunction;
    this.originalX = originalX || 0;
    this.terminationError = terminationError || 1e-7;
    this.maxIteration = maxIteration || 50;

    // 实例化线性函数微分器
    this.UnaryDerivator = new UnaryDerivator({
      primitiveFunction,
      dx
    })
  }

  /**
   * 设定原函数
   * 
   * @param {Function} value 原函数
   */
  set primitiveFunction(value) {
    if (typeof(value) !== 'function') throw Error('The param value should be a function.');
    
    this.private.primitiveFunction = value;

    // 同步更新微分器的原函数
    if (this.UnaryDerivator !== undefined) this.UnaryDerivator.primitiveFunction = value;
  }

  /**
   * 获取原函数
   * 
   * @return {Function} 原函数
   */
  get primitiveFunction() {
    return this.private.primitiveFunction;
  }

  /**
   * 设定初始 x 值
   * 
   * @param {Number} value 初始 x 值
   */
  set originalX(value) {
    if (typeof(value) !== 'number') throw Error('The param value should be a Number.');
    this.private.x = value;
  }

  /**
   * 获取初始 x 值
   * 
   * @return {Number} 初始 x 值
   */
  get originalX() {
    return this.private.originalX;
  }

  /**
   * 设定 dx 微分值
   * 
   * @param {Number} value dx 微分值
   */
  set dx(value) {
    this.UnaryDerivator.dx = value;
  }

  /**
   * 获取 dx 微分值
   * 
   * @return {Number} dx 微分值
   */
  get dx() {
    return this.UnaryDerivator.dx;
  }

  /**
   * 设定终止误差
   * 
   * @param {Number} value 终止误差
   */
  set terminationError(value) {
    if (typeof(value) !== 'number') throw Error('The param value should be a Number.');
    if (value <= 0) throw Error('The param value should > 0.');

    this.private.terminationError = value;
  }

  /**
   * 获取终止误差
   * 
   * @return {Number} 终止误差
   */
  get terminationError() {
    return this.private.terminationError;
  }

  /**
   * 设定最大迭代次数
   * 
   * @param {Number} value 最大迭代次数
   */
  set maxIteration(value) {
    if (typeof(value) !== 'number') throw Error('The param value should be a Number.');
    if (value <= 0) throw Error('The param value should > 0.');

    this.private.maxIteration = value;
  }

  /**
   * 获取最大迭代次数
   * 
   * @return {Number} 最大迭代次数
   */
  get maxIteration() {
    return this.private.maxIteration;
  }

  /**
   * 获取求解过程迭代次数
   * 
   * @return {Number} 求解过程迭代次数
   */
  get stepNum() {
    return this.private.stepNum;
  }

  /**
   * 获取当前 x 值
   * 
   * @return {Number} 当前 x 值
   */
  get x() {
    return this.private.x;
  }

  /**
   * 获取当前 y 值
   * 
   * @return {Number} 当前 y 值
   */
  get y() {
    return this.primitiveFunction(this.x);
  }

  /**
   * 获取当前梯度值
   * 
   * @return {Number} 当前梯度值
   */
  get gradient() {
    return this.UnaryDerivator.get(this.x);
  }

  /**
   * 求解函数
   * 
   * @return {NewtonUnarySolver} 返回 this 引用
   */
  solve() {
    for (var i = 0; i < this.maxIteration; i++) {
      let gradient = this.gradient,
          y = this.y;

      if (gradient === 0) {
        this.private.x += this.dx;
        i--;
        continue;
      }

      this.private.x = this.x - y / gradient;

      if (Math.abs(y) < this.terminationError) break;
    }

    this.private.stepNum = i;

    return this;
  }
}

module.exports = NewtonUnarySolver;
