import React, { useState } from 'react'
import AddImage from '../image/img.png'
import Attach from '../image/attach.png'
import { useSelector } from 'react-redux'
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from 'firebase/firestore'
import { db, storage } from '../firebase'
import { v4 as uuid } from 'uuid'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'

const InputPanel = () => {
  const [text, setText] = useState("")
  const [img, setImg] = useState(null)

  const {currentUser, chatId, user} = useSelector(state => state.user)

  const handleSendClick = (e) => {
    e.code === "Enter" && handleSend();
  }

  const handleSend = async () => {
    if(img){

      const storageRef = ref(storage, uuid());

      try {
        await uploadBytesResumable(storageRef, img).then(() => {
          getDownloadURL(storageRef).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              })
            })
        })
      });

      } catch (error) {
        console.log(error);
      }

    } else{
      try {
        await updateDoc(doc(db, "chats", chatId), {
          messages: arrayUnion({
            id: uuid(),
            text,
            senderId: currentUser.uid,
            date: Timestamp.now(),
          })
        })
      } catch (error) {
        console.log(error);
      }
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [chatId + ".lastMessage"]: {
        text,
      },
      [chatId + ".date"]: serverTimestamp(),
    })

    await updateDoc(doc(db, "userChats", user.uid), {
      [chatId + ".lastMessage"]: {
        text,
      },
      [chatId + ".date"]: serverTimestamp(),
    })

    setText("")
    setImg(null)
  }

  return (
    <div className='inputPanel'>
      <input type='text' placeholder='Type something...' value={text} onChange={(e) => setText(e.target.value)} onKeyDown={handleSendClick}/>
      <div className='send'>

        <img src={Attach} alt="att" />

        <input type="file" style={{display: 'none'}} id='img' onChange={(e) => setImg(e.target.files[0])}/>
        <label htmlFor='img'>
          <img src={AddImage} alt="img" />
        </label>

        <button onClick={() => handleSend()}>Send</button>
      </div>
    </div>
  )
}

export default InputPanel