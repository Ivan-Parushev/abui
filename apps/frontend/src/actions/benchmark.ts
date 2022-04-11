export const startBenchmark = (httpMethod: string, targetUrl: string) => {
    return fetch('http://localhost:3001/benchmark', {
        method: 'POST',
        body: JSON.stringify({ method: httpMethod, url: targetUrl }),
        headers: { 'Content-Type': 'application/json' },
    })
        .then((res) => res.json())
        .then((json) => console.log(json))
        .catch((err) => console.log(err));
};

export const stopBenchmark = () => {
    return fetch('http://localhost:3001/benchmark', {
        method: 'DELETE',
    })
        .then((res) => console.log('Bench stopped: ', res.status))
        .catch((err) => console.log(err));
};
