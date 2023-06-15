import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios"

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID

const instance = axios.create({ baseURL: process.env.REACT_APP_API_ENDPOINT })

const InfoContext = createContext({
    logged_in: false,
    user_id: undefined,
    login: () => { }
})

const useInfo = () => useContext(InfoContext)

const InfoProvider = (props) => {
    const [logged_in, set_logged_in] = useState(false)
    const [user_id, setUser_id] = useState(undefined)

    // useEffect(() => {
    //     const start = () => {
    //         gapi.client.init({
    //             clientId: CLIENT_ID,
    //             scope: ""
    //         })
    //     };

    //     gapi.load('client:auth2', start)
    // })
    const login = async (name, password) => {
        try {
            console.log("name", name)
            console.log("password", password)
            console.log("instance", instance)
            // const { data } = await instance.post('/login', { name, password })
            // console.log("data", data)
            const { data } = await instance.get('/user')
            console.log("bad", data)
            return data
        } catch (err) {
            return "登入失敗！！"
        }
    }

    return (
        <InfoContext.Provider
            value={{
                logged_in,
                user_id,
                login
            }}
            {...props}
        />
    );
}

export { InfoProvider, useInfo }