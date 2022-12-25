const express = require("express");
const router = express.Router();
const {videosController} = require("../../controllers/index");
const validate = require("../../middlewares/validate")
const videoSchema = require("../../validations/videos.validation");

const validateVideoURL = validate(videoSchema.getVideosID);
const validateVideo = validate(videoSchema.getVideosQuery);
console.log("insie router");
router.get("/",validateVideo,videosController.getVideos);
router.get("/:videoId",validateVideoURL,videosController.getVideosByID);

const validateVideoBody = validate(videoSchema.PostVideosBody);
router.post("/",validateVideoBody,videosController.postVideos)
router.patch("/:videoId/votes",videosController.patchVideosByID);
router.patch("/:videoId/views",videosController.patchVideosByViews);

module.exports=router;
