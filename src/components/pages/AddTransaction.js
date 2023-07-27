import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import { useRef, useEffect, useState } from "react";
import { SelectButton } from 'primereact/selectbutton';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { Calendar } from 'primereact/calendar';
import { addLocale } from 'primereact/api';
import { InputText } from "primereact/inputtext";

import 'primereact/resources/themes/saga-purple/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
//import 'primeflex/primeflex.css';

export default function AddTransaction() {
    const auth = useSelector(state => state.auth);

    const userRef = useRef();
    const errRef = useRef();

    const options = ['Wydatek', 'Dochód'];
    const [value, setValue] = useState(options[0]);
    let pomoc = '';
    const [selectedCategory, setCategory] = useState(null);

    const [amount, setAmount] = useState(null);
    const [date, setDate] = useState(null);
    const [note, setNote] = useState('');

    const expenseCategories = [ 
        { name: 'Spożywcze', code: 'EAT' },
        { name: 'Zakupy', code: 'SHO' },
        { name: 'Rachunki', code: 'RAC' },
        { name: 'Rozrywka', code: 'ROZ' },
        { name: 'Zdrowie', code: 'ZDR' },
        { name: 'Samochód', code: 'CAR' },
        { name: 'Podróże', code: 'TRA' },
        { name: 'Dom', code: 'HOM' },
        { name: 'Transport', code: 'MZK'},
        { name: 'Kosmetyki', code: 'COM'},
        { name: 'inne', code: 'DIF'}
    ]; 

    const incomeCategories = [
        { name: 'Wynagrodzenie', code: 'PAY' },
        { name: 'Podarunki', code: 'GIF' },
        { name: 'Kredyt', code: 'CRE' },
        { name: 'Inne', code: 'DIF' }
    ]; 

    addLocale('pl', {
        firstDayOfWeek: '1',
        dayNames: ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota'],
        dayNamesShort: ['Nie', 'Pon', 'Wto', 'Śro', 'Czw', 'Pią', 'Sob'],
        dayNamesMin: ['Ni', 'Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'So'],
        monthNames: ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'],
        monthNamesShort: ['Sty', 'Lut', 'Mar', 'Kwi', 'Maj', 'Cze', 'Lip', 'Sie', 'Wrz', 'Paź', 'Lis', 'Gru'],
        today: 'Dzisiaj',
        clear: 'Wyczyść'
    })

    if(selectedCategory !== null) pomoc = selectedCategory.name;

    return (
        <>
        { (auth.username !== null) ? (
                <div>
                    <h1>Dodaj Transakcję! </h1>
                    <SelectButton value={value} onChange={ (e) => setValue(e.value)} options={options} unselectable={false} required/>
                    { (value === 'Wydatek') ? (
                    <div className="card flex justify-content-center">
                        <Dropdown value={selectedCategory} onChange={(e) => setCategory(e.value)} options={expenseCategories}  optionLabel="name"
                            placeholder="Wybierz Kategorię" className="w-full md:w-14rem" />
                    </div>
                    ) : (
                    <div className="card flex justify-content-center">
                        <Dropdown value={selectedCategory} onChange={(e) => setCategory(e.value)} options={incomeCategories}  optionLabel="name"
                            placeholder="Wybierz Kategorię" className="w-full md:w-14rem" />
                    </div>
                    )}
                    
                    <p>Wartość: {value}</p>
                    <p>Kategoria: {pomoc}</p>
                    <label htmlFor="amount">Kwota: </label>
                    <InputNumber value={amount} onValueChange={(e) => setAmount(e.value)} 
                        minFractionDigits={2} maxFractionDigits={2} locale="pl-PL" 
                        mode="currency" currency="PLN" min={0} max={10000} placeholder="00,00"/>
                    <p></p>
                    <label htmlFor="date">Data: </label>
                    <Calendar value={date} onChange={(e) => setDate(e.value)} showIcon locale="pl" 
                        dateFormat="dd/mm/yy" readOnlyInput placeholder="dd/mm/yyyy"/>
                    <p></p>
                    <label htmlFor="note">Notatka: </label>
                    <span className="p-input-icon-left">
                        <i className="pi pi-bookmark" />
                        <InputText value={note} onChange={(e) => setNote(e.value)} placeholder="Wpisz notkę..."/>
                    </span>                    
                </div>
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