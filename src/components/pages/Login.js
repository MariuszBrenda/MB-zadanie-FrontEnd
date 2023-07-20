import React, { useRef, useState, useEffect } from "react"
import { Link } from "react-router-dom";
import './LoginStyles.css'
import { useSelector, useDispatch } from "react-redux";
import { authAdded } from "../features/authSlice";

export default function Login() {
    const authredux = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pass])

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(user);
        
        dispatch( authAdded(user) )
        setUser('');
        setPass('');
        setSuccess(true);
    }

    return (
        <>
            {success ? (
                <div className="formularz">
                    <h1>Witaj {authredux.username}</h1>
                    <br />
                    <p>
                        <Link to="/">Przejdź do strony głównej</Link>
                    </p>
                </div>
            ) : (
                <div className="formularz">
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}
                    aria-live="assertive"> {errMsg} </p>
                    <h1>Zaloguj się</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">Nazwa użytkownika: </label>
                        <input 
                            type="text" 
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                        />
                        <label htmlFor="password">Hasło: </label>
                        <input 
                            type="password" 
                            id="password"
                            onChange={(e) => setPass(e.target.value)}
                            value={pass}
                            required
                        />
                        <button>Zaloguj się!</button>
                    </form>
                    <p>
                        Nie masz konta? <br />
                        <span className="line">
                            <Link to="/Rejestracja">Zarejestruj się!</Link>
                        </span>
                    </p>
                </div>
            )}
        </>
    )
}