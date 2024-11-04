<template>
    <header>
        <h1>Memory : {{ mode }}</h1>
        <div class="container">
            <div>
                <p>
                    <span>Utilisateur : </span>
                    <strong>{{ capitalizeName(userName) }}</strong>
                </p>
                <p>
                    <span>Thème de jeu : </span>
                    <strong>{{ ucFirst(theme) }}</strong>
                </p>
            </div>
            <div>
                <p>
                    <span>Coups min : </span>
                    <strong>{{ cards.length }}</strong>
                </p>
                <p>
                    <span>Coups : </span>
                    <strong>{{ moves }}</strong>
                </p>
            </div>
            <div>
                <p>
                    <span>Paires trouvées : </span>
                    <strong>{{ pairsFound }} / {{ nbPairs }}</strong>
                </p>
                <p>
                    <Timer
                        :start="isStarted"
                        @emitPause="isPaused = !isPaused"
                    />
                </p>
            </div>
        </div>
    </header>
    <main>
        <div>
            <div v-if="errorMessage !== ''">{{ errorMessage }}</div>
            <div v-else-if="loading">Chargement...</div>
            <div v-else>
                <div class="cards">
                    <Card
                        v-for="card in cards"
                        :key="card.id"
                        :card="card"
                        :isPaused="isPaused"
                        @emitFlipCard="flipCard"
                    />
                </div>
            </div>
        </div>
    </main>
</template>

<script setup>
import { fetchCards } from '@/utils/fetchCards'
import { capitalizeName, ucFirst } from '@/utils/stringUtils'
import Card from '@/components/Card.vue'
import { computed, onMounted, ref, watchEffect } from 'vue'
import router from '@/router'
import Timer from '@/components/Timer.vue'

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

const loading = ref(true)
const errorMessage = ref('')

const cards = ref([])
const flippedCards = ref([])
const moves = ref(0)
const pairsFound = ref(0)

const nbPairs = ref(2)

const isStarted = ref(false)
const isPaused = ref(false)

const flipCard = card => {
    if (!isStarted.value) {
        isStarted.value = true
    }
    if (!card.isFlipped && flippedCards.value.length < 2) {
        card.isFlipped = true
        flippedCards.value.push(card)
        moves.value++
        if (flippedCards.value.length === 2) {
            checkMatch()
        }
    }
}

const checkMatch = () => {
    const [card1, card2] = flippedCards.value
    if (card1.name === card2.name) {
        flippedCards.value = []
        pairsFound.value += 1
        if (pairsFound.value === nbPairs.value) {
            endGame()
        }
    } else {
        setTimeout(() => {
            card1.isFlipped = false
            card2.isFlipped = false
            flippedCards.value = []
        }, 1000)
    }
}

const endGame = () => {
    localStorage.setItem('nbMoves', moves.value)
    router.push('/results')
}

onMounted(async () => {
    try {
        cards.value = await fetchCards(theme.value, nbPairs.value)
    } catch (e) {
        errorMessage.value =
            'Impossible de charger les cartes. Veuillez réessayer.'
    } finally {
        loading.value = false
    }
})

watchEffect(() => {
    document.title = `Mémory :: ${mode.value}`
})
</script>

<style scoped>
.container {
    justify-content: space-evenly;
    border-radius: 0.6rem;
    border: 1px solid var(--color4);
    font-size: 1.4rem;
}
.h3 {
    padding: 1rem;
    margin-top: 1.5rem;
    text-align: center;
    button {
        width: auto;
        margin: 0 0 0 2rem;
        padding: 0.3rem 1rem;
        font-size: 1.5rem;
    }
}
p {
    margin-top: 0.8rem;
}
.cards {
    padding: 1rem;
    border: 1px solid var(--color4);
    border-radius: 0.6rem;
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    justify-items: center;
    gap: 0.8rem;
}
</style>
