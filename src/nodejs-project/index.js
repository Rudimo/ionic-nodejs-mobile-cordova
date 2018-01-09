'use strict';

const MongoClient = require('mongodb').MongoClient;
const tcpp        = require('tcp-ping');
const cordova     = require('cordova-bridge');

const log = (type, msg) => {

    cordova.channel.send(JSON.stringify({type, msg}));
};

process.on('uncaughtException', err => {

    console.log('NodeJS FATAL error!!!');
    console.log(err);

    throw err;
});

const mongoDBUri = `mongodb://test:test@ds247077.mlab.com:47077/nodejs-mobile-testing`;

cordova.channel.on('message', msg => {

    if (msg === 'connect-after-tcp-ping') {

        tcpp.probe('ds247077.mlab.com', 47077, (err, available) => {
            if (err) return log('error', err.message);

            log('debug', 'available [ds247077.mlab.com]: ' + available);

            connect();
        });

    } else if (msg === 'connect-without-tcp-ping') {

        connect();
    }
});

function connect() {

    MongoClient.connect(mongoDBUri, (err, client) => {
        if (err) return log('error', err.message);

        log(`debug`, `Connected correctly to server`);
    });
}