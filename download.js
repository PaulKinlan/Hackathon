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
  xhr.onheadersreceived = function() {
    if (xhr.status != 200) {
      alert("Bad file: http code " + xhr.status);
    } else {
      var startedEvent = document.createEvent('CustomEvent');
      startedEvent.initEvent('DownloadStarted', true, true, url);
      window.dispatchEvent(startedEvent);
      alert("Started");
    }
  };
  xhr.onprogress = function(progressEvent) {
    if (progressEvent.lengthComputable) {
      var loadingEvent = document.createEvent('CustomEvent');
      var percentDone = 100.0 * progressEvent.loaded.toPrecision(1) 
          / progressEvent.total.toPrecision(1);
      loadingEvent.initEvent('DownloadProgress', true, true, percentDone);
      window.dispatchEvent(progressEvent);
      alert(percentDone);
  }; 
  xhr.onloadend = function() {
    var bb = new window.BlobBuilder();
    bb.append(this.response);
    var pcast = new Podcast(bb.getBlob("application/octet-stream"), url);
    // fire event sending off the blob
    var completeEvent = document.createEvent('CustomEvent');
    completeEvent.initEvent('DownloadComplete', true, true, pcast);
    window.dispatchEvent(completeEvent);
    alert("Completed");
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