import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'

const Message = ({message}) => {

  const {currentUser, chatId, user} = useSelector(state => state.user)

  const ref = useRef()

  useEffect(() => {
    ref.current?.scrollIntoView({behavior: "smooth"})
  }, [message])

  return (
    <div ref={ref} className={`message ${message.senderId === currentUser.uid && 'owner'}`}>

      <div className='messageInfo'>
        <img src={
          message.senderId === currentUser.uid 
          ? currentUser.photoURL 
          : user.photoURL} alt="icon" />
        <span>Just now</span>
      </div>

      <div className="messageContent">
        <p>{message.text}</p>
        {
          message.img && <img src={message.img} alt="img" />
        }
      </div>


    </div>
  )
}

export default Message