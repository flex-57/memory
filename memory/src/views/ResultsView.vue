<template>
    <h1>Bravo {{ capitalizeName(userName) }}</h1>
    <div class="container">
        <p>Nombre de coups pour ce level: </p>
        <p>Temps: {{ formatTime(gameTime) }}</p>
        <p>Nombre de coups total : {{ totalMoves }}</p>
        <p>Temps total: {{ formatTime(gameTime) }}</p>
        <div class="cards">
            <p v-for="(gameStats, index) in gamesStats" :key="index" class="card">
                <img :src="gameStats.imgPath" alt=""> {{ gameStats.nbClicks }} {{ gameStats.nbClicks <= 1 ? 'click' : 'clicks' }}
            </p>
        </div>
        {{ console.log(gamesStats.value) }}
    </div>
</template>

<script setup>
import { capitalizeName } from '@/utils/stringUtils'
import { formatTime } from '@/utils/timeUtils'
import { ref, watchEffect } from 'vue'

const userName = ref(sessionStorage.getItem('userName'))
const totalMoves = ref(localStorage.getItem('totalMoves'))
const gameTime = ref(localStorage.getItem('gameTime'))
const gamesStats = ref(localStorage.getItem('gamesStats'))


watchEffect(() => {
    document.title = `Mémory :: Resultats`
})
</script>

<style>
.cards {
    display: flex;
}
.card, img {
    width: 50px;
    height: 50px;
    box-shadow: 1px 1px 12px 5px #0f171f80;
    border-radius: 0.4rem;
}
</style>
