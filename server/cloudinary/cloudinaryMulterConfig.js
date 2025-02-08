const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinary')

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        const fileType = file.mimetype.split('/')[0]; // Get the type (image, video, audio)
        return {
            folder: 'chat-app', // Set the folder in Cloudinary where files will be stored
            resource_type: fileType === 'video' ? 'video' : fileType === 'audio' ? 'raw' : 'image', // Set resource type
        };
    },
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5,
    }
});

module.exports = upload;