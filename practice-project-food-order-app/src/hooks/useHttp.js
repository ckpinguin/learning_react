import { useCallback } from "react"
import { useEffect } from "react"
import { useState } from "react"

async function sendHttpRequest(url, config) {
  const response = await fetch(url, config)

  const resData = await response.json()

  if (!response.ok) {
    throw new Error(resData.message || "Something went wrong!")
  }

  return resData
}

export default function useHttp(url, config, initialData) {
  const [data, setData] = useState(initialData)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()

  const sendRequest = useCallback(
    async function sendRequest(data) {
      setIsLoading(true)
      try {
        const resData = await sendHttpRequest(url, { ...config, body: data })
        setData(resData)
      } catch (error) {
        setError(error.message || "Something went wrong!")
        console.error(error)
      }
      setIsLoading(false)
    },
    [url, config]
  )

  // For GET requests we can directly call sendRequest
  useEffect(() => {
    if ((config && (config.method === "GET" || !config.method)) || !config) {
      sendRequest()
    }
  }, [sendRequest, config])

  // For POST etc. we expose sendRequest to the caller
  return { data, isLoading, error, sendRequest }
}
