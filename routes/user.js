const express = require('express');
const db = require('../connection');
const bcrypt = require('bcryptjs');
const router = express.Router();

//post data
router.post('/post', async(req, res) => {

    const {username, email, password} = req.body;

    const salt = await bcrypt.genSalt(10);

    const hashPassword = await bcrypt.hash(password, salt);

    const post = 'INSERT INTO users values(null,?,?,?)';

    db.query(post, [username, email, hashPassword], (err, result) => {
        if(err){
            res.json({status : 'error Posting data...', err})
        }
        else{
            res.json({status : 'Posted Successfullly', result})
        }
    })
})

//get all data
router.get('/users', (req, res) => {
    const get = 'SELECT * FROM users';

    db.query(get, (err, result) => {
        if(err){
            res.json({status : 'error retrieving data', err})
        }
        else{
            res.json({status : 'success', result})
        }
    })
})


//get individual data
router.get('/user/:id', (req, res) => {
    const get = `SELECT * FROM users WHERE id=${req.params.id}`;

    db.query(get, (err, result) => {
        if(err){
            res.json({status : 'error retrieving data', err})
        }
        else{
            res.json({status : 'success', result})
        }
    })
})


//update the user
router.put('/update/:id', (req, res) => {
    const {username} = req.body;
  
    const update  = `UPDATE users SET username=? WHERE id=${req.params.id}`;

    db.query(update,username,(err, result) => {
        if(err){
            res.json({status : 'error updating user', err})
        }
        else{
            res.json({status : 'success', result})
        }
    })
})


//delete the user
router.delete('/delete/:id', (req, res) => {

    const deleted = `DELETE FROM users WHERE id=${req.params.id}`;

    db.query(deleted, (err, result) => {
        if(err){
            res.json({status : 'error deleting the user', err})
        }
        else{
            res.json({status : 'success', result})
        }
    })
    
})

module.exports = router;