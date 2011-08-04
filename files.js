(function() {
  var listFiles = function(e) {
      
     
function onInitFs(fs) {

  var dirReader = fs.root.createReader();
  var entries = [];

  // Call the reader.readEntries() until no more results are returned.
  var readEntries = function() {
     dirReader.readEntries (function(results) {
      if (!results.length) {
        listResults(entries.sort());
      } else {
        entries = entries.concat(toArray(results));
        readEntries();
      }
    }, errorHandler);
  };

  readEntries(); // Start reading dirs.

}
     
     // Get access to the filesystem.
     window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;
     var fs = window.requestFileSystem(window.PERSISTENT, 50*1024*1024 /*50MB*/, 
       onInitFS, fsError);
  };
  
  // Handle the download complete event.
  document.addEventListener("DownloadComplete", listFiles);
})();