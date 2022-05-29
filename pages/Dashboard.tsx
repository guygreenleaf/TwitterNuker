import { Button } from "@chakra-ui/react";
import { GetServerSideProps, NextPage } from "next"
import {getSession, useSession} from "next-auth/react"
import {useRouter} from "next/router"
import axios from "axios";
import { rmSync } from "fs";
import { useState } from "react";
import { calcBoxDelta } from "framer-motion/types/projection/geometry/delta-calc";


const Dashboard: NextPage = ({session, userID, tweetCount}: any) => {

    const router = useRouter();

    const {status} = useSession({
        required: true,
        onUnauthenticated(){
            router.push("/")
        }
    })
   

    type Tweet = {
        id: string,
        text: string,
    }

    const GetUserTweets = async () => {
        try { 
            const url = `http://localhost:3000/api/twitter/getTweeters/${userID}`
            const res = await fetch(url, {
                headers: {
                    "Content-Type": "application/json",
                },
                method:"GET",        
            })

            const result = await res.json();
            

            //get all tweet IDs to be deleted 
            const tweetArray : Array<Tweet> = result["data"].map((twit: { id: string; text: string; }) => ({id: twit.id, text: twit.text}));
            tweetArray.forEach(twit => {
                console.log(twit.id);
            })
        } catch (error) {
            console.log(error)
        }          
    }
    
    
    return (
        <div>
              {status === "loading" 
              ? 
                <div>
                    Loading...
                </div>              
                :
                <div> 
                    <div>
                        LOGGED IN AS: {userID}
                    </div>
                    <div>
                        NUMBER OF TWEETS TO BE DELETED: {tweetCount.data}
                    </div>
                    <div>
                        <Button onClick={() => GetUserTweets()}>Fetch Tweets</Button>
                    </div>
                </div>                                     
              }     
        </div>
    )
} 

export const getServerSideProps: GetServerSideProps = async(context) =>{

    const sesh = await getSession(context);
    let userID = sesh?.user?.id;

    const url = `http://localhost:3000/api/twitter/userTweetCount/${userID}`
    const res = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${process.env.TWITTER_BEARER_TOKEN}`
        },
        method:"GET",        
    })

    const tweetCount = await res.json();
   

    return {
        props: {userID, tweetCount}
    }
}


export default Dashboard;


