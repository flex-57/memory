export const formatTime = timer => {
    const minutes = Math.floor(timer / 60)
    const seconds = timer % 60
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}
