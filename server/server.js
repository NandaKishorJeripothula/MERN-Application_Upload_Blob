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
        //console.log(fields);
        //console.log(files.file.name);
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
            //console.log("upload successfull this is call back ");
            res.sendStatus(200);
        });
    });
});

app.get('/api/getUploads',function(req,res){
    up.find( function(err,data){
        if(err) throw err;
        else
           res.send(JSON.stringify(data));
    });
});

app.get('/api/getAllIds',function(req,res){
    up.find({},'_id', function (err, data) {
        if(err){
            console.log(err);
            res.sendStatus(404);
        }
        const idList= data.map(element => element._id);
        res.send({'ids':idList});   
    });
})

// Step 1 to retrieve all the images uploaded by Contact
//Iterate through the ids list and procees step 2 and step 3 
app.get('/api/getIdsByContact/:contact',function(req,res){
    var contact= req.params.contact;
    up.find({userContact:{data: contact}}, function (err, data) {
        if(err){
            console.log(err);
            res.sendStatus(404);    
        }
        if(data.length==0){
            res.send('Empty');

            //res.send("Bad REquest");
        }
        else{
            const idList= data.map(element => element._id);
            //Its an array, can change it to object with{}
            // This is same as map funciton
            /*idList={};
            i=0;
            data.forEach(element => {   
                idList[i]=(i,element._id);
                i++;
            }); 
            console.log(idList);
            idList.forEach(e=>{
                console.log(e);
            })
            */
            
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({'ids':idList}));

        }
    });
})
//Step 2 Get the Image Name and DemoGraphic data of User 
//Get all the details except the binary data of the image 
app.get('/api/getDetailsById/:id',function(req,res){
    var id= req.params.id;
    up.findById(id, ' userName.data userContact.data userUpload.name userUpload.contentType',function(err, data){
        if(err){
            res.sendStatus(404);
        }
        //console.log(data);'
        res.send(data);
    })
});

//Step 3 Retrieve the Image with Id we have
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
//For APP PURPOSE ONLY IMAGEARRAYBUFFER
app.get('/api/getImageArrayBufferById/:id',function(req,res){
    var id=req.params.id;
    up.findById(id, function (err, data) {
        if(err){
            console.log(err);
            res.sendStatus(404);
        }
        res.setHeader('content-type', data.userUpload.contentType);
        res.send(data.userUpload);   
    });
})

//When closing server or stopping server close DB connection
app.on('close',function(){
    connection.close();
})
//Please maintain this API just above the listen method for app consistency
/* 
app.get('*',function(req,res){
    res.sendStatus(404);
    res.send("404 Route Not Found");
    
});*/
app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});