$(document).ready(function(){
    var faq_full, faq_short;
    var length_limit = 200;

    $(".faq-answer").each(function(){
        faq_full = $(this).text();
        if ( faq_full.length > length_limit){
            faq_short = faq_full.trim()    // remove leading and trailing spaces
                .substring(0, length_limit)    // get first characters
                .split(" ") // separate characters into an array of words
                .slice(0, -1)    // remove the last full or partial word
                .join(" ") + '...'; // combine into a single string
            $(this).html('<span class="faq-short">'+ faq_short + ' <a class="show_faq" href="#">More<i class="fa fa-angle-right fa-lg"></i></a></span>'
                + '<span class="faq-full" style="display:none">' + faq_full + ' <a class="hide_faq" href="#">Less<i class="fa fa-angle-left fa-lg"></i></a></span>');
        }
    });

    $(".show_faq").click(function(e){
        e.preventDefault();
        $(this).parent().hide();
        $(this).parent().parent().find("span.faq-full").show();
    });

    $(".hide_faq").click(function(e){
        e.preventDefault();
        $(this).parent().hide();
        $(this).parent().parent().find("span.faq-short").show();
    });

    var myFaqs = $("#cp-faq02 .faq-container");
    var faq_length =  myFaqs.length;
    function showThree(){
        for (var i = 3 ; i < faq_length ; i++){
            myFaqs.eq(i).hide();
        }
        myFaqs.eq(2).find("hr").hide();
        $("#btn-faq-more").show();
        $("#btn-faq-less").hide();
    }

    showThree();

    $("#btn-faq-less").click(function(e){
        e.preventDefault();
        showThree();
        $('html, body').animate({scrollTop: $('#cp-faq02').offset().top -109 }, 'slow');
    });

    $("#btn-faq-more").click(function(e){
        e.preventDefault();
        myFaqs.show();
        myFaqs.eq(2).find("hr").show();
        $("#btn-faq-more").hide();
        $("#btn-faq-less").show();
        $('html, body').animate({scrollTop: $('#cp-faq02').offset().top -109 }, 'slow');


    });


});