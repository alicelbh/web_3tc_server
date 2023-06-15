const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const User = require('../../models/User');
const Marker = require ('../../models/Marker');
const Comment = require ('../../models/Comment')
//Markers

router.post('/updatemarker', bodyParser.json(), (req,res)=>{
    let marker = 
        {
            Latitude: req.body["Latitude"],
            Longitude: req.body["Longitude"],
            AssoID: req.body["AssoID"]
        }
    console.log(marker)
    Marker.replaceOne(marker, req.body, { upsert: true })
        .then(marker => 
            {
                res.json({ msg: 'Marker has been successfully updated' });
                console.log("Marker has been correctly added");
            })
        .catch(err => { console.log(err);
            res.status(400).json({ error: 'Unable to add this user' })
        });
});

router.post('/getmarkerbyasso', bodyParser.json(), (req,res) =>
    {
        console.log(req.body)
        Marker.find(req.body).then(marker => res.json(marker))
    })


router.post('/getmarker', bodyParser.json(), (req,res)=>
    {
        Marker.find(req.body)
            .then (markerStatus => {
                if(markerStatus.length!=0)
                    {
                        console.log(markerStatus[0]["Latitude"])
                        console.log(markerStatus[0]["Status"]);
                        res.json(markerStatus[0]["Status"])
                    }
                else
                    {
                        res.json("DNE")
                    }
            })
            .catch(err => res.status(404).json(err))
    });

//Comments

router.post('/addcomment', bodyParser.json(), (req, res)=>{
    console.log(req.body)
    Comment.create(req.body)
        .then(res.json({msg:"Hey"}))
        .catch(e => res.status(404))
})

router.post('/getcomments', bodyParser.json(), (req, res) => {
    console.log(req.body);
    Comment.find(req.body)
        .then(com => res.json(com))
        .catch(err => console.log(err))
    // Comment.find()
    //   .then(com => console.log(res) )//res.json(com))
    //   .catch(err => res.status(404).json({ err: 'no comment' }));
  });
// respond with "You are connected to the server :)" when a GET request is made to the /api/test page
router.get('/test', (req, res) => {console.log("Server test"); res.send('You are connected to the server :)')});

module.exports = router;
//Tests

// // send list of all users when a GET request is made to the /api/getusers page
router.post('/getusers', bodyParser.json(), (req, res) => {
    console.log(req.body);
    User.find(req.body)
      .then(users => res.json(users))
      .catch(err => res.status(404).json({ nouserfound: 'No User found' }));
  });
  
router.post('/adduser', bodyParser.json(), (req, res) => {
    console.log(req.body);
    const user = 
        {
            google_id: req.body["google_id"]
        }//check if there already exist a user with that google id
    console.log(user)    
    User.find(user)
        .then( (u) =>
            {
                if(u.length!=0)console.log("user exists")
                else User.create(req.body).then(console.log("ok"))
            })


    // User.find(user).then((foundUser) => 
    //     {
    //         currentList = foundUser[0]["assoList"]
    //         let toSend = req.body
    //         toSend["assoList"] = currentList
    //         console.log(toSend)
    //         User.replaceOne(user, toSend, { upsert: true }) //create a new user with the username specified in req.body
    //             .then(user => res.json({ msg: 'User added successfully' }))
    //             .catch(err => res.status(400).json({ error: 'Unable to add this user' }));
    //     })
    
  });

  router.post("/subscribe", bodyParser.json(), (req,res) =>{
    console.log(req.body);
    assoName = req.body["assoName"]
    const user = {username:req.body["username"]}
    User.find(user).then((foundUser) => {
        if("assoList" in foundUser[0] && foundUser[0]["assoList"].includes(assoName))
            {
                console.log("Already belongs to the asso")
                res.send("Vous êtes déjà dans cette association !")
            }
        else
            {
                User.updateOne({username:req.body["username"]}, {$push : {assoList : assoName}})
                    .then(res.send("Inscription prise en compte."))
                    .catch()
            }
    })
  })

// // router.get('/:id', (req, res) => {
// // User.findById(req.params.id)
// //     .then(user => res.json(user))
// //     .catch(err => res.status(404).json({ nouserfound: 'No User found' }));
// // });


// // router.put('/:id', (req, res) => {
// // User.findByIdAndUpdate(req.params.id, req.body)
// //     .then(user => res.json({ msg: 'Updated successfully' }))
// //     .catch(err =>
// //     res.status(400).json({ error: 'Unable to update the Database' })
// //     );
// // });

// // router.delete('/:id', (req, res) => {
// //     User.findByIdAndRemove(req.params.id, req.body)
// //       .then(user => res.json({ mgs: 'user entry deleted successfully' }))
// //       .catch(err => res.status(404).json({ error: 'No such a user' }));
// //   });
  
