$(document).ready(function(){
    var scount = 0;
    var translate = 0;


    setInterval(function(){
        translate = translate-25;
        scount++;

        if(scount%4===0){
            translate = 0;
        }
        $('.slide-show-slides').css('transform','translateX('+translate+'%)');
    },3000);


});

