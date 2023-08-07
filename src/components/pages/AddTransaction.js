import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import { useRef, useEffect, useState } from "react";
import { SelectButton } from 'primereact/selectbutton';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { Calendar } from 'primereact/calendar';
import { addLocale } from 'primereact/api';
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { nanoid } from "@reduxjs/toolkit";
import './TransactionStyles.css'

import 'primereact/resources/themes/saga-purple/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { transactionAdded } from "../features/transactionSlice";
//import 'primeflex/primeflex.css';

const AddTransaction = () => {
    const auth = useSelector(state => state.auth);
    const transactions = useSelector(state => state.transactions);
    const dispatch = useDispatch();
    const errRef = useRef();
    const options = ['Wydatek', 'Dochód'];
    const [value, setValue] = useState(options[0]);
    const [selectedCategory, setCategory] = useState(null);
    const [validCategory, setVCategory] = useState(false);
    const [amount, setAmount] = useState(null);
    const [validAmount, setVAmount] = useState(false);
    const [date, setDate] = useState(null);
    const [today, setToday] = useState(new Date());
    const [validDate, setVDate] = useState(false);
    const [note, setNote] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState('');

    const expenseCategories = [ 
        { name: 'Spożywcze', code: 'EAT' },
        { name: 'Zakupy', code: 'SHO' },
        { name: 'Rachunki', code: 'RAC' },
        { name: 'Rozrywka', code: 'ROZ' },
        { name: 'Zdrowie', code: 'ZDR' },
        { name: 'Samochód', code: 'CAR' },
        { name: 'Podróże', code: 'TRA' },
        { name: 'Dom', code: 'HOM' },
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

    const Delete = (e) => {
        setValue(options[0]);
        setCategory(null);
        setAmount(null);
        setDate(null);
        setNote('');
    }

    const compareArray = (array) => {
        let pomoc = false;
        for (let index = 0; index < array.length; index++) {
            if(array[index].name === selectedCategory.name) {
                pomoc=true; 
                break;
            }          
        }
        if(pomoc) setVCategory(true);
        else setVCategory(false);
    }

    useEffect(() => {
        if (selectedCategory !== null){
            if (value === options[0]){
               compareArray(expenseCategories)
            }
            else if (value === options[1]){
                compareArray(incomeCategories)
            }
        }
        else setVCategory(false);

    }, [value, selectedCategory])

    useEffect(() => {
        if(amount > 0) setVAmount(true);
        else setVAmount(false);
    },[amount])

    useEffect(() => {
        if((today >= date) && (date !== null)) setVDate(true);
        else setVDate(false);
    },[date])

    useEffect(() => {
        console.log(note)
    },[note])

    useEffect(() => {
        setErrMsg('');
    },[value, selectedCategory, amount, date])

    

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('submit done')
        if(selectedCategory === null || amount <= 0 || amount ===null || date > today || date === null) setErrMsg('Nieprawidłowe dane, spróboj ponownie!');
        else {
            let day = date.getDate();
            let month = date.getMonth()+1;
            console.log("dzień przed: " + day);
            console.log("dzień dług.: " + day);
            if(day < 10) day = day.toLocaleString('pl-PL', {minimumIntegerDigits: 2, useGrouping:false});
            console.log('dzień po: ' + day);
            if(month < 10) month = month.toLocaleString('pl-PL', {minimumIntegerDigits: 2, useGrouping:false});
            const appropriateDate = day + "/" + month + "/" + date.getFullYear();
            dispatch(
                transactionAdded({
                    id: nanoid(),
                    typeOfTrans: value,
                    category: selectedCategory.name,
                    amount: amount,
                    date: appropriateDate,
                    note: note,
                    user: auth.username
                })
            )
            Delete();
            setSuccess(true);
            console.log(transactions);
        }
    }

    function wyswietl() {
        console.log(today)
    }
    return (
        <>
        { (auth.username !== null) ? (
                <div className="trans-form">
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}
                        aria-live="assertive">{errMsg}</p>
                    <h1>Transakcja</h1>
                    <form onSubmit={handleSubmit}>
                        <SelectButton value={value} onChange={ (e) => setValue(e.value)} options={options} unselectable={false} required/>
                        { (value === 'Wydatek') ? (
                        <div className="card flex justify-content-center">
                            <Dropdown value={selectedCategory} onChange={(e) => setCategory(e.value)} options={expenseCategories}  optionLabel="name"
                                placeholder="Wybierz Kategorię" className="w-full md:w-14rem" style={{width: '12rem', textAlign: 'left'}} />
                        </div>
                        ) : (
                        <div className="card flex justify-content-center">
                            <Dropdown value={selectedCategory} onChange={(e) => setCategory(e.value)} options={incomeCategories}  optionLabel="name"
                                placeholder="Wybierz Kategorię" className="w-full md:w-14rem"  style={{width: '12rem', textAlign: 'left'}}/>
                        </div>
                        )}
                        
                        <div className="kwota">
                            <label htmlFor="amount">Kwota: </label>
                            <InputNumber value={amount} onValueChange={(e) => setAmount(e.value)} 
                                minFractionDigits={2} maxFractionDigits={2} locale="pl-PL" 
                                mode="currency" currency="PLN" min={0} max={10000} placeholder="00,00"/>
                        </div>
                        
                        <div>
                            <label htmlFor="date">Data: </label>
                            <Calendar value={date} onChange={(e) => setDate(e.value)} showIcon locale="pl" 
                                dateFormat="dd/mm/yy" readOnlyInput placeholder="dd/mm/yyyy" maxDate={today}/>
                        </div>
                        
                        <div>
                            <label htmlFor="note">Notatka: </label>
                            <span className="p-input-icon-left">
                                <i className="pi pi-bookmark" />
                                <InputText value={note} onChange={(e) => setNote(e.target.value)} placeholder="Wpisz notkę..." autoComplete="off"/>
                            </span>     
                        </div>
                        
                        <span className="p-buttonset">
                            <Button label="Dodaj" icon="pi pi-check" disabled={(validCategory && validAmount && validDate) ? false : true}/>  
                            <Button type="button" label="Wyczyść" icon="pi pi-trash" onClick={Delete}/>
                        </span>
                            
                    </form>
                    <button onClick={wyswietl}></button>
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

export default AddTransaction