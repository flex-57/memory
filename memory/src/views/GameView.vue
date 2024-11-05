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
                    <span>Niveau : </span>
                    <strong>{{ countLevels + 1 }} / {{ config.levels }}</strong>
                </p>
            </div>
            <div>
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
            <div v-if="errorMessage !== ''" class="msg error">
                {{ errorMessage }}
            </div>
            <div v-else-if="loading" class="msg loading">Chargement...</div>
            <div v-else class="cards">
                <Card
                    v-for="card in cards"
                    :key="card.id"
                    :card="card"
                    :isPaused="isPaused"
                    @emitFlipCard="flipCard"
                />
            </div>
        </div>
    </main>
</template>

<script setup>
import router from '@/router'
import { fetchCards } from '@/utils/fetchCards'
import { capitalizeName, ucFirst } from '@/utils/stringUtils'
import { computed, onMounted, ref, watchEffect } from 'vue'
import Card from '@/components/CardComponent.vue'
import Timer from '@/components/TimerComponent.vue'
import { fetchConfig } from '@/utils/fetchConfig'

const userName = ref(sessionStorage.getItem('userName'))
const theme = ref(sessionStorage.getItem('selectedTheme'))
const selectedMode = ref(sessionStorage.getItem('selectedMode'))
const mode = computed(() => {
    return selectedMode.value === 'test'
        ? 'Test de la mémoire'
        : selectedMode.value === 'relearn'
          ? 'Réapprentissage'
          : ''
})

const config = ref([])
const countLevels = ref(0)

const loading = ref(true)
const errorMessage = ref('')

const cards = ref([])
const flippedCards = ref([])
const moves = ref(0)
const pairsFound = ref(0)

const nbPairs = ref(0)

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
    if (countLevels.value < config.value.levels - 1) {
        setTimeout(() => {
            countLevels.value++
            cards.value = []
            pairsFound.value = 0
            fetchGameData()
        }, 1000)
    } else {
        localStorage.setItem('nbMoves', moves.value)
        router.push('/results')
    }
}

const fetchGameData = async () => {
    try {
        config.value = await fetchConfig(selectedMode.value)
        nbPairs.value = config.value.nbPairs[countLevels.value]
        cards.value = await fetchCards(theme.value, nbPairs.value)
    } catch (e) {
        errorMessage.value =
            'Impossible de charger la configuration. Veuillez réessayer!'
    } finally {
        loading.value = false
    }
}

onMounted(fetchGameData)

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
.msg {
    margin-top: 1rem;
    padding: 0.6rem;
    border-radius: 0.6rem;
}
.error {
    color: rgba(224, 24, 24, 0.712);
    text-align: center;
    font-weight: bold;
}
.loading {
    text-align: center;
}
.cards {
    margin-top: 2rem;
    padding: 1rem;
    border: 1px solid var(--color4);
    border-radius: 0.6rem;
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    justify-items: center;
    gap: 0.8rem;
}
</style>
