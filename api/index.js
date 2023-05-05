const express = require('express')
const cors = require('cors');
const mongoose = require("mongoose");
const bcrypt = require ('bcrypt');
const jwt = require('jsonwebtoken');
const User = require ('./models/User.js');
const Place = require('./models/Places.js');
const Booking = require('./models/Booking.js');

const imageDownloader = require('image-downloader');
const multer  = require('multer')
const fs = require('fs')
const cookieParser = require('cookie-parser');


require('dotenv').config();
const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);

// untuk cookie
const jwtSecret = 'gywt$#shd7g8g^902hsjh';

// app.use(express.static('public'))
app.use(express.json());

// cookie
app.use(cookieParser());

// use image agar bisa dilihat lewat get
app.use('/uploads', express.static(__dirname+'/uploads'));

// cors untuk menyambukang client dan backend ditambah dengan dotenv
app.use(cors(
  {
    credentials: true,
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200,
  }
));

// connect mongodb
console.log(process.env.MONGODB_URI);
mongoose.connect(process.env.MONGODB_URI);

function getUserDataFromToken(req){
  mongoose.connect(process.env.MONGODB_URI);
  return new Promise((resolve, reject) => {
    jwt.verify(req.cookies.token, jwtSecret, {}, async (err,userData) => {
      if(err) throw err;
      resolve(userData);
    });
  })
}


// test api mongodb
app.get('',  (req,res) => {
  // mongoose.connect(process.env.MONGODB_URI);
    res.json('test apiiiii');
});

// test api mongodb
app.get('/test',  (req,res) => {
  // mongoose.connect(process.env.MONGODB_URI);
    res.json('test ok');
});

// api register
// pass mongodb = urDjCcssKdaQ59R0
app.post('/register', async (req,res) => {
  mongoose.connect(process.env.MONGODB_URI);
  const {name,email,password} = req.body;
  try {
      const userDoc = await User.create({
        name, 
        email , 
        password:bcrypt.hashSync(password, bcryptSalt),
      });
      res.json(userDoc);  
  }catch (e) {
     res.status(422).json(e);
  }
});

// api login
app.post('/login', async (req,res) => {
  mongoose.connect(process.env.MONGODB_URI);
  const {email,password} = req.body;
  const userDoc = await User.findOne({email});

  if(userDoc){
    const passOK = bcrypt.compareSync(password, userDoc.password);
    if(passOK){
      //untuk cookie
      jwt.sign({
        email:userDoc.email, 
        id:userDoc._id
      }, jwtSecret, {}, (err,token) => {
        if(err) throw err;
        res.cookie('token', token).json(userDoc);
      });
    }else{
      res.status(422).json('pass not ok');
    }
  }else{
    res.status(422).json('not found');
  }
});

// api logout
app.post('/logout', (req,res) => {
  mongoose.connect(process.env.MONGODB_URI);
  // hapus cookie
  res.cookie('token', '').json(true);
});

 
//  check cookie apakah user udah login atau belum
//instal cookie = npm install cookie-parser untuk ambil data , jadi ketika di refresh data yang sudah login tidak hilang
app.get('/profile', (req,res) => {
  mongoose.connect(process.env.MONGODB_URI);
  // cek cookie;
  const {token} = req.cookies;  
  // ammbil user_id
  if(token){
    jwt.verify(token, jwtSecret, {}, async (err,userData) => {
      if(err) throw err;
      //ketiaka cookie sudah dapata atau token sama dengan cookie maka seharusnya jika di refresh data tidak hilang
      const {name,email,id} = await User.findById(userData.id);
      res.json({name,email,id});

      // cek token
      //res.json('token', token);
    });
  }else{
    res.json(null);
  }
});

// upload photo lewat link
app.post('/upload-photo-by-link', async (req, res) => {
  mongoose.connect(process.env.MONGODB_URI);
  const {link} = req.body;
  const newName = 'photo' + Date.now() + '.jpg';
  await imageDownloader.image({
    url: link,
    dest: __dirname + '/uploads/' + newName,
  });

  res.json(newName);

});


// upload photo lewat device
const photosMiddleware = multer({dest:'uploads/'});
app.post('/upload-photo', photosMiddleware.array('photos',100), async (req, res) => {
  mongoose.connect(process.env.MONGODB_URI);
  // console.log(req.files);
  // ambil path name dalam array agar bisa di lihat poto lewat get
  const uploadedFiles = [];
  for(let i=0; i < req.files.length; i++){
    const {path,originalname} = req.files[i];
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path + '.' + ext;
    fs.renameSync(path, newPath);

    // replace untuk menghilangkan path folder
    uploadedFiles.push(newPath.replace("uploads\\",''));
  } 
  res.json(uploadedFiles);
  // res.json(req.files);
});

// addNewPlace
app.post('/places', (req,res) => {
  mongoose.connect(process.env.MONGODB_URI);
  const {token} = req.cookies;  
  const {title,address,addedPhoto,description,perks,extraInfo,checkIn,checkOut,maxGuests,price} = req.body;

  // ambil user id
  jwt.verify(token, jwtSecret, {}, async (err,userData) => {
    if(err) throw err;
    const placeDoc = await Place.create({
      owner: userData.id,
      title,address,photos:addedPhoto,description,perks,extraInfo,checkIn,checkOut,maxGuests,price,
    });
    res.json(placeDoc);
  });
});

// ambil data places
app.get('/user-places', (req,res) =>{
  mongoose.connect(process.env.MONGODB_URI); 
  const {token} = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err,userData) => {
      const {id} = userData;
      res.json(await Place.find({owner:id}));
  });
})

// ambil data places sesuai id
app.get('/places/:id', async (req,res) => {
  mongoose.connect(process.env.MONGODB_URI);
  // res.json(req.params);
  const {id} = req.params;
  res.json(await Place.findById(id));
});


// updatePlace
app.put('/places', async (req,res) => {
  mongoose.connect(process.env.MONGODB_URI);
  const {token} = req.cookies;  
  const {id, title,address,addedPhoto,description,perks,extraInfo,checkIn,checkOut,maxGuests,price} = req.body;
  // ambil user id
  jwt.verify(token, jwtSecret, {}, async (err,userData) => {
    if(err) throw err;
    const placeDoc = await Place.findById(id);
    // cek userId masing masing
    // console.log(userData.id);
    // console.log(placeDoc.owner.toString());
    console.log(userData.id === placeDoc.owner.toString()); //maka hasilnya true
    
    if(userData.id === placeDoc.owner.toString()){
      // cek data dalam array
      // console.log({price})

      placeDoc.set({
        owner: userData.id,
        title,address,photos:addedPhoto,description,perks,extraInfo,checkIn,checkOut,maxGuests,price, 
    });
        await placeDoc.save();
        res.json('ok');
    }  
  });

});

// ambil getplaces halaman homepage
app.get('/places', async (req,res) => {
  mongoose.connect(process.env.MONGODB_URI);
  res.json( await Place.find() );
});

// booking widget
app.post('/bookings', async (req,res) => {
  mongoose.connect(process.env.MONGODB_URI);

  //ambil id owner 
  const userData = await getUserDataFromToken(req);

  //ambil seluruh data inputan
  const {place,checkIn,checkOut,numberMaxGuests,name,mobile,price} = req.body;

  //create ke database
  await Booking.create({
    place: place,checkIn,checkOut,numberMaxGuests,name,mobile,price,
    owner:userData.id
  }).then((doc) => {
    res.json(doc)
  }).catch((err) => {
    throw err;
  });
});



app.get('/bookings', async (req,res) => {
  mongoose.connect(process.env.MONGODB_URI);
  const userData = await getUserDataFromToken(req);
  res.json( await Booking.find({owner:userData.id}).populate('place'))
}); 

app.listen(4000);

// module.exports = app;