import React from 'react'

import Messages from './Messages'
import InputPanel from './InputPanel'

import Add from '../image/add.png'
import Cam from '../image/cam.png'
import More from '../image/more.png'

import { useSelector } from 'react-redux'

const Chat = () => {
  const user = useSelector(state => state.user.user)

  return (
    <div className='chat'>
        <div className='chatInfo'>
            <span>{user?.displayName}</span>
            <div className='chatIcons'>
                <img src={Cam} alt="cam" />
                <img src={Add} alt="add" />
                <img src={More} alt="more" />
            </div>
        </div>
        <Messages/>
        <InputPanel/>
    </div>
  )
}

export default Chat