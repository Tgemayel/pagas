const withCss = require("@zeit/next-css");

module.exports = withCss({
  env: {
    MONGO_URI: process.env.MONGO_URI,
    PRODUCT_API_URL: process.env.PRODUCT_API_URL, //Local environment. In PROD, using VERCEL the variable should be  specified
    MONGO_URI: process.env.MONGO_URI,
    PAGAS_AWS_ACCESS_KEY_ID: process.env.PAGAS_AWS_ACCESS_KEY_ID,
    SECRET_ACCESS_KEY: process.env.SECRET_ACCESS_KEY,
    PAGAS_AWS_REGION: process.env.PAGAS_AWS_REGION,
    BUCKET_NAME: process.env.BUCKET_NAME,
    MAGIC_SECRET_KEY: process.env.MAGIC_SECRET_KEY,
    NEXT_PUBLIC_MAGIC_PUB_KEY: process.env.NEXT_PUBLIC_MAGIC_PUB_KEY, //Local environment. In PROD, using VERCEL the variable should be  specified
    ENCRYPTION_SECRET: process.env.ENCRYPTION_SECRET,
  },
});
