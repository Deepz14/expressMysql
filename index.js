const express = require('express');
const db = require('./connection');
const post = require('./routes/user');
const app = express();

const PORT = process.env.PORT || 8080;

// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';

db.connect((err) => {
    if(err){
        console.log('error connecting...'+ err);
    }
    else{
        console.log('DB is connected...')
    }
})

app.use(express.json());

app.listen(PORT, () => {
  console.log(`server started running on PORT : ${PORT}`);  
})

app.use('/api', post);