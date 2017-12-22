var fileoption;

var pathArray  = window.location.pathname.split( '/' );
var hostname   = window.location.hostname
var port       = window.location.port



// function for /deploy
function generateProp(){

  var bname = $("#project").val();
  var fileoption = $("input[name='fileoption']:checked").val();
  var filename   = document.getElementById("filename").value ;  
  var filedata   = document.getElementById("filedata").value ;  
  
  var x = document.getElementById("myFile");
  var txt = "";
  if ('files' in x) {
      if (x.files.length == 0) {
          txt = "Select one or more files.";
      } else {
          for (var i = 0; i < x.files.length; i++) {
              txt += "<br><strong>" + (i+1) + ". file</strong><br>";
              var file = x.files[i];
              if ('name' in file) {
                  txt += "name: " + file.name + "<br>";
              }
              if ('size' in file) {
                  txt += "size: " + file.size + " bytes <br>";
              }
          }
      }
  } 

  if (filedata == "" ) {
    document.getElementById("filedata").style.borderBottomColor = "red"; 
    return
  }
  
  var div1 = document.createElement('div');
  var img = document.createElement('img');
  img.src = 'static/images/spinner.gif';
  div1.innerHTML = "Loading...<br />";
  div1.style.cssText = 'position: fixed; top: 26%; left: 68%;';
  div1.appendChild(img);
  document.body.appendChild(div1);

  var postData;
  
  postData = {
      "buildName" : bname
      
  };

  $.ajax({
    type : 'POST',
    url : "http://"+ hostname + ":" + port + "/deploy",
    contentType : "application/json",
    data : JSON.stringify(postData),
    dataType : 'json',
    complete : function(res) {
      try {
        document.body.removeChild(div1);
        if (res.status != null && (res.status == 200  || res.status == 201)) {
           alert(res.responseText);
          $("#messages_content").show(); 
        } else if (res.status != null && (res.status == 400  || res.status == 404)) {
          alert("message:"+ res.responseText )
        }
        else {
          alert("error: some thing went wrong :(")
        }
      } catch (error) {
        alert("error: some thing went wrong :(")
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


function sendRequest() {
 
  var filename  = document.getElementById("filelistid").value ;  
  var filedata  = document.getElementById("filedataid").value ;
  var splitter  = document.getElementById("splitterid").value ;
  var separator = document.getElementById("separatorid").value ;

  if (filename == "" ) {
    document.getElementById("filelistid").style.borderBottomColor = "red"; 
    return
  } 
  else{
    document.getElementById("filelistid").style.borderBottomColor = "grey"; 
  }
  
  if (splitter == "splitter" ) {
    document.getElementById("splitterid").style.borderBottomColor = "red"; 
    return
  }
  else {
    document.getElementById("splitterid").style.borderBottomColor = "grey"; 
  }
  
  var imgdiv = document.createElement('div');
  var img = document.createElement('img');
  img.src = 'static/images/spinner.gif';
  imgdiv.innerHTML = "Loading...<br />";
  imgdiv.style.cssText = 'position: fixed; top: 26%; left: 68%;';
  imgdiv.appendChild(img);
  document.body.appendChild(imgdiv);


// http://0.0.0.0:8070/frm/?filename=str&filedata=str

  window.location="http://"+ hostname + ":" + port +
      "/frm/?filename=" +filename +
      "&filedata=" + filedata +
      "&splitter=" + splitter +
      "&separator=" + separator ;

   window.onload = function() {
     document.body.removeChild(imgdiv);
    }   
}

// Function to add mail id from text area

function addFileDataBox() {
  document.getElementById("datacheckboxid").value = 'True' ;
  var d = document.getElementById('databoxdiv');
  
  var gid = document.getElementById('filedata');
  if (gid) {
    $('#filedata').remove();
    document.getElementById("datacheckboxid").value = 'False' ;    
  } else {
  d.innerHTML += "<textarea id='filedata' class='ReachUsForm_messageBox1'name='filedata' width:25%; height: 20%;' ;></textarea>";
  }
}

//  Function to set Show Option html or download
function setFileOption() {
  var posid = document.getElementById("fileoption").value
  if ( posid == 'download') {
    document.getElementById("fileoption").value = 'html' ;
    document.getElementById("fileoption").innerText = 'Add' ;
  } else {
    document.getElementById("fileoption").value = 'download' ;
    document.getElementById("fileoption").innerText = 'Add' ;
  }

}

function Overwrite() {
  var o = document.getElementById("overwritecheckboxid") 
  if (o.value == 'False') {
    o.value = 'True';
  }
  else{
   o.value = 'False'
  }
}

