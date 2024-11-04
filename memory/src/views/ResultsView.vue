<template>
    <h1>Bravo {{ capitalizeName(userName) }}</h1>
    <div class="container">
        <p>Nombre de coups : {{ nbMoves }}</p>
        <p>Temps : {{ formatTime(gameTime) }}</p>
    </div>
</template>

<script setup>
import { capitalizeName } from '@/utils/stringUtils'
import { formatTime } from '@/utils/timeUtils'
import { ref } from 'vue'

const userName = ref(sessionStorage.getItem('userName'))
const nbMoves = ref(localStorage.getItem('nbMoves'))
const gameTime = ref(localStorage.getItem('gameTime'))
</script>

<style></style>
