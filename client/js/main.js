var slideArr,slideIndex;
$(document).ready(function(){
    var scount = 0;
    var translate = 0;

    slideIndex=1;
    slideArr=$('.con');
    showSlides(slideIndex);

    setInterval(function(){
        translate = translate-25;
        scount++;

        if(scount%4===0){
            translate = 0;
        }
        $('.slide-show-slides').css('transform','translateX('+translate+'%)');
    },3000);


     $('.register').click(function(){
        $('.modal-box').css('display','flex');
        $('.modal-content').css('display','none');
        $('#pay-confirm').css('display','block');
        
    });

    $('.offline').click(function(){
        $('.modal-content').css('display','none');
        $('#form-modal').css('display','block');
    });

    $('.close').click(function(){
        $('.modal-content').css('display','none');
        $('.modal-box').css('display','none');
    });

    $('.confirm-button').click(function(){
        $('#form').submit();
    });

    $('.submit-button').click(function(event){
       var bool = validate();
            if(bool){
                 $('.confirm-con').append("<p id = 'info'>Registration Number: "+$('[name = "regno"]').val()+"</p><p id = 'info'>Name: "+$('[name = "full_name"]').val()+"</p><p id = 'info'>Mobile: "+$('[name = "mob"]').val()+"</p><p id = 'info'>Email: "+$('[name = "email"]').val()+"</p><p id = 'info'>Room: "+$('[name = "room"]').val()+"</p><p id = 'info'>Gender: "+$('[name = "gender"]').val()+"</p>"+"</p><p id = 'info'>ADG Member Key: "+$('[name = "adg_key"]').val()+"</p>")
                $('.modal-content').css('display','none');
                $("#confirm-modal").css('display','block');
            }
    });

});


function showSlides(n){
    if(n>3)
        slideIndex=1;
    if(n<1)
        slideIndex=3;

    for(var i=0;i<3;i++){
        $(slideArr[i]).css({'display':'none'});
    }
    
    $(slideArr[slideIndex-1]).css({'display':'inline-table'});
}

setInterval(function(){
    slideIndex++;
    showSlides(slideIndex);
},3000);


var pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function validate(){

    var valid = true;

    if( !$('[name = "regno"]').val()) {
        alert("Please Enter your Registration Number");
        valid = false;
    }
    else if( !$('[name = "full_name"]').val()) {
        alert("Please Enter your Name");
        valid = false;
    }
    else if( !$('[name = "mob"]').val()) {
        alert("Please Enter your Mobile Number");
        valid = false;
    }
    else if( !$('[name = "room"]').val()) {
        alert("Please Enter your Room Details");
        valid = false;
    }
    else if(!pattern.test($('[name = "email"]').val())){
        alert("Please enter a valid email"); 
        valid = false;               
     }

     return valid;

}