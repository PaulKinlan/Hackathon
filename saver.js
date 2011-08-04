(function() {
  var saveFile = function(e) {
     var blob = e.data.blob;
     var url = e.data.url;
     var onerror = function () {
       alert("save error");
     };
     
     var onInitFS = function(eFs) {
        fs.root.getFile(url, 
           {create: true, exclusive: true}, function(fileEntry) {
           fileEntry.createWriter(function(writer) {
                writer.onwriteend = function() {
                   // Tell the world we are done.
                   var savedEvent = document.createEvent("Event");
                   savedEvent.initCustomEvent("SaveComplete", false, true, url);
                   document.dispatchEvent(savedEvent);
                };
           });

        }, errorHandler);
     };
     
     // Get access to the filesystem.
     var fs = window.requestFileSystem(window.PERSISTENT, 50*1024*1024 /*50MB*/, 
       onInitFs);
  };
  
  // Handle the download complete event.
  document.addEventListener("DownloadComplete", saveFile);
})();