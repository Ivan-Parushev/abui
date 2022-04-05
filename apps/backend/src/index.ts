import autocannon, { Client } from 'autocannon';

const targetUrl = 'https://kube-nippon10-staging.playingops.com/';

const instance = autocannon(
    {
        url: targetUrl,
        connections: 10, //default
        pipelining: 1, // default
        duration: 10, // default
        // setupClient: setupClient,
    },
    (err, result) => console.log('END'),
);

autocannon.track(instance, { renderProgressBar: true });

instance.on('done', (result) => console.log(result));
instance.on('response', handleResponse);

function handleResponse(_client: Client, statusCode: number, resBytes: number, responseTime: number) {
    console.log(`Got response with code ${statusCode} in ${Math.ceil(responseTime)} milliseconds ${formatBytes(resBytes)}`);
}

function formatBytes(bytes: number, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}
