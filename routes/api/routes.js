const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const User = require('../../models/User');
const Marker = require ('../../models/Marker');

//Markers

router.post('/updatemarker', bodyParser.json(), (req,res)=>{
    let marker = 
        {
            Latitude: req.body["Latitude"],
            Longitude: req.body["Longitude"]
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

// respond with "You are connected to the server :)" when a GET request is made to the /api/test page
router.get('/test', (req, res) => {console.log("Server test"); res.send('You are connected to the server :)')});

module.exports = router;

//Tests

// // send list of all users when a GET request is made to the /api/getusers page
router.get('/getusers', (req, res) => {
    console.log("Request of all users");
    User.find()
      .then(users => res.json(users))
      .catch(err => res.status(404).json({ nouserfound: 'No User found' }));
  });
  
router.post('/adduser', bodyParser.json(), (req, res) => {
    console.log(req.body);
    User.create(req.body) //create a new user with the username specified in req.body
      .then(user => res.json({ msg: 'User added successfully' }))
      .catch(err => res.status(400).json({ error: 'Unable to add this user' }));
  });

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
  
