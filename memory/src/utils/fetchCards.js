import axios from 'axios'
import { shuffleArray } from './arrayUtils'

export const fetchCards = async (theme, nbPairs) => {
    try {
        const res = await axios.get(`/data/${theme}.json`)
        if (res.data) {
            const cards = shuffleArray(res.data)
                .map(card => ({
                    ...card,
                    isFlipped: false,
                    imgPath: `/images/${theme}/${card.name}`,
                }))
                .slice(0, nbPairs)
            const allCards = shuffleArray([...cards, ...cards]).map(card => ({
                ...card,
            }))

            return allCards
        }
    } catch (error) {
        console.error('Erreur lors de la récupération des cartes :', error)
        throw error
    }
}
