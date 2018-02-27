/**
 * mobile responsive
 */
"use strict";
var designWidth = 750;
!function () {
    var docEl = document.documentElement;
    var callback = function (e) {
        var min = Math.min(window.screen.height, window.screen.width);
        var scale = min / 750;
        var viewport = "width=" + designWidth + ",initial-scale=" + scale + ",maximum-scale=" + scale + ", minimum-scale=" + scale;
        var meta = document.querySelector('meta[name="viewport"]');
        if (!meta) {
            meta = document.createElement('meta');
            meta.setAttribute('name', 'viewport');
            document.querySelector('head').appendChild(meta);
        }
        meta.setAttribute('content', viewport);
        docEl.style.fontSize = designWidth / 10 + 'px';
    };
    document.addEventListener('orientationchange', callback, false);
    document.addEventListener('resize', callback, false);
    document.addEventListener('DOMContentLoaded', callback, false);
}();
//# sourceMappingURL=responsive.js.map