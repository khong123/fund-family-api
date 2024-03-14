import morgan from 'morgan';
import compression from 'compression';
import bodyParser from 'body-parser';
import helmet from 'helmet';

export default function expressConfig(app) {
    // Security Middleware
    app.use(helmet());

    app.use(compression());
    app.use(bodyParser.json({ limit: '50mb' }));
    app.use(
        bodyParser.urlencoded({
            limit: '50mb',
            extended: true,
            parameterLimit: 100
        })
    );

    app.use((req, res, next) => {
        // Request methods allowed
        res.setHeader(
            'Access-Control-Allow-Methods',
            'GET, POST, PUT, PATCH, DELETE'
        );
        // Request headers allowed
        res.setHeader(
            'Access-Control-Allow-Headers',
            'X-Requested-With, Content-type, Authorization, Cache-control, Pragma'
        );
        // Pass to next layer of middleware
        next();
    });
    app.use(morgan('combined'));
}