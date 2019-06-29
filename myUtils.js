/* 
 *工具说明
 *myViewUtils:窗口工具
 *myStyleUtils: 样式工具
 *myElemNodeUtils: 查找元素工具
*/

//窗口工具
var myViewUtils = (function () {
  /* 
   *@desc 子元素距离可视区域左上角的位置
   *@parame {Object} el
   *@return {Object} {left,top}
   */
  function getElemDocPosition(el) {
    var parent = el.offsetParent,
      offsetLeft = el.offsetLeft,
      offsetTop = el.offsetTop

    while (parent) {
      offsetLeft += parent.offsetLeft;
      offsetTop += parent.offsetTop;
      parent = parent.offsetParent;
    }

    return {
      left: offsetLeft,
      top: offsetTop
    }
  }

  /* 
   *@desc 查看滚动条的距离,即已滚动区域距离可视区域的距离
   *@return {Object} {left,top}
   */
  function getScrollOffset() {
    if (window.pageXOffset) {
      return {
        left: window.pageXOffset,
        top: window.pageYOffset
      }
    } else {
      return {
        left: document.body.scrollLeft + document.documentElement.scrollLeft,
        top: document.body.scrollTop + document.documentElement.scrollTop
      }
    }
  }

  /* 
   *@desc 获得浏览器可视区域的尺寸（窗口的宽高）
   *@return {Object} {width, height}
   */
  function getViewportSize() {
    if (window.innerWidth) {
      return {
        width: window.innerWidth,
        height: window.innerHeight
      }
    } else {
      if (document.compatMode === 'BackCompat') {
        return {
          width: document.body.clientWidth,
          height: document.body.clientWidth
        }
      } else {
        return {//不包括滚动条，不影响
          width: document.documentElement.clientWidth,
          height: document.documentElement.clientHeight
        }
      }
    }
  }

  /* 
   *@desc 获得整个网站的宽高 
   *@return {Object} {width, height}
   *scrollWidth = window.innerWidth + window.pageXOffset
   *scrollHeight = window.innerHeight + window.pageYOffset
   */
  function getScrollSize() {
    if (document.body.scrollWidth) {
      return {
        width: document.body.scrollWidth,
        height: document.body.scrollHeight
      }
    } else {
      return {
        width: document.documentElement.scrollWidth,
        height: document.documentElement.scrollHeight
      }
    }
  }

  return {
    getElemDocPosition: getElemDocPosition,
    getScrollOffset: getScrollOffset,
    getViewportSize: getViewportSize,
    getScrollSize: getScrollSize
  }
})();

//样式工具
var myStyleUtils = (function () {
  /* 
   *@desc 获取元素属性值
   *@param {Object, String} {elem, prop}
   *@return String
   */
  function getStyles(elem, prop) {
    if (window.getComputedStyle) {
      if (prop) {
        return window.getComputedStyle(elem, null)[prop];
      } else {
        return window.getComputedStyle(elem, null);
      }
    } else {
      if (prop) {
        return elem.currentStyle[prop];
      } else {
        return elem.currentStyle;
      }
    }
  }

  return {
    getStyles: getStyles
  }
})();

//查找元素工具
var myElemNodeUtils = (function () {
  /*
   *@desc 遍历任意一个父元素 找到他的子元素节点
   *有数字参数 返回 某一个对应的子元素
   *没有数字参数  返回  子元素节点的集合
   *@param {Number} index
   *@return {object Object}  类数组
  */
  Element.prototype.elemChildren = function (index) {
    var childNodes = this.childNodes,
      len = childNodes.length,
      item,
      type = typeof (index);

    var temp = {
      'length': 0,
      'push': Array.prototype.push,
      'splice': Array.prototype.splice
    };

    for (var i = 0; i < len; i++) {
      item = childNodes[i];

      if (item.nodeType === 1) {
        temp.push(item);
      }
    }

    if (index !== undefined && type !== 'number') {
      return undefined;
    }

    return index === undefined ? temp : temp[index];
  }

  /* 
   *@desc 找出一个元素的第N层父级元素
   *@param {Number} n
   *@return {Object}
   */
  Element.prototype.elemParent = function (n) {
    var type = typeof (n),
      elem = this;

    if (type === 'undefined' || type !== 'number') {
      return elem.parentNode;
    } else if (n < 0) {
      return undefined;
    }

    while (n) {
      if (elem.nodeName === 'HTML') {
        elem = null;
        return elem;
      }
      elem = elem.parentNode;
      n--;
    }
    return elem;
  }

  /* 
   *@desc 判断父元素有没有子元素节点
   *@return {Boolean}
   */
  Element.prototype.hasChildren = function () {
    var children = this.childNodes,
      len = children.length,
      item;

    for (var i = 0; i < len; i++) {
      item = children[i];

      if (item.nodeType === 1) {
        return true;
      }
    }
    return false;
  }

  /* 
   *@desc 寻找兄弟元素节点
   *1. 参数为正，找之后的第N个
   *2. 参数为负，找之前的第N个
   *3. 参数N为零，找到自己
   *@param {Number} n
   *@return {Object}
   */
  Element.prototype.elemSibling = function (n) {
    var elem = this;

    while (n) {
      if (n > 0) {
        elem = elem.nextSibling;
        while (elem && elem.nodeType !== 1) {
          elem = elem.nextSibling;
        }
        n--;
      } else if (n < 0) {
        elem = elem.previousSibling;
        while (elem && elem.nodeType !== 1) {
          elem = elem.previousSibling;
        }
        n++;
      }
    }
    return elem;
  }

  /* 
   *@desc 遍历一个父级元素下面所有的子元素节点
   *@param {Object} node
  */
  function getFullChildren(node) {
    var children = node.childNodes,
      len = children.length,
      item;

    if (node && node.nodeType === 1) {
      console.log(node);
    }

    for (var i = 0; i < len; i++) {
      item = children[i];

      if (item.nodeType === 1) {
        getFullChildren(item);
      }
    }
  }

  /* 
   *@desc 同级节点下元素逆序
   *@param {Object} 
   */
  function elemReverse(parent) {
    var children = parent.childNodes,
      len = children.length;

    while (len--) {
      parent.appendChild(children[len]);
    }
  }

  return {
    getFullChildren: getFullChildren,
    elemReverse: elemReverse
  }
})();

