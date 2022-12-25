const mongoose = require("mongoose");

const videosSchema = mongoose.Schema({
    videoLink : {
        type : String,

    },
    title :{
        type : String,
    },
    genre :{
        type : String,
        enum : ["Education", "Sports", "Movies", "Comedy", "Lifestyle", "All" ],
    },
    contentRating :{
        type : String,
        enum : ["Anyone", "7+", "12+", "16+", "18+"],
    },
    releaseDate :{
        type : Date,
    },
    previewImage :{
        type : String,
    },
    votes :{
        upVotes :{
            type : Number,
            default : 0
        },
        downVotes:{
            type : Number,
            default :0 
        },
    },
    viewCount : {
        type : Number,
        default : 0
    }

});

const videoModel = mongoose.model('Video',videosSchema);

module.exports = videoModel;