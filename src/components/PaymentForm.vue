<template>
  <v-card class="text-left pa-8">
    <v-row class="mb-1 teal--text text-h6">{{ header }}</v-row>
    <v-text-field v-model="date" label="Date" color="teal"></v-text-field>
    <v-select
      v-model="category"
      label="Category"
      :items="options"
      color="teal"
    ></v-select>
    <v-text-field
      color="teal"
      type="number"
      v-model.number="value"
      label="Value"
    ></v-text-field>
    <v-btn @click="doWithPayment">SAVE <v-icon>mdi-plus</v-icon></v-btn>
  </v-card>
</template>

<script>
export default {
  name: "AddPaymentForm",
  props: {
    header: String,
    do: String,
    item: Object,
  },
  data() {
    return {
      date: "",
      category: "",
      value: "",
    };
  },
  computed: {
    getCurrentDate() {
      return new Intl.DateTimeFormat("ru").format(new Date());
    },
    options() {
      return this.$store.getters.getCategories;
    },
    getIdElement() {
      const id = this.$store.getters.getPaymentList.length;
      return id;
    },
  },
  methods: {
    doWithPayment() {
      return this[this.do]();
    },
    addPayment() {
      const { value, category } = this;
      const data = {
        id: this.getIdElement + 1,
        category,
        value,
        date: this.date || this.getCurrentDate,
      };
      this.$store.commit("addDataToPaymentList", data);
      this.$emit("close");
    },
    editPayment() {
      const { value, category } = this;
      const data = {
        id: this.item.id,
        category,
        value,
        date: this.date || this.getCurrentDate,
      };
      this.$store.commit("editItemOnPaymentListData", data);
      this.$emit("close");
    },
  },
  watch: {
    item(val) {
      if (val) {
        this.date = val.date;
        this.category = val.category;
        this.value = val.value;
      }
    },
  },
  mounted() {
    if (this.do === "editPayment") {
      this.date = this.item.date;
      this.category = this.item.category;
      this.value = this.item.value;
    }
  },
  async created() {
    if (this.$route.name === "AddPaymentFormUrl") {
      this.value = +this.$route.query?.value || 0;
      this.category = this.$route.params?.category || "";
    }
  },
};
</script>
