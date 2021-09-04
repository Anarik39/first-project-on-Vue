<template>
  <v-container>
    <v-container>
      <header class="text-h3">My personal costs</header>
      <v-row class="text-body-1 ma-2 teal--text"
        >Total value: {{ getFPV }}</v-row
      ></v-container
    >
    <v-row
      class="d-flex flex-column-reverse flex-md-row
 align-center justify-md-space-between"
    >
      <v-col cols="12" md="8">
        <v-container d-flex flex-column flex-md-row>
          <v-dialog v-model="dialogAddPayment" width="500">
            <template v-slot:activator="{ on }">
              <v-btn class="mb-3 mb-md-0 mr-md-5" v-on="on" color="teal" dark
                >ADD NEW COST <v-icon>mdi-plus</v-icon></v-btn
              >
            </template>
            <v-card>
              <add-payment-form
                :header="'Add new payment'"
                :do="'addPayment'"
                @close="dialogAddPayment = false"
              />
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogAddCategory" width="500">
            <template v-slot:activator="{ on }">
              <v-btn v-on="on" color="teal" dark>
                ADD NEW CATEGORY <v-icon>mdi-plus</v-icon></v-btn
              >
            </template>
            <v-card>
              <add-category-form @close="dialogAddCategory = false" />
            </v-card>
          </v-dialog>
        </v-container>
        <payments-display :list="paymentsList" />
      </v-col>
      <v-col cols="10" md="4">
        <chart-on-index-page :chart-data="chartData" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import AddCategoryForm from "../components/AddCategoryForm.vue";
import AddPaymentForm from "../components/PaymentForm.vue";
import ChartOnIndexPage from "../components/ChartOnIndexPage.vue";
import PaymentsDisplay from "../components/PaymentsDisplay.vue";

export default {
  name: "PageIndex",
  components: {
    PaymentsDisplay,
    ChartOnIndexPage,
    AddPaymentForm,
    AddCategoryForm,
  },
  data() {
    return {
      dialogAddPayment: false,
      dialogAddCategory: false,
    };
  },
  methods: {
    ...mapActions(["fetchCategoryList", "fetchData"]),
  },
  computed: {
    ...mapGetters({ paymentsList: "getPaymentList" }),
    ...mapGetters({ chartList: "getChartItems" }),
    getFPV() {
      return this.$store.getters.getFullPaymentValue;
    },
    chartData() {
      let chart = {
        labels: [],
        datasets: [
          {
            backgroundColor: [],
            data: [],
          },
        ],
      };
      for (let chartItem of this.chartList) {
        chart.labels.push(chartItem.category);

        let dataset = chart.datasets[0];
        dataset.backgroundColor.push(chartItem.color);
        dataset.data.push(chartItem.value);
      }
      return chart;
    },
  },
  async created() {
    await this.fetchCategoryList();
    await this.fetchData();
  },
};
</script>
