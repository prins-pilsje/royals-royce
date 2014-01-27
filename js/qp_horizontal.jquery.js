(function($){

// [START - PLUGIN] ------------------------------------------------
    $.fn.qpHorizontalParalax = function(options) {
        // Element, das mit dem Selektor gewählt wurde
        var $win = $(document),
            elem = this,
            list = elem.children('ul'),
            slides = list.children('li'),
            // Über defaults.Eigenschaft sind die Optionen erreichbar
            defaults = jQuery.extend({
                anim: 1200
            }, options),
            preventDefaultEvents = true,
            startX, startY;



        // Private:
        function init(){
            defaults.width = $(window).width();
            defaults.height = $(window).height();
            defaults.listWidth = slides.length * defaults.width;

            // Länge für UL festlegen
            list.width(defaults.listWidth);
            list.css({
                'left': 0
            });

            // Breite für Teil-Inhalte festlegen
            slides.each(function(index, element){
                $(element).width(defaults.width);
            });

            // DOMMouseScroll wegen Firefox ab Version 3
            $win.on("mousewheel.qpHorPara DOMMouseScroll.qpHorPara", function(evt){
                hMouseWheelHandler(evt);
            });

            if ('ontouchstart' in document.documentElement) {
                //this.addEventListener('touchstart', onTouchStart, false);
                $win.on('touchstart.qpHorPara', function(evt){
                    $('.output').html(evt.originalEvent);
                    onTouchStart(evt.originalEvent);
                });
            }

            return elem;
        };

        function onTouchStart(e){
            if (e.touches.length === 1) {
                startX = e.touches[0].pageX;
                startY = e.touches[0].pageY;
                isMoving = true;
                this.addEventListener('touchmove', onTouchMove, false);
            }
        }

        function onTouchMove(e) {
            if(defaults.preventDefaultEvents) {
                e.preventDefault();
            }

            if(isMoving) {
                var x = e.touches[0].pageX,
                    y = e.touches[0].pageY,
                    dx = startX - x,
                    dy = startY - y,
                    delta = 0;

                $win.off("touchstart.qpHorPara");

                if(dx > 0) {
                    delta = 1;
                } else {
                    delta = -1;
                }

                // if(dy > 0) {
                //     // defaults.wipeDown();
                //     output.html(output.html() + "<br />" + 'wipeDown');
                // } else {
                //     // defaults.wipeUp();
                //     output.html(output.html() + "<br />" + 'wipeUp');
                // }
                if(delta !== 0){
                    animSlide(delta);
                }
            }
        }

        function hMouseWheelHandler(evt) {
            // mousewheel-Event entfernen, um Überlagerung zu vermeiden
            $win.off("mousewheel.qpHorPara DOMMouseScroll.qpHorPara");
            // Standard-Verhalten unterbinden
            evt.preventDefault();

            var origEvt = evt.originalEvent,                                                    // Orginalevent
                delta = -Math.max(-1, Math.min(1, (origEvt.wheelDelta || -origEvt.detail))),    // -1 oder 1
                addLeft = delta * defaults.width,                                               // Left-Differenz
                left = parseInt(list.css('left')),                                              // bisheriger left-Wert
                newLeft = left - addLeft;                                                       // neuer left-Wert

            // // falls der neue left-Wert im gültigen Bereich liegt
            // if((newLeft <= 0) && (newLeft >= -defaults.listWidth+defaults.width)){
            //     list.animate({
            //         left: newLeft + "px",
            //         easing: 'easeInOutQuart'
            //     }, defaults.anim, function() {
            //         // DOMMouseScroll wegen Firefox ab Version 3
            //         $win.on("mousewheel.qpHorPara DOMMouseScroll.qpHorPara", function(evt){
            //             hMouseWheelHandler(evt);
            //         });
            //     });
            // }else{
            //     // DOMMouseScroll wegen Firefox ab Version 3
            //     $win.on("mousewheel.qpHorPara DOMMouseScroll.qpHorPara", function(evt){
            //         hMouseWheelHandler(evt);
            //     });
            // }

            animSlide(delta);
        }

        function animSlide(delta) {

            var addLeft = delta * defaults.width,                                               // Left-Differenz
                left = parseInt(list.css('left')),                                              // bisheriger left-Wert
                newLeft = left - addLeft;                                                       // neuer left-Wert

            // falls der neue left-Wert im gültigen Bereich liegt
            if((newLeft <= 0) && (newLeft >= -defaults.listWidth+defaults.width)){
                list.animate({
                    left: newLeft + "px",
                    easing: 'easeInOutQuart'
                }, defaults.anim, function() {
                    // DOMMouseScroll wegen Firefox ab Version 3
                    $win.on("mousewheel.qpHorPara DOMMouseScroll.qpHorPara", function(evt){
                        hMouseWheelHandler(evt);
                    });
                        if ('ontouchstart' in document.documentElement) {
                        //this.addEventListener('touchstart', onTouchStart, false);
                        $win.on('touchstart.qpHorPara', function(evt){
                            $('.output').html(evt.originalEvent);
                            onTouchStart(evt.originalEvent);
                        });
                    }
                });
            }else{
                // DOMMouseScroll wegen Firefox ab Version 3
                $win.on("mousewheel.qpHorPara DOMMouseScroll.qpHorPara", function(evt){
                    hMouseWheelHandler(evt);
                });

                if ('ontouchstart' in document.documentElement) {
                    //this.addEventListener('touchstart', onTouchStart, false);
                    $win.on('touchstart.qpHorPara', function(evt){
                        $('.output').html(evt.originalEvent);
                        onTouchStart(evt.originalEvent);
                    });
                }
            }
        }

        // Public:
        // Methode - aufrufbar über Referenz.Methodenname
        this.displayMyName = function(){
            //alert(settings.qp_name);
            this.eventCaller();
        };

        this.eventCaller = function(){
            if(settings.my_callback != null)
                settings.my_callback(settings.qp_name, settings.url);
        }

        this.getPrivate = function(){
            alert(privateFn());
        }

      // Plugin initialisieren
      init();

      // if possible, return "this" to not break the chain
      return this;
    };
// [ENDE  - PLUGIN] ------------------------------------------------


    $(function(){
        // Horizontale Navigation (Slider)
        $('#contentWrapper').qpHorizontalParalax();
    })
})(jQuery);
