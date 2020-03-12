import client from './index'

client.cluster.health({}, (err, resp, status) => {
    console.log("-- Client Health --", resp);
});

client.count({ index: 'messages', type: 'constituencies' }, (err, resp, status) => {
    console.log("constituencies", resp);
});
