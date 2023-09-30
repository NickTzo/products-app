// const logger = require('winston');  
//Αν θελουμε συγκεκριμενες μεθοδους απο την βιβλιοθηκη πχ.winston τοτε κανουμε το απο κατω...
const { format, createLogger, transports } = require('winston');
const { collection } = require('../models/user.model');
require('winston-daily-rotate-file');
require('winston-mongodb');

require('dotenv').config();

const { combine, timestamp, label, prettyPrint } = format; //Αυτες οι ιδιοτητες υπαρχουν μεσα στην format που πηραμε


const CATEGORY = "winston custom format";

const fileRotateTransport = new transports.DailyRotateFile({  //εκει που θα παει να τα γραψει
  filename: "logs/rotate-%DATE%.log",  //το ονομα του αρχειου (αν θελαμε να το αποθηκευση καπου αλλου επρεπε να βαλουμε το path)
  datePattern: "DD-MM-YYY",  //ο τροπος που ενφανιζει την ημερομηνια
  maxFiles: "14d"    //Ανα ποσες μερες γινεται rotate
});

const logger = createLogger({
  level: "debug",
  format: combine(
    label({ label: CATEGORY }),
    timestamp({
      format: "DD-MM-YYY HH:mm:ss"
    }),
    // format.json(),   //Διαφορετικη δυνατοτητα απο το κατω
    prettyPrint()
  ),
  transports: [
    fileRotateTransport,
    new transports.File({
      filename: "logs/example.log"
    }),
    new transports.File({
      level: "error",
      filename: "logs/error.log"
    }),
    new transports.Console(),
    new transports.MongoDB({
      level: "error",
      db: process.env.MONGODB_URI,
      options: {
        useUnifiedTopology: true  //Αν δεν θελουμε να μου πεταει καποιο σχολιο η Mongodb στο console.log πχ για updates
      },
      collection: "server_logs",
      format: format.combine(
        format.timestamp(),
        format.json()
      )
    })
  ]
})

module.exports = logger;