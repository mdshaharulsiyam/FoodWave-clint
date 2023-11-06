import { createContext, useEffect, useState } from "react"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut ,GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import app from "../Firebase/Firebase";
import useAxiosConfig from "../CustomHooks/useAxiosConfig";
export const FoodWaveData = createContext(null)
const auth = getAuth(app);
const Context = ({ children }) => {
    // states 
    const [userinfo, setuserinfo] = useState(null)
    const [loading, setloading] = useState(true)
    const axiosrequest = useAxiosConfig()
    // create user with email and password
    const createNewUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)

    }
    // login uer
    const loginUser = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }
    //
    // add  google login 
    const provider = new GoogleAuthProvider();
    const loginWithGoogle = () =>{
       return signInWithPopup(auth, provider)
    }
    // get current logged in user
    useEffect(() => {
        setloading(true)
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const { displayName, email, photoURL } = user
                const data = { displayName, email, photoURL }
                axiosrequest.post('/jwt',data).then((data)=>console.log(data))
                setuserinfo(data)
            } else {
                setuserinfo(null)
            }
            setloading(false)
            return () => {
                unsubscribe()
            }
        });
    }, [])
    // logout user 
    const logOutUser = () => {
        signOut(auth).then(() => {
            console.log('singout succesfully')
        }).catch((error) => {
            console.log('faild to login')
        });
    }
    //context data
    const contextData = {
        createNewUser, loginUser, logOutUser, userinfo, loading, setloading,loginWithGoogle
    }
    return (
        <FoodWaveData.Provider value={contextData}>
            {children}
        </FoodWaveData.Provider>
    )
}

export default Context
