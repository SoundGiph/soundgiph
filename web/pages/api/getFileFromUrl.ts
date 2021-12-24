import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const getFileFromUrl = async (req: NextApiRequest, res: NextApiResponse) => {
  const { url } = req.query;
  try {
    const { data } = await axios(url as string);
    res.status(200).send(data);
  } catch (error: any) {
    console.log(error);
    res.status(400).send(error.toString());
  }
};

export default getFileFromUrl;
