$(document).ready(function(){
    $('.new-accordion .panel-collapse').on('hidden.bs.collapse', function () {
        $(this).parent().find('.glyphicon-minus-sign').addClass('hide');
        $(this).parent().find('.glyphicon-plus-sign').removeClass('hide');
    });
    $('.new-accordion .panel-collapse').on('shown.bs.collapse', function () {
        $(this).parent().find('.glyphicon-plus-sign').addClass('hide');
        $(this).parent().find('.glyphicon-minus-sign').removeClass('hide');
    });

    $('.new-accordion .panel-collapse').each(function(){
        if( $(this).hasClass("in")){
            $(this).parent().find(".glyphicon-plus-sign").addClass("hide");
        }else{
            $(this).parent().find(".glyphicon-minus-sign").addClass("hide");
        }
    });
});