(function() {
    
    var ondrop = function(e) {
      
      if (e.stopPropagation) {
        e.stopPropagation();
      }
      
      var file;
      var files = e.dataTransfer.files;
      for(var i = 0; file = files[i]; i++) {
        var evt = document.createEvent('CustomEvent');
        evt.initCustomEvent('DownloadComplete', true, true, {
          blob: file,
          url: file.name
        });
        document.dispatchEvent(evt);
      }
      
      return false;
    };
    
    document.addEventListener("DOMContentLoaded", function() {
      document.body.addEventListener("dragover", function(e) {
        e.preventDefault(); 
        e.dataTransfer.dropEffect = 'move';
        return false;
      });
      document.body.addEventListener("drop", ondrop);
    });
})();