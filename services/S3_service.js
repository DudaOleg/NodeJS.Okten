const S3 = require('aws-sdk/clients/s3');
const path = require('path');
const uuid = require('uuid').v1;

const {
  constEnv: {
    AWS_S3_NAME,
    AWS_S3_SECRET_KEY,
    AWS_S3_ACCESS_KEY,
    AWS_S3_REGION
  }
} = require('../config');

const bucket = new S3({
  region: AWS_S3_REGION,
  accessKeyId: AWS_S3_ACCESS_KEY,
  secretAccessKey: AWS_S3_SECRET_KEY
});

module.exports = {
  uploadFile: (file, itemType, itemId) => {
    const { data, mimetype, name } = file;
    const fileName = _fileNameBuilder(name, itemType, itemId.toString());

    return bucket
      .upload({
        Bucket: AWS_S3_NAME,
        Body: data,
        Key: fileName,
        ContentType: mimetype
      })
      .promise();
  },

  deleteFile: (way) => {
    const Key = way.substring(49);
    return bucket.deleteObject({
      Bucket: AWS_S3_NAME,
      Key,
    }).promise();
  }
};

function _fileNameBuilder(fileName, itemType, itemId) {
  const fileExtension = fileName.split('.').pop();
  return path.posix.join(itemType, itemId, `${uuid()}.${fileExtension}`);
}
