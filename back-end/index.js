const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
app.use(cors({
  origin: "http://localhost:3000"
}));

// MongoDB Atlas connection URI
const uri = 'mongodb+srv://money-track:' + encodeURIComponent('test@123') + '@cluster0.rgnqk40.mongodb.net/subham-data?retryWrites=true&w=majority';

// Connect to MongoDB Atlas
app.get("/", function (req, res) {
  res.send("Hello, world!");
})

// Define a schema for your data
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  userId:Number,
});

// Create a model based on the schema
const User = mongoose.model('User', userSchema);

const userdata=new mongoose.Schema({
  userId: Number,
  data:[{
    discription:String,
    expense:Number,
  }]

});
const UserData=mongoose.model('UserData',userdata);

// Middleware to parse the request body
app.use(bodyParser.json());

// Fetch the current id from the database
let id = 0;
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB Atlas');
    // Fetch the current id from the database
    User.findOne().sort({ userId: -1 }).limit(1).exec()
      .then((user) => {
        if (user) {
          id = user.userId + 1;
        }
        console.log('Current id:', id);
      })
      .catch((error) => {
        console.error('Error fetching current id:', error);
      });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error);
  });

// Handle POST request for signup
// Handle GET request to fetch user data by userId
app.get('/user/:userId', (req, res) => {
  console.log("subham kumar")
  const { userId } = req.params;

  // Find the user in the database by userId
  User.findOne({ userId: userId })
    .then((user) => {
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    })
    .catch((error) => {
      console.error('Error fetching user data:', error);
      res.status(500).json({ error: 'Failed to fetch user data' });
    });
});
// ...

app.get('/user/data/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const userData = await UserData.findOne({ userId: userId });

    if (!userData) {
      res.status(404).json({ error: 'User data not found' });
    } else {
      res.json(userData.data);
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ error: 'Failed to fetch user data' });
  }
});

// ...



app.post('/', (req, res) => {
  const { name, email, password } = req.body;

  // Create a new user instance with the current id
  const newUser = new User({
    userId:id,
    name,
    email,
    password,
  });

  // Save the user to the database
  newUser
    .save()
    .then(() => {
      console.log('User created successfully');
      res.json({ id });
      id++; // Increment the id for the next user
    })
    .catch((error) => {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Failed to create user' });
    });
});
app.post('/login',(req,res)=>{
  const { name, email} = req.body;
  User.findOne({ email: email , name: name}).
  then((user) => {
    if (user){
      console.log(user);
      res.json(user);
    }else {
      res.status(404).json({ error: 'User not found' });
    }
  })
  .catch((error) => {
    console.error('Error fetching user data:', error);
    res.status(500).json({ error: 'Failed to fetch user data' });
  });

})
app.post('/user/data', async (req, res) => {
  try {
    const { id, data } = req.body;
    const userId = id;
    const newDataEntry = {
      discription: data.discription,
      expense: data.expenses,
    };

    let userData = await UserData.findOne({ userId: userId });
    
    if (!userData) {
      const newUserData = new UserData({
        userId: userId,
        data: [newDataEntry],
      });

      userData = await newUserData.save();
      console.log('New user data created:', userData);
    } else {
      userData.data.push(newDataEntry);
      userData.markModified('data'); // Mark the modified 'data' array
      userData = await userData.save();
  console.log('New data entry added for user:', userData);

    }

    res.send(userData);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('An error occurred');
  }
});




app.listen(8080, () => {
  console.log('Server is running on port 8080');
});
