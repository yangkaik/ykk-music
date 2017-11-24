/**
 *
 * @param el
 * @param className
 * @returns {boolean}
 */
// 判断是否有class
export function hasClass (el, className) {
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el.className)
}

// 添加class
export function addClass (el, className) {
  if (hasClass(el, className)) {
    return
  }
  let newClass = el.className.split(' ')
  newClass.push(className)
  el.className = newClass.join(' ')
}

/**
 *
 * @param el
 * @param name
 * @param val
 * @returns {string}
 */
// 获取val值
export function getData (el, name, val) {
  // prefix 前缀
  const prefix = 'data-'
  if (val) {
    return el.setAttribute(prefix + name, val)
  }
  return el.getAttribute(prefix + name)
}
