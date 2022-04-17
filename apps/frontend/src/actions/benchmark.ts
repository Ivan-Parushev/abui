const serverAddress = 'http://localhost:3001';

export const startBenchmark = (httpMethod: string, targetUrl: string) => {
    return fetch(`${serverAddress}/benchmark`, {
        method: 'POST',
        body: JSON.stringify({ method: httpMethod, url: targetUrl }),
        headers: { 'Content-Type': 'application/json' },
    })
        .then((res) => res.json())
        .then((json) => console.log(json))
        .catch((err) => console.log(err));
};

export const stopBenchmark = () => {
    return fetch(`${serverAddress}/benchmark`, {
        method: 'DELETE',
    })
        .then((res) => console.log('Bench stopped: ', res.status))
        .catch((err) => console.log(err));
};

export const listenForBenchmarkEvents = () => {
    return new EventSource(`${serverAddress}/benchmark-events`);
};
