"use client"

import styles from "./page.module.css"
import SumsubWebSdk from "@sumsub/websdk-react"
import { useEffect } from "react"

export default function Home() {
  const TOKEN = "YOUR VALID TOKEN"

  // IN CASE YOU NEED TO FETCH TOKEN FROM SERVER...

  // const SERVER = "YOUR VALID SERVER API"

  // useEffect(() => {
  //   fetchToken()
  // }, [])

  // const fetchToken = async () => {
  //   try {
  //     const response = await fetch(SERVER)
  //     if (!response.ok) {
  //       throw new Error("Network response was not ok")
  //     }
  //     const data = await response.json()
  //     const currentToken = data.token.token
  //     // console.log(currentToken)
  //     return currentToken
  //   } catch (error) {
  //     console.error("Error fetching data: ", error)
  //   }
  // }

  // const handler = () => Promise.resolve(fetchToken())
  const handler = () => Promise.resolve(TOKEN)
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

  return (
    <main className={styles.main}>
      <SumsubWebSdk accessToken={TOKEN} expirationHandler={handler} config={config} options={options} onMessage={messageHandler} onError={errorHandler} />
    </main>
  )
}
