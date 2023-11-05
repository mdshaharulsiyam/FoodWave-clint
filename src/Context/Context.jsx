import { createContext } from "react"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import app from "../Firebase/Firebase";
export const FoodWaveData = createContext(null)
const auth = getAuth(app);
const Context = ({children}) => {


    // create user with email and password
    const createNewUser = (email,password) => {
       return createUserWithEmailAndPassword(auth, email, password)

    }
    //context data
    const contextData = {
        createNewUser
    }
    return (
        <FoodWaveData.Provider value={contextData}>
            {children}
        </FoodWaveData.Provider>
    )
}

export default Context
