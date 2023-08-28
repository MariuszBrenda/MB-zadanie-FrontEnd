import React, { useState, useEffect, useRef } from "react";
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from "primereact/inputnumber";
import { Chart } from 'primereact/chart';
import 'primereact/resources/themes/saga-purple/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/primereact.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import './flags.css';

import './TransactionStyles.css'

export default function AddCategory() {

    const url = new URL("https://api.currencybeacon.com/v1/convert?api_key=5AbbrkGCJACql4xlgtfsCIsbGGVSinEy&from=EUR&to=PLN&amount=1.50");
    const chartURL = new URL("https://api.currencybeacon.com/v1/timeseries?api_key=5AbbrkGCJACql4xlgtfsCIsbGGVSinEy&base=EUR&start_date=2023-08-10&end_date=2023-08-20&symbols=PLN")

    const firstUpdate = useRef(true);
    const firstUpdate2 = useRef(true);
    const [fromCurrency, setfromCurrency] = useState({ name: 'Dolar Amerykański', code: 'US', currency: 'USD' });
    const [fromCurrAmmount, setFromCurrAmmount] = useState(1);
    const [toCurrency, setToCurrency] = useState({ name: 'Polski Złoty', code: 'PL', currency: 'PLN' });
    const [toCurrAmmount, setToCurrAmmount] = useState(null);
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});
    

    const countries = [
        { name: 'Australijski Dolar', code: 'AU', currency: 'AUD' },
        { name: 'Brazylijski Real', code: 'BR', currency: 'BRL' },
        { name: 'Brytyjski Funt', code: 'GB', currency: 'GBP' },
        { name: 'Chiński Juan', code: 'CN', currency: 'CNY' },
        { name: 'Czeska Korona', code: 'CZ', currency: 'CZK'},
        { name: 'Dolar Amerykański', code: 'US', currency: 'USD' },
        { name: 'Duńska Korona', code: 'DK', currency: 'DKK'},
        { name: 'EURO', code: 'DE', currency: 'EUR' },
        { name: 'Frank Szwajcarski', code: 'CH', currency: 'CHF'},
        { name: 'Indyjska Rupia', code: 'IN', currency: 'IDR' },
        { name: 'Japoński Jen', code: 'JP', currency: 'JPY' },
        { name: 'Marokański Dirham', code: 'MA', currency: 'MAD'},
        { name: 'Meksykańskie Peso', code: 'MX', currency: 'MXN'},
        { name: 'Norweska Korona', code: 'NO', currency: 'NOK'},
        { name: 'Polski Złoty', code: 'PL', currency: 'PLN' },
        { name: 'Rosyjski Rubel', code: 'RU', currency: 'RUB'},
        { name: 'Saudyjski Rial', code: 'SA', currency: 'SAR'},
        { name: 'Szwedzka Korona', code: 'SE', currency: 'SEK'},
        { name: 'Turecka Lira', code: 'TR', currency: 'TRY'}
    ];

    function Kliknieto(){
        url.searchParams.set('from', fromCurrency.currency);
        url.searchParams.set('to', toCurrency.currency);
        url.searchParams.set('amount', fromCurrAmmount.toString().replace(',', '.'));

        fetch( url.toString().replaceAll("%2C", ","), {method: 'GET'})
        .then(res => res.json())
        .then( data => {
            console.log(data);
            setToCurrAmmount(data.value);
        })
        
    }

    useEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }

        url.searchParams.set('from', fromCurrency.currency);
        url.searchParams.set('to', toCurrency.currency);
        const pomoc = fromCurrAmmount.toString().replace(',', '.');
        url.searchParams.set('amount', pomoc);
        
        fetch( url.toString().replaceAll("%2C", ","), {method: 'GET'})
        .then(res => res.json())
        .then( data => {
            console.log(data);
            setToCurrAmmount(data.value);
        })
        
        
        
    },[fromCurrency, fromCurrAmmount, toCurrency])
    
    useEffect(() => {
        if (firstUpdate2.current) {
            firstUpdate2.current = false;
            return;
        }
        
        const today = new Date().toISOString().split('T')[0];
        var monthAgo = new Date();
        monthAgo.setDate(monthAgo.getDate() - 30);
        
        const monthAgoString = monthAgo.toISOString().split('T')[0];
        var xAxis = [];
        var yAxis = [];
        var yAxisHelper = [];
        var result = {};
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        
        chartURL.searchParams.set('base', fromCurrency.currency);
        chartURL.searchParams.set('start_date', monthAgoString);
        chartURL.searchParams.set('end_date', today);
        chartURL.searchParams.set('symbols', toCurrency.currency);

        fetch( chartURL.toString().replaceAll("%2C", ","), {method: 'GET'})
        .then(res => res.json())
        .then( data => {
            result = Object.entries(data.response);
            
            for (let index = 0; index < result.length; index++) {
                xAxis.push(result[index][0]);
                yAxisHelper.push(result[index][1]);
            }
            for (let index = 0; index < yAxisHelper.length; index++) {
                yAxis.push(Object.values(yAxisHelper[index]));
                yAxis[index] = yAxis[index][0];
            }

            const dataChart = {
                labels: xAxis,
                datasets: [
                    {
                        label: 'Kurs wybranej waluty',
                        fill: true,
                        borderColor: documentStyle.getPropertyValue('--blue-500'),
                        yAxisID: 'y',
                        tension: 0.4,
                        data: yAxis
                    }
                ]
            };
            const options = {
                stacked: false,
                maintainAspectRatio: false,
                aspectRatio: 0.6,
                plugins: {
                    legend: {
                        labels: {
                            color: textColor
                        }
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            color: textColorSecondary
                        },
                        grid: {
                            color: surfaceBorder
                        }
                    },
                    y: {
                        type: 'linear',
                        display: true,
                        position: 'left',
                        ticks: {
                            color: textColorSecondary
                        },
                        grid: {
                            color: surfaceBorder
                        }
                    }
                }
            };

            setChartData(dataChart);
            setChartOptions(options);
        })
    }, [fromCurrency, toCurrency]); 

    const TextTemplate = (option, props) => {
        if (option) {
            return (
                <div className="flex align-items-center">
                    <img alt={option.name} src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png" className={`mr-2 flag flag-${option.code.toLowerCase()}`} style={{ width: '18px' }} />
                    <div>{option.name}</div>
                </div>
            );
        }

        return <span>{props.placeholder}</span>;
    };

    const countryOptionTemplate = (option) => {
        return (
            <div className="flex align-items-center">
                <img alt={option.name} src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png" className={`mr-2 flag flag-${option.code.toLowerCase()}`} style={{ width: '18px' }} />
                <div>{option.name}</div>
            </div>
        );
    };

    const panelFooterTemplate = () => {
        return (
            <div className="py-2 px-3">
                {fromCurrency ? (
                    <span>
                        Wybrany <b>{fromCurrency.name}</b>
                    </span>
                ) : (
                    'Nie wybrano waluty'
                )}
            </div>
        );
    };

    return (
        <div className="trans-form">
            <h1>Przelicz waluty!</h1>

            <div className="card flex justify-content-center">
                <InputNumber value={fromCurrAmmount} onValueChange={(e) => setFromCurrAmmount(e.value)} 
                    minFractionDigits={2} maxFractionDigits={2} locale="pl-PL" 
                    mode="currency" currency={fromCurrency.currency} min={0} max={10000} placeholder="00,00"/>
                <div className="card flex justify-content-center">
                <Dropdown value={fromCurrency} onChange={(e) => setfromCurrency(e.value)} options={countries} optionLabel="name" placeholder="Wybierz Walutę" 
                    valueTemplate={TextTemplate} itemTemplate={countryOptionTemplate} className="w-full md:w-14rem" panelFooterTemplate={panelFooterTemplate} />
                </div> 
            </div>

            <div className="card flex justify-content-center">
                <InputNumber value={toCurrAmmount} onValueChange={(e) => setToCurrAmmount(e.value)} 
                    minFractionDigits={2} maxFractionDigits={2} locale="pl-PL" 
                    mode="currency" currency={toCurrency.currency} min={0} placeholder="00,00" disabled/>
                <div className="card flex justify-content-center">
                <Dropdown value={toCurrency} onChange={(e) => setToCurrency(e.value)} options={countries} optionLabel="name" placeholder="Wybierz Walutę" 
                    valueTemplate={TextTemplate} itemTemplate={countryOptionTemplate} className="w-full md:w-14rem" panelFooterTemplate={panelFooterTemplate} />
                </div> 
            </div>

            <h3>Kurs {fromCurrency.currency}/{toCurrency.currency} z 30 dni</h3>
            <div className="card">
            <Chart type="line" data={chartData} options={chartOptions} />
            </div>
            
        </div>
           
    )
}
