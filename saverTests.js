// Test Save.
(function() {
    var downloadEvent = document.createEvent("CustomEvent");
    var bb = new WebKitBlobBuilder();
    bb.append("test");
    downloadEvent.initCustomEvent("DownloadComplete", false, true, 
     { blob: bb.getBlob("application/octet-stream"), url: "http://test.com"});
    document.dispatchEvent(downloadEvent);
})();