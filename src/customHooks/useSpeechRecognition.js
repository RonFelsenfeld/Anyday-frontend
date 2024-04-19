import { useEffect, useState } from 'react'

let recognition
recognition = new webkitSpeechRecognition()
recognition.continuous = true
recognition.lang = 'en-US'

export function useSpeechRecognition(setState) {
  // const [text, setText] = useState('')
  const [isListening, setIsListening] = useState(false)

  useEffect(() => {
    if (!recognition) return

    recognition.onresult = ev => {
      // console.log('onresult: ', ev)
      // setText(ev.results[0][0].transcript)
      const res = ev.results[0][0].transcript
      const capitalizedSentence = res.charAt(0).toUpperCase() + res.slice(1)
      setState(capitalizedSentence)
      stopListening()
    }
  }, [isListening])

  // console.log(text)

  function startListening() {
    if (isListening) return

    // setText('')
    setIsListening(true)
    recognition.start()
  }

  function stopListening() {
    setIsListening(false)
    // setText('')
    recognition.stop()
  }

  return {
    // text,
    isListening,
    startListening,
    stopListening,
    hasRecognition: !!recognition,
  }
}
