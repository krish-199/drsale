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
    .collection('patient_visits')
    .insertOne(newDocument, function (err, result) {
      if (err) {
        console.log('err', err);
        res
          .status(httpStatus['400_MESSAGE'])
          .send('Error Storing Visit details!!');
      } else {
        if ('bp_max' in body || 'bp_min' in body) {
          db.collection('bp_track').insertOne({
            visit_id: result.insertedId,
            patient_id: newDocument[patient_id],
            bp_max: Number(bp_max),
            bp_min: Number(bp_min),
          });
        }
        res
          .status(httpStatus.OK)
          .send(JSON.stringify({ visitId: result.insertedId }));
      }
    });
};

export default addVisit;
