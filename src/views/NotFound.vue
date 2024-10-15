<template>
    <section>
        <h1>404 - Page not found!</h1>
        <p>Sorry, the page you are looking for does not exist.</p>
        <base-link to="/">Back to Home</base-link>
    </section>
</template>

<style scoped>
    section {
        margin-top: 2rem;
        text-align: center;
        box-sizing: border-box;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
    }
    h1 {
        font-size: 2rem;
    }
    p {
        font-size: 1.25rem;
        font-style: italic;
    }
    .base-link {
        margin-top: 1.5rem;
    }


</style>