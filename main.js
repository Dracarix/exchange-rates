function formatDateTime(dateTimeString) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
    return new Date(dateTimeString).toLocaleDateString(undefined, options);
};

async function kursiValute(){
    try{
        //получаем данные 
        const url1 = 'https://www.cbr-xml-daily.ru/daily_json.js';
        const url2 = 'https://api.coindesk.com/v1/bpi/currentprice.json';

        const response1 = await fetch(url1);
        const response2 = await fetch(url2);

        const data1 = await response1.json();
        const data2 = await response2.json();
        //обрабаотываем данные
        const USD = document.querySelector('#usd-rate');
        const EUR = document.querySelector('#eur-rate');
        const BTC1 = document.querySelector('#btc-rate-rubl');
        const BTC2 = document.querySelector('#btc-rate-usd');
        const dataModificationUSD = document.querySelector('#data-izmeneniy-usd');
        const dataModificationEUR = document.querySelector('#data-izmeneniy-eur');
        const dataModificationBTC = document.querySelector('#data-izmeneniy-btc');

        //данные о времени
        const timeModifBTC = formatDateTime(data2.time.updated);
        const timeModifUSD = formatDateTime(data1.Date);

        //Курсы валют
        const eurData = data1.Valute.EUR.Value.toFixed(2);
        const usdData = data1.Valute.USD.Value.toFixed(2);
        //BTC в Долларах
        const btcUSD = data2.bpi.USD.rate_float;
        //BTC в Рублях
        const btcData = btcUSD * usdData;

        USD.innerText = usdData;
        EUR.innerText = eurData;
        BTC1.innerText = btcData.toLocaleString();
        BTC2.innerText = btcUSD.toLocaleString();

        //время 
        dataModificationBTC.innerText = timeModifBTC;
        dataModificationUSD.innerText = timeModifUSD;
        dataModificationEUR.innerText = timeModifUSD;


        console.log('vse norm, rabotaem');
    }catch(error){ 
        console.log('pizda ne rabotaet')
        console.log(error)
    }
}

kursiValute();