'use strict';

/**
 * LinearDerivator
 *
 * 线性微分求导器
 *
 * @author 董 三碗 <qianxing@yeah.net>
 * @version 1.0.0
 */
class LinearDerivator {

  /**
   * 构造函数
   * 
   * @param {Function} options.primitiveFunction 原函数
   * @param {Number}   options.dx                dx 微分值
   */
  constructor({
    primitiveFunction,
    dx,
  }) {
    this.private = {};

    this.primitiveFunction = primitiveFunction;
    this.dx = dx || 1e-3;
  }

  /**
   * 设定原函数
   * 
   * @param {Function} value 原函数
   */
  set primitiveFunction(value) {
    if (typeof(value) !== 'function') throw Error('The param value should be a function.');
    this.private.primitiveFunction = value;
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
   * 设定 dx 微分值
   * 
   * @param {Number} value dx 微分值
   */
  set dx(value) {
    if (typeof(value) !== 'number') throw Error('The param value should be a Number.');
    if (value <= 0) throw Error('The param value should > 0.');

    this.private.dx = value;
  }

  /**
   * 获取 dx 微分值
   * 
   * @return {Number} dx 微分值
   */
  get dx() {
    return this.private.dx;
  }

  /**
   * 获取计算结果值
   * 
   * @param  {Number} x 自变量 x
   * @return {Number}   计算结果值
   */
  get(x) {
    // 参数检验
    if (typeof(x) !== 'number') throw Error('The param x should be a Number.');

    let dx = this.dx;

    return (this.primitiveFunction(x + dx) - this.primitiveFunction(x - dx)) / 2 / dx;
  }
}

module.exports = LinearDerivator;
