import axios from "axios";
import { createContext, useReducer, useEffect } from "react";
import AppReducer from "./AppReducer";

const initialState = {
    scans: [],
    addScan: (_) => {},
    delScan: (_) => {},
}

export const GlobalContext = createContext(initialState)

export const GlobalProvider = ({children}) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    function setScans(item) {
        dispatch({
            type: 'SET_ARRAY',
            payload: item,
            key: 'scans'
        })
    }
    function addScan(item) {
        dispatch({
            type: 'ADD_ARRAY',
            payload: item,
            key: 'scans'
        })
    }
    function delScan(item) {
        dispatch({
            type: 'REMOVE_ARRAY',
            payload: item,
            key: 'scans'
        })
    }

    const getScans = async () => {
        const res = await axios.get('http://localhost:3333/api/scan')
        setScans(res.data.scans)
    }

    useEffect(() => {
        getScans()
    }, [])

    return(
        <GlobalContext.Provider value={{
            scans: state.scans, getScans, addScan, delScan
        }} >
            {children}
        </GlobalContext.Provider>
    )
}