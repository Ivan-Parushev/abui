import { Injectable } from '@nestjs/common';
import { Subject, Observer, Subscription, Subscribable } from 'rxjs';
import autocannon, { Options } from 'autocannon';
import type { Response } from 'express';

type Clients = {
    id: number;
    response: Response;
};

let clients: Array<Clients> = [];
let facts: Array<string> = [];

@Injectable()
export class AppService {
    private _$benchmarkEvents = new Subject();

    startNewBenchmark(opts: Options) {
        let elapsedtime = 0;

        const instance = autocannon(
            {
                url: opts.url,
                method: opts.method,
                connections: 10, //default
                pipelining: 1, // default
                duration: 10, // default
                // setupClient: setupClient,
            },
            (err, result) => console.log('END'),
        );

        instance.on('start', () => {
            elapsedtime = Date.now();
            this._$benchmarkEvents.next({
                type: 'BENCH_START',
            });
        });

        instance.on('tick', () => {
            this._$benchmarkEvents.next({
                type: 'BENCH_TICK',
            });
        });

        instance.on('done', (result) => {
            elapsedtime = 0;
            this._$benchmarkEvents.next({
                type: 'BENCH_FINISH',
            });
            instance.removeAllListeners();
        });

        instance.on('response', (_, httpStatusCode: number, resBytes: number, resTime: number) => {
            this._$benchmarkEvents.next({
                type: 'BENCH_RESPONSE',
                httpStatusCode,
                responseSize: formatBytes(resBytes),
                responseTime: Math.ceil(resTime),
                elapsedTime: Date.now() - elapsedtime,
            });
        });
    }

    subscribeToBenchmarkEvents(obs) {
        return this._$benchmarkEvents.pipe().subscribe(obs);
    }
}

function formatBytes(bytes: number, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}
