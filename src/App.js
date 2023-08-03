import "./index.scss";
import { useEffect } from "react";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { setCurrentUser } from "./redux/slices/userSlice";
import { auth } from "./firebase";

function App() {

  const dispatch = useDispatch()
  const currentUser = useSelector((state) => state.user.currentUser)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {

      if (user !== null){
        dispatch(setCurrentUser({
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          uid: user.uid,
        }));
      }

    })

    return () => {
      unsub();
    }
  }, [])



  return (
    <Routes>
      <Route index path="/" element={currentUser.displayName === "" ? <Login/> : <Home />}/>
      <Route path="/login" element={<Login/> }/>
      <Route path="/register" element={<Register/> }/>
    </Routes>
  );
}

export default App;
