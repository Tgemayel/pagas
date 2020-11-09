const Stellar = require('stellar-sdk')
const server = new Stellar.Server('https://horizon-testnet.stellar.org');

export default async (req, res) => {
  return new Promise((resolve, reject) => {
    const { body, method } = req;

    const handlePost = async () => {
      const { customerPk, productPrice, merchantPk } = body;
      const makeRand = () => {
          return Math.floor(Math.random() * Math.pow(2, 63) + 1)};
      try {
          let customerLoad = await server.loadAccount(customerPk)
        let transaction = new Stellar
        .TransactionBuilder(customerLoad,
            {
                fee: "100",
                networkPassphrase: Stellar.Networks.TESTNET
            })
        .addOperation(Stellar.Operation.payment({
            destination: merchantPk,
            asset: Stellar.Asset.native(),
            amount: productPrice.toString(),
        }))
        .addMemo(Stellar.Memo.id(makeRand().toString()))
        .setTimeout(2400)
        .build()
        let CALLBACK_URL = 'pagas-frontend.vercel.app/api/postxdr';
        const getXDRFromTransaction = (transaction2) => {
        const xdrBuffer = transaction2.toXDR();
        return xdrBuffer.toString("base64");}

        let XDR = getXDRFromTransaction(transaction); // ENCODE TO URL
        let uri = `web+stellar:tx?xdr=${encodeURI(XDR)}&callback=url%3A${encodeURI(CALLBACK_URL)}&pubkey=${customerPk}`;
        return res.status(200).json({ uri });
      } catch (error) {
        res.status(400).json({ success: false, message: `${error.message}` });
      }
    };

    switch (method) {
      case "POST":
        handlePost();
        break;
      default:
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  });
};
