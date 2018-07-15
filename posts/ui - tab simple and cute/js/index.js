var SHIROMI = SHIROMI || {};
SHIROMI.SAMPLE_CODE = {};

SHIROMI.SAMPLE_CODE.TABS = {
	ACTIVE_CLASS: '-active',
	init: function(){
		this.setParameters();
		this.bindEvent();
	},
	setParameters: function(){
		this.$triggers = $('.jsc-Tabs-menu').find('.jsc-Tabs-menu_unit');
		this.$reacts   = $('.jsc-Tabs-content').find('.jsc-Tabs-content_unit');
	},
	bindEvent: function(){
		var myself = this;
		this.$triggers.each(function(index){
			$(this).on('click', function(event){
				event.preventDefault();
				myself.toggleReactDisplay($(this), index);
			});
		});
	},
	toggleReactDisplay: function($trigger, index){
		this.$triggers.removeClass(this.ACTIVE_CLASS);
		this.$reacts.removeClass(this.ACTIVE_CLASS);

		$trigger.addClass(this.ACTIVE_CLASS);
		this.$reacts.eq(index).addClass(this.ACTIVE_CLASS);
	}
};

$(function(){
	SHIROMI.SAMPLE_CODE.TABS.init();
});