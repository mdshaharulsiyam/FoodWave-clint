import { createContext, useEffect, useState } from "react"
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword , onAuthStateChanged ,signOut } from "firebase/auth";
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
    // logout user 
    const logOutUser = ()=>{
        signOut(auth).then(() => {
            console.log('singout succesfully')
          }).catch((error) => {
         console.log('faild to login')
          });
    }
    //context data
    const contextData = {
        createNewUser,
        loginUser,
        logOutUser
    }
    return (
        <FoodWaveData.Provider value={contextData}>
            {children}
        </FoodWaveData.Provider>
    )
}

export default Context
