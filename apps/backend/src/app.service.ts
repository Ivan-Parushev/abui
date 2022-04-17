import { Injectable } from '@nestjs/common';
import { Subject } from 'rxjs';
import autocannon, { Options } from 'autocannon';
import type { Response } from 'express';
import { AutocannonMessageTypes } from 'messages';

type Clients = {
    id: number;
    response: Response;
};

let clients: Array<Clients> = [];
let facts: Array<string> = [];

@Injectable()
export class AppService {
    private _instance: autocannon.Instance;
    private _$benchmarkEvents = new Subject();

    startNewBenchmark(opts: Options) {
        let elapsedtime = 0;

        this._instance = autocannon(
            {
                url: opts.url,
                method: opts.method,
                connections: 10, //default
                pipelining: 1, // default
                duration: 10, // default
                // setupClient: setupClient,
            },
            (err, result) => {},
        );

        this._instance.on('start', () => {
            elapsedtime = Date.now();
            this._$benchmarkEvents.next({
                type: AutocannonMessageTypes.BENCH_START,
            });
        });

        this._instance.on('tick', () => {
            this._$benchmarkEvents.next({
                type: AutocannonMessageTypes.BENCH_TICK,
            });
        });

        this._instance.on('done', (result) => {
            elapsedtime = 0;
            this._$benchmarkEvents.next({
                type: AutocannonMessageTypes.BENCH_FINISH,
                payload: {
                    result,
                },
            });
            this._instance.removeAllListeners();
        });

        this._instance.on('response', (_, httpStatusCode: number, resBytes: number, resTime: number) => {
            this._$benchmarkEvents.next({
                type: AutocannonMessageTypes.BENCH_RESPONSE,
                payload: {
                    httpStatusCode,
                    responseSize: resBytes,
                    responseTime: Math.ceil(resTime),
                    elapsedTime: (Date.now() - elapsedtime) / 1000,
                },
            });
        });
    }
    stopBenchmark() {
        // This method actually exists
        // @ts-ignore: Issue with @types/autocannon
        this._instance.stop();
    }
    subscribeToBenchmarkEvents(obs) {
        return this._$benchmarkEvents.pipe().subscribe(obs);
    }
}
