import * as bodyParser from 'body-parser';
import chalk from 'chalk';
import * as compression from 'compression';
import * as dotenv from 'dotenv';
import * as express from 'express';
import { NextFunction, Request, Response } from 'express';
import * as flash from 'express-flash';
import * as session from 'express-session';
import * as expressValidator from 'express-validator';
import { graphiqlExpress, graphqlExpress } from 'graphql-server-express';
import * as lusca from 'lusca';
import * as mongoose from 'mongoose';
import * as logger from 'morgan';
import * as multer from 'multer';
import * as sass from 'node-sass-middleware';
import * as path from 'path';
import * as contactController from './controllers/contact';
import * as homeController from './controllers/home';
import schema from './models/schema';

const expressStatusMonitor = require('express-status-monitor');

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.config({path: '.env'});

/**
 * Create Express server.
 */
const app = express();

/**
 * Connect to MongoDB.
 */
// Replace 'mpromise' library with native ES6 Promises (removes depracation warning).
(<any>mongoose).Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/test');
mongoose.connection.on('error', (err) => {
    console.error(err);
    console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
    process.exit();
});
mongoose.connection.once('open', () => {
    console.log('connected to messenger Database.');
});

/**
 * Express configuration.
 */
app.set('host', process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0');
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');
app.use(expressStatusMonitor());
app.use(compression());
app.use(logger('dev'));
app.use(sass({
    src: path.join(__dirname, 'public'),
    dest: path.join(__dirname, 'public')
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressValidator());
app.use(session(<session.SessionOptions>{
    resave: true,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
}));
app.use(flash());

app.use((req, res, next) => {
    if (req.path === '/api/upload' || req.path === '/graphql') {
        next();
    } else {
        lusca.csrf()(req, res, next);
    }
});
app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));
app.use((req: Request, res: Response, next: NextFunction) => {
    // res.locals.user = req.user;
    next();
});
app.use((req: Request, res: Response, next: NextFunction) => {
    // After successful login, redirect back to the intended page
    // if (!req.user && req.path !== '/login' && req.path !== '/signup' && !req.path.match(/\./)) {
    //     req.session.returnTo = req.path;
    // } else if (req.user &&
    //         req.path == '/account') {
    //     req.session.returnTo = req.path;
    // }
    next();
});

app.use('/graphql', bodyParser.json(), graphqlExpress({schema}));
app.use('/graphiql', graphiqlExpress({endpointURL: '/graphql'}));

app.use(express.static(path.join(__dirname, 'public'), {maxAge: 31557600000}));

/**
 * Primary app routes.
 */
app.get('/', homeController.index);
app.get('/contact', contactController.getContact);
app.post('/contact', contactController.postContact);

const upload = multer({dest: path.join(__dirname, 'uploads')});
app.post('/profile', upload.single('avatar'), function (req: Request, res: Response, next: NextFunction) {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
});


export default app;
