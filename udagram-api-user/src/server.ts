import cors from 'cors';
import express from 'express';
import {sequelize} from './sequelize';

import {IndexRouter} from './controllers/v0/index.router';

import bodyParser from 'body-parser';
import {config} from './config/config';
import {V0MODELS} from './controllers/v0/model.index';

const c = config;

(async () => {
  await sequelize.addModels(V0MODELS);
  await sequelize.sync();

  const app = express();
  const port = process.env.PORT || 8080;

  app.use(bodyParser.json());

  app.use(cors({
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token", "Authorization"],
    methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
    origin: c.url
  }));

  app.use('/api/v0/', IndexRouter)

  // Root URI call
  app.get( "/", async ( req, res ) => {
    res.send( "/api/v0/" );
  } );


  // Start the Server
  app.listen( port, () => {
      console.log( `server running ` + c.url );
      console.log( `press CTRL+C to stop server` );
  } );
})();