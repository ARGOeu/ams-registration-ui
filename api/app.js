const express = require('express')
const https = require('https');
const axios = require('axios');
const app = express()
const bodyParser = require("body-parser");
const router = express.Router();
var config = require('./config.json');
const cors = require('cors')
const token = config.token 
const ams = config.ams

const rateLimit = require("express-rate-limit");
 
const limiter = rateLimit({
  windowMs: config.ratelimit_window_ms,
  max: config.ratelimit_max_requests
});
 
app.use(cors());
app.use(limiter);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

router.post('/api',(request,response) => {
    data = request.body

    axios.post(ams+'/v1/registrations?key='+token, 
    data
    ,
      {
       httpsAgent: new https.Agent({
        rejectUnauthorized: false
        })})
      .then((ams_resp) => {
          console.log(ams_resp.data)
        response.send(ams_resp.data);
      }, (error) => {
        console.log(error);
        response.send("error");
      });
   
});

router.get('/', (req, res) => res.send('Argo ams proxy'))

app.use("/", router);
const port = config.port



app.listen(port, () => console.log(`Argo ams api proxy started...`))
