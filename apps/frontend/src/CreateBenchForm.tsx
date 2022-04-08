import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
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

const CreateBenchForm = () => {
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
        fetch('http://localhost:3001/benchmark', {
            method: 'POST',
            body: JSON.stringify({ method: httpMethod, url: targetUrl }),
            headers: { 'Content-Type': 'application/json' },
        })
            .then((res) => res.json())
            .then((json) => console.log(json))
            .catch((err) => console.log(err));
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
                        variant="contained"
                        size="large"
                        disableElevation
                        type="submit"
                        disabled={!!!targetUrl}
                    >
                        Start
                    </Button>
                </Grid>
            </Grid>
            {/* <TextField id="filled-error" label="Connections" />
            <TextField id="filled-error-helper-text" label="Pipelining" />
            <TextField id="standard-error" label="Duration" /> */}
        </Box>
    );
};

export default CreateBenchForm;
