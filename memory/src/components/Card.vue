<template>
    <div class="card" @click="flipCard" :class="{ flipped: card.isFlipped }">
        <div v-if="card.isFlipped">
            <img :src="`${card.imgPath}`" :alt="card.name" />
        </div>
        <div v-else class="card-back">?</div>
    </div>
</template>

<script setup>
const props = defineProps({
    card: Object,
})

const emit = defineEmits(['eflipCard'])

const flipCard = () => {
    if (!props.card.flipped) {
        emit('eflipCard', props.card)
    }
}
</script>

<style scoped>
.card {
    width: 100px;
    height: 100px;
    cursor: pointer;
    transition: all 0.5s ease;
}
.card img {
    width: 100%;
    height: 100%;
    border-radius: 0.4rem;
}
.card-back {
    background: linear-gradient(
        150deg,
        var(--color-card-back1),
        var(--color-card-back2),
        var(--color-card-back3)
    );
    border-radius: 0.4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3em;
    font-weight: bold;
    width: 100%;
    height: 100%;
    text-shadow: 4px 4px 4px black;
}
.flipped {
    transform: rotateY(180deg);
}
</style>
