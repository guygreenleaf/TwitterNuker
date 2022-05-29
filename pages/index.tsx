import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Button, ButtonGroup } from '@chakra-ui/react'
import {signIn, signOut} from "next-auth/react"
import {useSession} from "next-auth/react"
import {useRouter} from "next/router"


const Home: NextPage = () => {


  const {data:session,status} = useSession()

  const router = useRouter();

  // if(status === "authenticated"){
  //   router.push("/Dashboard")
  // }

  return (
    <div className={styles.container}>
     {status === "authenticated" ? <Button colorScheme="blue" onClick={() => signOut()} >Sign Out</Button> 
                                 : <Button colorScheme='blue' onClick={() => signIn("twitter")}>Login with Twitter</Button>
     }

    </div>
  )
}



export default Home
