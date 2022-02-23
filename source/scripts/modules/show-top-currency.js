import { getOneCurrency } from '../api';

const transformCurrencyData = (obj) => {
  const buy = obj.rates[0].bid;
  const sell = obj.rates[0].ask;
  return {buy, sell};
}


const topCurrency = () => {

  getOneCurrency('USD').then((data) => {
    showTopCurrency(data);
  }).catch((err) => {
    console.error(`błąd pobierania danych - ${err}`);
  });

  const showTopCurrency = (data) => {

  console.log(transformCurrencyData(data).buy);
  console.log(transformCurrencyData(data).sell);
  }


}

export { topCurrency };
