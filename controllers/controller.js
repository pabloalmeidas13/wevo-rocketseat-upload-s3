const AWS = require('aws-sdk');
const config = require('../config/constants');

exports.uploadS3 = async (req, res, next) => 
{
    var imageInfo = {
        path : req.file.location,
        key : req.file.key
    };

    res.status(200).json(imageInfo);
}

exports.uploadAwsSdk = async (req, res, next) =>
{
    //Instancia a Service do AWS S3
    const s3Config = new AWS.S3({
        accessKeyId : config.accessKeyId,
        secretAccessKey : config.secretAccessKey
    });

    if (!req.file)
    {
        res.status(400);
        return;
    }

    try
    {
        //Criação dos parâmetros para enviar para o S3
        var params = {
            Body: req.file.buffer, //Dados da imagem
            Bucket:config.bucketName, //Bucket em que será salva a imagem
            Key: req.file.originalname,
            ContentType: req.file.mimetype, 
            ACL: 'public-read',
            ContentEncoding : "application/json"
        };
    
        //Envio da imagem para o S3
        let imageInfo = await s3Config.upload(params).promise();
        res.status(200).json(imageInfo);
    }
    catch(err)
    {
        res.status(400).json(err);
    }    
}