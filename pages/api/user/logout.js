// It ensures the user is logged out of their session with Magic.
// Overrides the current auth cookie with one that's expired, essentially clearing it out

import { magic } from "../../../utils/magic";
import { cookie } from "../../../utils/cookie";
import { serialize } from "cookie";

export default async (req, res) => {
  /* replace current auth cookie with an expired one */
  res.setHeader(
    "Set-Cookie",
    serialize("auth", "", {
      ...cookie,
      expires: new Date(Date.now() - 1),
    })
  );

  let userFromCookie;

  try {
    userFromCookie = await decryptCookie(req.cookies.auth);
  } catch (error) {
    /* if there's no valid auth cookie, user is not logged in */
    return res.json({ authorized: false, error });
  }

  /* log use out of Magic */
  await magic.users.logoutByToken(userFromCookie.publicAddress);

  return res.json({ authorized: false });
};
