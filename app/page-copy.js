"use client"

import styles from "./page.module.css"
import SumsubWebSdk from "@sumsub/websdk-react"
import Image from "next/image"
import { useEffect, useState } from "react"

export default function Home() {
  const TOKEN = "_act-sbx-5f9ae53f-1cb1-42c0-a7f3-f31f48242887" // EXAMPLE TOKEN
  // IN CASE YOU NEED TO FETCH TOKEN FROM SERVER...
  const SERVER = "http://192.168.0.171:3000/sumsub-access-token"

  // useEffect(() => {
  //   fetchToken()
  // }, [])

  const fetchToken = async () => {
    try {
      const response = await fetch(SERVER)
      if (!response.ok) {
        throw new Error("Network response was not ok")
      }
      const data = await response.json()
      const currentToken = data.token.token
      // console.log(currentToken)
      return currentToken
    } catch (error) {
      console.error("Error fetching data: ", error)
    }
  }

  const handler = () => Promise.resolve(fetchToken())
  // const handler = () => Promise.resolve(TOKEN)
  const options = {}
  const messageHandler = (message) => console.log(message)
  const errorHandler = (error) => console.log(error)

  const config = {
    lang: "en",
    email: "applicantEmail",
    phone: "applicantPhone",
    i18n: "customI18nMessages",
    onMessage: (type, payload) => {
      console.log("WebSDK onMessage", type, payload)
    },
    uiConf: {
      customCss: "https://url.com/styles.css",
    },
    onError: (error) => {
      console.error("WebSDK onError", error)
    },
  }

  const openSumsub = () => {
    setDisplaySumsub((prev) => !prev)
    // alert("openSumsub")
    // fetchToken()
  }

  const [displaySumsub, setDisplaySumsub] = useState(false)

  return (
    <main className={styles.main}>
      <div style={{ display: "flex", flexDirection: "column", margin: 10 }}>
        <button onClick={openSumsub} type="button">
          {displaySumsub ? "Close Card" : "Open Sumsub Card"}
        </button>
        <Image src="/screen.jpg" width={270} height={600} alt="screen" />
      </div>

      <div style={{ width: 270, margin: 10 }}>
        {displaySumsub && <SumsubWebSdk accessToken={TOKEN} expirationHandler={handler} config={config} options={options} onMessage={messageHandler} onError={errorHandler} />}
      </div>
    </main>
  )
}
