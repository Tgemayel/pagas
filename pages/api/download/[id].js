import archiver from "archiver";
import aws from "aws-sdk";

// Disable to consume it as a Stream when uploading files
export const config = {
  api: {
    bodyParser: false,
  },
};

aws.config.update({
  accessKeyId: process.env.PAGAS_AWS_ACCESS_KEY,
  secretAccessKey: process.env.PAGAS_AWS_SECRET_ACCESS_KEY,
  region: process.env.PAGAS_AWS_REGION,
});
const S3 = new aws.S3();

const createZipFile = async (fileName, res) => {
  try {
    let arrayPromise = [];
    let zip = new archiver.create("zip");
    zip.on("error", (e) => {
      throw new Error(e.message);
    });
    let fileList = await S3.listObjectsV2({
      Bucket: process.env.BUCKET_NAME,
      Prefix: fileName,
    }).promise();
    for (let currentValue of fileList.Contents) {
      if (currentValue.Size > 0) {
        let goParams = {
          Bucket: process.env.BUCKET_NAME,
          Key: currentValue.Key,
        };
        arrayPromise.push({
          fileName: currentValue.Key,
          fileData: await S3.getObject(goParams).promise(),
        });
      }
    }

    let listFiles = await Promise.all(arrayPromise);
    listFiles.forEach((fileObj) => {
      zip.append(fileObj.fileData.Body, {
        name: `${fileObj.fileName}`,
      });
    });
    return zip;
  } catch (err) {
    res.status(405).end({ message: err });
  }
};

export default async (req, res) => {
  return new Promise((resolve, reject) => {
    const {
      query: { id },
      method,
    } = req;

    const handleGet = async () => {
      try {
        if (id) {
          let timestamp = new Date().getTime();
          let fileName = `${timestamp}.zip`;
          let zip = await createZipFile(id, res);
          res.writeHead(200, {
            "Content-Type": "application/zip",
            "Content-Disposition": "attachment; filename=" + fileName,
          });
          zip.pipe(res); // pipe converted file to HTTP response
          zip.finalize();
        } else {
          reject(res.status(400).json({ message: "fileName is required" }));
        }
      } catch (error) {
        reject(res.status(400).json({ message: error }));
      }
    };
    switch (method) {
      case "GET":
        handleGet();
        break;
      default:
        res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  });
};
