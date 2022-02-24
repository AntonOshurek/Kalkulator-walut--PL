import { getAllCurrency } from '../api';

const allConvertItems = document.querySelectorAll('.converter__item');
const optionTemplate = document.querySelector('#converter__option');

const transformCurrencyData = (obj) => {
  const curItems = obj[0].rates
  return {...curItems};
};

const converter = () => {

  getAllCurrency().then((data) => {
    showCurrencyItems(transformCurrencyData(data));
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

        fragment.append(templateItem);
      }

      //setting id attributes for input and select
      item.querySelector('.converter__input').setAttribute('currency-id', `cur${i}`);
      item.querySelector('.converter__select').setAttribute('currency-id', `cur${i}`);

      item.querySelector('.converter__select').append(fragment);

      checkConvertingValue(item)
    })
  };

  let inputValue = '';

  const checkConvertingValue = (item) => {

    item.querySelector('.converter__input').addEventListener('input', (evt) => {
      inputValue = evt.target.value;
      setValue();
    });

    const setValue = () => {

      allConvertItems.forEach((convertItem) => {
        if(convertItem === item) {
          convertItem.querySelector('.converter__input').value = +inputValue;
        } else {
          convertItem.querySelector('.converter__input').value = +inputValue * 2;
          console.log(convertItem.querySelector('.converter__select').value);

        }
      });

    }

  }

};

export { converter };
