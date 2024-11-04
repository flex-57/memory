<template>
    <h1>Bravo {{ capitalizeName(userName) }}</h1>
    <div class="container">
        <p>Nombre de coups : {{ nbMoves }}</p>
    </div>
</template>

<script setup>
import { capitalizeName } from '@/utils/stringUtils'
import { ref } from 'vue'

const userName = ref(sessionStorage.getItem('userName'))
const nbMoves = ref(localStorage.getItem('nbMoves'))
</script>

<style></style>
