const {TransactionStellarUri} = require("@stellarguard/stellar-uri");

const Product = require("../models/Product");
const Stellar = require('stellar-sdk')
const {TimoutInfinite} = require("stellar-base")
const util = require('util')
const server = new Stellar.Server("https://horizon-testnet.stellar.org", {allowHttp: true})

// USER + signer [PUB, PRIV]
const userPrivateKey = "SBSYQQPHUONG4WHKA4ORRERK4XDPSTE5B4O27GUX5XY4SZPWGLHUMGDB"
const userKeyPair = Stellar.Keypair.fromSecret(userPrivateKey)

// FEE-BUMP +signer [ PUB, PRIV ]
const bumpPrivateKey = 'SBVG2YVIPHAOFRQDRCGFDJIIEH42NCLB3DFJGBQ4Q4ZMKEJ75XURMSPO'
const bumpKeyPair = Stellar.Keypair.fromSecret(bumpPrivateKey)

// MERCHANT [ PUB ] Testnet "Account 3" Wallet
const merchantPublicKey = "GDLLYUCYF6YD5WEQ2IZSQHNSPTP27SVFAJSH45XH23I73ICBE2ZCTPRJ"


const makeRand = () => {
    return Math.floor(Math.random() * Math.pow(2, 63) + 1);
};

exports.pay = async (req, res) => {
    console.log(userKeyPair.publicKey())
    console.log(bumpKeyPair.publicKey())

    const userAccountLoad = await server.loadAccount(userKeyPair.publicKey())

    let transaction = new Stellar
        .TransactionBuilder(userAccountLoad,
            {
                fee: "100",
                networkPassphrase: Stellar.Networks.TESTNET
            })
        .addOperation(Stellar.Operation.payment({
            destination: merchantPublicKey,
            asset: Stellar.Asset.native(),
            amount: "1",
        }))
        .addMemo(Stellar.Memo.id(makeRand().toString()))
        .setTimeout(TimoutInfinite)
        .build()

    transaction.sign(userKeyPair)

    let bumpTransaction = new Stellar.TransactionBuilder
        .buildFeeBumpTransaction(bumpKeyPair,
            Stellar.BASE_FEE,
            transaction,
            Stellar.Networks.TESTNET)

    bumpTransaction.sign(bumpKeyPair)

    let response = server.submitTransaction(bumpTransaction)
        .then((e) => {
            console.log(">>>>>>", e);
        }).catch((e) => {
            console.log(">>>> errorrrr", e.message);
        });

    const uri = TransactionStellarUri.forTransaction(transaction).toString()
    console.log(uri)

    // // let response = await server.submitTransaction(transaction)
    // console.log(util.inspect(response, false, null))
    return res.status(200).json({"hash": response.hash});
};
 
