const User = require('../models/user.model');
const logger = require('../logger/logger');

// Μια function για να βρεθει σε εναν αλλο φακελο και να χρησιμοποιηθει θα πρεπει να ειναι export

exports.findAll = async (req, res) => {
  console.log("Find all users");

  try {
    const result = await User.find();
    res.status(200).json({ status: true, data: result });
    console.log("Success in reading all users");
    logger.info("Log info success in reading all users");
    logger.log("Logger success in reading all users");
  } catch (err) {
    res.status(400).json({ status: false, data: err });
    logger.error("Problem in reading all users")
    console.log("Problem in reading all users");
  }
}

// Δευτερος τροπος απο κατω αλλα προτιμαμε τον πρωτο

// findAll2 = async (req, res) => {
//   console.log("Find all users");

//   res.status(200).json({ status: true });
// }

// module.exports = { findAll2 }

//ΑΠΟ ΤΟ MOOGOOSE 7 ΚΑΙ ΜΕΤΑ ΔΕΝ ΔΕΧΕΤΑΙ ΔΙΑΔΙΚΑΣΙΑ CALLBACK ΑΛΛΑ ΜΟΝΟ ASYNC AWAIT
//Αυτη θα ειναι η διαδικασια αν θελουμε να το κανουμε με callback συναρτηση και οχι με async και await
// exports.findAll = function(req,res){
//   console.log("Find All users")

//   User.find((err,result)=>{
//     if(err){
//       res.status(400).json({ status: false, data: err });
//       console.log("Problem in reading all users");
//     }else{
//       res.status(200).json({ status: true, data: result });
//       console.log("Success in reading all users");
//     }
//   })
// }




exports.findOne = async (req, res) => {
  const username = req.params.username
  console.log("Find user with username", username)
  try {
    //διαφορα της find με την findOne ειναι οτι η find επιστρεφει οσα βρισκει σε πινακα ενω η findOne το πρωτο που θα βρει
    const result = await User.findOne({ username: username })
    res.status(200).json({ status: true, data: result });
    logger.info("Log info success in reading user");
    logger.log("Logger success in reading user");
    console.log("Success in reading user")
  } catch (err) {
    res.status(400).json({ status: false, data: err })
    logger.error("Problem in reading user")
    console.log("Problem in reading user with username:", username)
  }

}

//Η findOne με callback
// User.findOne({ username: username }, (err, result) => {
//  ....κωδικας
// })


exports.create = async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    password: req.body.password,
    name: req.body.name.name,
    surname: req.body.surname,
    email: req.body.email,
    address: req.body.address,
    phone: req.body.phone,
    products: req.body.products
  })
  console.log("Insert user with username: ", req.body.username);
  try {
    const result = await newUser.save();
    res.status(200).json({ status: true, data: result });
    console.log("Success in inserting user with username: ", req.body.username);
    logger.info("Log info success in inserting user");
    logger.log("Logger success in inserting user");
  } catch (err) {
    res.status(400).json({ status: false, data: err });
    console.log("Problem in inserting user with username: ", req.body.username);
    logger.error("Problem in inserting user")
  }
}


exports.update = async (req, res) => {
  const username = req.body.username;
  console.log("Update user with username ", username);
  const updateUser = {
    name: req.body.name,
    surnmae: req.body.surname,
    email: req.body.email,
    address: req.body.address,
    phone: req.body.phone
  }

  try {//το new:true με αυτη την επιλογη αν θελουμε σε περιπτωση που αυτο που προσπαθουμε να κανουμε Update δεν υπαρχει το δημιουργει
    const result = await User.findOneAndUpdate({ username: username }, updateUser, { new: true })
    res.status(200).json({ status: true, data: result });
    console.log("Success in updating user with username ", username);
    logger.info("Log info success in updating user");
    logger.log("Logger success in updating user");
  } catch (err) {
    res.status(400).json({ status: false, data: err });
    console.log("Problem in update user with username: ", req.body.username);
    logger.error("Problem in updating user")
  }
}


exports.delete = async (req, res) => {
  const username = req.params.username;
  console.log("Delete User with username: ", username);

  try {
    const result = await User.findOneAndRemove({ username: username })
    res.status(200).json({ status: true, data: result });
    console.log("Success in deleting user with username ", username);
    logger.info("Log info success in deleting user");
    logger.log("Logger success in deleting user");
  } catch (err) {
    res.status(400).json({ status: false, data: err });
    console.log("Problem in delete user with username: ", username);
    logger.error("Problem in deleting user")
  }
}