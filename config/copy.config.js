const defaultConfig = require('@ionic/app-scripts/config/copy.config');

defaultConfig['copyNodeJSApp'] = {
    src: ['{{SRC}}/nodejs-project/**/*'],
    dest: '{{WWW}}/nodejs-project'
};

module.exports = defaultConfig;