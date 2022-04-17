import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export type BenchResponseEvent = {
    type: string;
    httpStatusCode: number;
    responseSize: string;
    responseTime: number;
    elapsedTime: number;
};

export type ResponseTimeChartProps = {
    data: BenchResponseEvent[];
};

const ResponseTimeChart = React.memo(({ data }: ResponseTimeChartProps) => {
    console.log('RENDER RESPONSE CHART');

    const randomColor = Math.floor(Math.random() * 16777215).toString(16);

    return (
        <Card variant="outlined" sx={{ padding: 2, margin: '16px 0px' }}>
            <Typography variant="h5">Response Time Chart</Typography>
            <CardContent>
                <ResponsiveContainer height={400}>
                    <ScatterChart>
                        <CartesianGrid />
                        <XAxis type="number" dataKey="elapsedTime" name="Elapsed Time" unit="s" />
                        <YAxis type="number" dataKey="responseTime" name="Response Time" unit="ms" />
                        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                        <Legend />
                        <Scatter name="RandomName" data={data} fill={randomColor} />
                    </ScatterChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
});

ResponseTimeChart.displayName = 'ResponseTimeChart';

export default ResponseTimeChart;
