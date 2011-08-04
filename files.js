(function() {
  var listFiles = function(e) {
    function toArray(list) {
      return Array.prototype.slice.call(list || [], 0);
    }
    
    function listResults(entries) {
      // Document fragments can improve performance since they're only appended
      // to the DOM once. Only one browser reflow occurs.
      var fragment = document.createDocumentFragment();
      entries.forEach(function(entry, i) {
        var img = entry.isDirectory ? '<img src="folder-icon.gif">' : '<img src="file-icon.gif">';
        var li = document.createElement('li');
        li.innerHTML = [img, '<span>', entry.name, '</span>'].join('');
        fragment.appendChild(li);
      });
      document.querySelector('#filelist').appendChild(fragment);
    }

    function onInitFS(fs) {
      var dirReader = fs.root.createReader();
      var entries = [];
      // Call the reader.readEntries() until no more results are returned.
      var readEntries = function() {
        dirReader.readEntries(function(results) {
          if (!results.length) {
            listResults(entries.sort());
          } else {
            entries = entries.concat(toArray(results));
            readEntries();
          }
        }, fsError);
      };
      readEntries(); // Start reading dirs.
    }

    function fsError() {
      alert('error');
    }
    // Get access to the filesystem.
    window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
    var fs = window.requestFileSystem(window.PERSISTENT, 50 * 1024 * 1024 /*50MB*/ , onInitFS, fsError);
  };
  // Handle the download complete event.
  document.addEventListener("DownloadComplete", listFiles);
})();