<template>
    <div class="bg-red-white h-full p-3 md:p-0">
        
        <div class="border-gray-300 border-2 rounded-xl overflow-auto h-full">
             <div class="sticky top-0 bg-white z-10">
                <div class="flex items-center justify-center w-full p-2 px-5">
                    <div class="text-2xl text-center">Measures converter</div>
                </div>
            
            <div class="flex md:flex-row p-4 justify-between">
                <div class=" pr-2 mb-2 md:mb-0 w-36 2xl:w-44">
                    <div class="flex md:h-10 h-12 border-2 rounded-full p-2 bg-gray-200 w-full overflow-x-auto overflow-y-hidden">
                        <input v-model="inputValue" class="flex-grow bg-transparent border-none outline-none w-full" />
                        <div class="flex-grow w-6"></div> <!-- Separator element between the value and the unit -->
                        <select v-model="fromUnit" class="w-12 bg-transparent">
                            <option v-for="(label, value) in units" :value="value" :key="value">
                                {{ label }}
                            </option>
                        </select>
                    </div>
                </div>
                <div class="items-center justify-between py-2 md:py-0 md:px-2">
                    <div class="md:block py-2">to</div>
                </div>
                <div class="pl-2 justify-between w-36 2xl:w-40">
                    <div class="flex md:h-10 h-12 border-2 rounded-full p-2 bg-gray-200">
                        <div class="flex-grow gap-2 overflow-x-auto overflow-y-hidden">{{ convertedValue }}</div>
                        <div class="flex-grow w-6"></div> <!-- Separator element between the value and the unit -->
                        <select class="w-12 bg-transparent" v-model="toUnit">
                            <option v-for="(label, value) in units" :value="value" :key="value">
                                {{ label }}
                            </option>
                        </select>
                    </div>
                </div>
            </div>
            </div>
            <div class="text-center">
                <h6 class="text-sm">CONVERSION CHART</h6>
            </div>
            <table class="w-full">
                <tr>
                    <td class="border-l-0 border-y-2 border-gray-300 text-center text-sm w-1/2">
                        1 g = 1000 mg
                    </td>
                    <td
                        class="border-r-0 border-l-2 border-y-2 border-gray-300 text-center text-sm w-1/2"
                    >
                        1 mL = 15 M = 15 drops
                    </td>
                </tr>
                <tr>
                    <td
                        class="border-l-0 border-y-2 border-gray-300 py-1 text-center text-sm w-1/2"
                    >
                        1000 g = 1 kg
                    </td>
                    <td
                        class="border-r-0 border-l-2 border-y-2 border-gray-300 text-center text-sm w-1/2"
                    >
                        5 mL = 1 fluidram = 1 tsp
                    </td>
                </tr>
                <tr>
                    <td
                        class="border-l-0 border-y-2 border-gray-300 py-1 text-center text-sm w-1/2"
                    >
                        0.001 mg = 1 mcg
                    </td>
                    <td
                        class="border-r-0 border-l-2 border-y-2 border-gray-300 text-center text-sm w-1/2"
                    >
                        15 mL = 4 fluidram = 1 tbsp
                    </td>
                </tr>
                <tr>
                    <td
                        class="border-l-0 border-y-2 border-gray-300 py-1 text-center text-sm w-1/2"
                    >
                        1 L = 1000 mL
                    </td>
                    <td
                        class="border-r-0 border-l-2 border-y-2 border-gray-300 text-center text-sm w-1/2"
                    >
                        30 mL = 1 oz = 2 tbsp
                    </td>
                </tr>
                <tr>
                    <td
                        class="border-l-0 border-y-2 border-gray-300 py-1 text-center text-sm w-1/2"
                    >
                        1 mL = 1 cc
                    </td>
                    <td
                        class="border-r-0 border-l-2 border-y-2 border-gray-300 text-center text-sm w-1/2"
                    >
                        500 mL = 1 pt
                    </td>
                </tr>
                <tr>
                    <td
                        class="border-l-0 border-y-2 border-gray-300 py-1 text-center text-sm w-1/2"
                    >
                        1 meter = 100 cm
                    </td>
                    <td
                        class="border-r-0 border-l-2 border-y-2 border-gray-300 text-center text-sm w-1/2"
                    >
                        1000 mL = 1 qt
                    </td>
                </tr>
                <tr>
                    <td class="border-l-0 py-1 text-center text-sm w-1/2">1 meter = 1000 mm</td>
                    <td class="border-r-0 border-l-2 border-gray-300 text-center text-sm w-1/2">
                        1 kg = 2.2 lb
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { getNumberAndDecimalPart, hasThisNumDecimals } from '../../utils/numbers';

export default defineComponent({
    setup() {
        const inputValue = ref(0);
        const fromUnit = ref('g');
        const toUnit = ref('mg');

        const units = {
            // Weight
            g: 'g',
            kg: 'kg',
            lb: 'lb',
            oz: 'oz',
            mg: 'mg',
            mcg: 'mcg',

            // Volume
            fl_dr: 'fl dr',
            tbsp: 'tbsp',
            pt: 'pt',
            qt: 'qt',
            mL: 'mL', 
            L: 'L',  
            cc: 'cc',  
            // Distance
            mm: 'mm',
            cm: 'cm',
            m: 'm',
            km: 'km',
        };

        const conversionRates = {
            // Weight
            g: 1,
            kg: 1000,
            lb: 453.59237,
            oz: 28.3495231,
            mg: 0.001,
            mcg: 1000,

            // Volume
            fl_dr: 3.696691195,
            tbsp: 14.78676478125,
            pt: 473.176473,
            qt: 946.352946,
            mL: 0.001, 
            L: 1,   
            cc: 0.001,  

            // Distance
            mm: 1,
            cm: 10,
            m: 1000,
            km: 1000000,
        };

        const convertedValue = computed(() => {
            // @ts-ignore
            const fromValue = conversionRates[fromUnit.value];
            // @ts-ignore
            const toValue = conversionRates[toUnit.value];
            const roundedInputValue = ((inputValue.value * fromValue) / toValue)

            if (!hasThisNumDecimals(roundedInputValue)) {
                return !isNaN(roundedInputValue) ? roundedInputValue : 0 
            }

            const { decimalPart } = getNumberAndDecimalPart(roundedInputValue)
            let resultWithDecimals: number
            const decimalPartLength = decimalPart.toString().length
            if (decimalPartLength <= 2) {
                // Use just two decimals
                resultWithDecimals = Number(roundedInputValue.toFixed(2))
            } else {
                // Use as much decimals as needed for the conversion
                resultWithDecimals = Number(roundedInputValue.toFixed(decimalPartLength))
            }

            return !isNaN(resultWithDecimals) ? resultWithDecimals : 0
        });

        return {
            inputValue,
            fromUnit,
            toUnit,
            units,
            convertedValue,
        };
    },
});
</script>