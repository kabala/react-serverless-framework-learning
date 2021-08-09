const fs = require('fs');
const path = require('path');

function handler(data, serverless, options) {
    console.log('Received Data', data)
    console.log('Received Options', options)

    let config = [
        `REACT_APP_BUCKET_NAME=${data.exampleBucketUrl}`,
        `VALUE=${2}`
    ].join('\n');

    fs.writeFileSync(path.join(__dirname, `../../.${options.stage}.env`), config);
}

module.exports = {handler}