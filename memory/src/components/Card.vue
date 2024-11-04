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
    isPaused: Boolean,
})

const emit = defineEmits(['emitFlipCard'])

const flipCard = () => {
    if (!props.card.isFlipped && !props.isPaused) {
        emit('emitFlipCard', props.card)
    }
}
</script>

<style scoped>
.card,
.card img,
.card-back {
    width: 100px;
    height: 100px;
    box-shadow: 1px 1px 12px 5px #0f171f80;
    border-radius: 0.4rem;
    cursor: pointer;
    transition: 0.3s ease;
}

.card-back {
    background: linear-gradient(
        155deg,
        var(--color-card-back1),
        var(--color-card-back2),
        var(--color-card-back3)
    );
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3em;
    font-weight: bold;
    width: 100%;
    height: 100%;
    text-shadow: 3px 5px 3px black;
}
.card:hover,
.card-back:hover {
    box-shadow: 1px 1px 12px 5px #0f171fc4;
}
.flipped {
    transform: rotatey(180deg);
}
</style>
