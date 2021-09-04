<template>
  <v-container>
    <v-card class="teal--text text-center">
      <header class="teal--text pa-3 text-h4 text-md-h3">Калькулятор</header>
      <div>
        <input
          name="radio"
          type="radio"
          v-model="radioOperand"
          value="operand1"
          v-show="keyboardShow"
        />
        <input
          placeholder="Первое число"
          type="number"
          v-model.number="operand1"
          @focus="radioOperand = 'operand1'"
        />
      </div>
      <div>
        <input
          name="radio"
          type="radio"
          v-model="radioOperand"
          value="operand2"
          v-show="keyboardShow"
        />
        <input
          placeholder="Второе число"
          type="number"
          v-model.number="operand2"
          @focus="radioOperand = 'operand2'"
        />
      </div>
      <div class="buttons">
        <v-btn
          class="ma-2 teal white--text"
          v-for="operation in operations"
          :key="operation"
          @click="calculate(operation)"
          :title="operation"
          :disabled="
            (operation === '/' || operation === 'Целочисленное деление') &&
              (operand2 === 0 || operand2 === '')
          "
        >
          {{ operation }}
        </v-btn>
      </div>
      <v-card-text v-show="showResult" class="text-h4 teal--text"
        >Результат: {{ result }}</v-card-text
      >
      <div>
        <label class="label-check"
          ><input
            @click="keyboardShow = !keyboardShow"
            type="checkbox"
          />Отобразить экранную клавиатуру</label
        >
        <div class="keyboard ma-5" v-show="keyboardShow">
          <v-btn
            class="ma-2 teal white--text"
            @click="pressKeyboard(button)"
            v-for="button in keyboard"
            :key="button"
            :title="button"
          >
            {{ button }}
          </v-btn>
          <v-btn
            @click="pressBackspace"
            :title="'←'"
            class="ma-2 teal white--text"
            >←</v-btn
          >
        </div>
      </div>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "PageCalculator",
  data: () => ({
    operand1: "",
    operand2: "",
    result: 0,
    operations: [
      "+",
      "-",
      "*",
      "Возвести в степень",
      "/",
      "Целочисленное деление",
    ],
    showResult: false,
    keyboard: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
    keyboardShow: false,
    radioOperand: "operand1",
  }),
  methods: {
    pressKeyboard(keyboard) {
      this[this.radioOperand] = parseInt(this[this.radioOperand] + keyboard);
    },
    pressBackspace() {
      this[this.radioOperand] = this[this.radioOperand].toString().slice(0, -1);
      if (this[this.radioOperand]) {
        this[this.radioOperand] = parseInt(this[this.radioOperand]);
      }
    },
    calculate(operation = "") {
      this.showResult = true;
      switch (operation) {
        case "+":
          this.sum();
          break;
        case "-":
          this.sub();
          break;
        case "*":
          this.multi();
          break;
        case "Возвести в степень":
          this.raiseToThePower();
          break;
        case "/":
          this.div();
          break;
        case "Целочисленное деление":
          this.integerDiv();
          break;
      }
    },
    sum() {
      this.result = this.operand1 + this.operand2;
    },
    sub() {
      this.result = this.operand1 - this.operand2;
    },
    multi() {
      this.result = this.operand1 * this.operand2;
    },
    raiseToThePower() {
      this.result = Math.pow(this.operand1, this.operand2);
    },
    div() {
      this.result = this.operand1 / this.operand2;
    },
    integerDiv() {
      this.result = Math.floor(this.operand1 / this.operand2);
    },
  },
};
</script>

<style lang="scss" scoped>
input {
  margin: 10px;
  text-align: center;
  outline: none;
  padding: 10px;
  border: teal 1px solid;
}
.result {
  font-size: 30px;
  padding: 10px;
  border-top: 2px solid teal;
}
</style>
