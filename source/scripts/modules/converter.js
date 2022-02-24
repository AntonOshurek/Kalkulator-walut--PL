import { getAllCurrency } from '../api';

const converter = () => {

  getAllCurrency().then((data) => {
    console.log(data)
  }).catch((err) => {
    console.error(err);
  });

};

export { converter };
