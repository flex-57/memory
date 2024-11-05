import axios from 'axios'

export const fetchConfig = async (theme) => {
    try {
        const res = await axios.get(`/data/configGame.json`)
        if (res.data) {
            return (res.data).find((e) => e.gameMode = theme)
        }
    }
    catch(error) {
        console.error('Erreur lors de la récupération de la configuration :', error)
        throw error
    }
}
