function handleFileSelectDragWrapper(evt){
    evt.stopPropagation();
    evt.preventDefault();
    var files = evt.dataTransfer.files; // FileList object
    handleFileSelect(evt,files)
}
function handleFileSelectClickWrapper(evt){
    evt.stopPropagation();
    evt.preventDefault();
    var files = evt.target.files; // FileList object
    handleFileSelect(evt,files)
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

            // Create Base64 Object
            var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}

            // Define the string
            var string = e.target.result;;

            // Encode the String
            var encodedString = Base64.encode(string);
            console.log(encodedString); 

            // // Decode the String
            // var decodedString = Base64.decode(encodedString);
            // console.log(decodedString); 

            alert(encodedString);
        };
      })(f);

      // Read in the image file as a data URL.
      reader.readAsBinaryString(f);
    }
}


$(document).ready(function(){
    console.log('hi');
    $(".a-mn-K").prepend("<input style='display:none' type='file' id='files' name='files[]' multiple /><div class='a-va-Qe fakeclass'><div id='clickmedoe' role='button' class='j-Ta-pb f-e f-e-dg a-Da-e' tabindex='0' aria-label='Fuck Google' guidedhelpid='new_menu_button' style='-webkit-user-select: none;' aria-expanded='false' aria-haspopup='true'><div class='j-Ta-pb f-e-og-aa'><div class='j-Ta-pb f-e-qb-aa'><div class='j-Ta-pb f-e-rf' aria-hidden='true'>Fuck Drive</div><div class='j-Ta-pb f-e-Tc'>&nbsp;</div></div></div></div></div>");
    $('.a-va-Qe').css('padding-top','10px');
    $('.a-va-Qe.fakeclass').css('padding-top','25px');


    function handleDragOver(evt) {
        evt.stopPropagation();
        evt.preventDefault();
        evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
    }

    document.getElementById('files').addEventListener('change', handleFileSelectClickWrapper, false);
    function clickFiles(){
        // alert('clicked!');
        $('#files').click();
    }
    // Setup the dnd listeners.
    var dropZone = document.getElementById('clickmedoe');
    dropZone.addEventListener('dragover', handleFileSelectDragWrapper, false);
    dropZone.addEventListener('drop', handleFileSelectDragWrapper, false);

    
    $("#clickmedoe").click(clickFiles);

});