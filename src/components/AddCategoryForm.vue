<template>
  <v-card class="text-left pa-8">
    <v-row class="mb-1 teal--text text-h6">Add new category</v-row>
    <v-text-field
      color="teal"
      v-model="category"
      label="Category"
    ></v-text-field>
    <v-btn :disabled="category == 0" @click="addCategory"
      >ADD <v-icon>mdi-plus</v-icon></v-btn
    >
  </v-card>
</template>

<script>
export default {
  name: "AddCategoryForm",
  data() {
    return {
      category: "",
    };
  },
  methods: {
    addCategory() {
      this.$store.commit("addCategoryToList", this.category);
      this.$emit("close");
    },
  },
};
</script>
