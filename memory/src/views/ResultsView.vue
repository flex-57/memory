<template>
    <h1>Bravo {{ capitalizeName(userName) }}</h1>
</template>

<script setup>
import { capitalizeName } from '@/utils/stringUtils'
import { ref } from 'vue'

const userName = ref(sessionStorage.getItem('userName'))
</script>

<style></style>
