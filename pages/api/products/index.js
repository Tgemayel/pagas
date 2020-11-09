import dbConnect from "../../../utils/dbConnect";
import Product from "../../../models/Product";

dbConnect();

export default async (req, res) => {
  const { method } = req;

  const handleGet = async () => {
    try {
      const products = await Product.find({});
      res.status(200).json({ products });
    } catch (error) {
      res.status(400).json({ success: false });
    }
  };

  const handlePost = async () => {
    try {
      const product = await Product.create(req.body);
      res.status(201).json({ success: true, data: product });
    } catch (error) {
      res.status(400).json({ success: false, message: `${error.message}` });
    }
  };

  switch (method) {
    case "GET":
      handleGet();
      break;
    case "POST":
      handlePost();
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};
