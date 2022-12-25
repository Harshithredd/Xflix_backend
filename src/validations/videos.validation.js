const joi= require("joi");
const { objectId,contentRating,genres } = require("./custom.validation");

const getVideosID = {
    params : joi.object().keys({
        videoId : joi.string().custom(objectId),
    })
}


const getVideosQuery = {
    query : joi.object().keys({
        title : joi.string(),
        genres :joi.string().custom(genres),
        contentRating :joi.string().custom(contentRating),
        sortBy : joi.string().valid("viewCount", "releaseDate"),
    })
}

const PostVideosBody = {
    body : joi.object().keys({
        videoLink : joi.string().required(),
        title :joi.string().required(),
        genre :joi.string().required().valid("Education", "Sports", "Movies", "Comedy", "Lifestyle", "All"),
        contentRating :joi.string().required().valid("Anyone", "7+", "12+", "16+", "18+"),
        releaseDate:joi.date().required(),
        previewImage:joi.string().required(),
    })
}

module.exports = {
    getVideosID,
    getVideosQuery,
    PostVideosBody,
}