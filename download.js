// take a download of binary blob, fire an event on completion

function download(url) {
  // code lifted from StackOverflow 
  
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.responseType = 'blob';
  xhr.setRequestHeader('Content-Type', 'application/octet-stream');
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var bb = new(window.BlobBuilder || window.WebKitBlobBuilder)();
      bb.append(this.response);
      var blob = bb.getBlob("application/octet-stream");
      // fire event sending off the blob
    }
  };
  xhr.send();
}