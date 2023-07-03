import clientPromise from "@/lib/mongodb";

export default async (req, res) => {
  if (req.method === "POST") {

    const client = await clientPromise;

    const db = client.db();

    const body = req.body

    await db.collection("chats").insertOne({
      ...body
    });
    // get message
    const message = req.body;

    // dispatch to channel "message"
    res?.socket?.server?.io?.emit("message", message);

    // return message
    res.status(201).json(message);
  }
};
