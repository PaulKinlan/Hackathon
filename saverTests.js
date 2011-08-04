// Test Save.
(function() {
    var downloadEvent = document.createEvent("CustomEvent");
    var bb = new WebKitBlobBuilder();
    bb.append("test");
    downloadEvent.initCustomEvent("DownloadComplete", false, true, 
     { blob: bb.getBlob("audio/mp3"), url: "http://test.com"});
    document.dispatchEvent(downloadEvent);
})();