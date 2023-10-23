<template>
	<div class="p-3 md:p-0">
		<div class="p-2 rounded-xl shadow-md bg-vinoLight">
			<div class="text-3xl mb-2 text-right bg-white rounded-full px-2 display overflow-auto">{{ displayValue }}</div>
			<div class="grid grid-cols-6 gap-2 buttons">
			<button
				v-for="button in buttons"
				:key="button"
				:class="['rounded-xl', button === '0' ? 'col-span-2' : button === '=' ? 'col-span-3' : '', isNumeric(button) ? 'bg-vino' : 'button-operation-background']"
				@click="handleButtonClick(button)"
			>
				<span v-if="button === 'undo'" class="text-white">&#x2190;</span>
				<span v-else class="text-white sm:text-xs md:text-md">{{ button }}</span>
			</button>
			</div>
		</div>
	</div>
  
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const displayValue = ref('0');
    const buttons = [
      '1', '2', '3', '+',
      '-','AC', '4', '5',
      '6','*','/', '%',  
      '7', '8', '9', '±','√ ','undo',
      '0', '.', '='
    ];

    let currentExpression = '';
    let hasDecimal = false;
    let history = [];
    let historyIndex = -1;

    const isNumeric = (button) => {
      return /[0-9.]/.test(button);
    };

    const handleButtonClick = (button) => {
      if (button === 'AC') {
        resetCalculator();
      } else if (button === '=') {
        evaluateExpression();
      } else if (button === '√') {
        computeSquareRoot();
      } else if (button === '%') {
        computePercentage();
      } else if (button === '±') {
        computeApproximation();
      } else if (button === '.' && !hasDecimal) {
        hasDecimal = true;
        currentExpression += button;
        displayValue.value = currentExpression;
      } else if (/[0-9]/.test(button)) {
        currentExpression += button;
        displayValue.value = currentExpression;
      } else if (/[-+*/]/.test(button)) {
        hasDecimal = false;
        currentExpression += button;
        displayValue.value = currentExpression;
      }
      if (button === 'undo') {
        if (historyIndex > 0) {
          historyIndex--;
          currentExpression = history[historyIndex];
          displayValue.value = currentExpression;
        }
      } else if (button === 'redo') {
        if (historyIndex < history.length - 1) {
          historyIndex++;
          currentExpression = history[historyIndex];
          displayValue.value = currentExpression;
        }
      } else {
        history.push(currentExpression);
        historyIndex = history.length - 1;
      }
    };

    const resetCalculator = () => {
      currentExpression = '';
      hasDecimal = false;
      displayValue.value = '0';
    };

    const evaluateExpression = () => {
      try {
        currentExpression = eval(currentExpression).toString();
        displayValue.value = currentExpression;
      } catch (error) {
        displayValue.value = 'Error';
      }
    };

    const computeSquareRoot = () => {
      currentExpression = Math.sqrt(parseFloat(currentExpression)).toString();
      displayValue.value = currentExpression;
    };

    const computePercentage = () => {
      currentExpression = (parseFloat(currentExpression) / 100).toString();
      displayValue.value = currentExpression;
    };

    const computeApproximation = () => {
      currentExpression = parseFloat(currentExpression).toPrecision(5);
      displayValue.value = currentExpression;
    };

    return {
      displayValue,
      buttons,
      handleButtonClick,
      isNumeric
    };
  }
};
</script>

<style scoped>

.display {
  font-size: 24px;
  margin-bottom: 10px;
}
.button-operation-background{
  background: #3C3C3C;
}
</style>