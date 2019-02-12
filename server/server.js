const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose= require('mongoose');
const path= require('path');
const fs= require('fs');
const PORT = 4000;
const app = express();

//For Parsing the userUploads formdata
//With formidable we can exclude the usage of the Multer Package and redundancy of data
const formidable=require('formidable');
app.use(cors());
app.use(bodyParser.json());

const reactUplodsSchema= new mongoose.Schema({
    userName:{
        data:String,
        contentType: String
    },
    userContact:{
        data:String,
        contentType: String
    },
    userUpload:{
        data: Buffer,
        contentType: String
    }
    
});
//reactUploads is the collection name
var up = mongoose.model('reactUploads', reactUplodsSchema);

//mongod.exe --dbpath D:\GitHub\MongoDB\data\db
mongoose.connect('mongodb://127.0.0.1:27017/reactUploads', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

app.get('/',function(req,res){
    res.send("API test ");
})

app.get('/upload',function(req,res){
    res.sendFile(path.resolve('upload.html'));
})

//userUploads API
app.post("/api/upload",function(req,res){
    const form = new formidable.IncomingForm();
    form.parse(req, (error, fields, files) => {
        //console.log(fields);
        //console.log(files);
        if(error){
        console.log(error);
        res.send(error)
        }
        
        if(files.file/*Only when the req contains image init*/){
            //Get the instance ( object )
            var upload= new up;
            upload.userName.data = fields.userName;
            upload.userContact.data = fields.userContact.toString();
            upload.userUpload.data=fs.readFileSync(path.resolve(files.file.path));
            upload.userUpload.contentType=files.file.type;
            upload.save(function(err,upload){
                if(err) {
                    res.sendStatus(504);
                    throw err;
                }
                console.log("upload successfull");
                res.sendStatus(200);
            })
        }
    })
})

//When closing server or stopping server close DB connection
app.on('close',function(){
    connection.close();
})
app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});