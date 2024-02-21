import axios from 'axios';
import Chart from 'chart.js/auto';

let start = "2024-01-21"
let end = "2024-02-20"
let currency = "USD"

const apiUrl = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}&currency=${currency}`;  

axios
.get(apiUrl)
.then(responseFromAPI => {
  printTheChart(responseFromAPI.bpi)
})
.catch(err => console.log('Error while getting the data', err));

window.onload = function () {
  function printTheChart(bitcoinData) {
  const dailyData = bitcoinData['bpi'];
 
  const dates = Object.keys(dailyData);
  const prices = dates.map((date) => dailyData[date]);

  let highest = Math.max(...prices)
  let lowest = Math.min(...prices)
  let currency = document.querySelector('#currency').value

  document.getElementById('max-val').innerText = `${highest} ${currency}`
  document.getElementById('min-val').innerText = `${lowest} ${currency}`

  const ctx = document.getElementById('my-chart').getContext('2d');
 const chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: dates,
      datasets: [
        {
          label: 'Stock Chart',
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data: prices
        }
      ]
    }
  }); // closes chart = new Chart()
} 

async function printData (url) {
  try {
    const getBpiData = await axios.get(url)
    const bpiData = getBpiData.data
    printTheChart(bpiData)

  } catch (error) {
    console.log("Error while getting the data: ", error)
  }
}

printData(apiUrl)

document
    .querySelector("#get-date-to-date")
    .addEventListener("click", (event) => {
      event.preventDefault()
      start = document.getElementById('start-date').value
      end = document.getElementById('end-date').value
      const startDate = new Date(start)
      const endDate = new Date(end)

      if ((start !== '' || end !== '') && (startDate < endDate)) {
        apiUrl = `https://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}`
        printData(apiUrl)
      }
    })

    document.querySelector('#currency').addEventListener('change', (event) => {
      const curren = document.getElementById("currency").value
      start = document.getElementById("start-date").value
      end = document.getElementById("end-date").value
      const startDate = new Date(start)
      const endDate = new Date(end)
  
      if ((start !== "" || end !== "") && startDate < endDate) {
        apiURL = `https://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}&currency=${curren}`
        printData(apiUrl)
      } else {
        start = "2024-01-21"
        end = "2024-02-20"
        console.log(start, end, curren)
        apiUrl = `https://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}&currency=${curren}`
        console.log(apiUrl)
  
        printData(apiUrl)
      }
    })
}