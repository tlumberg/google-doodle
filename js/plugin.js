// Paste jQuery Plugin Code Here
(function(factory) {
  /* global define */
  if ( typeof define === 'function' && define.amd ) {
    define(['jquery'], factory);
  } else if ( typeof module === 'object' && module.exports ) {
    // Node/CommonJS
    module.exports = function( root, jQuery ) {
      if ( jQuery === undefined ) {
        if ( typeof window !== 'undefined' ) {
          jQuery = require('jquery');
        } else {
          jQuery = require('jquery')(root);
        }
      }
      factory(jQuery);
      return jQuery;
    };
  } else {
    // Browser globals
    factory(jQuery);
  }
}(function($) {
  'use strict';

  var pluginName = 'drawsvg',
      defaults = {
        duration: 1000,
        stagger: 200,
        easing: 'swing',
        reverse: false,
        callback: $.noop
      },
      DrawSvg = (function() {
        var fn = function fn(elm, options) {
          var _this = this,
              opts = $.extend(defaults, options);

          _this.$elm = $(elm);

          if ( !_this.$elm.is('svg') )
            return;

          _this.options = opts;
          _this.$paths = _this.$elm.find('path');

          _this.totalDuration = opts.duration + (opts.stagger * _this.$paths.length);
          _this.duration = opts.duration / _this.totalDuration;

          _this.$paths.each(function(index, elm) {
            var pathLength = elm.getTotalLength();

            elm.pathLen = pathLength;
            elm.delay = (opts.stagger * index) / _this.totalDuration;
            elm.style.strokeDasharray = [pathLength, pathLength].join(' ');
            elm.style.strokeDashoffset = pathLength;
          });

          _this.$elm.attr('class', function(index, classNames) {
            return [classNames, pluginName + '-initialized'].join(' ');
          });
        };

        fn.prototype.getVal = function(p, easing) {
          return 1 - $.easing[easing](p, p, 0, 1, 1);
        };

        fn.prototype.progress = function progress(prog) {
          var _this = this,
              opts = _this.options,
              duration = _this.duration;

          _this.$paths.each(function(index, elm) {
            var elmStyle = elm.style;

            if ( prog === 1 ) {
              elmStyle.strokeDashoffset = 0;
            } else if ( prog === 0 ) {
              elmStyle.strokeDashoffset = elm.pathLen + 'px';
            } else if ( prog >= elm.delay && prog <= duration + elm.delay ) {
              var p = ((prog - elm.delay) / duration);
              elmStyle.strokeDashoffset = ((_this.getVal(p, opts.easing) * elm.pathLen) * (opts.reverse ? -1 : 1)) + 'px';
            }
          });
        };

        fn.prototype.animate = function animate() {
          var _this = this;

          _this.$elm.attr('class', function(index, classNames) {
            return [classNames, pluginName + '-animating'].join(' ');
          });

          $({ len: 0 }).animate({
            len: 1
          }, {
            easing: 'linear',
            duration: _this.totalDuration,
            step: function(now, fx) {
              _this.progress.call(_this, now / fx.end);
            },
            complete: function() {
              _this.options.callback.call(this);

              _this.$elm.attr('class', function(index, classNames) {
                return classNames.replace(pluginName + '-animating', '');
              });
            }
          });
        };

        return fn;
      })();

  // A really lightweight plugin wrapper around the constructor,
  // preventing against multiple instantiations
  $.fn[pluginName] = function(method, args) {
    return this.each(function() {
      var data = $.data(this, pluginName);

      ( data && ''+method === method && data[method] ) ?
        data[method](args) :
        $.data(this, pluginName, new DrawSvg(this, method));
    });
  };
}));

//backstretch
/*! Backstretch - v2.0.4 - 2013-06-19
* http://srobbin.com/jquery-plugins/backstretch/
* Copyright (c) 2013 Scott Robbin; Licensed MIT */
(function(a,d,p){a.fn.backstretch=function(c,b){(c===p||0===c.length)&&a.error("No images were supplied for Backstretch");0===a(d).scrollTop()&&d.scrollTo(0,0);return this.each(function(){var d=a(this),g=d.data("backstretch");if(g){if("string"==typeof c&&"function"==typeof g[c]){g[c](b);return}b=a.extend(g.options,b);g.destroy(!0)}g=new q(this,c,b);d.data("backstretch",g)})};a.backstretch=function(c,b){return a("body").backstretch(c,b).data("backstretch")};a.expr[":"].backstretch=function(c){return a(c).data("backstretch")!==p};a.fn.backstretch.defaults={centeredX:!0,centeredY:!0,duration:5E3,fade:0};var r={left:0,top:0,overflow:"hidden",margin:0,padding:0,height:"100%",width:"100%",zIndex:-999999},s={position:"absolute",display:"none",margin:0,padding:0,border:"none",width:"auto",height:"auto",maxHeight:"none",maxWidth:"none",zIndex:-999999},q=function(c,b,e){this.options=a.extend({},a.fn.backstretch.defaults,e||{});this.images=a.isArray(b)?b:[b];a.each(this.images,function(){a("<img />")[0].src=this});this.isBody=c===document.body;this.$container=a(c);this.$root=this.isBody?l?a(d):a(document):this.$container;c=this.$container.children(".backstretch").first();this.$wrap=c.length?c:a('<div class="backstretch"></div>').css(r).appendTo(this.$container);this.isBody||(c=this.$container.css("position"),b=this.$container.css("zIndex"),this.$container.css({position:"static"===c?"relative":c,zIndex:"auto"===b?0:b,background:"none"}),this.$wrap.css({zIndex:-999998}));this.$wrap.css({position:this.isBody&&l?"fixed":"absolute"});this.index=0;this.show(this.index);a(d).on("resize.backstretch",a.proxy(this.resize,this)).on("orientationchange.backstretch",a.proxy(function(){this.isBody&&0===d.pageYOffset&&(d.scrollTo(0,1),this.resize())},this))};q.prototype={resize:function(){try{var a={left:0,top:0},b=this.isBody?this.$root.width():this.$root.innerWidth(),e=b,g=this.isBody?d.innerHeight?d.innerHeight:this.$root.height():this.$root.innerHeight(),j=e/this.$img.data("ratio"),f;j>=g?(f=(j-g)/2,this.options.centeredY&&(a.top="-"+f+"px")):(j=g,e=j*this.$img.data("ratio"),f=(e-b)/2,this.options.centeredX&&(a.left="-"+f+"px"));this.$wrap.css({width:b,height:g}).find("img:not(.deleteable)").css({width:e,height:j}).css(a)}catch(h){}return this},show:function(c){if(!(Math.abs(c)>this.images.length-1)){var b=this,e=b.$wrap.find("img").addClass("deleteable"),d={relatedTarget:b.$container[0]};b.$container.trigger(a.Event("backstretch.before",d),[b,c]);this.index=c;clearInterval(b.interval);b.$img=a("<img />").css(s).bind("load",function(f){var h=this.width||a(f.target).width();f=this.height||a(f.target).height();a(this).data("ratio",h/f);a(this).fadeIn(b.options.speed||b.options.fade,function(){e.remove();b.paused||b.cycle();a(["after","show"]).each(function(){b.$container.trigger(a.Event("backstretch."+this,d),[b,c])})});b.resize()}).appendTo(b.$wrap);b.$img.attr("src",b.images[c]);return b}},next:function(){return this.show(this.index<this.images.length-1?this.index+1:0)},prev:function(){return this.show(0===this.index?this.images.length-1:this.index-1)},pause:function(){this.paused=!0;return this},resume:function(){this.paused=!1;this.next();return this},cycle:function(){1<this.images.length&&(clearInterval(this.interval),this.interval=setInterval(a.proxy(function(){this.paused||this.next()},this),this.options.duration));return this},destroy:function(c){a(d).off("resize.backstretch orientationchange.backstretch");clearInterval(this.interval);c||this.$wrap.remove();this.$container.removeData("backstretch")}};var l,f=navigator.userAgent,m=navigator.platform,e=f.match(/AppleWebKit\/([0-9]+)/),e=!!e&&e[1],h=f.match(/Fennec\/([0-9]+)/),h=!!h&&h[1],n=f.match(/Opera Mobi\/([0-9]+)/),t=!!n&&n[1],k=f.match(/MSIE ([0-9]+)/),k=!!k&&k[1];l=!((-1<m.indexOf("iPhone")||-1<m.indexOf("iPad")||-1<m.indexOf("iPod"))&&e&&534>e||d.operamini&&"[object OperaMini]"==={}.toString.call(d.operamini)||n&&7458>t||-1<f.indexOf("Android")&&e&&533>e||h&&6>h||"palmGetResource"in d&&e&&534>e||-1<f.indexOf("MeeGo")&&-1<f.indexOf("NokiaBrowser/8.5.0")||k&&6>=k)})(jQuery,window);