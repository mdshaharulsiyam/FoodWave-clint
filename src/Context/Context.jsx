import { createContext } from "react"

export const FoodWaveData = createContext(null)
const Context = ({ children }) => {

    //context data
    const contextData = {

    }
    return (
        <FoodWaveData.Provider value={contextData}>
            {children}
        </FoodWaveData.Provider>
    )
}

export default Context
