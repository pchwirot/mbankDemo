/* jshint strict: false, unused: false, quotmark:false */
/*globals $, setTimeout, window, console*/

var scenario1 = [{
    element: '.el1',
    msg: 'opis dla el1'
}, {
    element: '.el2',
    msg: 'opis dla el2'
}, {
    element: '.el3-1',
    msg: 'opis dla el3-1'
}, {
    element: '.el5',
    msg: 'opis dla el5'
}, {
    element: '.el6',
    msg: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora autem iure in facilis quis sint minus hic. Nobis, rem, molestiae modi nemo quae dolore quis consequuntur neque vero quia praesentium?'
}];
var Tutorial = function(scenario) {
    this.cover = '';
    this.scenario = scenario;
    this.currenScene = 0;
    this.scenarioLength = scenario.length;
    this.inited = false;
    this.currentElementMap = {
        top: 0,
        left: 0,
        height: 0,
        width: 0
    };
};
Tutorial.prototype.makeCover = function(el) {
    var elSelector = $(el);
    var cover = '';
    var map = {
        top: elSelector.offset().top,
        left: elSelector.offset().left,
        width: elSelector.outerWidth(),
        height: elSelector.outerHeight(),
        bodyWidth: $('body').width(),
        bodyHeight: $('body').height()
    };
    if (!this.inited) {
        cover += '<div class="tutorial-cover cover-top"></div>';
        cover += '<div class="tutorial-cover cover-left"></div>';
        cover += '<div class="tutorial-cover cover-right"></div>';
        cover += '<div class="tutorial-cover cover-bottom"></div>';
        cover += '</div>';
        $('body').append(cover);
        this.inited = true;
    }
    this.updateCover(map);
};
Tutorial.prototype.removeCover = function() {
    this.inited = false;
    $('#tutorial-tooltip').hide();
    $('.tutorial-cover').remove();
};
Tutorial.prototype.addTooltip = function() {
    var _this = this;
    $('body').append('<div id="tutorial-tooltip"></div>');
    var tooltipHeight = parseInt($('#tutorial-tooltip').height());
    var tooltipTop = _this.currentElementMap.top - tooltipHeight;
    var tooltipLeft = _this.currentElementMap.left;
    $('#tutorial-tooltip').css({
        top: tooltipTop + 'px',
        left: tooltipLeft + 'px'
    });
};
Tutorial.prototype.updateTooltip = function() {
    var _this = this;
    $('#tutorial-tooltip').show();
    var tooltipHeight = parseInt($('#tutorial-tooltip').height());
    var tooltipTop = _this.currentElementMap.top - tooltipHeight;
    var tooltipLeft = _this.currentElementMap.left;
    console.log(_this.currentElementMap.top);
    console.log(_this.currentElementMap.height);
    if (tooltipTop < tooltipHeight) {
        tooltipTop = _this.currentElementMap.top + _this.currentElementMap.height;
    }
    $('#tutorial-tooltip').html(_this.scenario[_this.currenScene].msg);
    $('#tutorial-tooltip').css({
        top: tooltipTop + 'px',
        left: tooltipLeft + 'px'
    });
};
Tutorial.prototype.updateCover = function(map) {
    this.currentElementMap.top = map.top;
    this.currentElementMap.left = map.left;
    this.currentElementMap.height = map.height;
    this.currentElementMap.width = map.width;

    $('.tutorial-cover.cover-top').css({
        top: '0px',
        left: '0px',
        width: map.bodyWidth + 'px',
        height: map.top + 'px'
    });
    $('.tutorial-cover.cover-left').css({
        top: map.top + 'px',
        left: '0px',
        width: map.left + 'px',
        height: map.height + 'px'
    });
    $('.tutorial-cover.cover-right').css({
        top: map.top + 'px',
        left: (map.left + map.width) + 'px',
        width: (map.bodyWidth - map.left - map.width) + 'px',
        height: map.height + 'px'
    });
    $('.tutorial-cover.cover-bottom').css({
        top: (map.top + map.height) + 'px',
        left: '0px',
        width: map.bodyWidth + 'px',
        height: (map.bodyHeight - map.top - map.height) + 'px'
    });
    this.updateTooltip();
};
Tutorial.prototype.navigation = function() {
    var buttons = '<ul id="tutorial-menu"><li><a href="" class="prev">prev</a></li><li><a href="" class="next">next</a></li><li><a href="" class="removeCover">remove cover</a></li><li><a href="" class="addCover">add cover</a></li></ul>';
    var _this = this;
    $('body').append(buttons);
    $('#tutorial-menu a.next').unbind('click').bind('click', function(e) {
        e.preventDefault();
        _this.currenScene++;
        _this.toggleScene();
    });
    $('#tutorial-menu a.prev').unbind('click').bind('click', function(e) {
        e.preventDefault();
        _this.currenScene--;
        _this.toggleScene();
    });
    $('#tutorial-menu a.removeCover').unbind('click').bind('click', function(e) {
        e.preventDefault();
        _this.removeCover();
    });
    $('#tutorial-menu a.addCover').unbind('click').bind('click', function(e) {
        e.preventDefault();
        _this.toggleScene();
    });
};
Tutorial.prototype.toggleScene = function() {
    if (this.currenScene > this.scenarioLength - 1) {
        this.currenScene = this.scenarioLength - 1;
    }
    if (this.currenScene < 0) {
        this.currenScene = 0;
    }
    this.makeCover(this.scenario[this.currenScene].element);
};
Tutorial.prototype.init = function() {
    this.addTooltip();
    this.makeCover(this.scenario[this.currenScene].element);
    this.navigation();
};

var tut1 = new Tutorial(scenario1);
$(function() {
    tut1.init();
});