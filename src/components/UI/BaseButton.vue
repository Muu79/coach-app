<template>
    <button @click="clickHandler">
        <slot></slot>
    </button>
</template>

<script>
export default {
    props: {
        clickHandler: {
            type: Function,
            required: true
        }
    }
}
</script>

<style lang="css" scoped>
button {
    color: inherit;
    font-size: 1.1rem;
    background-color: hsl(176, 30%, 30%);
    border: none;
    padding: 0.5rem;
    border-radius: 6px;
    box-sizing: border-box;
    cursor: pointer;
}

button:hover {
    background-color: hsl(176, 30%, 40%);
    cursor: pointer;
}
</style>