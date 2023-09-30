const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

const cors = require('cors'); //για να επιτρεπει να μποροει καποιος να παρει δεδομενα απο παντου χωρις συγκεκριμενο localhost  βηματα:2/1

const user = require('./routes/user.route');
const product = require('./routes/product.route');
const user_products = require('./routes/user-product.route');

//ΠΑΝΤΑ ΟΤΑΝ ΠΕΡΙΜΕΝΟΥΜΕ JSON ΑΡΧΕΙΑ ΝΑ ΕΡΘΟΥΝ
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('./swagger'); //Το αρχειο ονομαζεται οπως θελουμε εμεις το ονομασαμε swagger.js

// Το αποκατω χρειαζεται για να χρησιμοποιουμε το env αρχειο και αυτο το χρησιοποιουμε πιο κατω
require('dotenv').config();
// εδω απο κατω χρησιμοποιουμε το env αρχειο
mongoose.connect(process.env.MONGODB_URI).then(
  () => (console.log("Connection with the database established")),
  err => (console.log("Failed to connect to MongoDB", err))
);

app.use(cors({
  origin: '*'           //      2/2 Επιτρεπει απο παντου να δεχετε κλησεις η εφαρμογη για την βαση
  // 2/2 Επιτρεπει απο συκγκιμενες διευθυνσεις να δεχετε κλησεις για την βαση απο κατω
  // origin:['https://www.example.com','http://localhost8000']    
}))


app.use('/', express.static('files')); //Αυτο καλει τα html αρχεια απο την localhost


// app.get('/users')
// app.post('/users')
// app.get('/products')


// την app.use την χρησιμοποιουμε οταν θελουμε να καλουμε ενδιαμεσες κλησεις
app.use('/api/users', user);
app.use('/api/products', product);
app.use('/api/users-products', user_products)

//με αυτο το τροπο με την serve ανοιγει μια σελιδα και ενφανιζει οτι εχουμε στην επιλογη swaggerDocument.options
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument.options))



app.listen(port, () => {
  console.log(`Linstening on port ${port}.`)
});