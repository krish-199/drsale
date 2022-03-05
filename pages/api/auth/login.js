import withSession from "@/lib/session";
// import User from '@/models/user.model';
// import bcrypt from 'bcryptjs';
import httpStatus from "http-status";
// import dbConnect from '@/lib/dbConnect';
import clientPromise from "@/lib/mongodb";

export default withSession(async (req, res) => {
  const { email, password } = await req.body;
  try {
    const client = await clientPromise;
    // get user from db
    const user = await client
      .db()
      .collection("dmin")
      .findOne({ email: email.toLowerCase() });
    if (!user) {
      // password not valid
      return res
        .status(httpStatus.UNAUTHORIZED)
        .json({ message: "User does not exist" });
    }
    // compare hashed password
    const valid = password === user.password ? true : false;
    // if the password is a match
    if (valid === true) {
      req.session.set("user", { id: user._id, email: user.email });
      await req.session.save();
      return res.json(user);
    } else {
      // password not valid
      return res
        .status(httpStatus.UNAUTHORIZED)
        .json({ message: "Invalid Password" });
    }
  } catch (error) {
    console.log(error);
    const { response: fetchResponse } = error;
    res.status(fetchResponse?.status || 500).json(error.data);
  }
});
