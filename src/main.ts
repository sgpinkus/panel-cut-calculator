
import 'vuetify/styles'; // Global CSS has to be imported
import { createApp } from 'vue';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
// import { VNumberInput } from 'vuetify/labs/VNumberInput';
import * as directives from 'vuetify/directives';
import '@mdi/font/css/materialdesignicons.css';
import './main.scss';

import App from './App.vue';

const app = createApp(App);

app.use(createVuetify({
  components: { ...components },
  directives,
}));

app.mount('#app');
