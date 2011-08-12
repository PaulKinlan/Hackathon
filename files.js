(function() {
  var listFiles = function(e) {
      
function toArray(list) {
  return Array.prototype.slice.call(list || [], 0);
}

function playAudio(file) {
    var audio_id = document.getElementById('hackathon_audio');


    var reader = new FileReader();

    file.file(function(f) {
      var audio_source = file.toURL();
      audio_id.src = audio_source;
      audio_id.load();
      audio_id.play();    
    });


}

function listResults(entries) {
  // Document fragments can improve performance since they're only appended
  // to the DOM once. Only one browser reflow occurs.
  var fragment = document.createDocumentFragment();
  var list = document.querySelector('#filelist');
  list.innerHTML = "";

  entries.forEach(function(entry, i) {
    var img = entry.isDirectory ? '<img src="folder-icon.gif">' :
                                  '<img src="file-icon.gif">';
    // Remove from loading list
    var oldli = document.getElementById(entry.name);
    if (oldli != null) {
      document.querySelector("#loadinglist").removeChild(oldli);
    }
    var li = document.createElement('li');
    li.innerHTML = [img, '<span>', window.atob(entry.name), '</span>'].join('');
    li.addEventListener("click", (function(fileentry) {
        return function(){
            playAudio(fileentry);
        };
    })(entry));
    fragment.appendChild(li);
  });

  document.querySelector('#filelist').appendChild(fragment);
}      
     
function onInitFS(fs) {

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
    }, fsError);
  };

  readEntries(); // Start reading dirs.

}
     function fsError(){
         alert('eror');
         }
     // Get access to the filesystem.
     window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;
     var fs = window.requestFileSystem(window.PERSISTENT, 50*1024*1024 /*50MB*/, 
       onInitFS, fsError);
  };
  
  // Handle the download complete event.
  document.addEventListener("SaveComplete", listFiles);
  document.addEventListener("DOMContentLoaded", listFiles);
})();
