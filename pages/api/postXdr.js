const Stellar = require('stellar-sdk')
const server = new Stellar.Server('https://horizon-testnet.stellar.org');

export default async (req, res) => {
  return new Promise((resolve, reject) => {
    const { body, method } = req;

    const handleXdr = async () => {
      const { data } = body;
      try {
          const bumpKeyPair = Stellar.Keypair.fromSecret(process.env.BUMP_SECRET)
          let bumpTransaction = new Stellar.TransactionBuilder
        .buildFeeBumpTransaction(
            bumpKeyPair,
            Stellar.BASE_FEE,
            data,
            Stellar.Networks.TESTNET)

    bumpTransaction.sign(bumpKeyPair)
          let response = await server.submitTransaction(bumpTransaction)
          return res.status(200).json({response})
      }
      catch (error) {
        res.status(400).json({ success: false, message: `${error.message}` });
      }
    };

    switch (method) {
      case "POST":
        handleXdr();
        break;
      default:
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  });
};
