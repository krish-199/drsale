import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import httpStatus from "http-status";

const addVisit = async (req, res) => {
  const client = await clientPromise;

  const db = client.db();
  const body = JSON.parse(req.body);

  const newDocument = {
    ...body,
    patient_id: ObjectId(body.patient_id),
    amount: Number(body.amount),
    date: new Date(),
  };

  await db
    .collection("patient_visit")
    .insertOne(newDocument, function (err, result) {
      if (err) {
        console.log("err", err);
        res
          .status(httpStatus["400_MESSAGE"])
          .send("Error Storing Visit details!!");
      } else {
        res
          .status(httpStatus.OK)
          .send(JSON.stringify({ visitId: result.insertedId }));
      }
    });
};

export default addVisit;
