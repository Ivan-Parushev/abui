import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { formatBytes } from './utils';

const StatsCard = ({ title, stat }: { title: string; stat: number | string }) => (
    <Card variant="outlined">
        <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                {title}
            </Typography>
            <Typography variant="h5" component="div">
                {stat}
            </Typography>
        </CardContent>
    </Card>
);

export type StatContainerProps = {
    total200Res: number;
    total300Res: number;
    total400Res: number;
    total500Res: number;
    totalReq: number;
    totalBytes: number;
};
const StatsContainer = ({ totalReq, totalBytes, total200Res, total300Res, total400Res, total500Res }: StatContainerProps) => (
    <Grid container columnSpacing={2} rowGap={2} mt={2} mb={2}>
        <Grid item md={2}>
            <StatsCard title="Requests" stat={totalReq} />
        </Grid>
        <Grid item md={2}>
            <StatsCard title="Bytes" stat={formatBytes(totalBytes)} />
        </Grid>
        <Grid item md={2}>
            <StatsCard title="2xx responses" stat={total200Res} />
        </Grid>
        <Grid item md={2}>
            <StatsCard title="3xx responses" stat={total300Res} />
        </Grid>
        <Grid item md={2}>
            <StatsCard title="4xx responses" stat={total400Res} />
        </Grid>
        <Grid item md={2}>
            <StatsCard title="5xx responses" stat={total500Res} />
        </Grid>
    </Grid>
);

export default StatsContainer;
