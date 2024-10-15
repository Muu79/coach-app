<script setup>
import { useStore } from 'vuex';
const $store = useStore();

</script>

<template>
    <header>
        <h1>Coach Finder</h1>
        <span id="curr-title"></span>
        <nav>
            <ul>
                <li><base-link to="/coaches">Coaches</base-link></li>
                <li v-if="$store.getters.isAuth"><base-link to="/register">{{$store.getters.isCoach ? 'Change Coach Details' : 'Become A Coach'}}</base-link></li>
                <li v-if="$store.getters.isAuth && $store.getters.isCoach"><base-link to="/requests">Requests</base-link></li>
                <li v-if="!$store.getters.isAuth"><base-link to="/auth">Login/Signup</base-link></li>
                <li v-else @click.prevent="() => {$store.dispatch('logOut'); console.log($store.getters.isAuth)}"><span>LogOut</span></li>
            </ul>
        </nav>
    </header>
</template>


<style scoped>
header {
    background-color: #333;
    color: hsl(176, 50%, 50%);
    padding: 1rem 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 100%;
    min-width: 100vw;
    position: sticky;
    top: 0;
    z-index: 100;
    text-align: center;
}

header h1 {
    font-size: 3rem;
    font-family: 'Righteous', cursive;
    padding-left: 1.5rem;
}

nav ul {
    display: flex;
    list-style: none;
    margin-right: 1.5rem;
    padding: 0;
    width: fit-content;
}

nav ul li {
    margin-left: 1rem;
}

li span {
    cursor: pointer;
}
li span:hover {
    text-decoration: underline;
}

@media (max-width:1200px) {
    header h1 {
        font-size: 2rem;
    }

    nav ul li {
        margin-left: 0.5rem;
    }

}

@media (max-width:950px) {
    header h1 {
        font-size: 1.5rem;
    }

    nav ul li {
        margin-left: 0.25rem;
    }

    header {
        display: flex;
        flex-direction: column;
    }

    header > * {
        margin: 0.5rem;
    }
}
</style>