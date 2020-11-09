// Validate the DID token and create a new user in the database.
// A cookie is issued to track the user sessions.

import { magic } from "../../../utils/magic";
import { encryptCookie, cookie } from "../../../utils/cookie";
import { serialize } from "cookie";
import User from "../../../models/User";
import dbConnect from "../../../utils/dbConnect";

/* open connection to database */
dbConnect();

/* save new user to database */
const signup = async (user) => {
  let newUser = {
    email: user.email,
    issuer: user.issuer,
  };
  return await new User(newUser).save();
};

export default async (req, res) => {
  const { method } = req;

  if (method !== "POST") {
    return res.status(400).json({ message: "Only POST requests are accepted" });
  }

  /* strip token from Authorization header */
  let DIDT = magic.utils.parseAuthorizationHeader(req.headers.authorization);

  /* validate token to ensure request came from the issuer */
  await magic.token.validate(DIDT);

  /* decode token to get claim obj with data */
  let claim = magic.token.decode(DIDT)[1];

  /* get user data from Magic */
  const userMetadata = await magic.users.getMetadataByIssuer(claim.iss);

  /* check if user is already in */
  const existingUser = await User.findOne({ issuer: claim.iss });

  /* Create new user if doesn't exist */
  !existingUser && signup(userMetadata);

  /* encrypted cookie details */
  const token = await encryptCookie(userMetadata);

  /* set cookie */
  await res.setHeader("Set-Cookie", serialize("auth", token, cookie));

  /* send back response with user obj */
  return res.json({ authorized: true, user: userMetadata });
};
