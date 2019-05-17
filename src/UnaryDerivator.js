'use strict';

/**
 * UnaryDerivator
 *
 * 一元微分求导器
 *
 * @author 董 三碗 <qianxing@yeah.net>
 * @version 1.1.0
 */
class UnaryDerivator {

  /**
   * 构造函数
   * 
   * @param {Function} options.primitiveFunction 原函数
   * @param {Number}   options.dx                dx 值
   * @param {String}   options.direction         求导方向
   */
  constructor({
    primitiveFunction,
    dx,
    direction,
  }) {
    this.private = {};

    this.primitiveFunction = primitiveFunction;
    this.dx = dx || 1e-3;
    this.direction = direction || 'right';
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
   * 设定 dx 值
   * 
   * @param {Number} value dx 值
   */
  set dx(value) {
    if (typeof(value) !== 'number') throw Error('The param value should be a Number.');
    if (value <= 0) throw Error('The param value should > 0.');

    this.private.dx = value;
  }

  /**
   * 获取 dx 值
   * 
   * @return {Number} dx 值
   */
  get dx() {
    return this.private.dx;
  }

  /**
   * 设定 求导方向
   * 
   * @param {String} value 求导方向字串
   */
  set direction(value) {
    if (value !== 'right' && value !== 'left' && value !== 'both') throw Error('The param value should be valid.');

    this.private.direction = value;
  }

  /**
   * 获取 求导方向
   * 
   * @return {String} 求导方向字串
   */
  get direction() {
    return this.private.direction;
  }

  /**
   * 获取计算结果值
   * 
   * @param  {Number} x         自变量 x
   * @return {Number}           计算结果值
   */
  get(x) {
    // 参数检验
    if (typeof(x) !== 'number') throw Error('The param x should be a Number.');

    let dx = this.dx,
        f = this.primitiveFunction,
        direction = this.direction;

    if (direction === 'right') {
      return (f(x + dx) - f(x)) / dx;
    } else if (direction === 'left') {
      return (f(x) - f(x - dx)) / dx;
    } else if (direction === 'both') {
      return (f(x + dx) - f(x - dx)) / 2 / dx;
    }
  }
}

module.exports = UnaryDerivator;
