import axios from 'axios'

export const fetchConfig = async mode => {
    try {
        const res = await axios.get(`/data/configGame.json`)
        if (res.data) {
            return res.data.find(e => e.gameMode === mode)
        }
    } catch (e) {
        throw new Error(
            'Erreur lors de la récupération de la configuration.', e
        )
    }
}
