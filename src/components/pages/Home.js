import React from "react"
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useRef, useEffect, useState } from "react";
import { FilterMatchMode } from 'primereact/api';
import { transactionAdded, transactionDeleteAll } from "../features/transactionSlice";
import { Tag } from "primereact/tag";
import { Chart } from 'primereact/chart';
import './HomeStyles.css'


export default function Home() {
    const auth = useSelector(state => state.auth);
    const transactions = useSelector(state => state.transactions);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const dispatch = useDispatch();
    const [monthFilter, setMonthFilter] = useState(giveDate);
    const [filters, setFilters] = useState({
        user: { value: auth.username, matchMode: FilterMatchMode.EQUALS },
        date: { value: monthFilter, matchMode: FilterMatchMode.CONTAINS}
    });
    
    const [monthExpenses, setMonthExpenses] = useState();
    const [monthIncomes, setMonthIncomes] = useState();
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    function wyswietl() {
        console.log(selectedProduct);
    }

    function usunWszystko() {
        dispatch(
            transactionDeleteAll()
        );
        dispatch(
            transactionAdded([{
                id: null,
                user: null,
                typeOfTrans: null,
                category: null,
                amount: null,
                date: null,
                note: null
            }])
        );
    }

    function wyswietlStan(){
        console.log(transactions);
    }

    function giveDate(){
        const today = new Date();
        let monthHelper = today.getMonth() + 1;
        if (monthHelper < 10) monthHelper = '0' + monthHelper;
        const dateFilter = monthHelper + '/' + today.getFullYear();
        return dateFilter;
    }

    function amountBodyTemplate(rowData){
        let sign = '- ';
        let severity = 'danger'
        if(rowData.typeOfTrans === 'Dochód') {
            sign = '+ ';
            severity = 'success';
        }
        const value = sign + rowData.amount + ' zł';
        return <Tag value={value} severity={severity}></Tag>
    }

    function monthForward(){
        changeMonth('+');
    }

    function monthBackward(){
        changeMonth('-');
    }

    function changeMonth(direction){
        const array = monthFilter.split('/');
        switch (direction) {
            case '+':
                if(array[0] < 12) array[0]++;
                else {
                    array[1]++;
                    array[0] = 1;
                }
                break;

            case '-':
                if(array[0] > 1) array[0]--;
                else {
                    array[1]--;
                    array[0] = 12;
                }
                break;
            default:
                break;
        }
        if (array[0] < 10) array[0] = '0' + array[0];
        const helper = array[0] + '/' + array[1];
        setMonthFilter(helper);
        setFilters({
            user: { value: auth.username, matchMode: FilterMatchMode.EQUALS },
            date: { value: helper, matchMode: FilterMatchMode.CONTAINS}
        });
        console.log(monthFilter);
        console.log(filters);
    }

    useEffect(() => {
        let dateHelper;
        let monthExpSum = 0;
        let monthIncSum = 0;
        console.log('filtr zmieniony');
        transactions.forEach(element => {
            if(element.user === auth.username){
                // sprawdzenie czy miesiąc się zgadza
                dateHelper = element.date.slice(-7)
                if(dateHelper === monthFilter){

                    switch (element.typeOfTrans) {
                        case 'Wydatek':
                            monthExpSum += element.amount;
                            break;
                    
                        default:
                            monthIncSum += element.amount;
                            break;
                    }
                }
            }
        });
        setMonthExpenses(monthExpSum);
        console.log('suma wydatkow: ' + monthExpSum);
        setMonthIncomes(monthIncSum);
        console.log('suma przychodow: ' + monthIncSum);
        //<button onClick={wyswietl}>konsola - wybrany produkt</button>
          //          <button onClick={usunWszystko}>Usuń wszystko</button>
            //        <button onClick={wyswietlStan}>Stan</button>
            const data = {
                labels: ['Dochód', 'Wydatek'],
                datasets: [
                    {
                        label: 'Obrót',
                        data: [monthIncSum, monthExpSum],
                        backgroundColor: [
                            'rgba(75, 192, 192, 0.4)',
                            'rgba(128, 0, 32, 0.4)'
                          ],
                          borderColor: [
                            'rgb(75, 192, 192)',
                            'rgb(128, 0, 32)'
                          ],
                          borderWidth: 1
                    }
                ]
            };
            const options = {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            };
    
            setChartData(data);
            setChartOptions(options);
    },[monthFilter])

    return (
        <>
        { (auth.username !== null) ? (
                <>
                    <div className="card" style={{backgroundColor: 'white'}}>
                        <Chart type="bar" data={chartData} options={chartOptions} />
                    </div>
                    <div className="wybieracz">
                        <button onClick={monthForward}>+</button>
                        <p>{monthFilter}</p>
                        <button onClick={monthBackward}>-</button>
                    </div>
                    <div className="card">
                        
                        <DataTable value={transactions} removableSort selectionMode={'radiobutton'} selection={selectedProduct} 
                            onSelectionChange={(e) => setSelectedProduct(e.value)} dataKey="id" tableStyle={{ minWidth: '50rem' }}
                            filters={filters} scrollable scrollHeight="370px">
                            <Column selectionMode="single" headerStyle={{ width: '3rem' }}></Column>
                            <Column field="date" header="Data" sortable style={{ width: '25%' }}></Column>
                            <Column field="typeOfTrans" header="Typ transakcji"></Column>
                            <Column field="category" header="Kategoria" ></Column>
                            <Column field="amount" header="Kwota" body={amountBodyTemplate} ></Column>
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