(function() {
  var onStarted = function(e) {
    alert(e.detail);
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
  
  download.addEventListener("DownloadStarted", onStarted);
  // Handle the download complete event.
  document.addEventListener("DownloadComplete", saveFile);
})();