const mongoose = require('mongoose')
const Users = require("./models/userModel");

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/glow_leds_db",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  }
);

const user_seed = [
  {
    name: 'Kurt',
    email: 'lavacquek@icloud.com',
    password: '1234',
    isAdmin: true
  }

];

Users.deleteMany({})
  .then(() => Users.insertMany(user_seed))
  .then(data => {
    console.log(data.length + ' records inserted!')
    process.exit(0)
  })
  .catch(err => {
    console.error(err)
    process.exit(1)
  })
