import React, { useState, useEffect, useCallback } from 'react';
import type { NextPage } from 'next';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import ResponseTimeChart from '../src/ResponseTimeChart';
import BenchmarkControlls from '../src/BenchmarkControlls';
import Animation from '../src/Animation';
import StatsContainer from '../src/StatsContainer';
import BenchmarkResultsTable from '../src/BenchmarkResultsTable';
import { startBenchmark, stopBenchmark } from './../src/actions';

const Home: NextPage = () => {
    const [benchIsLoading, setBenchLoading] = useState(false);
    const [benchTick, setBenchTick] = useState(false);
    const [data, setData] = useState([]);
    const [scatterChartData, setScatterChartData] = useState([]);
    const [totalRequests, setTotalRequests] = useState(0);
    const [totalBytes, setTotalBytes] = useState(0);
    const [total200Res, setTotal200Res] = useState(0);
    const [total300Res, setTotal300Res] = useState(0);
    const [total400Res, setTotal400Res] = useState(0);
    const [total500Res, setTotal500Res] = useState(0);

    const handleBenchReset = useCallback(() => {
        setTotalBytes(0);
        setTotalRequests(0);
        setTotal200Res(0);
        setTotal300Res(0);
        setTotal400Res(0);
        setTotal500Res(0);
        setData([]);
        setScatterChartData([]);
        setBenchTick(false);
        setBenchLoading(false);
    }, []);

    const handleBenchTick = useCallback(() => {
        if (benchTick) {
            setScatterChartData([...data]);
        }
    }, [data, benchTick]);

    useEffect(() => {
        if (benchTick) {
            handleBenchTick();
            setBenchTick(false);
        }
    }, [benchTick, handleBenchTick]);

    useEffect(() => {
        const eventSource = new EventSource('http://localhost:3001/benchmark-events');
        eventSource.onmessage = (event) => {
            // console.log(event.data);
            const parsedData = JSON.parse(event.data);
            if (parsedData.type === 'BENCH_RESPONSE') {
                setTotalRequests((prev) => ++prev);
                setTotalBytes((prev) => prev + parsedData.payload.responseSize);
                const responseCode = parseInt(String(parsedData.payload.httpStatusCode)[0]);
                if (responseCode === 2) {
                    setTotal200Res((prev) => ++prev);
                }
                if (responseCode === 3) {
                    setTotal300Res((prev) => ++prev);
                }
                if (responseCode === 4) {
                    setTotal400Res((prev) => ++prev);
                }
                if (responseCode === 5) {
                    setTotal500Res((prev) => ++prev);
                }
                setData((prevData) => [...prevData, parsedData.payload]);
            }
            if (parsedData.type === 'BENCH_TICK') {
                setBenchTick(true);
            }
            if (parsedData.type === 'BENCH_START') {
                setBenchLoading(true);
            }
            if (parsedData.type === 'BENCH_FINISH') {
                console.log(parsedData.payload);
                setBenchLoading(false);
            }
        };
        return () => {
            eventSource.close();
        };
    }, []);

    return (
        <Container disableGutters>
            <BenchmarkControlls
                benchLoading={benchIsLoading}
                onBenchStart={startBenchmark}
                onBenchStop={stopBenchmark}
                onBenchClear={handleBenchReset}
            />
            <Animation />
            <StatsContainer
                totalBytes={totalBytes}
                totalReq={totalRequests}
                total200Res={total200Res}
                total300Res={total300Res}
                total400Res={total400Res}
                total500Res={total500Res}
            />
            <Paper variant="outlined">
                <Box sx={{ padding: 2, display: 'flex', alignItems: 'left' }}>
                    <ResponseTimeChart data={scatterChartData} />
                </Box>
            </Paper>
            <BenchmarkResultsTable />
        </Container>
    );
};

export default Home;
