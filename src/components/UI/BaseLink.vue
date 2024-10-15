<template>
    <router-link :to="to" class="base-link">
        <slot></slot>
    </router-link>
</template>

<script>
export default {
    props: {
        to: {
            type: String,
            required: true
        }
    }
}
</script>

<style lang="css" scoped>
a {
    color: white;
    text-decoration: none;
    padding: 0.75rem;
    border-radius: 13px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    background-color: hsl(176, 30%, 30%);
}

a:hover {
    background-color: rgb(255, 253, 253);
    color: #333;
    cursor: pointer;
}

a.router-link-active {
    background-color: hsl(180, 6%, 77%);
    color: black;
    cursor: default;
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.5);
}
</style>
