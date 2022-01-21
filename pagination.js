

const getUrl = (start = 0) => {
    return `https://api.coinlore.net/api/tickers/?start=${start}&limit=10`
}


const getData = async (url) => {
    try {
        const data = await fetch(url);
        const response = await data.json();
        if (response) {
            const loading = document.querySelector('#loading');
            loading.textContent = '';
        }

        loadDataIntoTable(response);
    } catch (error) {
        console.log(error);
    }

}


const loadDataIntoTable = (data) => {

    let colName = [];
    let colSymbol = [];
    let rankCol = [];
    let priceCol = [];
    let percentChange = [];




    data['data'].forEach(({ name, rank, price_usd, percent_change_24h, symbol }) => {
        colName.push(name);
        colSymbol.push(symbol);
        rankCol.push(rank);
        priceCol.push(price_usd);
        percentChange.push(percent_change_24h);
    });

    const Addfield = colName.map((_, index) => {

        return (
            `<tr>
           <td style='font-size:20px;'>${colName[index]} (${colSymbol[index]})</td>
           <td style='font-size:20px;'>${rankCol[index]}</td>
           <td style='font-size:25px;'>${priceCol[index]}</td>
           <td class=${percentChange[index] > 0 ? 'green-text text-darken-4' : 'red-text text-darken-4'} style='font-size:25px;'>${percentChange[index]}</td>
           </tr>
           `
        )
    }).join('');



    const tableBody = document.querySelector('#crypto_table_data');
    tableBody.innerHTML = Addfield;

}


const init = () => {
    const url = getUrl();
    getData(url)
}

init();



//pagination section.....




