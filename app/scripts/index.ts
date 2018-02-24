import '../styles/main.less'
import './reactAppsBootstrapper.tsx';

if (process.env.NODE_ENV !== 'production') {
  require('./../index.pug')
}

// Other hacks on page
document.getElementById('footer__copyright--year').innerText = new Date().getFullYear().toString();
