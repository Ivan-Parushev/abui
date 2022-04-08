import { Controller, Get, Post, Res, Req } from '@nestjs/common';
import { AppService } from './app.service';
import type { Response, Request } from 'express';

type Client = {
    id: number;
    response: Response;
};

@Controller()
export class AppController {
    private _clients = new Map<number, Client>();

    constructor(private readonly appService: AppService) {}

    @Get('/benchmark-events')
    getBenchmarkEvents(@Res() res: Response) {
        const headers = {
            'Content-Type': 'text/event-stream',
            Connection: 'keep-alive',
            'Cache-Control': 'no-cache',
        };
        res.writeHead(200, headers);

        const clientId = Date.now();

        this._clients.set(clientId, {
            id: clientId,
            response: res,
        });

        const benchObserver = this.appService.subscribeToBenchmarkEvents({
            next: (v) => {
                res.write(`data: ${JSON.stringify(v)}\n\n`);
            },
        });

        res.on('close', () => {
            console.log(`${clientId} Connection closed`);
            benchObserver.unsubscribe();
            this._clients.delete(clientId);
        });
    }
    @Post('/benchmark')
    createNewBenchmark(@Req() req: Request, @Res() res: Response) {
        // console.log(typeof req.body);
        this.appService.startNewBenchmark(req.body);
        res.json({ status: 'received' });
    }

    @Get('/status')
    getStatus(@Res() res: Response) {
        res.json({ clients: this._clients.size });
    }
}
