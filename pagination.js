

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
           <td style='font-size:25px;'>$${priceCol[index]}</td>
           <td class=${percentChange[index] >= 0 ? 'green-text text-darken-4' : 'red-text text-darken-4'} style='font-size:25px;'>${percentChange[index]}</td>
           </tr>
           `
        )
    }).join('');



    const tableBody = document.querySelector('#crypto_table_data');
    tableBody.innerHTML = Addfield;

}

//handle number click...
let clickedLink;

function handleNumberClick(clickedLink, leftArrow, rightArrow) {

    clickedLink.parentElement.classList = 'active';

    let clickedLinkPageNumber = parseInt(clickedLink.innerText);


    const url = getUrl((clickedLinkPageNumber * 10) - 10);
    getData(url);

    switch (clickedLinkPageNumber) {
        case 1:
            disableleftArrow(leftArrow);
            if (rightArrow.className.indexOf('disabled') !== -1) {
                enablerightArrow(rightArrow);
            }
            break;
        case 10:
            disablerightArrow(rightArrow);
            if (leftArrow.className.indexOf('disabled') !== -1) {
                enableleftArrow(leftArrow);
            }
            break;
        default:
            if (leftArrow.className.indexOf('disabled') !== -1) {
                enableleftArrow(leftArrow);
            }
            if (rightArrow.className.indexOf('disabled') !== -1) {
                enablerightArrow(rightArrow)
            }
            break;
    }
}



const handleleftArrowClick = () => {

}

const disableleftArrow = (leftArrow) => {
    leftArrow.classList = 'disabled arrow-left';
    leftArrow.classList.remove('waves-effect')
}


const enableleftArrow = (leftArrow) => {
    leftArrow.classList.remove('disabled');
    leftArrow.classList = 'waves-effect arrow-left';
}



const handlerightArrowClick = () => {

}


const disablerightArrow = (rightArrow) => {
    rightArrow.classList = 'disabled arrow-right';
    rightArrow.classList.remove('waves-effect')
}


const enablerightArrow = (rightArrow) => {
    rightArrow.classList.remove('disabled');
    rightArrow.classList = 'waves-effect arrow-right';
}



const init = () => {
    const url = getUrl();
    getData(url)
}

init();



//pagination section.....handle the pagination..


let pageLink = document.querySelectorAll('a');
let activePageNumber;

let nextPage;
let leftArrow;
let rightArrow;
let url = '';




pageLink.forEach((link) => {
    link.addEventListener('click', function () {
        leftArrow = document.querySelector('.arrow-left');
        rightArrow = document.querySelector('.arrow-right');
        activeLink = document.querySelector('.active');

        //get active page number....
        console.log(activeLink);

        activePageNumber = parseInt(activeLink.innerText);


        if ((this.innerText === 'chevron_left' && activePageNumber === 1) || (this.innerText === 'chevron_right' && activePageNumber === 10)) return;





        //update active class....

        activeLink.classList.remove('disabled')
        activeLink.classList = 'waves-effect';

        if (this.innerText === 'chevron_left') {
            handleleftArrowClick();
        } else if (this.innerText === 'chevron_right') {
            handlerightArrowClick();
        } else {
            handleNumberClick(this, leftArrow, rightArrow);
        }

    })
})




