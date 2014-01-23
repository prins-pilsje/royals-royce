(function($){
	$(function(){
		var btnDropDown = $('#drop_down_btn'),
			divDropDown = $('#drop_down');

		btnDropDown.on('click', function(){
			divDropDown.slideToggle();
		});
	})
})(jQuery);

(function($){
  $(function(){
    var btnDropDown = $('#drop_down_btn2'),
      divDropDown = $('#drop_down2');

    btnDropDown.on('click', function(){
      divDropDown.slideToggle();
    });
  })
})(jQuery);