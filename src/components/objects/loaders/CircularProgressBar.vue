<template>
    <div>
        <svg class="stat-circle" width="40" viewBox="0 0 20 20">
            <circle class="bg" cx="10" cy="10" r="8"></circle>
            <circle
                ref="progressCircle"
                :data-percentage="percentage"
                :style="{
                    strokeDashoffset: offset
                }"
                class="progress"
                cx="10"
                cy="10"
                r="8"
            ></circle>

            <text x="50%" y="55%" style="font-size: 4px">
                {{ percentage }}%
            </text>
        </svg>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue'
import { animate } from 'popmotion'

export default defineComponent({
    props: { percentage: { type: Number, required: true } },
    setup(props) {
        const progressCircle = ref(null)

        /** Calculates circular progress bar offset based on the value of "percentage" */
        const offset = computed(() => {
            return -51 - (51 / 100) * props.percentage
        })

        const animateIt = () => {
            
            const animationProperties = {
                strokeDashoffset: offset.value,
            }

            animate({
                from: 0,
                to: animationProperties.strokeDashoffset,
                duration: 100, // 0.4 seconds
            })
        }

        onMounted(() => {
            animateIt()
        })

        return {
            progressCircle,
            offset,
        }
    },
})
</script>

<style scoped>
.stat-circle circle.bg {
    fill: none;
    stroke: #f1f1f1;
    stroke-width: 2;
}
.stat-circle circle.progress {
    fill: none;
    stroke: #2ecc71;
    stroke-width: 2;
    stroke-dasharray: 51 51;
    stroke-linecap: round;
}
.stat-circle text {
    font-size: 3px;
    text-anchor: middle;
    fill: #555;
}
</style>
