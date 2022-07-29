import { createContext, useReducer } from "react";

export const WorkoutsContext = createContext()


export const workoutReducer = (state, action) => {
    switch (action.type) {
        case "GET_WORKOUTS":
            return {
                workouts: action.payload
            }
        case "CREATE_WORKOUT":
            return {
                workouts: [action.payload, ...state.workouts]
            }
        
        case "DELETE_WORKOUT":
            return {
                workouts: state.workouts.filter((w) => w._id !== action.payload._id)
            }
    
        default:
            return state
    }
}

export const WorkoutsContextProvider = ({ children }) => {
    
    const initialState = { workouts: null }    
    const [state, dispatch] = useReducer(workoutReducer, initialState)

    return (
        <WorkoutsContext.Provider value={{ ...state, dispatch }}>
            { children }
        </WorkoutsContext.Provider>
    )
}