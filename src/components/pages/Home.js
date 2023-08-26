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
import { TabView, TabPanel } from 'primereact/tabview';
import { Button } from "primereact/button";

import 'primereact/resources/themes/saga-purple/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';


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
    const [doughnutData, setDoughnutData] = useState({});
    const [doughnutOptions, setDoughnutOptions] = useState({});
    const [doughnutIncData, setDoughnutIncData] = useState({});
    const [doughnutIncOptions, setDoughnutIncOptions] = useState({});

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
        //console.log(monthFilter);
        //console.log(filters);
    }

    function CategorySum(sumArray, element){
        console.log(sumArray);
        for (let index = 0; index < sumArray.length; index++) {
                                
            if (sumArray[index].name === element.category) {
                sumArray[index].sum += element.amount;
                break;
            }
        }
    }

    function CategoryChart(array) {
        let labels = [];
        let data = [];
        let colors = ['rgb(0, 200, 0)', 'rgb(0, 0, 200)', 'rgb(200, 0, 0)', 'rgb(200,200,0)', 'rgb(200,0,200)', 'rgb(0,200,200)', 'rgb(200,200,200)', 'rgb(100,100,100)', 'rgb(0,150, 67)'];
        let colorshover = ['rgba(0, 200, 0, 0.8)', 'rgba(0, 0, 200, 0.8)', 'rgba(200, 0, 0, 0.8)', 'rgba(200,200,0, 0.8)', 'rgba(200,0,200, 0.8)', 'rgba(0,200,200, 0.8)', 'rgba(200,200,200, 0.8)', 'rgba(100,100,100,0.8)', 'rgba(0,150, 67,0.8)'];
        array.forEach( element => {
            labels.push(element.name);
            data.push(element.sum);
        });
        
        const dataChart = {
            labels: labels,
            datasets: [
                {
                    data: data,
                    backgroundColor: colors,
                    hoverBackgroundColor: colorshover
                }
            ]
        };
        const optionsChart = {
            cutout: '60%'
        };

        return [dataChart, optionsChart];
    }

    useEffect(() => {
        let dateHelper;
        let monthExpSum = 0;
        let monthIncSum = 0;
        let monthCatSum = [ 
            { name: 'Spożywcze', sum: 0 },
            { name: 'Zakupy', sum: 0 },
            { name: 'Rachunki', sum: 0 },
            { name: 'Rozrywka', sum: 0 },
            { name: 'Zdrowie', sum: 0 },
            { name: 'Samochód', sum: 0 },
            { name: 'Podróże', sum: 0 },
            { name: 'Dom', sum: 0 },
            { name: 'inne', sum: 0}
        ]; 
        let monthIncCatSum = [
            { name: 'Wynagrodzenie', sum: 0 },
            { name: 'Podarunki', sum: 0 },
            { name: 'Kredyt', sum: 0 },
            { name: 'Inne', sum: 0 }
        ]; 
        
        transactions.forEach(element => {
            if(element.user === auth.username){
                // sprawdzenie czy miesiąc się zgadza

                dateHelper = element.date.slice(-7)
                if(dateHelper === monthFilter){
                console.log(element);
                    switch (element.typeOfTrans) {
                        case 'Wydatek':
                            monthExpSum += element.amount;
                            CategorySum(monthCatSum, element);
                            break;
                    
                        default:
                            monthIncSum += element.amount;
                            CategorySum(monthIncCatSum, element);
                            break;
                    }
                }
            }
        });

        console.log(monthCatSum);
        //console.log(monthIncCatSum);
        setMonthExpenses(monthExpSum);
        //console.log('suma wydatkow: ' + monthExpSum);
        setMonthIncomes(monthIncSum);
        //console.log('suma przychodow: ' + monthIncSum);

            const data = {
                labels: ['Dochód', 'Wydatek'],
                datasets: [
                    {
                        label: 'Kwota w zł',
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

            const expChart = CategoryChart(monthCatSum);
            setDoughnutData(expChart[0]);
            setDoughnutOptions(expChart[1]);

            const incChart = CategoryChart(monthIncCatSum);
            setDoughnutIncData(incChart[0]);
            setDoughnutIncOptions(incChart[1]);

    },[monthFilter])



    return (
        <>
        { (auth.username !== null) ? (
                <>
                <div className="card">
                    <TabView>
                        <TabPanel header="Bilans miesięczny">
                            <div className="card" style={{backgroundColor: 'white'}}>
                                <Chart type="bar" data={chartData} options={chartOptions} height="400px" width="600px"/>
                            </div>
                            
                        </TabPanel>
                        <TabPanel header="Rozbicie kosztów">
                            <div className="card flex justify-content-center">
                                <Chart type="doughnut" data={doughnutData} options={doughnutOptions} className="w-full md:w-30rem" />
                            </div>
                        </TabPanel>
                        <TabPanel header="Rozbicie dochodów">
                            <div className="card flex justify-content-center">
                                <Chart type="doughnut" data={doughnutIncData} options={doughnutIncOptions} className="w-full md:w-30rem" />
                            </div>
                        </TabPanel>
                        <TabPanel header="Tabela transakcji">
                            <div className="card">
                            
                                <DataTable value={transactions} removableSort selectionMode={'radiobutton'} selection={selectedProduct} 
                                    onSelectionChange={(e) => setSelectedProduct(e.value)} dataKey="id" tableStyle={{ minWidth: '50rem' }}
                                    filters={filters} scrollable scrollHeight="370px" sortField="date" sortOrder={-1}>
                                    <Column selectionMode="single" headerStyle={{ width: '3rem' }}></Column>
                                    <Column field="date" header="Data" sortable style={{ width: '25%' }} ></Column>
                                    <Column field="typeOfTrans" header="Typ transakcji"></Column>
                                    <Column field="category" header="Kategoria" ></Column>
                                    <Column field="amount" header="Kwota" body={amountBodyTemplate} ></Column>
                                    <Column field="note" header="Notatka"></Column>
                                </DataTable>
                            </div>
                        </TabPanel>
                    </TabView>
                </div>
                <span className="p-buttonset">
                    <Button type="button" label="Poprzedni miesiąc" icon="pi pi-arrow-left" onClick={monthBackward} size="large"/>  
                    <Button label={monthFilter} disabled size="large"/>
                    <Button type="button" label="Kolejny miesiąc" icon="pi pi-arrow-right" iconPos="right" onClick={monthForward} size="large"/>
                </span>
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