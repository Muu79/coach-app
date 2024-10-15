<template>
    <div class="card">
        <section class="card-header">
            <slot name="title"></slot>
        </section>
        <section class="card-body">
            <slot></slot>
        </section>
    </div>
</template>

<style scoped>
.card {
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    background-color: rgb(66, 66, 66);
    padding-bottom: 1rem;
    margin: 1.5rem auto;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    max-width: 95%;
}

.card section {
    margin: 0 0 1rem 0;
}

.card-header {
    background-color: #333;
    color: hsl(176, 50%, 50%);
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    border-radius: 12px 12px 0 0;
}

.card-body {
    padding: 1rem;
}

.card .card-body {
    overflow-x: scroll;
    overflow-wrap: break-word;
}
</style>