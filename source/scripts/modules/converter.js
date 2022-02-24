import { getAllCurrency } from '../api';

const allSelects = document.querySelectorAll('.converter__select');
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
    allSelects.forEach((item) => {

      const fragment = new DocumentFragment();

      for (let key in data) {
        console.log(data[key])
        const templateItem = optionTemplate.content.cloneNode(true);
        templateItem.querySelector('.converter__option').value = data[key].code;
        templateItem.querySelector('.converter__option').textContent = data[key].currency;

        fragment.append(templateItem);
      }
      item.append(fragment);
    })
  };

};

export { converter };
