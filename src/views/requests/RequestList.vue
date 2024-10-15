<script>
import RequestItem from './RequestItem.vue';
export default {
    components: {
        RequestItem
    },
    computed: {
        coach() {
            return this.$store.getters.coach;
        },
    },
    methods: {
        coachName(coachID) {
            const coach = this.$store.getters.coaches.find(coach => coach.id === coachID);
            console.log(coach, coachID);
            if (!coach) return 'Unknown';
            else return `${coach.firstName} ${coach.lastName}`;
        }
    },
    async beforeMount() {
        this.$emit('loading');
        this.$store.dispatch('loadRequests').then(() => {
            this.$store.dispatch('loadCoaches').then(() => {
                this.$emit('loaded');
            });
        }).catch(() => {
            this.$emit('error');
        });
    },
    emits: ['loading', 'loaded', 'error']
}
</script>

<template>
    <main>
        <teleport to="#curr-title">
            <h2>Request List</h2>
        </teleport>
        <ul>
            <li>
                <base-card>
                    <template #title>
                        <h2>Coach {{ coachName($store.getters.userId) }}</h2>
                    </template>
                    <template #default>
                        <ul>
                            <request-item v-for="[key, request] in Object.entries($store.getters.requests)" :key="key" :request="request"></request-item>
                        </ul>
                    </template>
                </base-card>
            </li>
        </ul>
    </main>
</template>

<style scoped>

ul,
ul li ul {
    list-style: none;
    margin: 0;
    padding: 0;
}
</style>