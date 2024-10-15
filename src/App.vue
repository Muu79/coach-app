<template>
    <TheHeader />
    <router-view v-show="!loading && !loadingError" @loading="() => this.loading = true"
        @loaded="() => this.loading = false" @error="() => this.loadingError = true" v-slot="{ Component, path }">
        <transition name="layout" mode="out-in" appear>
            <component :is="Component" :key="path" />
        </transition>
    </router-view>

    <Teleport v-if="loadingError" to="body">
        <base-modal @close="() => loadingError = !loadingError" :show="loadingError">
            <template #modalTitle>
                <h2>Data Loading Error</h2>
            </template>
            <template #content>
                <p>There was an error loading the data. Please try again later.</p>
            </template>
        </base-modal>
    </Teleport>
    <div v-else-if="!loadingError && loading" id="loading-spinner">
        <base-spinner />
    </div>


</template>

<script>
import TheHeader from './components/UI/TheHeader.vue';
export default {
    data() {
        return {
            loading: false,
            loadingError: false,
        }
    },
    components: {
        TheHeader
    },
    async beforeMount() {
        this.$store.dispatch('loadCoaches');
        await this.$store.dispatch('autoLogIn');
        await this.$store.dispatch('loadRequests');

    },
    computed: {
        didAutoLogOut() {
            return this.$store.getters.didAutoLogOut;
        }
    },
    watch: {
        didAutoLogOut(curr, old) {
            if (curr && curr !== old) {
                if (this.$route.meta.isAuth) {
                    this.$router.replace('/auth')
                }
            }
        }
    }

}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Righteous&display=swap');

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    cursor: default
}

body {
    font-family: 'Inter', sans-serif;
    font-weight: 400;
    background-color: rgb(93, 93, 93);
    color: white;
}

#app {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;

}

#loading-spinner {
    align-self: center;
    margin-top: 5rem;
}

.layout-enter-active,
.layout-leave-active {
    transition: all 0.5s;
}

.layout-enter-from {
    opacity: 0;
    transform: translateY(-150px);
}

.layout-leave-to {
    opacity: 0;
    transform: translateY(150px);
}

.layout-enter-to,
.layout-leave-from {
    opacity: 1;
    transform: translateY(0);
}

header h2 {
    box-sizing: content-box;
    font-size: 4em;
}

main {
    width: 100%;
}

h2 {
    font-size: 2em;
    text-align: center;
}

@media (max-width: 1200px) {
    html {
        font-size: 0.9rem;
    }

}
</style>