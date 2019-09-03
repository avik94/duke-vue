import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    formData: ""
  },
  mutations: {
    storeFormData(state,data){
      state.formData = data
    }
  },
  actions: {

  },
});
