import React, { useRef, useState, useEffect } from "react"
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authAdded } from "../features/authSlice";
import { transactionsReload } from "../features/transactionSlice";
import '../styles/LoginStyles.css';

export default function Login() {
    let accountExist = false;
    let passwordMatch = false;
    const authredux = useSelector(state => state.auth);
    const accounts = useSelector(state => state.users);
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
        
        for (let index = 0; index < accounts.length; index++) {
            if (accounts[index].username === user) {
                accountExist = true;
                if(accounts[index].password === pass) {
                    passwordMatch = true;
                }
                break;
            }
        }
        if (!accountExist) setErrMsg('Podane konto nie istnieje!')
        else if (accountExist && !passwordMatch) setErrMsg('Podane hasło jest nieprawidłowe!')
        else if(accountExist && passwordMatch){
            dispatch( authAdded(user) );
            dispatch( transactionsReload(user) );
            //console.log(user);
            setUser('');
            setPass('');
            setSuccess(true);
        }
        accountExist = false;
        passwordMatch = false;
        return;
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