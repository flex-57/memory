import axios from 'axios'

export const fetchCards = async theme => {
    try {
        const res = await axios.get(`/data/${theme}.json`)
        return res.data.map(card => ({
            ...card,
            imgPath: `/images/${theme}/${card.name}`,
            isFlipped: false,
        }))
    } catch (error) {
        console.error('Erreur lors de la récupération des cartes :', error)
        throw error
    }
}
