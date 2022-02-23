import { getOneCurrency } from '../api';

const allCurrencyItems = document.querySelectorAll('.top-five__item');

const transformCurrencyData = (obj) => {
  const buy = obj.rates[0].bid;
  const sell = obj.rates[0].ask;
  const code = obj.code;
  const name = obj.currency;
  return {buy, sell, code, name};
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

    getOneCurrency(currencyName, 'a').then((data) => {
      showMidlCurrencyValue(data, item);
    }).catch((err) => {
      showCurrencyError(err, item);
      console.error(err);
    });
  });

  const showMidlCurrencyValue = (data, item) => {
    item.querySelector('.top-five__price--midle').textContent = data.rates[0].mid;
  }

  const showTopCurrency = (data, item) => {
    const {sell, buy, code, name} = transformCurrencyData(data)
    item.querySelector('.top-five__price--sell').textContent = sell;
    item.querySelector('.top-five__price--buy').textContent = buy;
    item.querySelector('.top-five__currency-name').textContent = code;
    item.querySelector('.top-five__name').textContent = name;
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
