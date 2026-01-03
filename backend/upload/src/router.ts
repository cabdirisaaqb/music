import { Router } from "express";
import { avatarUpload } from "./multer/avatar.js";
import { albumUpload } from "./multer/album.js";
import { audioUpload } from "./multer/audio.js";
import { uploadAlbum,uploadAudio,uploadAvatar } from "./Controller.js";

const FileRouter = Router();
FileRouter.post("/avatar", avatarUpload.single("img"),uploadAvatar);

FileRouter.post("/album", albumUpload.single("img"),uploadAlbum);

FileRouter.post(
  "/audio",
  audioUpload.fields([
    { name: "audio", maxCount: 1 }, 
    { name: "img", maxCount: 1 }
  ]),
  uploadAudio
);

export default FileRouter;
