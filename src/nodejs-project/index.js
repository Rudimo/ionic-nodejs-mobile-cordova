const MongoClient = require('mongodb').MongoClient;
const tcpp = require('tcp-ping');

const cordova = require('cordova-bridge');

process.on('uncaughtException', err => {

    // TODO: Report this error
    console.log('NodeJS FATAL error!!!');
    console.log(err);

    throw err;
});

cordova.channel.on('message', function (msg) {

    const mongoDBUri = '';

    const options = {
        validateOptions: true,
        ssl: true,
        reconnectTries: 1,
        poolSize: 1
    };

    MongoClient.connect(mongoDBUri, options, (err, client) => {
        if (err) return log('error', err.message);

        log(`debug`, `Connected correctly to server`);

        this.client = client;

        const adminDb = this.client.db('admin').admin();

        adminDb.buildInfo((err, info) => {
            if (err) return callback(err);

            log(`debug`, `mongoDB version: ${info.version}`);
        });
    });
});

log = function (type, msg) {
    cordova.channel.send(JSON.stringify({
        type,
        msg
    }));
};

setTimeout(() => {

    // tcpp.probe('google.com', 80, (err, available) => {
    //     if (err) return log('error', err.message);
    //
    //     log('debug', 'available [google.com]: ' + available);
    // });

}, 5000);