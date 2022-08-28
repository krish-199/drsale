import clientPromise from "@/lib/mongodb";
import httpStatus from "http-status";

export default async (req, res) => {
  const client = await clientPromise;

  const db = client.db();
  const body = JSON.parse(req.body);
  let re = new RegExp(body.searchValue);
  const users = await db
    .collection("patients")
    .find({ [body.searchField]: re }, function (err, result) {
      if (err) {
        console.log("err", err);
        res
          .status(httpStatus["400_MESSAGE"])
          .send("Error Storing Visit details!!");
      }
    })
    .limit(50)
    .toArray();

  res.status(httpStatus.OK).json(users);
};
