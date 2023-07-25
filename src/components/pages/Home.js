import React from "react"
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"


export default function Home() {
    const auth = useSelector(state => state.auth);

    return (
        <>
        { (auth.username !== null) ? (
                <h1>Strona Główna </h1>
                // tutaj okno w stylu apki todo, kazdy wydatek wyswietlany poprzez funkcje osobna, z .map 
            ) : (
                <div className="niezalogowany">
                    <h1>Witaj w aplikacji TwójBudżet! </h1>
                    <p>Aby skorzystać z jej funkcjonalności musisz się zalogować.</p>
                    <p>
                    <Link to="/Logowanie">
                        Zaloguj się!
                    </Link>
                    </p>
                    <p>Nie masz konta? Nic straconego! Uzyskaj kontrolę nad budżetem domowym już teraz!</p>
                    <Link to="/Rejestracja">
                        Zarejestruj się!
                    </Link>
                </div>
            ) 
        }
        
        </>
        
    )
} 