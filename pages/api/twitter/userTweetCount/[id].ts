import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
      
    const token = process.env.TWITTER_BEARER_TOKEN;

    const { id } = req.query;

    const endPointURL = `https://api.twitter.com/2/users/${id}?user.fields=public_metrics`;

    let getThatData = async (uri: string) => { 
      return await fetch( uri, {
        headers: {
            "User-Agent": "v2TweetLookupJS",
            "authorization": `Bearer ${token}`
        },
        method: "GET",
    });
    }
 
    const retData= await (await getThatData(endPointURL)).json();

     res.status(200).json({data: retData.data.public_metrics.tweet_count});
  }