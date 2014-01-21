(function($){
	$(function(){
		var btnDropDown = $('#drop_down_btn'),
			divDropDown = $('#drop_down');

		btnDropDown.on('click', function(){
			divDropDown.slideToggle();
		});
	})
})(jQuery);