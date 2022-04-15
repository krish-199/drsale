import clientPromise from "@/lib/mongodb";

export default async (req, res) => {
  const client = await clientPromise;

  const db = client.db();
  console.log("Priniting req", req.body);
  const users = await db
    .collection("users")
    .find({ name: /jo/ })
    .limit(50)
    .toArray();

  res.json(users);
};
