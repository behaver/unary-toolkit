'use strict';

/**
 * Derivator
 *
 * 一元微分求导器
 *
 * @author 董 三碗 <qianxing@yeah.net>
 * @version 1.1.0
 */
class Derivator {

  /**
   * 构造函数
   * 
   * @param {Function} options.f         原函数
   * @param {Number}   options.dx        dx 值
   * @param {String}   options.direction 求导方向
   */
  constructor({
    f,
    dx,
    direction,
  }) {
    this.private = {};

    this.f = f;
    this.dx = dx || 1e-3;
    this.direction = direction || 'right';
  }

  /**
   * 设定 原函数
   * 
   * @param {Function} value 原函数
   */
  set f(value) {
    if (typeof(value) !== 'function') throw Error('The param value should be a function.');
    this.private.f = value;
  }

  /**
   * 获取 原函数
   * 
   * @return {Function} 原函数
   */
  get f() {
    return this.private.f;
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
        f = this.f,
        direction = this.direction,
        f0,
        f1;

    // 方向求导处理
    if (direction == 'right') {
      f0 = f(x);
      f1 = f(x + dx);
    } else if (direction == 'left') {
      f0 = f(x - dx);
      f1 = f(x);
    } else if (direction == 'both') {
      f0 = f(x - dx);
      f1 = f(x + dx);
      dx = 2 * dx;
    }

    // 结果类型判断处理
    if (typeof(f0) === 'number') {
      return (f1 - f0) / dx;
    } else if (typeof(f0) === 'object') {
      let res = {};
      for (let item in f0) res[item] = (f1[item] - f0[item]) / dx;
      return res;
    } else throw Error('The return of f(x) should be valid.');

  }
}

module.exports = Derivator;
