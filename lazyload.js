define(function (require, exports, module) {
    'use strict';
    var $ = require('jquery'),
        windowScrollTop = 0,
        windowHeight = 0,
        offsetTop = 0,
        exhibition = true,
        num = -5,
        container = $('img');

    function Lazy() {
        //Lazy.init();
        //Lazy.rendUI();
        Lazy.bindEvent();
        $(window).trigger("scroll");
    }

    $.fn.extend(Lazy, {
        //init: function () {},
        //rendUI: function () {},
        bindEvent: function () {
            var win = window;
            $(window).on('load scroll resize', function () {
                //滚动条距顶距离
                windowScrollTop = $(win).scrollTop();
                //当前窗口高度
                windowHeight = $(win).height();
                container = $('img');
                container.each(function () {
                    var $self = $(this);
                    offsetTop = $self.offset().top;
                    if ($self.css('display') === 'none' ||
                            $self.css('visibility') === 'hidden') {

                        exhibition = false;
                    }

                    if (windowScrollTop - num < offsetTop &&
                            offsetTop < windowScrollTop + windowHeight + num &&
                            exhibition &&
                            $self.attr('data-lazyload') !== undefined) {

                        $self.css('display', 'none');
                        $self.prop('src', $self.attr('data-lazyload'));
                        $self.fadeIn('fast');
                        $self.removeAttr('data-lazyload');
                    }
                    exhibition = true;
                });
            });
        }
    });
    module.exports = Lazy;
});
