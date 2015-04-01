$(document).ready(function(){
    $(".jumbotron button").click(function(e){
        e.preventDefault();
        var text_val = $(".jumbotron .input-group input[type='text']").val();
        if (text_val == "" ) {
            $(".jumbotron .for-validation").addClass("has-error has-feedback");
            $(".jumbotron .form-control-feedback").removeClass("hide");
            $(".jumbotron .text-danger").removeClass("hide");
        }else{
            $(".jumbotron .text-danger").addClass("hide");;
            $(".jumbotron .form-control-feedback").addClass("hide");
            $(".jumbotron .for-validation").removeClass("has-error has-feedback");
        }
    });
});