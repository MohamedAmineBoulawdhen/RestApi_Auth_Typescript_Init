const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compression = require('compression'); 
const cors = require('cors');
const mongoose = require('mongoose');
require("dotenv").config();
const PORT = process.env.PORT;
import router from "./routes"

//initializes an instance of the Express
const app = express();

//enables Cross-Origin Resource Sharing (CORS) with credential support
app.use(cors({
    Credential:true
}))
//enable HTTP response compression
app.use(compression());
//enable parsing of HTTP request cookies
app.use(cookieParser());
//enable parsing of HTTP request bodies in JSON format
app.use(bodyParser.json());

//creates an HTTP server instance//for more flexibility, to configure the server, than app.listen() directly
const server= http.createServer(app)

server.listen(PORT,()=>{
console.log(`listening on http://localhost:${PORT}`);
})
//initiate mongoose
mongoose.Promise=Promise;
mongoose.connect(process.env.DB_URI)
mongoose.connection.on("error",(err:Error)=>{console.log(err)})

app.use("/", router())

console.log("ypppppppppppp"); 