import '../styles/main.less'

if (process.env.NODE_ENV !== 'production') {
  require('./../index.pug')
}

// bootstrap react apps
import './productsApp/index.tsx';

// Other hacks on page
document.getElementById('footer__copyright--year').innerText = new Date().getFullYear().toString();