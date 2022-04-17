import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

export type BenchmarkResultTableData = {
    header: string[];
    rows: Map<string, Array<number | string>>;
};

export type BenchmarkResultsTableProps = {
    loading: boolean;
    data: BenchmarkResultTableData;
};

export const BenchmarkSummaryTable = React.memo(({ loading, data }: BenchmarkResultsTableProps) => {
    console.log('RENDER BENCH TABLE');
    const { header, rows } = data;

    if (!header || !header.length) return null;

    const tableHeader = (
        <TableHead>
            <TableRow>
                {header.map((tableH, i) => (
                    <TableCell key={i} align={i === 0 ? 'left' : 'right'}>
                        {tableH}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );

    const tableBody = (
        <TableBody>
            {Array.from(rows.keys()).map((key) => (
                <TableRow key={key} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                        {key}
                    </TableCell>
                    {rows.get(key).map((val, i) => (
                        <TableCell key={i} align="right">
                            {val}
                        </TableCell>
                    ))}
                </TableRow>
            ))}
        </TableBody>
    );

    return (
        <Card variant="outlined">
            <CardContent>
                <Typography variant="h5">Benchmark Summary</Typography>
                <TableContainer>
                    <Table aria-label="simple table">
                        {tableHeader}
                        {tableBody}
                    </Table>
                </TableContainer>
            </CardContent>
        </Card>
    );
});

BenchmarkSummaryTable.displayName = 'BenchmarkSummaryTable';
