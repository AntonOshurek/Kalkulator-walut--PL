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
      showCurrencyError(err, item);
      console.error(err);
    });
  });

  const showTopCurrency = (data, item) => {
    const {sell, buy, code} = transformCurrencyData(data)
    item.querySelector('.top-five__price--sell').textContent = sell;
    item.querySelector('.top-five__price--buy').textContent = buy;
    item.querySelector('.top-five__currency-name').textContent = code;
  };

  const showCurrencyError = (error, item) => {
    item.querySelectorAll('.top-five__price').forEach((item) => {
      item.classList.add('top-five__price--error');
    })
    item.querySelector('.top-five__price--sell').textContent = `błąd pobierania danych - error ${error}`;
    item.querySelector('.top-five__price--buy').textContent = `błąd pobierania danych - error ${error}`;
    item.querySelector('.top-five__currency-name').textContent = '---';
  }

};

export { topCurrency };
