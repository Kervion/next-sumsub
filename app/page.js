"use client"

import styles from "./page.module.css"
import SumsubWebSdk from "@sumsub/websdk-react"
import Image from "next/image"
import { useEffect, useState } from "react"

export default function Home() {
  const SERVER = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"

  useEffect(() => {
    fetchToken(false)
  }, [])

  // HERE I ADDED TWO STATES TO HANDLE TOKEN FETCHING
  // tokenReady - to show button only when token is fet
  // token - to store token and pass it to SumsubWebSdk component

  const [tokenReady, setTokenReady] = useState(false)
  const [token, setToken] = useState(null)

  const fetchToken = async (refresh) => {
    try {
      const response = await fetch(SERVER)
      if (!response.ok) {
        throw new Error("Network response was not ok")
      }
      const data = await response.json()
      const currentToken = data.token.token
      if (refresh) {
        setToken(currentToken)
        return currentToken
      } else {
        setToken(currentToken)
        setTokenReady(true)
      }
    } catch (error) {
      console.error("Error fetching data: ", error)
    }
  }

  const handler = () => Promise.resolve(fetchToken(true))
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
      // customCss: "https://url.com/styles.css", // optional, if you need to customize styles
    },
    onError: (error) => {
      console.error("WebSDK onError", error)
    },
  }

  const openSumsub = () => {
    setDisplaySumsub((prev) => !prev)
  }

  const [displaySumsub, setDisplaySumsub] = useState(false)

  return (
    <main className={styles.main}>
      <div style={{ display: "flex", flexDirection: "column", margin: 10 }}>
        {tokenReady && (
          <button onClick={openSumsub} type="button">
            {displaySumsub ? "Close Card" : "Open Sumsub Card"}
          </button>
        )}
        <Image src="/screen.jpg" width={270} height={600} alt="screen" />
      </div>

      <div style={{ width: 270, margin: 10 }}>
        {displaySumsub && <SumsubWebSdk accessToken={token} expirationHandler={handler} config={config} options={options} onMessage={messageHandler} onError={errorHandler} />}
      </div>
    </main>
  )
}
