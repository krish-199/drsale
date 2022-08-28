import clientPromise from "@/lib/mongodb";
import httpStatus from "http-status";

const getMovies = async (req, res) => {
  const client = await clientPromise;

  const db = client.db();

  const movies = await db
    .collection("movies")
    .find({})
    .sort({ metacritic: -1 })
    .limit(20)
    .toArray();

  res.send(httpStatus.OK).json(movies);
};

export default getMovies;
