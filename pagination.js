

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
    let rankCol = [];
    let priceCol = [];
    let percentChange = [];




    data['data'].forEach(({ name, rank, price_usd, percent_change_24h }) => {
        colName.push(name);
        rankCol.push(rank);
        priceCol.push(price_usd);
        percentChange.push(percent_change_24h);
    });

    const Addfield = colName.map((_, index) => {

        return (
            `<tr>
           <td>${colName[index]}</td>
           <td>${rankCol[index]}</td>
           <td>${priceCol[index]}</td>
           <td>${percentChange[index]}</td>
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

