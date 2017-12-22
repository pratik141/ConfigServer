$(function () {
    var availableTags = [
        "ActionScript",
        "AppleScript",
        "Asp",
        "BASIC",
        "C",
        "C++",
        "Clojure",
        "COBOL",
        "ColdFusion",
        "Erlang",
        "Fortran",
        "Groovy",
        "Haskell",
        "Java",
        "JavaScript",
        "Lisp",
        "Perl",
        "PHP",
        "Python",
        "Ruby",
        "Scala",
        "Scheme",
        "AA",
        "BB",
        "CC",
        "DD",
        "EE",
        "FF",
        "GG",
        "HH",
        "II",
        "JJ",
        "KK"
    ];

$.extend($.ui.autocomplete.prototype, {
    _renderMenu: function (ul, items) {
        //remove scroll event to prevent attaching multiple scroll events to one container element
        $(ul).unbind("scroll");

        var self = this;
        self._scrollMenu(ul, items);
    },

    _scrollMenu: function (ul, items) {
        var self = this;
        var maxShow = 5;
        var results = [];
        var pages = Math.ceil(items.length / maxShow);
        results = items.slice(0, maxShow);

        if (pages > 1) {
            $(ul).scroll(function () {
                if (isScrollbarBottom($(ul))) {
                    ++window.pageIndex;
                    if (window.pageIndex >= pages) return;

                    results = items.slice(window.pageIndex * maxShow, window.pageIndex * maxShow + maxShow);

                    //append item to ul
                    $.each(results, function (index, item) {
                        self._renderItem(ul, item);
                    });
                    //refresh menu
                    self.menu.deactivate();
                    self.menu.refresh();
                    // size and position menu
                    ul.show();
                    self._resizeMenu();
                    ul.position($.extend({
                        of: self.element
                    }, self.options.position));
                    if (self.options.autoFocus) {
                        self.menu.next(new $.Event("mouseover"));
                    }
                }
            });
        }

        $.each(results, function (index, item) {
            self._renderItem(ul, item);
        });
    }
});

function isScrollbarBottom(container) {
     var height = container.outerHeight();
     var scrollHeight = container[0].scrollHeight;
     var scrollTop = container.scrollTop();
     if (scrollTop >= scrollHeight - height) {
         return true;
     }
     return false;
 };

$("#tags").autocomplete({
    source: availableTags,
    
        //you can also get source through Ajax
        /*
        function (request, response) {
            $.ajax({
                type: "POST",
                url: ".....",
                contentType: "application/json; charset=utf-8",
                data: "{ searchItem: '" + request.term + "'}",
                dataType: "json",
                success: function (data) {
                    response($.map(data.d, function (item) {
                        if (typeof item === "string") {
                            return {
                                label: item,
                                value: item
                            };
                        }
                        return $.extend({
                            label: item.label || item.value,
                            value: item.value || item.label
                        }, item);
                    }));
                },
                error: function (xhr, error) {
                    alert("readyState: " + xhr.readyState + "\nstatus: " + xhr.status);
                    alert("responseText: " + xhr.responseText);
                }
            });
        },*/
    minLength: 0,
    delay: 0
}).focus(function () {
    //reset result list's pageindex when focus on
    window.pageIndex = 0;
    $(this).autocomplete("search");
});
});
function submitRating(e){
var div = document.createElement('div');
}
function ShowLoading(e) {
var div = document.createElement('div');
var img = document.createElement('img');
img.src = 'static/spinner.gif';
div.innerHTML = "Loading...<br />";
div.style.cssText = 'position: fixed; top: 26%; left: 68%;';
div.appendChild(img);
document.body.appendChild(div);
return true;
// These 2 lines cancel form submission, so only use if needed.
//window.event.cancelBubble = true;
//e.stopPropagation();
}


function selectLink() {
    var serverName = document.getElementById("serverDropdown").value;
}

function sendRequest(){

    var div1 = document.createElement('div');
    var img = document.createElement('img');
    img.src = 'static/spinner.gif';
    div1.innerHTML = "Loading...<br />";
    div1.style.cssText = 'position: fixed; top: 26%; left: 68%;';
    div1.appendChild(img);
    document.body.appendChild(div1);

    var pathArray = window.location.pathname.split( '/' );
    var hostname = window.location.hostname
    var port = window.location.port
    var postData;
    var fname = $("#fname").val();
    var lname = $("#lname").val();
    var project = $("#project").val();
    var serverName = $("#serverDropdown").val();                
    var accessLevel = $("#accessLevel").val();
    var manager_email = $("#manager_email").val();

    postData = {
            "fname" : fname,
            "lname" : lname,
            "project" : project,
            "serverName" : serverName,
            "accessLevel": accessLevel,
            "manager_email": manager_email,

    };
    $.ajax({
        type : 'POST',
        url : "http://"+ hostname + ":" + port + "/frm",
        contentType : "application/json",
        data : JSON.stringify(postData),
        dataType : 'json',
        complete : function(res) {
            try {
                document.body.removeChild(div1);
                if (res.status != null && (res.status == 200  || res.status == 201)) {
                    // alert(res.responseText);
                    $("#messages_content").show(); 
                } else {
                    alert("error message:"+ res.responseText )
                }
            } catch (error) {
                alert("error message: "+ res.responseText)
            }
        }
    })
    
}

function submitRating(e){
    var div = document.createElement('div');
    }
    function ShowLoading(e) {
    var div = document.createElement('div');
    var img = document.createElement('img');
    img.src = 'static/spinner.gif';
    div.innerHTML = "Loading...<br />";
    div.style.cssText = 'position: fixed; top: 26%; left: 68%;';
    div.appendChild(img);
    document.body.appendChild(div);
    return true;
    // These 2 lines cancel form submission, so only use if needed.
    //window.event.cancelBubble = true;
    //e.stopPropagation();
    }

function sendRequest(){

    var div1 = document.createElement('div');
    var img = document.createElement('img');
    img.src = 'static/spinner.gif';
    div1.innerHTML = "Loading...<br />";
    div1.style.cssText = 'position: fixed; top: 26%; left: 68%;';
    div1.appendChild(img);
    document.body.appendChild(div1);

    var pathArray = window.location.pathname.split( '/' );
    var hostname = window.location.hostname
    var port = window.location.port
    var postData;
    var fname = $("#fname").val();
    var lname = $("#lname").val();
    var project = $("#project").val();
    var serverName = $("#serverDropdown").val();                
    var accessLevel = $("#accessLevel").val();
    var manager_email = $("#manager_email").val();

    postData = {
            "fname" : fname,
            "lname" : lname,
            "project" : project,
            "serverName" : serverName,
            "accessLevel": accessLevel,
            "manager_email": manager_email,

    };
    $.ajax({
        type : 'POST',
        url : "http://"+ hostname + ":" + port + "/frm",
        contentType : "application/json",
        data : JSON.stringify(postData),
        dataType : 'json',
        complete : function(res) {
            try {
                document.body.removeChild(div1);
                if (res.status != null && (res.status == 200  || res.status == 201)) {
                    // alert(res.responseText);
                    $("#messages_content").show(); 
                } else {
                    alert("error message:"+ res.responseText )
                }
            } catch (error) {
                alert("error message: "+ res.responseText)
            }
        }
    })
    
}
    