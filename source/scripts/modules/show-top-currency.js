import { getOneCurrency } from '../api';

const allCurrencyItems = document.querySelectorAll('.top-five__item');

const transformCurrencyData = (obj) => {
  const buy = obj.rates[0].bid;
  const sell = obj.rates[0].ask;
  const code = obj.code;
  return {buy, sell, code};
};

const topCurrency = () => {

  allCurrencyItems.forEach((item) => {
    const currencyName = item.getAttribute('data-currency-name');

    getOneCurrency(currencyName).then((data) => {
      showTopCurrency(data, item);
    }).catch((err) => {
      console.error(`błąd pobierania danych - ${err}`);
    });
  });

  const showTopCurrency = (data, item) => {
    const {sell, buy, code} = transformCurrencyData(data)
    item.querySelector('.top-five__price--sell').textContent = sell;
    item.querySelector('.top-five__price--buy').textContent = buy;
    item.querySelector('.top-five__currency-name').textContent = code;
  };

};

export { topCurrency };
