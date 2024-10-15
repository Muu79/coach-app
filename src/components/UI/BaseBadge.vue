<template>
    <span class="badge">
        <slot></slot>
    </span>
</template>

<style scoped>
    .badge {
        box-sizing: border-box;
        padding: 0.5rem 0.75rem;
        font-size: 0.85rem;
        border-radius: 15px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        background-color: hsl(197, 72%, 35%);
        color: rgb(255, 255, 255);
        cursor: default;
    }
</style>