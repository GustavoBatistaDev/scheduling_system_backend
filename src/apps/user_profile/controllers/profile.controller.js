const updateProfileService = require("../services/updateProfile.service");
const aws = require('aws-sdk');

const { updateUserPhotoService } = require("../services/updateUserPhoto.service");
const { validateUpdateProfileService } = require("../services/validateUpdateProfile.service");

const endpoint = new aws.Endpoint(process.env.BUCKET_ENDPOINT);

const s3 = new aws.S3({
    endpoint,
    credentials: {
        accessKeyId: process.env.KEY_ID,
        secretAccessKey: process.env.APLICATION_KEY
    }
});

const getDataProfileController = async (req, res) => {
    delete req.user.password;
    return res.send(req.user)
};

const updateProfileController = async (req, res) => {
    const body = req.body;

    const updated = await updateProfileService(body, req.user.id);

    if(updated?.message){
        return res.status(400).json(updated);
    }

    return res.status(204).send();
};

const updatePhotoProfileController = async (req, res) => {
    const { file } = req;

    try {
        const upLoadfile = await s3.upload({
            Bucket: process.env.BACKBLAZE_BUCKET,
            Key: `users/${file.originalname}`,
            Body: file.buffer,
            ContentType: file.mimetype

        }).promise();

        if(req.user.photo){
            const regex = /\/([^\/]+)$/;
            const oldUrl = req.user.photo;

            const match = oldUrl.match(regex);

            if (match) {
                const pathImg = match[1];
                console.log(pathImg);
                 try {
                    await s3.deleteObject({
                        Bucket: process.env.BACKBLAZE_BUCKET,
                        Key: pathImg
                    
                    }).promise();

                    await updateUserPhotoService(req.user.id, upLoadfile.Location)
                    return res.status(204).send();

                } catch (error) {
                    console.log(error);
                    return res.status(500).json({ message: 'erro interno do servidor'});
                }
            }
        }

        await updateUserPhotoService(req.user.id, upLoadfile.Location)
        return res.status(204).send();

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'erro interno do servidor'});
    }
};

const deletePhotoProfile = async (req, res) => {
    const { file } = req.query;

    try {
        await s3.deleteObject({
            Bucket: process.env.BACKBLAZE_BUCKET,
            Key: file
          
        }).promise();

    return res.status(204).send();

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'erro interno do servidor'});
    }
};

module.exports = {
    getDataProfileController,
    updateProfileController,
    updatePhotoProfileController,
    deletePhotoProfile
};