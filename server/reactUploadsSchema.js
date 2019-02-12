const mongoose= require('mongoose');
const Schema= mongoose.Schema;

const reactUplodsSchema= new Schema({
    
    userName:{
        contentType: String
    },
    userContact:{
        contentType: String
    },
    userUpload:{
        data: Buffer,
        contentType: String
    }
    
});

module.exports = mongoose.model('reactUploadsSchema',reactUplodsSchema);