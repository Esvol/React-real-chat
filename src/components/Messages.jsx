import React, { useEffect, useState } from 'react'
import Message from './Message'
import { useSelector } from 'react-redux'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'

const Messages = () => {
  const [messages, setMessages] = useState([])
  const chatId = useSelector(state => state.user.chatId)

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "chats", chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages)
    })

    return () => {
      unsub()
    }
  }, [chatId])

  return (
    <div className='messages'>
      {
        messages.map((m, i) => (
          <Message message={m} key={i}/>
        ))
      }
    </div>
  )
}

export default Messages