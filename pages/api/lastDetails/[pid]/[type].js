import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export default async (req, res) => {
  const { pid, type } = req.query;

  const client = await clientPromise;

  const db = client.db();
  const details = await db
    .collection(type)
    .find({ patient_id: ObjectId(pid) })
    .limit(5)
    .toArray();

  res.json(details);
};
