(function() {
  var showFile = function(e) {
    var url = window.btoa(e.detail);
    // Document fragments can improve performance since they're only appended
    // to the DOM once. Only one browser reflow occurs.
    var fragment = document.createDocumentFragment();
    var img = '<img src="file-icon.gif">';
    var li = document.createElement('li');
    li.innerHTML = [img, '<span>', url, '</span>'].join('');
    fragment.appendChild(li);
    document.querySelector('#download_list').appendChild(fragment);
  };
  
  var onProgress = function(e) {
    alert("Download " + e.detail + "% complete");
  };
  
  var saveFile = function(e) {
     var blob = e.detail.blob;
     var url = window.btoa(e.detail.url);
     
     var fsError = function (errorEvent) {
       alert("save error");
     };
     
     var getFileError = function (errorEvent) {
       alert("getFile error");
     };
     
     var onInitFS = function(eFs) {
        eFs.root.getFile(url, 
           {create: true, exclusive: false}, function(fileEntry) {
           fileEntry.createWriter(function(writer) {
                writer.onwriteend = function() {
                   // Tell the world we are done.
                   var savedEvent = document.createEvent("CustomEvent");
                   savedEvent.initCustomEvent("SaveComplete", false, true, url);
                   document.dispatchEvent(savedEvent);
                };
                
               writer.write(blob);
           });

        }, getFileError);
     };
     
     // Get access to the filesystem.
     window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;
     var fs = window.requestFileSystem(window.PERSISTENT, 50*1024*1024 /*50MB*/, 
       onInitFS, fsError);
  };
  
  document.addEventListener("DownloadStarted", showFile);
  document.addEventListener("DownloadProgress", onProgress);
  // Handle the download complete event.
  document.addEventListener("DownloadComplete", saveFile);
})();
