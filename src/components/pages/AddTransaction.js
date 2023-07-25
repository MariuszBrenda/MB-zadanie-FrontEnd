import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"

export default function AddTransaction() {
    const auth = useSelector(state => state.auth);

    return (
        <>
        { (auth.username !== null) ? (
                <h1>Dodaj Transakcję! </h1>
                //tutaj formularz jak w ekranie rejestracji, z wyborem kategorii i typu transakcji, kalendarzem itp
            ) : (
                <div className="niezalogowany">
                    <h1>Nie jesteś zalogowany!</h1>
                    <p>Aby skorzystać z tej funkcjonalności musisz się zalogować.</p>
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