import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    paymentsList: [],
    categories: [],
  },
  mutations: {
    setPaymentListData(state, payload) {
      state.paymentsList = payload;
    },
    addDataToPaymentList(state, payload) {
      state.paymentsList.push(payload);
    },
    setCategoriesListData(state, payload) {
      state.categories = payload;
    },
    addCategoryToList(state, payload) {
      state.categories.push(payload);
    },
    deleteItemOnPaymentListData(state, payload) {
      state.paymentsList.splice(state.paymentsList.indexOf(payload), 1);
    },
    editItemOnPaymentListData(state, payload) {
      state.paymentsList.splice(payload.id - 1, 1, payload);
    },
  },
  getters: {
    getPaymentList: (state) => state.paymentsList,
    getFullPaymentValue: (state) => {
      return state.paymentsList.reduce((res, cur) => res + cur.value, 0);
    },
    getCategories: (state) => state.categories,
    getChartItems: (state) => {
      let array = [];
      for (let item of state.paymentsList) {
        let i = array.find((i) => i.category === item.category);
        if (i) {
          i.value += item.value;
        } else {
          let data = {
            category: item.category,
            value: item.value,
            color: "#" + Math.floor(Math.random() * 16777215).toString(16),
          };
          array.push(data);
        }
      }
      return array;
    },
  },
  actions: {
    fetchData({ commit }) {
      axios
        .get(
          "https://raw.githubusercontent.com/Anarik39/Vue-GB/API/vue-project/products.json"
        )
        .then((response) => {
          commit("setPaymentListData", response.data.items);
        });
    },
    fetchCategoryList({ commit }) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const categories = [
            "Sport",
            "Food",
            "Education",
            "Transport",
            "Entertaiment",
            "Navigation",
          ];
          resolve(categories);
        });
      }).then((res) => commit("setCategoriesListData", res));
    },
  },
});
