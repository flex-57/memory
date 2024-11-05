import HomeView from '@/views/HomeView.vue'
import GameView from '@/views/GameView.vue'
import ResultsView from '@/views/ResultsView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/game',
            name: 'game',
            component: GameView,
            beforeEnter: (to, from, next) => {
                const userName = sessionStorage.getItem('userName')
                const selectedTheme = sessionStorage.getItem('selectedTheme')
                const selectedMode = sessionStorage.getItem('selectedMode')

                if (userName && selectedTheme && selectedMode) {
                    next()
                } else {
                    next({ path: '/' })
                }
            },
        },
        {
            path: '/results',
            name: 'results',
            component: ResultsView,
        },
    ],
})

export default router
