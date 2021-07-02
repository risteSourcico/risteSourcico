import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as helmet from "helmet";
import * as cors from "cors";
import routes from "./routes/auth";
import register from './routes/index'
//Connects to the Database -> then starts the express
createConnection()
  .then(async connection => {
    // Create a new express application instance
    const app = express();
    app.get('/',(req,res)=>{
      res.send("<h1>Innosec App</h1></br><h4>Open Postman tool to test the request</h4>")

    } )
    // Call midlewares
    app.use(cors());
    app.use(helmet());
    app.use(bodyParser.urlencoded({ extended: false })); // Now separate parsers
    app.use(bodyParser.json());

    //Set all routes from routes folder
    app.use("/",routes);
    app.use("/me", register);


    app.listen(3000, () => {
      console.log("Server started on port 3000!");
    });
  })
  .catch(error => console.log(error));