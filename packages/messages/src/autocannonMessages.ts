export enum AutocannonMessageTypes {
    BENCH_START = '@AC/BENCH_START',
    BENCH_RESPONSE = '@AC/BENCH_RESPONSE',
    BENCH_TICK = '@AC/BENCH_TICK',
    BENCH_FINISH = '@AC/BENCH_FINISH',
}
export type AutocannoBenchResult = {
    url: string;
    '1xx': number;
    '2xx': number;
    '3xx': number;
    '4xx': number;
    '5xx': number;
    connections: number;
    duration: number;
    errors: number;
    finish: string; // datetime string
    start: string; // datetime string
    mismatches: number;
    non2xx: number;
    pipelining: number;
    resets: number;
    sampleInt: number;
    samples: number;
    timeouts: number;
    latency: LatencyResponseStats; // in milliseconds
    requests: RequestsResponseStats;
    throughput: ThroughputResponseStats; // bytes per second
};

interface ResponseStats {
    average: number;
    max: number;
    mean: number;
    min: number;
    p0_001: number;
    p0_01: number;
    p0_1: number;
    p1: number;
    p2_5: number;
    p10: number;
    p25: number;
    p50: number;
    p75: number;
    p90: number;
    p97_5: number;
    p99: number;
    p99_9: number;
    p99_99: number;
    p99_999: number;
    stddev: number;
}

interface LatencyResponseStats extends ResponseStats {
    totalCount: number;
}

interface RequestsResponseStats extends ResponseStats {
    total: number;
}

interface ThroughputResponseStats extends ResponseStats {
    total: number;
}

export type AutocannonBenchFinish = {
    type: AutocannonMessageTypes.BENCH_FINISH;
    payload: {
        result: AutocannoBenchResult;
    };
};

export type AutocannonBenchStart = {
    type: AutocannonMessageTypes.BENCH_START;
};

export type AutocannonBenchResponse = {
    type: AutocannonMessageTypes.BENCH_RESPONSE;
    payload: {
        httpStatusCode: number;
        responseSize: number;
        responseTime: number;
        elapsedTime: number;
    };
};

export type AutocannonBenchTick = {
    type: AutocannonMessageTypes.BENCH_TICK;
};

export type AutocannonMessage = AutocannonBenchStart | AutocannonBenchTick | AutocannonBenchResponse | AutocannonBenchFinish;
