import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";

/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* import specific icons */
import {
  faAngleDown,
  faAngleRight,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

/* add icons to the library */
library.add(faAngleDown, faAngleRight, faTrash);

import "./assets/main.css";

const app = createApp(App).component("font-awesome-icon", FontAwesomeIcon);
app.use(createPinia());
app.mount("#app");
