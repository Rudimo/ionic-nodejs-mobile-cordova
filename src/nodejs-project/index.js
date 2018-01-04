const cordova = require('cordova-bridge');

process.on('uncaughtException', err => {

    // TODO: Report this error
    console.log('NodeJS FATAL error!!!');
    console.log(err);

    throw err;
});

cordova.channel.on('message', function (msg) {
    console.log('[node] received:', msg);
    cordova.channel.send('Replying to this message: ' + msg);
});