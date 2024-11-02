<template>
    <header>
        <h1>{{ mode }}</h1>
        <div>Prénom et nom : {{ capitalizeName(userName) }}</div>
        <div>Thème : {{ ucFirst(theme) }}</div>
    </header>
    <main>
        <div>
            <div v-if="loading">Chargement...</div>
            <div v-if="error">{{ errorMessage }}</div>
            <div v-else>
                <div v-for="card in cards" :key="card.id">
                    <img :src="card.imgPath" :alt="card.name" />
                </div>
            </div>
        </div>
    </main>
</template>

<script setup>
import { shuffleArray } from '@/utils/arrayUtils'
import { fetchCards } from '@/utils/fetchCards'
import { capitalizeName, ucFirst } from '@/utils/stringUtils'
import { computed, onMounted, reactive, ref, watchEffect } from 'vue'

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
const error = ref(false)
const errorMessage = ref('')
const cards = reactive([])

const nbPairs = ref(2)

onMounted(async () => {
    try {
        const fetchedCards = await fetchCards(theme.value)
        const slicedCards = fetchedCards.slice(0, nbPairs.value)
        const allCards = shuffleArray([...slicedCards, ...slicedCards]).map(
            (card, index) => ({ ...card, id: index }),
        )
        cards.push(...allCards)
    } catch (err) {
        error.value = true
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

<style></style>
