;(function (doc) {
  var Slider = function (opt) {
    this.sliderItem = doc.getElementsByClassName(opt.sliderItem);
    this.thumbItem = doc.getElementsByClassName(opt.thumbItem);
  
    this.bindClick();
  }

  Slider.prototype = {
    bindClick: function () {
      var slider = this.sliderItem,
        thumb = this.thumbItem;
        tLength = thumb.length;
        for(var i = 0; i < tLength; i++) {
          (function (j) {
            thumb[j].onclick = function () {
              for (var k = 0; k < tLength; k++) {
                thumb[k].className = 'thumb-item';
                slider[k].className = 'slider-item';
              }
              this.className += ' cur'
              slider[j].className += ' active';
            }
          })(i);
        }
    }
  }

  window.Slider = Slider;
})(document);


