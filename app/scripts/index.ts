import '../styles/main.less'
import './App.tsx';

if (process.env.NODE_ENV !== 'production') {
  require('./../index.pug')
}

console.log('JavaScript loaded!');

document.getElementById('footer__copyright--year').innerText = new Date().getFullYear().toString();
