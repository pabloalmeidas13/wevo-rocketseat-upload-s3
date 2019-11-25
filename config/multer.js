//Carregando os modulos
const AWS = require('aws-sdk');
const multerS3 = require('multer-s3');
const config = require('./constants');

module.exports = {
    //Define onde salvar a imagem
    //Com o multerS3 conseguimos definir as configurações para salvar direto no S3
    storage: multerS3({
        // Configurações do S3
        s3: new AWS.S3({
            accessKeyId : config.accessKeyId,
            secretAccessKey : config.secretAccessKey
        }),
        // O bucket usado para armazenar o arquivo
        bucket: config.bucketName,
        //O contentType AUTO_CONTENT_TYPE encontraá automaticamente o tipo de conteúdo do arquivo 
        // O valor default é application/octet-stream 
        contentType: multerS3.AUTO_CONTENT_TYPE,
        //Controle de acesso para o arquivo	
        acl: 'public-read',
        //Define o nome do arquivo
        key: function (req, file, cb) {
            var fileName = `${Date.now().toString()}-${file.originalname}`;

            cb(null, fileName)
        }
    }),
    //Função que irá validar o tipo da imagem, caso não seja um tipo valido retorna erro
    fileFilter: (req, file, cb) => {
        const allowedMimes = [
            "image/jpeg",
            "image/pjpeg",
            "image/png",
            "image/gif"
        ];

        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Invalid file type."));
        }
    }
}