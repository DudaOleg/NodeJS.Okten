const S3 = require('aws-sdk/clients/s3');
const path = require('path');
const uuid = require('uuid').v1;

const bucket = new S3({
  region: 'a',
  accessKeyId: 'a',
  secretAccessKey: 'a'
});

module.exports = {
  uploadFile: (file, itemType, itemId) => {
    const { data, mimetype, name } = file;
    const fileName = _fileNameBuilder(name, itemType, itemId);

    return bucket
      .upload({
        Bucket: 'a',
        Body: data,
        Key: fileName,
        ContentType: mimetype
      })
      .promise();
  }
};

function _fileNameBuilder(fileName, itemType, itemId) {
  const fileExtension = fileName.split('.').pop();
  return path.posix.join(itemType, itemId.toString(), `${uuid()}.${fileExtension}`);
}
