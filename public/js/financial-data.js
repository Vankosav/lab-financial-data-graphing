let start = "2024-01-21"
let end = "2024-02-20"
let currency = "USD"

const apiUrl = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}&currency=${currency}`;  

axios.get(apiUrl)
  .then(responseFromAPI => {
    printTheChart(responseFromAPI.data);
  })
  .catch(err => {
    console.error('Error while getting the data:', err);
  });

function printTheChart(coinData) {
  try {
    const bpiData = coinData.bpi || {}; // Check if bpi property exists, use empty object as fallback
  
    const coinDates = Object.keys(bpiData);
    const coinPrices = Object.values(bpiData);
  
    console.log('Coin Dates:', coinDates);
    console.log('Coin Prices:', coinPrices);
  
    const ctx = document.getElementById('my-chart').getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: coinDates,
        datasets: [
          {
            label: 'Coin Chart',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: coinPrices
          }
        ]
      }
    });
  } catch (error) {
    console.error('Error while processing data:', error);
  }
}
