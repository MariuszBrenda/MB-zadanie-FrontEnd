import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { usersAdded } from "../features/usersSlice";
import '../styles/RegisterStyles.css';

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PASS_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {
    let nameTaken = false;
    const users = useSelector(state => state.users);
    const dispatch = useDispatch();

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pass, setPass] = useState('');
    const [validPass, setValidPass] = useState(false);
    const [passFocus, setPassFocus] = useState(false);

    const [matchPass, setMatchPass] = useState('');
    const [validMPass, setValidMPass] = useState(false);
    const [mpassFocus, setMPassFocus] = useState(false);
    
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        const result = USER_REGEX.test(user);
        console.log(result);
        console.log(user);
        setValidName(result);
    }, [user])

    useEffect(() => {
        const result = PASS_REGEX.test(pass);
        console.log(result);
        console.log(pass);
        setValidPass(result);
        const match = pass === matchPass;
        setValidMPass(match);
    },[pass, matchPass])

    useEffect(() => {
        setErrMsg('');
    }, [user, pass, matchPass])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const v1 = USER_REGEX.test(user);
        const v2 = PASS_REGEX.test(pass);
        if (!v1 || !v2) {
            setErrMsg("Nieprawidłowe dane");
            return;
        }
        
        for (let index = 0; index < users.length; index++) {
            //console.log('tab: ' + users[index].username);
            //console.log('user: ' + user)
            if (users[index].username === user) {
                
                setErrMsg("Użytkownik już istnieje, zmień nazwę użytkownika!");
                nameTaken = true;
                break;
            }
        }
        if(!nameTaken){
            dispatch(
                usersAdded({
                    id: nanoid(),
                    username: user,
                    password: pass
                })
            )
            setUser('');
            setPass('');
            setMatchPass('');
            setSuccess(true);
        }        
        nameTaken = false;
        return;
    }

    return (
        <>
        {success ? (
                <div className="formularz">
                    <h1>Sukces! </h1>
                    <p>Konto {users[users.length - 1].username } utworzone!</p>
                    <p>
                    <Link to="/Logowanie">
                        Zaloguj się!
                    </Link>
                    </p>
                </div>
        ) : (
        <div className="formularz">
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive">{errMsg}</p>
            <h1>Zarejestruj się</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">
                    Nazwa użytkownika: 
                    <span className= {validName ? "valid" : "hide"}>
                        <i className="pi pi-check"/>
                    </span>
                    <span className= {validName || !user ? "hide" : "invalid"}>
                        <i className="pi pi-times"/>
                    </span>
                </label>
                <input 
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    required
                    aria-invalid={validName ? "false" : "true"}
                    aria-describedby="uidnote"
                    onFocus={() => setUserFocus(true)}
                    onBlur={() => setUserFocus(false)}
                />
                <p id="uidnote" className={userFocus && user && 
                    !validName ? "instructions" : "offscreen"}>
                        <i className="pi pi-exclamation-circle"/> <br />
                         Od 4 do 24 znaków. <br />
                        Musi rozpoczynać się od litery. <br />
                        Litery, cyfry, znaki specjalne dozwolone.
                </p>

                <label htmlFor="password">
                    Hasło: 
                    <span className={validPass ? "valid" : "hide"}>
                        <i className="pi pi-check"/>
                    </span>
                    <span className={validPass || !pass ? "hide" : "invalid"}>
                        <i className="pi pi-times"/>
                    </span>
                </label>
                <input
                    type="password"
                    id="password"
                    onChange={(e) => setPass(e.target.value)}
                    required
                    aria-invalid={validPass ? "false" : "true"}
                    aria-describedby="passnote"
                    onFocus={() => setPassFocus(true)}
                    onBlur={() => setPassFocus(false)} 
                />
                <p id="passnote" className={passFocus && !validPass ? 
                    "instructions" : "offscreen"}>
                        <i className="pi pi-exclamation-circle"/> <br />
                         Od 8 do 24 znaków. <br />
                        Musi zawierać wielką i małą literę, cyfrę i znak specjalny. <br />
                        Dozwolone znaki specjalne: 
                        <span aria-label="exclamation mark">!</span>
                        <span aria-label="at symbol">@</span>
                        <span aria-label="hashtag">#</span>
                        <span aria-label="dollar sign">$</span>
                        <span aria-label="percent">%</span>
                </p>

                <label htmlFor="confirm_pass">
                    Potwierdź hasło: 
                    <span className={validMPass && matchPass ? "valid" : "hide"}>
                        <i className="pi pi-check"/>
                    </span>
                    <span className={validMPass || !matchPass ? "hide" : "invalid"}>
                        <i className="pi pi-times"/>
                    </span>
                </label>
                <input
                    type="password"
                    id="confirm_pass"
                    onChange={(e) => setMatchPass(e.target.value)}
                    required
                    aria-invalid={validMPass ? "false" : "true"}
                    aria-describedby="confirmnote"
                    onFocus={() => setMPassFocus(true)}
                    onBlur={() => setMPassFocus(false)}
                />
                <p id="confirmnote" className={mpassFocus && !validMPass ? "instructions" : "offscreen"}>
                    <i className="pi pi-exclamation-circle"/> <br />
                     Musi być identyczne jak hasło z pierwszego pola.
                </p>

                <button disabled={!validName || !validPass || !validMPass ? true : false}>
                    Zarejestruj się!
                </button>

            </form>
            <p>
                Masz już konto? <br />
                <span className="line">
                    <Link to="/Logowanie">
                        Zaloguj się!
                    </Link>
                </span>
            </p>

        </div>
        )}
    </>
    )
}

export default Register