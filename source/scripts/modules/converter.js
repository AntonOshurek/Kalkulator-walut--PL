import { getAllCurrency } from '../api';

const allConvertItems = document.querySelectorAll('.converter__item');
const optionTemplate = document.querySelector('#converter__option');

const transformCurrencyData = (obj) => {
  const curItems = obj[0].rates
  return {...curItems};
};

const converter = () => {

  let allCurreny;

  getAllCurrency().then((data) => {
    showCurrencyItems(transformCurrencyData(data));
    allCurreny = transformCurrencyData(data);
  }).catch((err) => {
    console.error(err);
  });

  const showCurrencyItems = (data) => {
    allConvertItems.forEach((item, i) => {

      const fragment = new DocumentFragment();

      for (let key in data) {
        const templateItem = optionTemplate.content.cloneNode(true);
        templateItem.querySelector('.converter__option').value = data[key].code;
        templateItem.querySelector('.converter__option').textContent = data[key].currency;
        templateItem.querySelector('.converter__option').setAttribute('data-id', key);

        fragment.append(templateItem);
      }

      item.querySelector('.converter__select').append(fragment);

      checkConvertingValue(item)
    })
  };

  let inputValue;
  let selectValue;
  let curentValuteObj;

  // EUR/USD = EUR/PLN × PLN/USD

  const currencyCalculation = (currencyName) => {

    console.log(curentValuteObj)

    for (let key in allCurreny) {

      if(allCurreny[key].code === currencyName) {

        console.log(allCurreny[key])

        const result = (inputValue / curentValuteObj.ask) * (allCurreny[key].ask);

        return result;
      }
    }
  };

  const checkConvertingValue = (item) => {
    item.querySelector('.converter__input').addEventListener('input', (evt) => {
      inputValue = evt.target.value;
      selectValue = item.querySelector('.converter__select').value;

      for (let key in allCurreny) {
        if(allCurreny[key].code === selectValue) {
          curentValuteObj = allCurreny[key];
        }
      }

      setValue();
    });

    const setValue = () => {
      allConvertItems.forEach((convertItem) => {
        if(convertItem === item) {
          convertItem.querySelector('.converter__input').value = +inputValue;
        } else {
          convertItem.querySelector('.converter__input').value = currencyCalculation(convertItem.querySelector('.converter__select').value);
          currencyCalculation(convertItem.querySelector('.converter__select').value);
        }
      });
    }
  }

};

export { converter };
