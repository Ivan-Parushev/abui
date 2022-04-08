import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

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
    return (
        <ResponsiveContainer height={400}>
            <ScatterChart>
                <CartesianGrid />
                <XAxis type="number" dataKey="elapsedTime" name="stature" unit="s" />
                <YAxis type="number" dataKey="responseTime" name="Response Time" unit="ms" />
                {/* <ZAxis type="number" range={[100]} /> */}
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Legend />
                <Scatter name="RandomName" data={data} fill="#8884d8" line shape="circle" />
                {/* <Scatter name="B school" data={data02} fill="#82ca9d" line shape="diamond" /> */}
            </ScatterChart>
        </ResponsiveContainer>
    );
});

ResponseTimeChart.displayName = 'ResponseTimeChart';

export default ResponseTimeChart;
