const express = require('express')
const bodyParser = require('body-parser');
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const app = express();
app.use(cors());

// Limiter
const limiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 mins
    max: 1000, // Limit each IP to 1000 requests per `window`
    standardHeaders: true,
    legacyHeaders: true,
    keyGenerator: (req) => {
      return req.ip; // IP-based, means for each ID
    },
    message: {
      error: true,
      message: "server.error.toomanyrequest"
    }
  });
  
  // Use Limiter
  app.use(limiter);
  

//app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json({limit:'8392kb'}));

// Routes Definitons
const shareRoutes = require('./routes/shareRouter');
const portfolioRoutes = require('./routes/portfolioRouter');
const transactionRoutes = require('./routes/transactionRouter');

// Routes
app.use("/api/share", shareRoutes);
app.use("/api/portfolio", portfolioRoutes);
app.use("/api/transaction", transactionRoutes);

// 404 Not Found for unknown route/end-point
app.use('*', (req, res, next) => {res.status(404).json({error: true, message: '404 Not Found!'})});

module.exports = app;