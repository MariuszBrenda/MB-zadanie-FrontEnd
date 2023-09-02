import React from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authDeleted } from "./features/authSlice";
import { useState } from "react";
import logo from './images/logo.svg';
import './styles/NavbarStyles.css';

export default function Navbar() {
    const authredux = useSelector(state => state.auth);
    const dispatch = useDispatch();
    let zmienna = false;
    const resolvedPath = useResolvedPath("/Logowanie");
    const isActive = useMatch( {path: resolvedPath.pathname, end: true})
    if ((authredux.username != null) && !isActive) zmienna = true;
    else zmienna = false;

    const [clicked, setClicked] = useState(false);

    function Kliknieto(){
        const pomoc = !clicked;
        setClicked(pomoc)
    }

    return (
        <>          
            <nav>
                <Link to="/">
                    <img src={logo} className="logo"></img>
                    <div className="tytul">TwójBudżet</div>
                </Link>
            
                <ul id="navbar" className={clicked ? "#navbar active" : "navbar"}>
                    <ActiveLink to="/">Strona Główna</ActiveLink>
                    
                    {zmienna ? (
                        <>
                            <ActiveLink to="/dodajWydatek">Dodaj Transakcję</ActiveLink>
                            <ActiveLink to="/kantorOnline">Kantor Online</ActiveLink>
                            <div className="panel">
                                Witaj, {authredux.username}
                                <button onClick={() => dispatch(authDeleted())}> Wyloguj się</button>
                            </div>
                        </>
                    ):(
                        <>                            
                            <ActiveLink to="/Logowanie">Zaloguj się</ActiveLink>
                            <ActiveLink to="/Rejestracja">Rejestracja</ActiveLink>
                        </>
                    )}                  
                </ul>

                <div id="mobile" onClick={Kliknieto}>
                    <i id="bar" className={clicked ? "pi pi-times" : "pi pi-bars"}></i>
                </div>
            </nav>
        </>
    )
}



function ActiveLink( {to, children, ...props}) {
    const resolvedPath = useResolvedPath(to);
    const isActive = useMatch( {path: resolvedPath.pathname, end: true})
    return(
        <li className={isActive ? "active" : ""}> 
            <Link to={to} {...props}>                
                {children}
            </Link>
        </li>
    )
}

