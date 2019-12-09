const router = require('express').Router();
const User = require('../models/User');
const {registerValidation,loginValidation}=require('../validation');
const bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken');

var user=new User();


router.post('/register', async (req, res) => {
  const {error}=registerValidation(req.body);
  if(error) return res.status(400).send(error.deta);

  // //Check if the user already in db
    const emailExist = await User.findOne({ email: req.body.email });

    if (emailExist) return res.status(400).send('Email already');

  //Hash pass

    const salt = 10;
    const hashPass = await bcrypt.hash(req.body.password, salt);

  //Create new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPass
     });
    try {
         const savedUser = await user.save();
        res.send({ user: user._id });

    } catch (error) {
         res.status(400).send(error);
    }
});

//LOGIN

router.post('/login', async (req, res) => {
    const { error } = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

  //Check if the user is already in DB

        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(400).send('EMail is wrong');

  //Password is Correct
 
        const passValid = await bcrypt.compare(req.body.password,user.password);

        if (!passValid) return res.status(400).send('Pass is wrong');


        //Create and assign a token
        //asagida jwt.sign içerisinde tokene gomecegim istedigim degeri verebilrim ornegin
        //_id:user._id der isem token icerisine o id gomulur.
        const token=jwt.sign({_id:user._id},process.env.DENEME_TOKEN);
        res.header('denemeToken',token).send(token);

        
       
  
});

module.exports = router;
