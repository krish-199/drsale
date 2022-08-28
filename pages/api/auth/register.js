import dbConnect from "@/lib/dbConnect";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import httpStatus from "http-status";
import withSession from "@/lib/session";

export default withSession(async (req, res) => {
  const { name, email, password } = await req.body;
  try {
    if (req.method === "POST") {
      await dbConnect();
      const userCheck = await User.findOne({ email: email.toLowerCase() });
      if (userCheck) {
        return res
          .status(httpStatus.BAD_REQUEST)
          .json({ message: "User already exists" });
      }
      // create user
      const hashPassword = await bcrypt.hash(password, 10);
      const user = await new User({
        name,
        email,
        password: hashPassword,
      });
      await user.save();
      req.session.user = { id: user._id, email: user.email };
      await req.session.save();
      return res.status(httpStatus.OK).end();
    }
    return res.status(httpStatus.BAD_REQUEST).end();
  } catch (error) {
    console.log(error, error.message);
    const { response: fetchResponse } = error;
    res.status(fetchResponse?.status || 500).json(error.message);
  }
});
