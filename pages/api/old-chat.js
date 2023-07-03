import clientPromise from "@/lib/mongodb";
import httpStatus from "http-status";

const getChats = async (req, res) => {
  const client = await clientPromise;

  const db = client.db();

  const chats = db.collection('chats').find();

  let arr = [];

  for await (const chat of chats) {
    arr.push(chat)
  }

  res.status(httpStatus.OK).send(JSON.stringify(arr))

};

export default getChats;
