const videosModel = require("../models/videos.model");

const ApiError = require("../utils/ApiError");
const getVideos = async(query)=>{
    const videos = await videosModel.find(query);
    return videos;
}
const getVideosSortBy = async(query)=>{
    const videos = await videosModel.find(query);
    return videos;
}

const getVideosByID  = async(id)=>{
    const videos = await videosModel.findById(id);
    return videos;
}
const postVideos = async(data)=>{
 const videos =await videosModel.create(data);
 return videos;
}
const patchVideosByID =async(videoId,vote,change)=>{
    const videos = await videosModel.findById(videoId);
    if(!videos){
        return videos;
    }
    if(vote == "downVote"){
        if(change == "increase"){
            videos.votes.downVotes = videos.votes.downVotes +1;
        }else if(change == "decrease"){
            videos.votes.downVotes = videos.votes.downVotes -1;
        }
    }else if(vote == "upVote"){
        if(change == "increase"){
            videos.votes.upVotes = videos.votes.upVotes +1;
        }else if(change == "decrease"){
            videos.votes.upVotes = videos.votes.upVotes -1;
        }
    }
    return await videos.save();
}
const patchVideosByViews = async(videoId) =>{
    const videos = await videosModel.findById(videoId);
    if(!videos){
        return videos;
    }
    videos.viewCount +=1;
    return await videos.save();
}
module.exports ={
    getVideos,
    getVideosByID,
    getVideosSortBy,
    postVideos,
    patchVideosByID,
    patchVideosByViews
}