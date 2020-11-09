import AWS from "aws-sdk";
import multer from "multer";
import multerS3 from "multer-s3";

// Disable to consume it as a Stream when uploading files
export const config = {
  api: {
    bodyParser: false,
  },
};

const checkFilesRequest = ({ req, res, resolve, reject }) => {
  if (req.files === undefined || req.files.length === 0) {
    reject(
      res.status(500).json({
        status: "fail",
        message: "Error: No File Selected",
      })
    );
  } else {
    let fileArray = req.files,
      fileLocation;
    const folderReference = fileArray[0].key?.split("/")[0]?.trim() || "";
    const filesArray = [folderReference];
    for (let i = 0; i < fileArray.length; i++) {
      fileLocation = fileArray[i].location;
      filesArray.push(fileLocation);
    }
    resolve(
      res.status(200).json({
        status: "ok",
        filesArray: fileArray,
        locationArray: filesArray,
      })
    );
  }
};

export default async (req, res) => {
  //Added promise to remove warning message: API resolved without sending a response for /api/upload...
  return new Promise((resolve, reject) => {
    const { method } = req;
    const handlePost = async (req, res) => {
      const s3 = new AWS.S3({
        accessKeyId: process.env.PAGAS_AWS_ACCESS_KEY,
        secretAccessKey: process.env.PAGAS_AWS_SECRET_ACCESS_KEY,
        region: process.env.PAGAS_AWS_REGION,
        maxRetries: 3,
      });
      const timestamp = new Date().getTime();
      const upload = multer({
        limits: { fileSize: 10 * 1024 * 1024 }, // 10MB file size limit
        storage: multerS3({
          s3: s3,
          bucket: process.env.BUCKET_NAME,
          // ContentType: "application/zip",
          contentType: multerS3.AUTO_CONTENT_TYPE,
          acl: "public-read",
          key: (req, file, cb) => {
            cb(null, `${timestamp}/${file.originalname}`); //Saves files inside a folder with the date and time as folder name
          },
        }),
      });
      // "file" is the file input name(<input name='file'>)
      upload.any("file")(req, {}, (err) => {
        //(any) accepts any file format
        if (err) {
          console.log("Error occured while trying to upload to S3 bucket", err);
          res.status(err.statusCode).json({
            status: "fail",
            error: err,
          });
        } else checkFilesRequest({ req, res, resolve, reject });
      });
    };
    switch (method) {
      case "POST":
        handlePost(req, res);
        break;
      default:
        res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  });
};
