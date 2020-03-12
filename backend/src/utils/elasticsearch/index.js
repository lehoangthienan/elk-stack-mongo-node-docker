import elasticsearch from 'elasticsearch'

import configs from '../../configs'

var client = new elasticsearch.Client({
    hosts: [configs.ELASTIC_HOST],
    log: configs.ELASTIC_LOG,
    apiVersion: configs.ELASTIC_VERSION,
});

client.ping({
    requestTimeout: 3000
}, function (error) {
    if (error) {
        console.trace('Elasticsearch cluster is down!');
    } else {
        console.log('All is well');
    }
});

export default client
