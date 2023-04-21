const aws = require('aws-sdk')



//--------------------------------AWS Configuration-------------------------------------

aws.config.update({
    accessKeyId: "AKIA4LFH7ESHRAI4CSIX",
    secretAccessKey: "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",
    region: "ap-south-1"
})

//--------------------------------AWS file upload--------------------------

const uploadFile = async function (file, name) {
    return new Promise(function (resolve, reject) {
        // Create S3 service object
        const s3 = new aws.S3({ apiVersion: "2006-03-01" })
        const uploadParams = {
            ACL: "public-read",
            Bucket: "abhi-gupta-benthon",
            Key: name + "/" + file.originalname +Date.now(),
            Body: file.buffer,
        }
        s3.upload(uploadParams, function (err, data) {
            if (err) {
                return reject({ "error": err })
            }

            return resolve(data.Location) 
        })
    })
}


module.exports.uploadFile = uploadFile