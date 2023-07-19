import React, {useContext} from "react"
import AuthContext from "../context/AuthProvider"

export default function Home() {
    const {auth} = useContext(AuthContext);
    return <h1>Strona Główna </h1>
}