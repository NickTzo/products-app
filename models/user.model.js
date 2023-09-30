const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const Schema = mongoose.Schema;


let addressSchema = new Schema({
  area: {
    type: String
  },
  road: {
    type: String
  }
}, {
  _id: false  //Δεν βαζει id σε αυτα τα πεδια αλλιως δημιουργει απο μονο του το Mongodb
});

let phoneSchema = new Schema({
  type: {
    type: String
  },
  number: {
    type: String
  }
}, {
  _id: false  //Δεν βαζει id σε αυτα τα πεδια αλλιως δημιουργει απο μονο του το Mongodb
});

let productsSchema = new Schema({
  product: {
    type: String
  },
  cost: {
    type: Number
  },
  quantity: {
    type: Number,
    // required: true   //Αν πρεπει να ειναι υποχρεωτικο
  },
  date: {
    type: Date,
    default: Date.now
  }

});




let userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Username is required field'],
    max: 10,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: [true, 'Password is required field'],
    max: 15
  },
  name: {
    type: String
  },
  surname: {
    type: String
  },
  email: {
    type: String,
    required: [true, 'Email is required field'],
    max: 20,
    unique: true,
    trim: true,
    lowercase: true,
    // match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Email address is not valid"]  //email regex
  },
  address: addressSchema,
  phone: {
    type: [phoneSchema],
    null: true
  },
  products: {
    type: [productsSchema],
    null: true
  }
}, {
  collection: 'users',
  timestamps: true
});



userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);