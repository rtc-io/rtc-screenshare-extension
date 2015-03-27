var extend = require('cog/extend');
var extension = require('chromex')({
  manifest: require('./manifest.json')
});

// handle share events
extension.on('share', function(opts, port, callback) {
  var targets = (opts || {}).targets || ['window', 'screen'];

  chrome.desktopCapture.chooseDesktopMedia(targets, port.sender.tab, function(id) {
    if (chrome.runtime.lastError) {
      return callback(new Error(chrome.runtime.lastError.message));
    }

    callback(null, id);
  });
});