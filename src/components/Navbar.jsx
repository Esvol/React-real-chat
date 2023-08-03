import React from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentUser } from '../redux/slices/userSlice'

const Navbar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.user.currentUser)

  const LogOut = () => {
    signOut(auth);
    dispatch(setCurrentUser({
      displayName: "",
      email: "",
      photoURL: "",
      uid: "",
    }))
    navigate('/login')  
  }

  return (
    <div className='navbar'>
        <div className='logo'>Real chat</div>
        <div className='user'>
            <img src={currentUser.photoURL} alt="" />
            <span>{currentUser.displayName}</span>
            <button onClick={() => LogOut()}>Logout</button>
        </div>
    </div>
  )
}

export default Navbar