var extend = require('cog/extend');
var extension = require('chromex')({
  manifest: require('./manifest.json')
});

// register the last request id
var lastRequestId;

// handle share events
extension.on('share', function(opts, port, callback) {
  var targets = (opts || {}).targets || ['window', 'screen'];

  // attempt to capture desktop media
  lastRequestId = chrome.desktopCapture.chooseDesktopMedia(
    targets,
    port.sender.tab,
    function(id) {
      if (chrome.runtime.lastError) {
        return callback(new Error(chrome.runtime.lastError.message));
      }

      callback(null, id);
    }
  );
});

extension.on('cancel', function(opts, port, callback) {
  if (! lastRequestId) {
    return callback(new Error('no media has not been requested'));
  }
  
  chrome.desktopCapture.cancelChooseDesktopMedia(lastRequestId);
  callback();
});
