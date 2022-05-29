import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    name: string
  }

  
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
      
    const token = process.env.TWITTER_BEARER_TOKEN;

    const { id } = req.query;

    const endPointURL = `https://api.twitter.com/2/users/${id}/tweets`;

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

    let retTweets = [retData.data];

    let next_token = retData.meta.next_token;

    //fixme: EVENTUALLY delete tweets here in the while loop in 1 minute increments.
    while(next_token !== null && next_token !== undefined){     
      console.log("GOIN NEXT!");

      const endPointURLNext = `https://api.twitter.com/2/users/${id}/tweets?pagination_token=${next_token}`;

      const retDataNext= await (await getThatData(endPointURLNext)).json();

      next_token= await retDataNext.meta.next_token;
      console.log(next_token);

      retTweets.push(retDataNext.data);
     }

    //console.log(retTweets);

     res.status(200).json({data: retData.data});
  }