// Example API key for Alpha Vantage (replace with your own)
const API_KEY = '26f9c918b70ad73f2ca9bed7935254a5';
const expenseList = document.getElementById('expense-list');
const financialDataDiv = document.getElementById('financial-data');

document.getElementById('expense-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const description = document.getElementById('description').value;
    const amount = document.getElementById('amount').value;
    
    addExpense(description, amount);
    document.getElementById('expense-form').reset();
});

function addExpense(description, amount) {
    const li = document.createElement('li');
    li.textContent = `${description}: $${amount}`;
    expenseList.appendChild(li);
    fetchFinancialData();
}

async function fetchFinancialData() {
    try {
        const response = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=1min&apikey=${API_KEY}`);
        const data = await response.json();
        displayFinancialData(data);
    } catch (error) {
        console.error('Error fetching financial data:', error);
    }
}

function displayFinancialData(data) {
    const timeSeries = data["Time Series (1min)"];
    const latestTime = Object.keys(timeSeries)[0];
    const latestData = timeSeries[latestTime];
    financialDataDiv.innerHTML = `
        <p>Latest MSFT Price: $${latestData["1. open"]}</p>
        <p>Time: ${latestTime}</p>
    `;
}
