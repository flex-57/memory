<template>
    {{ formatTime(timer) }}
    <button @click="togglePause" :disabled="!isStarted">
        {{ isPaused ? 'Reprendre' : 'Pause' }}
    </button>
</template>

<script setup>
import { formatTime } from '@/utils/timeUtils'
import { onUnmounted, ref, watchEffect } from 'vue'

const props = defineProps({
    start: Boolean,
})

const timer = ref(0)

const isPaused = ref(false)
const isStarted = ref(false)

let timerInterval

const timerStart = () => {
    if (!timerInterval) {
        isStarted.value = true
        timerInterval = setInterval(() => {
            timer.value += 1
        }, 1000)
    }
}

const togglePause = () => {
    isPaused.value = !isPaused.value
    if (!isPaused.value) {
        console.log(isPaused.value)
        timerStart()
        timerInterval = setInterval(() => {
            timer.value += 1
        }, 1000)
    } else {
        clearInterval(timerInterval)
    }
}

watchEffect(() => {
    if (props.start) {
        timerStart()
    }
})
onUnmounted(() => {
    clearInterval(timerInterval)
})
</script>

<style></style>
