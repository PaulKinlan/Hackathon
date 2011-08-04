// take a download of binary blob, fire an event on completion

window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder;

function Podcast(blob, url) {
  this.blob = blob;
  this.url = url;
}

function download(url) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.responseType = 'blob';
  xhr.setRequestHeader('Content-Type', 'application/octet-stream');
  xhr.onreadystatechange = function() {
   if (xhr.readyState >=3 && xhr.status != 200) {
     alert("Bad file: http code " + xhr.status);
   } else if (xhr.readyState == 3) {
      // Receiving
      var startedEvent = document.createEvent('CustomEvent');
      startedEvent.initEvent('DownloadStarted', true, true, url);
      window.dispatchEvent(startedEvent);
   } else if (xhr.readyState == 4 && xhr.status == 200) {
      // Complete
      var bb = new window.BlobBuilder();
      bb.append(this.response);
      var pcast = new Podcast(bb.getBlob("application/octet-stream"), url);
      // fire event sending off the blob
      var completeEvent = document.createEvent('CustomEvent');
      completeEvent.initEvent('DownloadComplete', true, true, pcast);
      window.dispatchEvent(completeEvent);
    }
  };
  xhr.send();
}

function pressUriKey() {
  if (window.event.keyCode == 13) {
    download(document.getElementById("file_uri").value);
    window.event.preventDefault();
    return false;
  }
}
