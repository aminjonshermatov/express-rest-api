import express from "express";
import path, { resolve } from 'path';

import { reqiestTime, logger } from './middlewares.js'

import serverRouter from './routes/servers.js';

const __dirname = path.resolve()
const app = express();
const PORT = process.env.PORT ?? 3000;

app.set('view engine', 'ejs')
app.set('views', path.resolve(__dirname, 'ejs'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.use(reqiestTime)
app.use(logger)
app.use(express.static(path.resolve(__dirname, 'static')));

app.use(serverRouter);

app.get('/', (req, res) => {
    res.render('index', {title: "Main page", active: "main"});
})

app.get('/features', (req, res) => {
    res.render('features', {title: "Features page", active: "features"});
})

app.get('/test', (req, res) => {
    res.send('Foo')
})

app.listen(PORT, () => console.log(`Server started at port ${PORT}...`))