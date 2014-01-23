(function($){
	$(function(){
		var makeSlidable = function(index){
			var btnDropDown = $('#drop_down_btn' + index),
				divDropDown = $('#drop_down' + index);

			btnDropDown.on('click', function(){
				divDropDown.slideToggle();
			});
		}

		makeSlidable("");
		makeSlidable("2");

	})
})(jQuery);