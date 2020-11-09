import dbConnect from "../../../utils/dbConnect";
import Product from "../../../models/Product";

dbConnect();

export default async (req, res) => {
  return new Promise((resolve, reject) => {
    const {
      query: { id },
      method,
    } = req;

    const handleGet = async () => {
      try {
        const product = await Product.findById(id);

        if (!product) {
          return res.status(404).json({
            status: 404,
            message: "Not Found",
          });
        }
        return res.status(200).json({ data: product });
      } catch (error) {
        res.status(400).json({ success: false, message: `${error.message}` });
      }
    };

    const handlePut = async () => {
      try {
        const product = await Product.create(req.body);
        res.status(201).json({ data: product });
      } catch (error) {
        res.status(400).json({ success: false, message: `${error.message}` });
      }
    };

    switch (method) {
      case "GET":
        handleGet();
        break;
      case "PUT":
        handlePut();
        break;
      default:
        res.setHeader("Allow", ["GET", "PUT"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  });
};
