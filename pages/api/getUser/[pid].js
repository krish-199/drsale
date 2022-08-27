import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export default async (req, res) => {
  const { pid } = req.query;

  const client = await clientPromise;

  const db = client.db();
  const users = await db.collection("patients").findOne({ _id: ObjectId(pid) });

  res.json(users);
};
