import React, { useState } from 'react'
import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore'
import { db } from '../firebase'
import { useDispatch, useSelector } from 'react-redux'
import { chatReduser } from '../redux/slices/userSlice'

const Search = () => {
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.user.currentUser)

  const [username, setUsername] = useState('')
  const [user, setUser] = useState(null)
  const [error, setError] = useState(false)

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      setError(true);
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch()
  }

  const handleSelect = async () => {
    const combinedId = 
    currentUser.uid > user.uid ? 
    currentUser.uid + user.uid : 
    user.uid + currentUser.uid;

    console.log('eeee');

    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if(!res.exists()){
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (error) {
      setError(true)
    }

    dispatch(chatReduser(user))
    setUser(null)
    setUsername("")
  }

  return (
    <div className='search'>
      <div className='searchForm'>
        <input type="text" placeholder='find a user' onKeyDown={handleKey} value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      {
        error && <p>User not found</p>
      }
      {
        user &&
        <div className='userChat' onClick={handleSelect}>
          <img src={user.photoURL} alt="icon" />
          <div className="userChatInfo">
            <span>{user.displayName}</span>
          </div>
        </div>
      }
    </div>
  )
}

export default Search