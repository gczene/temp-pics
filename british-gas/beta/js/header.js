$(function() {
    $(document).ready(function(){
        /* Cookies */
        function getCookie(cName) {
            var cVal = document.cookie.match('(?:^|;) ?' + cName + '=([^;]*)(?:;|$)');
            if (!cVal) {
                return "";
            } else {
                return cVal[1];
            }
        }

        var lastNameCookie = getCookie("SE_Lastname");
        var titleCookie = getCookie("SE_Title");

        if (!lastNameCookie) {
            // anonymous
            $(".logged-out").removeClass("displaynone");
            $("#myaccount-menu-link").attr("href","/Login/Login-Verify/");
        } else {
            //logged in
            $("#greetings").css("display","inline-block");
            $(".user-last-name").html(lastNameCookie);
            $(".user-title").html(titleCookie);
            $(".logged-in").removeClass("displaynone");
            $("#myaccount-menu-link").attr("href","/Your_Account/Account_Details/");

        }
        /* END Cookies */

        /*  Beta bar */
        /*
         var bg={};
         bg.mode = "beta";

         $("#betadisable").bind("click",function(){
         var d = new Date()
         d.setTime(d.getTime() + (90*24*60*60*1000));
         setCookie("beta","",(new Date(1)),"/");
         setCookie("beta","",(new Date(1)),"/","." + location.hostname);
         setCookie("beta","false",d);
         location.reload(true);
         });

         $("#betafeedback").bind("click",function(){
         window.open('//www.smartsurvey.co.uk/s/123569GOUBH', '','toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=1,resizable=1,width=850,height=500');
         });
         */

        /* 'Back to top' Link */
        /*
        $("a[href='#content-top']").click(function(e) {
            console.log("go to top");
            e.preventDefault();
            $("html, body").animate({ scrollTop: 0 }, "slow");
            return false;
        });
        */

        /* hover delay - hoverIntent */
        var iOS = ( navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false );
        function mouseInOut(){
            if( !$(this).hasClass('open')) {
                $(this).find("ul.dropdown-menu").show();
                $("#nav-overlay").show();
                $(this).addClass('open');
                //if (iOS) $('#menuCloseBtn').show();
            }else {
                $(this).find("ul.dropdown-menu").hide();
                $("#nav-overlay").hide();
                //if (iOS) $('#menuCloseBtn').hide();
                $(this).removeClass('open');
            }
        }

        function mouseInOutAndroid(event){
            var $item = $(this);
            // Already clicked? proceed to the URI.
            if ($item.hasClass('open')) {
                var uri = $item.attr('href');
                if (typeof uri !== typeof undefined && uri !== false) {
                    window.location = uri;
                }else{
                    $("#nav-overlay").trigger('click');
                }
            }
            //Clicked for the 1st time
            else {
                event.preventDefault();
                $('ul.navbar-master-links > li.dropdown').removeClass('open');
                $('ul.dropdown-menu').hide();
                $item.focus();
                $item.find("ul.dropdown-menu").show();
                $("#nav-overlay").show();
                $item.addClass('open');
            }
        }
        /* END hover delay - hoverIntent */

        /* Bootstrap */
        $("[data-toggle='tooltip']").tooltip();
        $("[data-toggle='popover']").popover({ html : true });

        /** Search **/

            //Overrides the default _renderItem function to highlight the matched text
        String.prototype.replaceAt = function (index, char) {
            return this.substr(0, index) + "<b>" + char + "</b>";
        };

        $.ui.autocomplete.prototype._renderItem = function (ul, item) {
            var lowerTerm = this.term.toLowerCase();
            var resultStr = item.label.toLowerCase();
            var t = "";
            while (resultStr.indexOf(lowerTerm) != -1) {
                var index = resultStr.indexOf(lowerTerm);
                t = t + item.label.replaceAt(index, item.label.slice(index, index + lowerTerm.length));
                resultStr = resultStr.substr(index + lowerTerm.length);
                item.label = item.label.substr(index + lowerTerm.length);
            }
            return $("<li></li>").data("item.autocomplete", item).append("<a>" + t + item.label + "</a>").appendTo(ul);

        };


        // Overrides the default autocomplete filter function to search only from the beginning of the string

        $.ui.autocomplete.filter = function (array, term) {
            var matcher = new RegExp("^" + $.ui.autocomplete.escapeRegex(term), "i");
            return $.grep(array, function (value) {
                return matcher.test(value.label || value.value || value);
            });
        };

        /** END Search **/

        /* Yamm */
        //prevent unexpected menu close when using some components (like accordion, forms, etc)
        $(document).on('click', '.yamm .dropdown-menu', function(e) {
            e.stopPropagation()
        });
        /* END Yamm */


        /* Autocomplete */
        $( "#searchtermsmallbeta" ).autocomplete({
            position: {
                my: "left top",
                at: "left center",
                of: "#search-suggestions"
            },
            appendTo: "#search-suggestions",
            source: function (request, resolve) {
                $.ajax({
                    type: "GET",
                    url: "/apps/centrica/sitesearch/GET.servlet",
                    data: 'queryString=' + request.term + '&getPredictiveText=true&brand=',
                    dataType: "json",
                    success: function (json) {
                        //predictiveSponsorList = json.searchResults.predictiveSponsorList;
                        resolve(json.searchResults.predictiveTextList);
                    },
                    error: function (xhr) {
                        if (xhr.status != 200) {
                            //alert("AJAX error");
                        }
                    }
                });
            },
            select: function (event, ui) {
                if (ui.item) {
                    $('#searchtermsmallbeta').val(ui.item.value);
                }
                $('#newSearchFormSmall').submit();
            },
            open: function () {
                // display only the first 7 results
                var len = $("#search-suggestions ul.ui-autocomplete li").length;
                if(len > 7) {
                    var first7 = $("#search-suggestions ul.ui-autocomplete li").slice(0,7);
                    $("#search-suggestions ul.ui-autocomplete").empty().append(first7);
                }
            }

        });
        /* END Autocomplete */

        /* Enquire.js */
        enquire.register("screen and (max-width:767px)", { /* For less than 768 */
            match : function() {
                /* move searchForm to menu 2 */
                $("#searchFormMenu2").append( $("#searchFormContainer") );
                /* move myaccount to menu 3 */
                $("#yourAccountMenu2").append( $("#yourAccountContainer") );

                /* move greetings after small links */
               // $("#small-links-list").after( $("#greetings") );

                /* Only ome menu opened */
                var menu1 = $("#bs-example-navbar-collapse-1");
                var menu2 = $("#bs-example-navbar-collapse-2");
                var menu3 = $("#bs-example-navbar-collapse-3");

                $("#btn-menu-1, #btn-menu-2, #btn-menu-3").off("click");

                $("#btn-menu-1").click(function(){
                    if(menu2.hasClass("in")) {  //is opened
                        $("#btn-menu-2").trigger("click");
                    }
                    if(menu3.hasClass("in")) { //is opened
                        $("#btn-menu-3").trigger("click");
                    }
                });

                $("#btn-menu-2").click(function(){
                    if(menu3.hasClass("in")) {  //is opened
                        $("#btn-menu-3").trigger("click");
                    }
                    if(menu1.hasClass("in")) {  //is opened
                        $("#btn-menu-1").trigger("click");
                    }
                });

                $("#btn-menu-3").click(function(){
                    if(menu1.hasClass("in")) {  //is opened
                        $("#btn-menu-1").trigger("click");
                    }
                    if(menu2.hasClass("in")) {  //is opened
                        $("#btn-menu-2").trigger("click");
                    }
                });

            },
            unmatch : function(){
                /* move searchForm  back to menu 1 */
                $("#searchFormMenu1").append( $("#searchFormContainer") );
                /* move myaccount  back to menu 1 */
                $("#yourAccountMenu1").append( $("#yourAccountContainer") );
                /* move greetings after small links */
                //$("#small-links-list").after( $("#greetings") );
                /* remove event handlers we don't want for this screen size */
                $("#btn-menu-1, #btn-menu-2, #btn-menu-3").off("click");

                //deactivate Boostrap's toggle-dropdown for the nav menu. Using bespoke js
                $("a.dropdown-toggle").removeAttr("data-toggle");

                if(Modernizr.touch){
                    if (iOS){
                        $('ul.navbar-master-links > li.dropdown').hover(mouseInOut);
                    }else $('ul.navbar-master-links > li.dropdown').click(mouseInOutAndroid);
                }else{
                    $('ul.navbar-master-links > li.dropdown').hoverIntent(mouseInOut);
                }
            },
            setup : function() {

            }
        }).register("screen and (min-width:768px)", { /* For more than 768 */
            match: function () {
                $("#nav-overlay").click(function(event){
                    $('ul.navbar-master-links > li.dropdown').removeClass('open');
                    $('ul.dropdown-menu, #nav-overlay').hide();
                });

                if(Modernizr.touch){
                    if (iOS){
                        $('ul.navbar-master-links > li.dropdown').hover(mouseInOut);
                    }else $('ul.navbar-master-links > li.dropdown').click(mouseInOutAndroid);
                }else{
                    $('ul.navbar-master-links > li.dropdown').hoverIntent(mouseInOut);
                }

                //deactivate Boostrap's toggle-dropdown for the nav menu. Using bespoke js
                $("a.dropdown-toggle").removeAttr("data-toggle");

                //safari fix
                $(".content-panel-type2").each(function () {
                    var totalHeight = $(this).find(".content-panel-body").innerHeight();
                    $(this).find(".content-panel-image").innerHeight(totalHeight);
                });
            },
            unmatch: function () {
                $("a.dropdown-toggle").attr("data-toggle","dropdown");

                $(".content-panel-type2").each(function () {
                    $(this).find(".content-panel-image").innerHeight("200");
                });
            },
            setup: function () {

            }
        });
        /* END Enquire.js */

    });
});