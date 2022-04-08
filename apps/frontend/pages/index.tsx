import React, { useState, useEffect, useCallback } from 'react';
import type { NextPage } from 'next';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import ResponseTimeChart from '../src/ResponseTimeChart';
import CreateBenchForm from '../src/CreateBenchForm';
import Animation from '../src/Animation';

const Home: NextPage = () => {
    const [benchTick, setBenchTick] = useState(false);
    const [data, setData] = useState([]);
    const [scatterChartData, setScatterChartData] = useState([]);

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
                setData((prevData) => [...prevData, parsedData]);
            }
            if (parsedData.type === 'BENCH_TICK') {
                setBenchTick(true);
            }
        };
        return () => {
            eventSource.close();
        };
    }, []);

    return (
        <Container disableGutters>
            <CreateBenchForm />
            <Animation />
            <Paper variant="outlined">
                <Box sx={{ padding: 2, display: 'flex', alignItems: 'left' }}>
                    <ResponseTimeChart data={scatterChartData} />
                </Box>
            </Paper>
        </Container>
    );
};

export default Home;
