import multer from "multer";
import path from 'path'

const storage = multer.diskStorage({
    destination:(req,file,cb) =>{
        cb(null,'uploads/')
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req,file,cb) =>{
    const allowedTypes =['image/jpeg', 'image/png', 'image/gif', 'image/jpg']
    const isMimeTypeAllowed = allowedTypes.includes(file.mimeType)
    const ext = path.extname(file.originalname).toLowerCase();
    const isExtensionAllowed =['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp', '.tiff', '.jfif'].includes(ext);
    if(isMimeTypeAllowed || isExtensionAllowed){
        cb(null,true)
    }else{
        cb(new Error("Only Images are allowed"),false);
    }
};

export const upload = multer({
    storage,
    fileFilter,
    limits:{fileSize:5*1024*1024}
})