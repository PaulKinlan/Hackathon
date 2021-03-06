// take a download of binary blob, fire an event on completion
window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder;

function Podcast(blob, url) {
  this.blob = blob;
  this.url = url;
}

function download(url) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.responseType = 'arraybuffer';
  xhr.onreadystatechange = function() {
    if (xhr.readyState >= 2 && xhr.status != 200) {
      alert("Bad file: http code " + xhr.status);
    } else if (xhr.readyState == 2) {
      var startedEvent = document.createEvent('CustomEvent');
      startedEvent.initCustomEvent('DownloadStarted', true, true, url);
      document.dispatchEvent(startedEvent);
    } else if (xhr.readyState == 4) {
      var bb = new window.BlobBuilder();
      bb.append(this.response);
      var pcast = new Podcast(bb.getBlob("audio/mpeg"), url);
      // fire event sending off the blob
      var completeEvent = document.createEvent('CustomEvent');
      completeEvent.initCustomEvent('DownloadComplete', true, true, pcast);
      document.dispatchEvent(completeEvent);
    }
  };
  xhr.onprogress = function(progressEvent) {
    var percentDone = "unknown";
    if (progressEvent.lengthComputable) {
       percentDone = 100.0 * progressEvent.loaded.toPrecision(1) /
          progressEvent.total.toPrecision(1);
    }
    var loadingEvent = document.createEvent('CustomEvent');
    loadingEvent.initCustomEvent('DownloadProgress', true, true, percentDone);
    document.dispatchEvent(loadingEvent);
  };
  xhr.send();
}

function startDownload() {
  download(document.getElementById("file_uri").value);
}

function pressUriKey() {
  if (window.event.keyCode == 13) {
    startDownload();
    window.event.preventDefault();
    return false;
  } else {
    document.getElementById("pbar").value = "0";
  }
}
