<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="list"
      :items-per-page="5"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-dialog v-model="dialogEditPayment" width="500">
          <v-card>
            <add-payment-form
              :header="'Edit new payment'"
              :do="'editPayment'"
              :item="item"
              @close="dialogEditPayment = false"
            />
          </v-card>
        </v-dialog>

        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5"
              >Are you sure you want to delete this item?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete"
                >Cancel</v-btn
              >
              <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">
          mdi-pencil
        </v-icon>
        <v-icon small @click="deleteItem(item)">
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import AddPaymentForm from "./PaymentForm.vue";
export default {
  components: { AddPaymentForm },
  name: "PaymentDisplay",
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      headers: [
        { text: "#", value: "id", sortable: false },
        { text: "Date", value: "date" },
        { text: "Category", value: "category" },
        { text: "Value", value: "value" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      dialogDelete: false,
      dialogEditPayment: false,
      item: null,
      editPayment: "",
    };
  },
  methods: {
    deleteItem(item) {
      this.dialogDelete = true;
      this.item = item;
    },

    deleteItemConfirm() {
      this.$store.commit("deleteItemOnPaymentListData", this.item);
      this.closeDelete();
    },

    closeDelete() {
      this.dialogDelete = false;
      this.item = null;
    },

    editItem(item) {
      this.item = item;
      this.dialogEditPayment = true;
    },
  },
};
</script>
