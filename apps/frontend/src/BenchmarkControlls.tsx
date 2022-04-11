import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import styles from './create-bench-form.module.css';

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
    onBenchStop: Function;
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

    const handleBenchClear = () => {
        setTargetUrl('');
        onBenchClear();
    };

    return (
        <Box
            component="form"
            sx={{ paddingBottom: 1 }}
            // noValidate
            onSubmit={handleSubmit}
            autoComplete="off"
        >
            {/* <TextField id="outlined-error" label="Title" /> */}
            <Grid container direction="row" columnSpacing={1}>
                <Grid item>
                    <TextField
                        value={httpMethod}
                        onChange={handleHttpMethodChange}
                        className={styles.height40}
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
                        className={styles.height40}
                        id="outlined-error-helper-text"
                        label="https://www.example.com/"
                        required
                        size="small"
                        fullWidth
                    />
                </Grid>
                <Grid item>
                    <Button
                        className={styles.height40}
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
                        onClick={onBenchStop}
                        color="error"
                        startIcon={<StopIcon />}
                        variant="outlined"
                        className={styles.height40}
                        size="large"
                        disableElevation
                        disabled={!benchLoading}
                    >
                        Stop
                    </Button>
                </Grid>
                <Grid item>
                    <Button
                        onClick={handleBenchClear}
                        color="secondary"
                        className={styles.height40}
                        size="large"
                        disableElevation
                        disabled={benchLoading}
                    >
                        Reset
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
});

BenchmarkControlls.displayName = 'BenchmarkControlls';

export default BenchmarkControlls;
