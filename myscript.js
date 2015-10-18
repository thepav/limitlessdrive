var thebaselink  = "https://127.0.0.1:8080/";
var thelink = thebaselink+"upload";


// function handleFileSelectDragWrapper(evt){
//     evt.stopPropagation();
//     evt.preventDefault();
//     var files = evt.dataTransfer.files; // FileList object
//     handleFileSelect(evt,files)
// }
function handleFileSelectClickWrapper(evt){
    evt.stopPropagation();
    evt.preventDefault();

    $('#limitlessdrivefiles').submit();
   
    
}

//$('body').css("display","none");
function handleFileSelect(evt,files) {
    
    
    // files is a FileList of File objects. List some properties.
    var output = [];
    for (var i = 0, f; f = files[i]; i++) {
      output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
                  f.size, ' bytes, last modified: ',
                  f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a',
                  '</li>');
      

      var reader = new FileReader();

      // Closure to capture the file information.
      reader.onload = (function(theFile) {
        return function(e) {
          // Render thumbnail.

            // Define the string
            var string = e.target.result;

            // Encode the String
            var encodedString = window.btoa(string);

            // // Decode the String
            // var decodedString = Base64.decode(encodedString);
            // console.log(decodedString); 

            //alert(encodedString);
            $.ajax({
              type: "POST",
              url: thelink+'encoded',
              data: {'file':encodedString,'filename':theFile.name,'redirectUrl':window.location.href,'type':theFile.name.split('.')[1]},
              success: function(e){
                console.log('upload completed');
              },
            });
        };
      })(f);

      // Read in the image file as a data URL.
      reader.readAsBinaryString(f);
    }
}


$(document).ready(function(){
    console.log('hi');
    $(".a-mn-K").prepend("<form id='limitlessdrivefiles' style='display:none' method='post' enctype='multipart/form-data'  action='"+thelink+"'><input  style='display:none' type='file' id='files' name='file[]' multiple='' /> <input  style='display:none' type='text' name='redirectUrl' id='redirectUrlInput'></input> <input  style='display:none' type='submit'></input></form><div class='a-va-Qe fakeclass'><div id='clickmedoe' role='button' class='j-Ta-pb f-e f-e-dg a-Da-e' tabindex='0' aria-label='Fuck Google' guidedhelpid='new_menu_button' style='-webkit-user-select: none;' aria-expanded='false' aria-haspopup='true'><div class='j-Ta-pb f-e-og-aa'><div class='j-Ta-pb f-e-qb-aa'><div class='j-Ta-pb f-e-rf' aria-hidden='true'>Exploit Drive</div><div class='j-Ta-pb f-e-Tc'>&nbsp;</div></div></div></div></div>");
    $('.a-va-Qe').css('padding-top','10px');
    $('.a-va-Qe.fakeclass').css('padding-top','25px');
    $('#docs-branding-container').html("<img src='http://i.imgur.com/gS6VVGJ.png' style='width:100%;height:100%;cursor: pointer;cursor: hand; '></img>");
    $('#docs-branding-container').css('background-color','white');



    function handleDragOver(evt) {
        evt.stopPropagation();
        evt.preventDefault();
        evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
    }
    if ($('#files').length>0){
        document.getElementById('files').addEventListener('change', handleFileSelectClickWrapper, false);
        function clickFiles(){
            $('#redirectUrlInput').val(window.location.href);
            $('#files').click();
        }

        if($("#clickmedoe").length>0){
            // Setup the dnd listeners.
            var dropZone = document.getElementById('clickmedoe');
            // dropZone.addEventListener('dragover', handleFileSelectDragWrapper, false);
            // dropZone.addEventListener('drop', handleFileSelectDragWrapper, false);
            $("#clickmedoe").click(clickFiles);

        }
        if($("#drop_zone2").length>0){ 
            var dropZone = $('#drop_zone2');
            dropZone.click(clickFiles);
            $("#drop_zone2 p").click(clickFiles);
        }
           
    }

    $('#docs-branding-container').click(function(evt){
        evt.stopPropagation();
        evt.preventDefault();

        // https://docs.google.com/document/d/1FtbOQ9FaYeI8hzY8mIw-hIQKyKhS72jHOyA8WAjbmYY/edit
        var currentUrl = window.location.href;
        var urlList = currentUrl.split('/');
        //alert(urlList[urlList.length-2]);
        window.location.href = thebaselink+'download?id='+urlList[urlList.length-2];


    });
    // alert('asdf');
    // function submitDoe(event) {
    //     alert('starting submit');
    //     event.preventDefault();
    //     // Get the selected files from the input.
    //     var files = $('#files').files;
    //     // Create a new FormData object.
    //     var formData = new FormData();   
    //     // Loop through each of the selected files.
    //     for (var i = 0; i < files.length; i++) {
    //       var file = files[i];

    //       // Check the file type.
    //       if (!file.type.match('image.*')) {
    //         continue;
    //       }

    //       // Add the file to the request.
    //       formData.append('file', file, file.name);

            
    //     }
    //     formData.append("redirectUrl", window.location.href); 
    //     // Set up the request.
    //     var xhr = new XMLHttpRequest();
    //     // Open the connection.
    //     xhr.open('POST', thelink, true);
    //     // Set up a handler for when the request finishes.
    //     xhr.onload = function () {
    //       if (xhr.status === 200) {
    //         console.log('upload worked');
    //       } else {
    //         alert('An error occurred!');
    //       }
    //     };
    //     // Send the Data.
    //     xhr.send(formData);
    // }
    // $('#limitlessdrivefiles').submit(submitDoe);

});


