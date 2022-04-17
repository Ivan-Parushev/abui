import type { AutocannoBenchResult, ResponseStats } from 'messages';
import { BenchmarkResultTableData } from './BenchmarkSummaryTable';
import { formatBytes, formatMs } from './../utils';

export const createBenchmarkSummaryFromResultData = (benchmarkResult: AutocannoBenchResult): BenchmarkResultTableData => {
    const rows = new Map();

    rows.set('Latency', getRow(benchmarkResult.latency, formatMs));
    rows.set('Req/Sec', getRow(benchmarkResult.requests));
    rows.set('Bytes/Sec', getRow(benchmarkResult.throughput, formatBytes));

    return {
        header,
        rows,
    };
};

const header = ['Stat', '1%', '2.5%', '50%', '97.5%', '99%', 'Avg', 'Stdev', 'Max'];
const getRow = (stat: ResponseStats, formatter?: Function) => {
    const { p1, p2_5, p50, p97_5, p99, average, stddev, max } = stat;
    if (formatter && typeof formatter === 'function') {
        return [
            formatter(p1),
            formatter(p2_5),
            formatter(p50),
            formatter(p97_5),
            formatter(p99),
            formatter(average),
            formatter(stddev),
            formatter(max),
        ];
    }
    return [p1, p2_5, p50, p97_5, p99, average, stddev, max];
};
