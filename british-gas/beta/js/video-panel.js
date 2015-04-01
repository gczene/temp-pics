$(function() {
    var myVideo = $( "#video-dialog" ).dialog({
        autoOpen: false,
        resizable: true,
        modal: true,
        width:'auto',
        close: function( event, ui ) {
            $( "#video-dialog iframe").remove();
        }
    });

    $('.video-panel .fa-youtube-play').click(function() {
        $( "#video-dialog").append('<iframe frameborder="0" allowfullscreen></iframe>');
        $( "#video-dialog").dialog( "option", "title", $(this).parent().parent().prev().text());
        $( "#video-dialog iframe").attr("src", "http://www.youtube.com/embed/"+$(this).parent().parent().parent().attr("data-video-id")+"?rel=0&autoplay=1&modestbranding=1");
        if( $(this).parent().parent().parent().attr("data-video-width") > $(window).width()) {
            $( "#video-dialog").dialog( "option", "width", $(window).width() );
        }else{
            $( "#video-dialog").dialog( "option", "width", $(this).parent().parent().parent().attr("data-video-width") );
        }
        $( "#video-dialog iframe").attr("width", "100%");
        $( "#video-dialog iframe").attr("height", $(this).parent().parent().parent().attr("data-video-height"));
        $( "#video-dialog").dialog('open');
        $( "#video-dialog").parent().find(".ui-dialog-titlebar-close").html("<span class='glyphicon glyphicon-remove' style='font-size: 18px;left: -2px;top: -1px;'></span>");
    });
});