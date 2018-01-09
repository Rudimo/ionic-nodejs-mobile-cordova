'use strict';

const MongoClient = require('mongodb').MongoClient;
const tcpp        = require('tcp-ping');
const cordova     = require('cordova-bridge');

const log = (type, msg) => {

    msg = new Date().toTimeString() + ': ' + msg;

    cordova.channel.send(JSON.stringify({type, msg}));
};

process.on('uncaughtException', err => {

    console.log('NodeJS FATAL error!!!');
    console.log(err);

    throw err;
});

// const mongoDBUri = `mongodb://test:test@ds247077.mlab.com:47077/nodejs-mobile-testing`;
// const host = 'ds247077.mlab.com';
// const port = 47077;

const mongoDBUri = `mongodb://192.168.1.36:27025/admin`;
const host       = '192.168.1.36';
const port       = 27025;

cordova.channel.on('message', msg => {

    if (msg === 'connect-after-tcp-ping') {

        tcpp.probe(host, port, (err, available) => {
            if (err) return log('error', err.message);

            log('debug', `Available [${host}:${port}]: ` + available);

            connect();
        });

    } else if (msg === 'connect-with-set-immediate') {

        setImmediate(connect);

    } else if (msg === 'connect-without-tcp-ping') {

        connect();
    }
});

function connect() {

    log('debug', 'Connecting: ' + mongoDBUri);

    MongoClient.connect(mongoDBUri, (err, client) => {
        if (err) return log('error', err.message);

        log(`debug`, `Connected correctly to server`);
    });
}