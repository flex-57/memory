<template>
    <header>
        <h1>Bienvenue dans le jeu de mémoire !</h1>
        <form @submit.prevent="startGame">
            <div>
                <label for="theme">Sélectionnez le thème des cartes :</label>
                <select id="theme" name="theme" v-model="selectedTheme">
                    <option v-for="theme in themes" :key="theme" :value="theme">
                        {{ ucFirst(theme) }}
                    </option>
                </select>
            </div>
            <div>
                <label for="mode">Sélectionnez le mode de jeu :</label>
                <select id="mode" name="mode" v-model="selectedMode">
                    <option v-for="{ id, name } in modes" :key="id" :value="id">
                        {{ ucFirst(name) }}
                    </option>
                </select>
            </div>
            <div>
                <label for="name">Saisissez votre prénom et votre nom :</label>
                <input
                    type="text"
                    id="name"
                    autocomplete="name"
                    v-model.trim="userName"
                    required
                    minlength="4"
                />
            </div>
            <div>
                <!-- button disabled jusqu'à ce que le form soit bien rempli -->
                <button :disabled="!isFormOk" type="submit">Démarrer</button>
            </div>
        </form>
    </header>
</template>

<script setup>
import router from '@/router'
import { ref, watchEffect } from 'vue'
import { ucFirst } from '@/utils/stringUtils'

// info de config des selects
const themes = ['couleurs', 'abstrait', 'personnages']
const modes = [
    { id: 'test', name: 'Test de la mémoire' },
    { id: 'relearn', name: 'Réapprentissage' },
]

const userName = ref('')
const selectedTheme = ref('')
const selectedMode = ref('')
const isFormOk = ref(false)

/**
 * Validation du form:
 * Si le nom complet comporte au moins 4 caractères
 * Si le nom complet comporte au moins un espace (nom'espace'prénom)
 * Si les selects sont remplis
 */
watchEffect(() => {
    isFormOk.value =
        userName.value.length >= 4 &&
        userName.value.split(' ').length >= 2 &&
        selectedTheme.value !== '' &&
        selectedMode.value !== ''
})

const startGame = () => {
    // Info placées en session
    sessionStorage.setItem('userName', userName.value)
    sessionStorage.setItem('selectedTheme', selectedTheme.value)
    sessionStorage.setItem('selectedMode', selectedMode.value)

    // redirection
    router.push('/game')

    /**
     * interdit le retour navigateur (à voir...)
     * router.replace('/game')
     */
}
</script>

<style scoped>
form {
    margin: 0 auto;
    width: 50%;
    background-color: var(--color3);
    border: 1px solid var(--color4);
    border-radius: .4rem;
    padding: 1rem 2rem;
}
</style>
