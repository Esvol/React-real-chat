import React, { useEffect, useState } from 'react'
import { doc, onSnapshot } from 'firebase/firestore'
import { useDispatch, useSelector } from 'react-redux'
import { db } from '../firebase'
import { chatReduser } from '../redux/slices/userSlice'

const Chats = () => {
    const currentUser = useSelector((state) => state.user.currentUser)
    const [chats, setChats] = useState([])
    const dispatch = useDispatch();

    useEffect(() => {
        const getChats = () => {
            const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
                setChats(doc.data())
            })

            return () => {
                unsub()
            }
        }

        currentUser.uid && getChats();
    }, [currentUser.uid])

    const handleSelect = (userInfo) => {
        dispatch(chatReduser(userInfo))
    }

    return (
        <div className='chats'>
            {
                chats && Object.entries(chats)?.sort((a,b) => b[1].date - a[1].date).map((chat) => (
                    <div key={chat[0]} className='userChat' onClick={() => handleSelect(chat[1].userInfo)}>
                        <img src={chat[1].userInfo.photoURL} alt="icon" />
                        <div className="userChatInfo">
                            <span>{chat[1].userInfo.displayName}</span>
                            <p>{chat[1].lastMessage?.text}</p>
                        </div>
                    </div>
                ))
            }

        </div>
    )
}

export default Chats