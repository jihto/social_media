const multer = require('multer');

let imageUrl;
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        //allow format jpg, png, jpeg
        if(file.mimetype === "image/jpg" || file.mimetype === "image/png" ||  file.mimetype === "image/jpeg"){
            cb(null, 'public/images');
        }else{
            cb(new Error('not image'), false);
        } 
    },
    filename: function(req, file, cb) {
        //Create URL using date time
        imageUrl = Date.now() + ".png";
        data = imageUrl; 
        cb(null,imageUrl);
    },
}); 

const upload = multer({storage : storage});
const multiple_upload = multer({
    storage,
    limit: { fileSize: 1 * 1024 }, // 1MB
    fileFilter: (req, file, cb) => {
        if(file.mimetype === "image/jpg" || file.mimetype === "image/png" ||  file.mimetype === "image/jpeg"){
            cb(null, true);
        }else{
            cb(null, false);
            const error = new Error('not image');
            error.name = 'ExtensionError';
            cb(error);
        } 
    }
}).array('uploadedImages',2);

module.exports = { upload, multiple_upload};


