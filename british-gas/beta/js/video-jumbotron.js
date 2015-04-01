function onYouTubePlayerAPIReady() {
    var vidID = $('#myYTVideo').attr('data-video-id');
    new YT.Player('myYTVideo',
        {
            videoId: vidID,
            height: '0',
            width: '100%',
            playerVars: {
                controls: 0,
                autoplay: 0,
                disablekb: 1,
                enablejsapi: 1,
                iv_load_policy: 3,
                modestbranding: 1,
                showinfo: 0,
                nologo: 1,
                origin: window.location.origin
            },
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        }
    );
}

function onPlayerReady(event) {
    $('#playButton').click(function() {
        $('#myJumboVideo .panel').animate(
            {"left": "-1000px"},
            "swing",
            function () {
                // once animation complete.
                $('iframe#myYTVideo').attr("height","450");
                $('#myJumboVideo').hide();
                event.target.playVideo();
            });
    });
}

function onPlayerStateChange(event) {
    if( (event.data === 0) || (event.data == YT.PlayerState.PAUSED) ) { //when video ends or pauses
        $('iframe#myYTVideo').attr("height","0");
        $('#myJumboVideo').show();
        $('#myJumboVideo .panel').animate(
            {"left": "0"},
            "swing");
    }
}


