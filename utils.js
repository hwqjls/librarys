/*
   *@desc 遍历任意一个父元素 找到他的子元素节点
   *有数字参数 返回 某一个对应的子元素
   *没有数字参数  返回  子元素节点的集合
   *@param {Number} index
   *@return {object Object}  类数组
  */
function elemChildren(node, index) {
  var childNodes = node.childNodes,
    len = childNodes.length,
    item,
    type = typeof (index);

  var temp = {
    'length': 0,
    'push': Array.prototype.push,
    'splice': Array.prototype.splice
  };

  if (index !== undefined && type !== 'number') {
    return undefined;
  }

  for (var i = 0; i < len; i++) {
    item = childNodes[i];

    if (item.nodeType === 1) {
      temp.push(item);
    }
  }

  return index === undefined ? temp : temp[index];
}

/* 
*@desc 查找节点下的所有子元素
*@param {Object} node
*@return {Object}
*/
function elemChild(node) {
  var temp = {
    'length': 0,
    'splice': Array.prototype.splice
  },
    len = node.childNodes.length;

  for (var i = 0; i < len; i++) {
    var childItem = node.childNodes[i];

    if (childItem.nodeType === 1) {
      temp[temp.length] = childItem;
      temp['length']++
    }
  }
  return temp;
}

/* 
   *@desc 找出一个元素的第N层父级元素
   *@param {Number} n
   *@return {Object}
   */
function elemParent(elem, n) {
  var type = typeof (n)

  if (type === 'undefined' || type !== 'number') {
    return elem.parentNode;
  } else if (n < 0) {
    return undefined;
  }

  while (n) {
    if (elem.nodeName === 'HTML') { //当到达文档顶部就给它直接返回
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
function hasChildren() {
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
function elemSibling(elem, n) {
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

/* 
  *@desc 在父元素的某个元素后面插入新的元素
*/
Element.prototype.insertAfter = function (target, origin) {
  var nextElem = origin.nextSibling;

  if (nextElem) {
    this.insertBefore(target, nextElem);
  } else {
    this.appendChild(target);
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
  if (document.body.scrollHeight) {
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

/* 
*@desc 子元素距离可视区域左上角的位置
*@parame {Object} el
*@return {Object} {left,top}
*/
function getElemDocPosition(el) {
  var parent = el.offsetParent, //查找上一级有定位的父元素
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
*@desc 获取元素属性值
*@param {Object, String} {elem, prop}
*@return String
*/
function getStyles(elem, prop) {
  if (window.getComputedStyle) {
    if (prop) {
      return window.getComputedStyle(elem, null)[prop];
    } else {
      return window.getComputedStyle(elem, null); //其中的null可以填写伪元素以计算其属性
    }
  } else {
    if (prop) {
      return elem.currentStyle[prop];
    } else {
      return elem.currentStyle;
    }
  }
}

/* 
*@desc 为函数添加事件
*@param {object} el 事件源
*@param {String} type 事件类型
*@param {object} fn 事件函数
*/
function addEvent(el, type, fn) {
  if (el.addEventListener) {
    el.addEventListener(type, fn, false);
  } else if (el.attachEvent) {
    el.attachEvent('on' + type, function () {
      fn.call(el);
    });
  } else {
    el['on' + type] = fn;
  }
}

/* 
*@desc 为函数移除事件
*@param {object} el 事件源
*@param {String} type 事件类型
*@param {object} fn 事件函数
*/
function removeEvent(el, type, fn) {
  if (el.removeEventListener) {
    el.removeEventListener(type, fn, false);
  } else if (el.attachEvent) {
    el.detachEvent('on' + type, fn);
  } else {
    el['on' + type] = null;
  }
}

/* 
*@desc 取消冒泡
*@param {Object} e 事件对象
*/
function cancelBubble(e) {
  var e = e || window.event;

  if (e.stopPropagation) {
    e.stopPropagation
  } else {
    e.cancelBubble = true;   //IE
  }
}

/* 
*@desc 阻止默认事件
*@param {Object} e  事件对象
*/
function preventDefaultEvent(e) {
  var e = e || window.event;

  if (e.preventDefault) {
    event.preventDefault();
  } else {
    event.returnValue = false;  //IE
  }
}

/*
*@desc 计算当前文档的坐标(包含滚动条的距离)
*@param {Object} e 点击事件对象
*@return {Number, Number} X Y x轴坐标和y轴坐标
*/
function pagePos(e) {
  var sTop = getScrollOffset().top,
    sLeft = getScrollOffset().left,
    cTop = document.documentElement.clientTop || 0,
    cLeft = document.documentElement.clientLeft || 0;

  return {
    X: e.clientX + sLeft - cLeft,
    Y: e.clientY + sTop - cTop
  }
}


/*
*@desc 指定元素及其内容拖拽
*@param {Object} elem 指定要拖拽的元素
*/
function elemDrag(elem) {
  var x, y;

  addEvent(elem, 'click', function (e) {
    var e = e || window.event;

    x = pagePos(e).X - parseInt(getStyles(elem, 'left'), 10);
    y = pagePos(e).Y - parseInt(getStyles(elem, 'top'), 10);

    addEvent(document, 'click', mouseMove);
    addEvent(document, 'click', mouseUp);
  });

  function mouseMove(e) {
    var e = e || window.event;

    elem.style.top = pagePos(e).Y - y + 'px';
    elem.style.left = pagePos(e).X - x + 'px';
  }

  function mouseUp(e) {
    var e = e || window.event;
    removeEvent(document, 'click', mouseMove);
    removeEvent(document, 'click', mouseUp);
  }
}


/* 
*@desc 实现元素的拖拽和双击，以及点击右键显示菜单
*@param menu 点击右键要显示的元素
*@param elemClick 双击后要执行的函数
*/
Element.prototype.dragNclick = (function (menu, elemClick) {
  var bTime = 0,  //单击开始时间
    eTime = 0,    //单击结束时间
    oPos = [],    //放入元素距离X和Y轴的位置信息
    cbTime = 0,   //双击开始时间
    ceTime = 0,   //双击结束时间
    counter = 0,  //鼠标左键点击计数，用于双击
    t = null,     //用于清除延时器
    wWidth = getViewportSize().width,
    wHeight = getViewportSize().height,
    eleWidth = parseInt(getStyles(this, 'width')),
    eleHeight = parseInt(getStyles(this, 'height')),
    mWidth = parseInt(getStyles(menu, 'width')),
    mHeight = parseInt(getStyles(menu, 'height'));

  drag.call(this);  //将drag函数中的this指向为调用元素

  function drag() {
    var x,  //元素点击位置到元素左边框的距离
      y,    //元素点击位置到元素上边看的距离
      _self = this;

    addEvent(_self, 'mousedown', function (e) {
      var e = e || window.event,
        btnCode = e.button;   //获取鼠标按键信息

      if (btnCode === 2) {
        var mLeft = pagePos(e).X,
          mTop = pagePos(e).Y;

        if (mLeft <= 0) {
          mLeft = 0;
        } else if (mLeft >= wWidth - mWidth) {
          mLeft = pagePos(e).X - mWidth;
        }

        if (mTop <= 0) {
          mTop = 0;
        } else if (mTop >= wHeight - mHeight) {
          mTop = pagePos(e).Y - mHeight;
        }

        menu.style.left = mLeft + 'px';
        menu.style.top = mTop + 'px';
        menu.style.display = 'block';

      } else if (btnCode === 0) {
        bTime = new Date().getTime();
        oPos = [getStyles(_self, 'left'), getStyles(_self, 'top')];
        menu.style.display = 'none';

        x = pagePos(e).X - parseInt(oPos[0], 10);
        y = pagePos(e).Y - parseInt(oPos[1], 10);

        addEvent(document, 'mousemove', mouseMove);
        addEvent(document, 'mouseup', mouseUp);
        cancelBubble(e);
        preventDefaultEvent(e);
      }
    });

    addEvent(document, 'contextmenu', function (e) {  //点击阻止右键菜单默认事件
      var e = e || window.event;
      preventDefaultEvent(e);
    });

    addEvent(document, 'click', function () {
      menu.style.display = 'none';
    });

    addEvent(menu, 'click', function (e) {
      var e = e || window.event;
      cancelBubble(e);
    });

    function mouseMove(e) {
      var e = e || window.event,
        eleLeft = pagePos(e).X - x,
        eleTop = pagePos(e).Y - y;

      if (eleLeft <= 0) {
        eleLeft = 0;
      } else if (eleLeft >= wWidth - eleWidth) {
        eleLeft = wWidth - eleWidth - 1;
      }

      if (eleTop <= 0) {
        eleTop = 0;
      } else if (eleTop >= wHeight - eleHeight) {
        eleTop = wWidth - eleHeight - 1;
      }

      _self.style.top = eleTop + 'px';
      _self.style.left = eleLeft + 'px';
    }

    function mouseUp(e) {
      var e = e || window.event;

      eTime = new Date().getTime();

      if (eTime - bTime < 100) {
        _self.style.left = oPos[0];
        _self.style.top = oPos[1];
        counter++;

        if (counter === 1) {
          cbTime = new Date().getTime();
        }

        if (counter === 2) {
          ceTime = new Date().getTime();
        }

        if (cbTime && ceTime && (ceTime - cbTime < 200)) {
          elemClick();
        }

        t = setTimeout(() => {
          cbTime = 0;
          ceTime = 0;
          counter = 0;
          clearTimeout(t);
        }, 200);
      }
      removeEvent(document, 'mousemove', mouseMove);
      removeEvent(document, 'mouseup', mouseUp);
    }
  }
});

/* 
*@desc 判断点是否在一个三角形内
*@return boolean
*/
var pointInTriangle = (function () {
  function vec(a, b) {
    return {
      x: b.x - a.x,
      y: b.y - a.y
    }
  }

  function vecProduct(v1, v2) {
    return v1.x * v2.y - v2.x * v1.y;
  }

  function sameSymbols(a, b) {
    return (a ^ b) >= 0;
  }

  return function (opt) {
    var PA = vec(opt.curPos, opt.lastPos),
      PB = vec(opt.curPos, opt.topLeft),
      PC = vec(opt.curPos, opt.bottomLeft),
      R1 = vecProduct(PA, PB),
      R2 = vecProduct(PB, PC),
      R3 = vecProduct(PC, PA);

    return sameSymbols(R1, R2) && sameSymbols(R2, R3);
  }
})();


/* 
*@desc 模板内容替换
*@param tpl 模板内容
*@param reg 对应正则
*@param opt 对应要替换的内容
*/
function setTplToHTML(tpl, regExp, opt) {
  return tpl.replace(regExp(), function (node, key) {
    return opt[key];
  });
}



function regTpl() {
  return new RegExp(/{{(.*?)}}/, 'gim');
}


/* 
*@desc 深拷贝
*@param origin 原对象或数组
*@param target 要拷贝的对象或数组
*@return target 
*/
function deepClone(origin, target) {
  var target = target || {},
    toStr = Object.prototype.toString,
    isArr = '[object Array]';

  for (var key in origin) {
    if (origin.hasOwnProperty(key)) {
      if (typeof (origin[key]) === 'object' && origin[key] !== null) {
        target[key] = toStr.call(origin[key]) === isArr ? [] : {}

        deepClone(origin[key], target[key])
      } else {
        target[key] = origin[key];
      }
    }
  }
  return target;
}

/* 
*@desc 重写forEach 以适用于es3
*@param fn 要进行循环操作的函数
*/
Array.prototype.myForEach = function (fn) {
  var arr = this,
    len = arr.length,
    arg = arguments[1] || window;

  for (var i = 0; i < len; i++) {
    fn.apply(arg, [arr[i], i, arr]);
  }
}

/* 
*@desc 重写filter 以适用于es3
*@param fn 要进行过滤操作的函数
*/
Array.prototype.myFilter = function (fn) {
  var arr = this,
    len = arr.length,
    arg = arguments[1] || window,
    nArr = [],
    item;

  for (var i = 0; i < len; i++) {
    item = deepClone(arr[i]);

    fn.apply(arg, [item, i, arr]) ? nArr.push(item) : '';
  }

  return nArr;
}

/* 
*@desc 重写map 以适用于es3
*@param fn 要进行映射操作的函数
*/
Array.prototype.myMap = function (fn) {
  var arr = this,
    len = arr.length,
    arg = arguments[1] || window,
    nArr = [],
    item;

  for (var i = 0; i < len; i++) {
    item = deepClone(arr[i]);

    nArr.push(fn.apply(arg, [item, i, arr]));
  }

  return nArr;
}

/* 
*@desc 重写every 以适用于es3, 当直到为假时，停止遍历
*@param fn 要进行遍历筛选的函数
*@return Boolean
*/
Array.prototype.myEvery = function (fn) {
  var arr = this,
    len = arr.length,
    arg = arguments[1] || window,
    res = true;

  for (var i = 0; i < len; i++) {
    if (!fn.apply(arg, [data[i], i, arr])) {
      res = false;
      break;
    }
  }

  return res;
}

/* 
*@desc 重写some 以适用于es3, 当直到为真时，停止遍历
*@param fn 要进行遍历筛选的函数
*@return Boolean
*/
Array.prototype.mySome = function (fn) {
  var arr = this,
    len = arr.length,
    arg = arguments[1] || window,
    res = false;

  for (var i = 0; i < len; i++) {
    if (fn.apply(arg, [data[i], i, arr])) {
      res = true;
      break;
    }
  }

  return res;
}

/* 
*@desc 重写reduce 以适用于es3
*@param fn 要进行遍历筛选的函数
*/
Array.prototype.myReduce = function (fn, initValue) {
  var arr = this,
    len = arr.length,
    arg = arguments[2] || window;

  for (var i = 0; i < len; i++) {
    initValue = fn.apply(arg, [initValue, arr[i], i, arr]);
  }

  return initValue;
}

/* 
*@desc 重写reduceRight 以适用于es3
*@param fn 要进行遍历筛选的函数
*/
Array.prototype.myReduceRight = function (fn, initValue) {
  var arr = this,
    len = arr.length,
    arg = arguments[2] || window;

  for (var i = len - 1; i >= 0; i--) {
    initValue = fn.apply(arg, [initValue, arr[i], i, arr]);
  }

  return initValue;
}

/* 
*@desc 原生ajax封装
*/
var xhr = (function () {

  function _doAjax(opt) {
    var o = window.XMLHttpRequest ?
      new XMLHttpRequest() :
      new ActiveXObject('Microsoft.XMLHTTP'); //ie5、ie6使用

    if (!o) {
      throw new Error('您的浏览器不支持异步发起HTTP请求');
    }

    var opt = opt || {},
      type = (opt.type || 'GET').toUpperCase(),
      async = '' + opt.async === 'false' ? false : true,
      dataType = opt.dataType || 'JSON',
      jsonp = opt.jsonp || 'cb',
      jsonpCallback = opt.jsonpCallback || 'jQuery' + randomNum() + '_' + new Date().getTime();
      url = opt.url,
      data = opt.data || null,
      timeout = opt.timeout || 30000,
      error = opt.error || function () { },
      success = opt.success || function () { },
      complete = opt.complete || function () { },
      t = null;

    if (!url) {
      throw new Error('您没有填写URL');
    }

    if(dataType.toUpperCase() === 'JSONP' && type !== 'GET'){
      throw new Error('如果dataType为JSONP，type请您设置GET或不设置');
    }

    if(dataType.toUpperCase() === 'JSONP'){
      var oScript = document.createElement('script');
      oScript.src = url.indexOf('?') === -1  
                        ? url + '?' + jsonp + '=' + jsonpCallback
                        : url + '&' + jsonp + '=' + jsonpCallback;
      document.body.appendChild(oScript);
      document.body.removeChild(oScript);
      window[jsonpCallback] = function(data){
        success(data);
      };
      return;
    }

    o.onreadystatechange = function(){
      if(o.readyState === 4){
        if((o.status >= 200 && o.status < 300) || o.status === 304){
          switch(dataType.toUpperCase()){
            case 'JSON':
              success(JSON.parse(o.responseText)); 
              break;
            case 'TEXT':
              success(o.responseText);
              break;
            case 'XML':
              success(o.responseXML);
              break;
            default:
              success(JSON.parse(o.responseText)); 
          } 
        }else{
          error();
        }
        complete();
        clearTimeout(t);
        t = null;
        o = null;
      }
    }

    o.open(type, url, async);
    type === 'POST' && o.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    o.send(type === 'GET' ? null : formatDatas(data));

    t = setTimeout(function(){
      o.abort();
      clearTimeout(t);
      t = null;
      o = null;
      throw new Error('本次请求已超时，API地址：' + url);     
    }, timeout);
  }

  function formatDatas(obj){
    var str = '';
    for(var key in obj){
      str += key + '=' + obj[key] + '&';
    }
    return str.replace(/&$/, '');
  }

  function randomNum(){
    var num = '';
    for(var i = 0; i < 20; i++){
      num += Math.floor(Math.random() * 10);
    }
    return num;
  }

  return {
    ajax: function(opt){
      _doAjax(opt);
    },

    post: function(url, data, dataType, successCB, errorCB, completeCB){
      _doAjax({
        type: 'POST',
        url: url,
        data: data,
        dataType: dataType,
        success: csuccessCB,
        error: errorCB,
        complete: completeCB
      });
    },

    get: function(url, dataType, successCB, errorCB, completeCB){
      _doAjax({
        type: 'GET',
        url: url,
        dataType: dataType,
        success: csuccessCB,
        error: errorCB,
        complete: completeCB
      })
    }
  }
})();


/*
*@desc json跨域请求
*/
var ajaxDomain = (function(){
  function createIframe(frameId, frameUrl){
    var frame = document.createElement('iframe');
    
    frame.src = frameUrl;
    frame.Id = frameId;
    frame.style.display = 'none';

    return frame;
  }

  return function(opt){
    document.domain = opt.basicDomain;
    var frame = createIframe(opt.frameId, opt.frameUrl);
    
    frame.onload = function(){
      var $$ = document.getElementById(opt.frameId).contentWindow.xhr;

      $$.ajax({
        url: opt.url,
        type: opt.type,
        data: opt.data,
        success: opt.success,
        error: opt.error
      });
    }

    document.body.appendChild(frame);
  }

/* 
  示例：
  ajaxDomain({
    basicDomain: 'jsplusplus.com',
    frameUrl: 'http://test.jsplusplus.com/index.html',
    url: 'http://test.jsplusplus.com/get_courses1.php',
    type: 'POST',
    data: {
      status: 1
    },
    success: function(data){
      console.log(data);
    },
    error: function(){
      console.log(0);
    }
  });
*/
})();

/* 
window.name+iframe解决跨域请求示例
*/
function WNIframe(){
  function pageOne(){
    var flag = false;

    var iframe = document.createElement('iframe');
    var getDatas = function(){
      if(flag){
        var data = iframe.contentWindow.name;
        console.log(JSON.parse(data));
      }else{
        flag = true;
        setTimeout(function(){
          iframe.contentWindow.location = 'index2.html';
        }, 500);
      }
    }
    iframe.src = 'http://test.jsplusplus.com/index.html';
    
    if(iframe.attachEvent){
      iframe.attachEvent('onload', getDatas);
    }else{
      iframe.onload = getDatas;
    }
    document.body.appendChild(iframe);
  }

  function pageTwo(){
    xhr.post('http://test.jsplusplus.com/get_courses.php',{
      status: 1
    }, function(data){
      window.name = JSON.stringify(data);
    });
  }
}



/* 
*@desc 消除字符串多余空格
*@param str 需传入的字符串
*@return 消除空格后的字符串
*/
function trimSpace(str){
	return str.replace(/\s+/gim, '');
}

/* 
*@desc 封装类似jQuery获取元素的方法
*@param target 要获取元素的类名或id名或标签名
*@return 查询到的元素
*/
function $get(target){
  var _s = target.charAt(0),
      rTarget = target.replace(_s, '');
  
  switch(_s){
    case '#':
      return document.getElementById(rTarget);
      break;
    case '.':
      return document.getElementsByClassName(rTarget);
      break;
    default:
      return document.getElementsByTagName(target);
  }
}

/* 
*@desc 获取时间函数
*@param ts 在js中时间以毫秒为单位的时间
*@param 要转换的时间类型
*@return 返回转换后的时间类型
*/
function getDateTime(ts, type){
  var len = ts.toString().length;

  if(len === 10){
    ts *= 1000;
  }

  var dt = new Date(ts),
      y = dt.getFullYear(),
      m = addZero(dt.getMonth() + 1),
      d = addZero(dt.getDate()),
      h = addZero(dt.getHours()),
      i = addZero(dt.getMinutes()),
      s = addZero(dt.getSeconds());

  switch(type){
    case 'date': 
      return y + '-' + m + '-' + d;
      break;
    case 'time':
      return h + ':' + i + ':' + s;
      break;
    case 'dateTime':
      return y + '-' + m + '-' + d + ' ' + h + ':' + i + ':' + s;
      break;
    default:
      return y + '-' + m + '-' + d + ' ' + h + ':' + i + ':' + s;
  }

  function addZero(num){
    return num < 10 ? ('0' + num) : num;
  }
}