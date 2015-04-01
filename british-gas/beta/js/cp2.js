$(document).ready(function(){
    enquire.register("screen and (min-width:768px)", { /* For more than 768 */
        match: function () {
            //safari fix
            $(".content-panel-type2").each(function () {
                var totalHeight = $(this).find(".content-panel-body").outerHeight(true);
                if (totalHeight < 450 ){
                    $(this).find(".content-panel-image").innerHeight("450");
                    $(this).find(".content-panel-body").css("margin-top",parseInt( (parseInt(450)-parseInt(totalHeight))/2)+"px");
                } else $(this).find(".content-panel-image").innerHeight(totalHeight);
            });
        },
        unmatch: function () {
            $(".content-panel-type2").each(function () {
                $(this).find(".content-panel-image").innerHeight("200");
            });
        },
        setup: function () {}
    });
});
