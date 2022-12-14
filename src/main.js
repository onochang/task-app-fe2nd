import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// FontAwesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// FirebaseをImport
import { initializeApp } from "firebase/app";
// Firebaseの設定
const firebaseConfig = {
  apiKey: "AIzaSyDMvV6QlKVYmbrHNuTyPqTpllZN4gBWqFc",
  authDomain: "task-app-fe2nd.firebaseapp.com",
  projectId: "task-app-fe2nd",
  storageBucket: "task-app-fe2nd.appspot.com",
  messagingSenderId: "811673983949",
  appId: "1:811673983949:web:4d55e9dc34ee049a830284"
};

// Firebaseを初期化
initializeApp(firebaseConfig);

library.add(fas, far)

createApp(App).use(store).use(router).component('fa', FontAwesomeIcon ).mount('#app')
