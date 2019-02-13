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

const reactuplodsSchema= new mongoose.Schema({
    userName:{
        data:String,
        contentType: String
    },
    userContact:{
        data:String,
        contentType: String
    },
    userUpload:{
        name:String,
        data: Buffer,
        contentType: String
    }
    
});
//reactUploads is the collection name
var up = mongoose.model('reactuploads', reactuplodsSchema);

//mongod.exe --dbpath D:\GitHub\MongoDB\data\db
var databaseURI='mongodb://127.0.0.1:27017/reactUploads';
mongoose.connect(databaseURI , { useNewUrlParser: true }, function(error) {
  // Check error in initial connection. There is no 2nd param to the callback.
  if(error){
      console.log("MongoDB conncetion Error");
  }
});
var connection= mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

app.get('/',function(req,res){
    res.send("API test ");
})

app.get('/upload',function(req,res){
    res.sendFile(path.resolve('upload.html'));
})

//Retrive the image with contact 
/**
 * app.get('/api/:id',function(req,res){
    var id= req.params.id;
    connection.db.collection('reactuploads')
    .findOne({_id:id},function(err,result){
        if(err){
            throw err;
            res.send("failed");
            res.sendStatus(404);
        }
        console.log(result);
        //res.setHeader('content-type', j)
    })
}); *//
function getAll(){
    console.log("from Get all\n")
    up.find( function(err,data){
        if(err) throw err;
        else
            console.log( data +" data here ");
    });
}
//userUploads API
app.post('/api/uploads',function(req,res){
    const form = new formidable.IncomingForm();
    form.parse(req, (error, fields, files) => {
        if(error){
            console.log(error);
            res.send(error)
        }
        var upload= new up;
        upload.userName.data     = fields.userName;
        upload.userContact.data  = fields.userContact;
        upload.userUpload.name          = files.file.name.toString();
        upload.userUpload.data          = Buffer.from(fs.readFileSync(path.resolve(files.file.path)).toString('base64'),'base64');
        upload.userUpload.contentType   = files.file.type

        upload.save(function(err,upload){
            if(err) {
                res.sendStatus(504);
                throw err;
            }
            console.log("upload successfull this is call back ");
            res.sendStatus(200);
        });
    });
})

app.get('/api/getUploads',function(req,res){
    up.find( function(err,data){
        if(err) throw err;
        else
           res.send( data +" data here ");
    });
});

app.get('/api/getImageById/:id',function(req,res){
    var id=req.params.id;
    up.findById(id, function (err, data) {
        if(err){
            console.log(err);
            res.sendStatus(404);
        }
        res.setHeader('content-type', data.userUpload.contentType);
        res.send(data.userUpload.data);   
    });
})
//When closing server or stopping server close DB connection
app.on('close',function(){
    connection.close();
})
app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});