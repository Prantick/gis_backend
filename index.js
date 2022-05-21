import {config} from 'dotenv';
import {dbConfig} from './config.js';
import express, { json } from 'express';
import extractValuesRoutes from './routes/extractValuesRoutes.js';
import timelineRoutes from './routes/timelineRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js'
import helmet from 'helmet';
import cors from 'cors';

//configure environment
config();
//initialise DB
dbConfig();

const app = express();

//server configuration and security
app.use(helmet());
app.use(cors());
app.use(json());

//routes
app.use('/gis-server/api/getValues',extractValuesRoutes);
app.use('/gis-server/api/category', categoryRoutes);
app.use('/gis-server/api/getTimeline', timelineRoutes);

app.get('*', (req, res) => {
    res.status(404).json({
        msg: "Not Found"
    })
});
app.set('port', process.env.PORT);
app.listen(app.get('port'), () => {
    console.log(`Microservice is running on PORT: ${process.env.PORT}`);
});