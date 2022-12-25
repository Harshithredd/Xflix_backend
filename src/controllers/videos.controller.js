const {videosService} = require("../services/index");
const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const ApiError = require("../utils/ApiError");

const getVideos = catchAsync(async (req,res)=>{
    const {title,genres,sortBy,contentRating} = req.query;
    let query={};
    let sortQuery= {};
    if(sortBy){
        const videos = await videosService.getVideosSortBy(sortQuery);
        if(!videos || videos.length==0){
            throw new ApiError(httpStatus.NOT_FOUND,"No videos Found in DB");
        }
        if(sortBy == "releaseDate"){
            videos.sort((video_1,video_2)=>{
                return video_2.releaseDate - video_1.releaseDate;
            })
            return res.status(httpStatus.OK).json({videos:videos});
        }else if(sortBy =="viewCount"){
            videos.sort((video_1,video_2)=>{
                return video_2.viewCount - video_1.viewCount;
            })
        }
        return res.status(httpStatus.OK).json({videos:videos});
        
    }
    if(title){
        query.title = {$regex : title, $options: 'i'};
    }
    
    if(genres){
        let genreArray=[];
        if(genres == "All"){
            genreArray = ["Education", "Sports", "Movies", "Comedy", "Lifestyle", "All"];
        }else{
            genreArray = genres.split(",");
        }
        query.$or = [];
        for(let i=0;i<genreArray.length;i++){
                query.$or.push({genre : genreArray[i]});
        }
    }
    if(contentRating){
        query.contentRating = contentRating;
    }
    console.log("query",query);
    const videos = await videosService.getVideos(query);
    if(!videos || videos.length==0){
        throw new ApiError(httpStatus.NOT_FOUND,"No videos Found in DB");
    }
    res.status(httpStatus.OK).json({videos:videos});
})
const getVideosByID = catchAsync(async(req,res)=>{
    const {videoId} = req.params;
    if (!videoId.match(/^[0-9a-fA-F]{24}$/)) {
        throw new ApiError(httpStatus.BAD_REQUEST,"Not a valid DB ID");
      }
    const videos = await videosService.getVideosByID(videoId);
    if(!videos || videos.length==0){
        throw new ApiError(httpStatus.NOT_FOUND,"No videos Found in DB by ID");
    }
    res.status(httpStatus.OK).json(videos);
})

const postVideos  = catchAsync(async (req,res)=>{

    const videos = await videosService.postVideos(req.body);
    res.status(httpStatus.CREATED).json(videos);
})

const patchVideosByID  = catchAsync(async (req,res)=>{
    const {videoId} = req.params;
    const {vote,change} = req.body;
    const videos = await videosService.patchVideosByID(videoId,vote,change);
    if(!videos || videos ==null){
        throw new ApiError(httpStatus.NOT_FOUND,"No record found for ID");
    }
    res.status(httpStatus.CREATED).json(videos);
})
const patchVideosByViews  = catchAsync(async (req,res)=>{
    const {videoId} = req.params;
    if (!videoId.match(/^[0-9a-fA-F]{24}$/)) {
        throw new ApiError(httpStatus.BAD_REQUEST,"Not a valid DB ID");
      }
    const videos = await videosService.patchVideosByViews(videoId);
    if(!videos || videos ==null){
        throw new ApiError(httpStatus.NOT_FOUND,"No record found for ID");
    }
    res.status(httpStatus.CREATED).json(videos);
})
module.exports = {
    getVideos,
    getVideosByID,
    postVideos,
    patchVideosByID,
    patchVideosByViews
}