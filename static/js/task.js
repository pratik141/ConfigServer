
function checkNull(data) {
  if (data == '') {
      alert("Value cant be null");
    }
}

function submitComment(){  
  
  var postData;
  var selected  = new Array();
  var username  = $("#username").val();
  var priority  = $("#priority").val();
  var message   = $("#message").val();
  var issueType = $("#issueType").val();
  var heading   = $("#heading").val();


   $("input:checkbox[name=group]:checked").each(function() {
    selected.push($(this).val());
  });

  postData = {
      "username"  : username,
      "priority"  : priority,
      "heading"   : heading,
      "message"   : message,
      "comment"   : 'null',
      "issueId"   : 'null',
      "issueType" : issueType
  };

  if (username == '' || priority == ''|| message == '' || issueType == '' || heading == '') {
    alert("Value cant be null");
  } 
  else{
  
  callAjax(postData);  
  }

  
  
}
  
  function addComment(id) {
    var postCommentData;  
    var comment   = $("#comment").val();
    var username  = '@Session["UserName"]';

    postCommentData = {
      "username"  : username,
      "issueId"   : id,
      "comment"   : comment,
      "priority"  : 'null',
      "heading"   : 'null',
      "message"   : 'null',
      "issueType" : 'null'

  }
  if (comment == '') {
    alert("Value cant be null");
  } 
  else {
    callAjax(postCommentData,'comment')
  }
   

  };
  
function callAjax(data) {

  var hostname = window.location.hostname
  var port = window.location.port

  $.ajax({
    type : 'POST',
    url : "http://"+ hostname +":"+ port +"/postissue/",
    contentType : "application/json",
    data : JSON.stringify(data),
    dataType : 'json',
    complete : function(res) {
      try {
        if (res.status != null && res.status == 200) {
          alert("Response:" + res.responseText);
          window.location.reload();
        } else {
          alert("error message:")
        }
      } catch (error) {
        alert("error message:")
      }
    }
  })
}

$(document).ready(function() {
    $('#example').DataTable( {
        "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]]
    } );
} );



function appendRow(id) {
  var d = document.getElementById('div');
  
  var gid = document.getElementById('comment');
  if (gid) {
    // alert("ALREADY")
    // addComment(id)
    $('#comment').remove();
    $('#aa').remove();
    
  } else {

  d.innerHTML += "<textarea id='comment' class='ReachUsForm_messageBox1'name='comment' style='float: right; width:25%; height: 20%;' ;></textarea>";
  d.innerHTML += "<button onclick ='addComment(id)' style='float: right;' id=`id` value='post'> Post </button><br>";
  document.getElementById("CommentbuttonID").innerText = 'Close' ;
// "<textarea id='comment' class='ReachUsForm_messageBox1'name='comment' style='float: right; width:25%; height: 20%;' ;></textarea>";
  }

}

