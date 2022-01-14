import Vue from 'vue'
import FeatherIcon from '@core/components/feather-icon/FeatherIcon.vue'

// Validaciones Formularios
import * as Validator from 'vee-validate'
import es from 'vee-validate/dist/locale/es.json'
import { ValidationProvider, ValidationObserver } from 'vee-validate'

Vue.component(FeatherIcon.name, FeatherIcon)

// Validaciones Formularios
Validator.localize("es", es);

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
