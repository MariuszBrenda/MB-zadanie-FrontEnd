import React from "react"
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useRef, useEffect, useState } from "react";


export default function Home() {
    const auth = useSelector(state => state.auth);
    const transactions = useSelector(state => state.transactions);
    const [selectedProduct, setSelectedProduct] = useState(null);

    function wyswietl() {
        console.log(selectedProduct);
    }

    return (
        <>
        { (auth.username !== null) ? (
                <>
                    <h1>Strona Główna </h1>
                    <button onClick={wyswietl}>coś</button>

                    <div className="card">
                        
                        <DataTable value={transactions} selectionMode={'radiobutton'} selection={selectedProduct} onSelectionChange={(e) => setSelectedProduct(e.value)} dataKey="id" tableStyle={{ minWidth: '50rem' }}>
                            <Column selectionMode="single" headerStyle={{ width: '3rem' }}></Column>
                            <Column field="date" header="Data"></Column>
                            <Column field="typeOfTrans" header="Typ transakcji"></Column>
                            <Column field="category" header="Kategoria"></Column>
                            <Column field="amount" header="Kwota"></Column>
                            <Column field="note" header="Notatka"></Column>
                        </DataTable>
                    </div>
                </>
                
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