import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

const httpMethods = [
    {
        value: 'GET',
        label: 'GET',
    },
    {
        value: 'POST',
        label: 'POST',
    },
];

export type BenchmarkControllsProps = {
    benchLoading: boolean;
    onBenchStart: (httpMethod: string, targetUrl: string) => void;
    onBenchStop?: Function;
    onBenchClear?: Function;
};

const BenchmarkControlls = React.memo(({ benchLoading, onBenchStart, onBenchStop, onBenchClear }: BenchmarkControllsProps) => {
    console.log('RENDER BENCH FORM');
    const [httpMethod, setHttpMethod] = useState('GET');
    const [targetUrl, setTargetUrl] = useState('');

    const handleHttpMethodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setHttpMethod(event.target.value);
    };

    const handleTargetUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTargetUrl(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onBenchStart(httpMethod, targetUrl);
    };

    const handleBenchStop = () => {
        onBenchStop();
    };

    const handleBenchClear = () => {
        setTargetUrl('');
        onBenchClear();
    };

    return (
        <Box
            component="form"
            // noValidate
            onSubmit={handleSubmit}
            autoComplete="off"
            mt={2}
            mb={2}
        >
            {/* <TextField id="outlined-error" label="Title" /> */}
            <Grid container direction="row" columnSpacing={1} rowGap={1}>
                <Grid item>
                    <TextField
                        value={httpMethod}
                        onChange={handleHttpMethodChange}
                        id="outlined-error-helper-text"
                        required
                        size="small"
                        select
                    >
                        {httpMethods.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs={9} md={6}>
                    <TextField
                        value={targetUrl}
                        onChange={handleTargetUrlChange}
                        id="outlined-error-helper-text"
                        label="https://www.example.com/"
                        required
                        size="small"
                        fullWidth
                    />
                </Grid>
                <Grid item>
                    <Button
                        variant="outlined"
                        size="large"
                        disableElevation
                        type="submit"
                        startIcon={<PlayArrowIcon />}
                        disabled={!!!targetUrl || benchLoading}
                        color="success"
                    >
                        Start
                    </Button>
                </Grid>
                <Grid item>
                    <Button
                        onClick={handleBenchStop}
                        color="error"
                        startIcon={<StopIcon />}
                        variant="outlined"
                        size="large"
                        disableElevation
                        disabled={!benchLoading}
                    >
                        Stop
                    </Button>
                </Grid>
                <Grid item>
                    <Button onClick={handleBenchClear} size="large" disableElevation disabled={benchLoading} startIcon={<RestartAltIcon />}>
                        Reset
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
});

BenchmarkControlls.displayName = 'BenchmarkControlls';

export default BenchmarkControlls;
