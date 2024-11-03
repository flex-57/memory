import axios from 'axios'
import { shuffleArray } from './arrayUtils'

export const fetchCards = async (theme, nbPairs) => {
    try {
        const res = await axios.get(`/data/${theme}.json`)
        if (res.data) {
            const allCards = shuffleArray(res.data).map(card => ({
                ...card,
                isFlipped: false,
                imgPath: `/images/${theme}/${card.name}`,
            })).slice(0, nbPairs)
            const cards = [
                ...allCards,
                ...allCards,
            ].map((card, index) => ({ ...card, id: index }))

            return cards
        }
    } catch (error) {
        console.error('Erreur lors de la récupération des cartes :', error)
        throw error
    }
}
