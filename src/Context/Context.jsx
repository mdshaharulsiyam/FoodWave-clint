import { createContext, useEffect, useState } from "react"
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword , onAuthStateChanged  } from "firebase/auth";
import app from "../Firebase/Firebase";
export const FoodWaveData = createContext(null)
const auth = getAuth(app);
const Context = ({ children }) => {
    // states 
    const [userinfo,setuserinfo]=useState(null)

    // create user with email and password
    const createNewUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)

    }
    // login uer
    const loginUser = (email, password) =>{
       return signInWithEmailAndPassword(auth, email, password)
    }
    // get current logged in user
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log(user)
            } else {
              
            }
            return () => {
                unsubscribe()
            }
        });
    },[])
    //context data
    const contextData = {
        createNewUser,
        loginUser
    }
    return (
        <FoodWaveData.Provider value={contextData}>
            {children}
        </FoodWaveData.Provider>
    )
}

export default Context
