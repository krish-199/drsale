import clientPromise from "@/lib/mongodb";
import httpStatus from "http-status";

const getPatient = async (req, res) => {
  const client = await clientPromise;

  const db = client.db();
  const body = JSON.parse(req.body);
  const newDocument = {
    first_name: body.first_name.toLowerCase(),
    last_name: body.last_name.toLowerCase(),
    phone: Number(body.phone),
    gender: body.gender.toLowerCase(),
    age: Number(body.age),
    address: body.address,
    date: new Date(),
    reffered_by: body.reffered_by.toLowerCase(),
    history: body.history,
  };
  const user = await db.collection("patients").findOne({
    $or: [
      {
        first_name: newDocument.first_name,
        last_name: newDocument.last_name,
        gender: newDocument.gender,
      },
      { phone: { $in: [newDocument.phone], $nin: [null, "", 0] } },
    ],
  });

  if (user)
    res
      .status(httpStatus.OK)
      .send(JSON.stringify({ userExist: true, patientId: user._id }));
  else {
    await db
      .collection("patients")
      .insertOne(newDocument, function (err, result) {
        if (err)
          res
            .status(httpStatus.BAD_REQUEST)
            .send("Error Inserting Patient details!!");
        else {
          res
            .status(httpStatus.OK)
            .send(JSON.stringify({ patientId: result.insertedId }));
        }
      });
  }
};

export default getPatient;
