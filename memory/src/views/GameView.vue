<template>
    <header>
        <h1>{{ mode }}</h1>
        <div>Prénom et nom : {{ ucFirst(userName) }}</div>
        <div>Thème : {{ ucFirst(theme) }}</div>
    </header>
</template>

<script setup>
import { ucFirst } from '@/utils/stringUtils'
import { computed, ref, watchEffect } from 'vue'

const userName = ref(sessionStorage.getItem('userName'))
const theme = ref(sessionStorage.getItem('selectedTheme'))
const mode = computed(() => {
    const selectedMode = sessionStorage.getItem('selectedMode')
    return selectedMode === 'test'
        ? 'Test de la mémoire'
        : selectedMode === 'relearn'
          ? 'Réapprentissage'
          : ''
})
watchEffect(() => {
    document.title = `Mémory :: ${mode.value}`
})

</script>

<style></style>
