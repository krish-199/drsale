import clientPromise from "@/lib/mongodb";

export default async (req, res) => {
  const client = await clientPromise;

  const db = client.db();
  const body = JSON.parse(req.body);
  let re = new RegExp(body.searchValue);
  const users = await db
    .collection("users")
    .find({ [body.searchField]: re })
    .limit(50)
    .toArray();
    
  res.json(users);
};
