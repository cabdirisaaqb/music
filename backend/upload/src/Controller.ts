import { Request,Response } from "express";




export const uploadAvatar = (req:Request,res:Response)=>{
    try {
        const file = req.file as Express.Multer.File;
        if(!file){
            res.status(400).json({error:"No file uploaded"})

        }
        const file_url = `${req.protocol}://${req.get("host")}/${file.path}`

        res.status(200).json({avatar:file_url})



    } catch (error:any) {
        res.status(500).json({massages:error.message})
        console.log(error)
        
    }
   
}

export const uploadAlbum = (req:Request,res:Response)=>{
    try {
        const file = req.file as Express.Multer.File;
        if(!file){
            res.status(400).json({error:"No file uploaded"})

        }
        const file_url = `${req.protocol}://${req.get("host")}/${file.path}`

        res.status(200).json({album:file_url})



    } catch (error:any) {
        res.status(500).json({massages:error.message})
        console.log(error)
        
    }
  
}

export const uploadAudio = (req: Request, res: Response) => {
    try {
       
        if (!req.files) {
            return res.status(400).json({ message: "file is required" });
        }

        const files = req.files as { [fieldname: string]: Express.Multer.File[] };
        
        let audioUrl: string | undefined;
        let imgUrl: string | undefined;

       
        if (files.audio && files.audio.length > 0) {
            const audioFile = files.audio[0];
            audioUrl = `${req.protocol}://${req.get("host")}/${audioFile.path}`;
        }

     
        if (files.img && files.img.length > 0) {
            const imgFile = files.img[0];
            imgUrl = `${req.protocol}://${req.get("host")}/${imgFile.path}`;
        }

        res.status(200).json({ audioUrl, imgUrl });

    } catch (error: any) {
        res.status(500).json({ massages: error.message });
        console.log(error);
    }
}