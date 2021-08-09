import React, { useState, useEffect } from 'react'
import './App.css'

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition
const mic = new SpeechRecognition()

mic.continuous = true
mic.interimResults = true
mic.lang = 'tr'


function App() {

  const [isListening, setIsListening] = useState(false)
  const [note, setNote] = useState(null)
  const [savedNotes, setSavedNotes] = useState(localStorage.savedNotes && JSON.parse(localStorage.savedNotes) || [])

  useEffect(() => {
    handleListen()
  }, [isListening])

  useEffect(() => {
    console.log("localstorage : " + savedNotes)
    localStorage.setItem('savedNotes', JSON.stringify(savedNotes))
  }, [savedNotes])

  const handleListen = () => {
    if (isListening) {
      mic.start()
      mic.onend = () => {
        console.log('continue..')
        mic.start()
      }
    } else {
      mic.stop()
      mic.onend = () => {
        console.log('Stopped Mic on Click')
      }
    }
    mic.onstart = () => {
      console.log('Mics on')
    }

    mic.onresult = event => {
      const transcript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('')
      setNote(transcript)
      mic.onerror = event => {
        console.log(event.error)
      }
    }
  }

  const handleSaveNote = () => {
    setSavedNotes([...savedNotes, note])
    setNote('')
  }

  const handleDelete = () => {
    localStorage.removeItem('savedNotes')
  }

  return (

    <>

      <h1>Konuşan Notlar</h1>
      <div className="container">

        <div className="box">
          <h2>Mevcut Notum</h2>
          {isListening ? <span>🎙️</span> : <span>🛑🎙️</span>}
          <button style={{ cursor: "pointer" }} onClick={handleSaveNote} disabled={!note}>
            Notu Kaydet
          </button>
          <button style={{ cursor: "pointer" }} onClick={() => setIsListening(prevState => !prevState)}>
            Başlat/Durdur
          </button>
          <p>{note}</p>
        </div>

        <div className="box">
          <h2>Tüm Notlar</h2>
          {savedNotes && savedNotes.map((note) => (
            <div className="notes-box">
              <p key={note}>{note}</p>
              <button onClick={handleDelete} className="notes-button">Sil</button>
              <button className="notes-button"></button>
            </div>
          ))}
        </div>

      </div>

    </>

  );
}

export default App;
