import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Button, ButtonGroup } from '@chakra-ui/react'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
     <Button colorScheme='blue'>
       Button
     </Button>
    </div>
  )
}

export default Home
