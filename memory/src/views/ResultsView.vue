<template>
    <h1>Bravo {{ capitalizeName(userName) }}</h1>
    <div class="container">
        <p>Nombre de coups pour ce level: </p>
        <p>Temps: {{ formatTime(gameTime) }}</p>
        <p>Nombre de coups total : {{ totalMoves }}</p>
        <p>Temps total: {{ formatTime(gameTime) }}</p>
        <div class="cards">
            <p v-for="cardStats in JSON.parse(cardsStats)" :key="cardStats.index" class="card">
                {{ console.log(cardStats) }}
                <img :src="cardStats.imgPath" alt=""> {{ cardStats.nbClicks }} {{ cardStats.nbClicks <= 1 ? 'click' : 'clicks' }}
            </p>
        </div>
    </div>
</template>

<script setup>
import { capitalizeName } from '@/utils/stringUtils'
import { formatTime } from '@/utils/timeUtils'
import { ref, watchEffect } from 'vue'

const userName = ref(sessionStorage.getItem('userName'))
const totalMoves = ref(localStorage.getItem('totalMoves'))
const gameTime = ref(localStorage.getItem('gameTime'))
const cardsStats = ref(localStorage.getItem('cardsStats'))

console.log(cardsStats.value)


watchEffect(() => {
    document.title = `Mémory :: Resultats`
})
</script>

<style>
.cards {
    display: flex;
}
.card, img {
    width: 100px;
    height: 100px;
    box-shadow: 1px 1px 12px 5px #0f171f80;
    border-radius: 0.4rem;
}
</style>
