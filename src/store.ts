import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    formData: "",
    // avik:[]
  },
  mutations: {
    storeFormData(state,data){
      state.formData = data
    },
    // test(state,data){
    //   state.avik = data
    // }
  },
  actions: {

  },
});
