import clientPromise from "@/lib/mongodb";
import httpStatus from "http-status";

const searchUser = async (req, res) => {
  try {
    const client = await clientPromise;

    const db = client.db();
    const body = JSON.parse(req.body);
    let re = new RegExp(body.searchValue);
    const users = await db
      .collection('patients')
      .find({ [body.searchField]: re })
      .limit(50)
      .toArray();

    if (users.length === 0) {
      console.log("Patient doesn't exist");
      res.status(httpStatus.BAD_REQUEST).json("Patient doesn't exist");
    } else {
      res.status(httpStatus.OK).json(users);
    }
  } catch (error) {
    console.error(`Error While fetching ${error}`);
  }
};

export default searchUser;
