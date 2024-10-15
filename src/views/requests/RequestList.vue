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
        hasRequests() {
            const requests = this.$store.getters.requests[this.$store.getters.userId];
            return requests && requests.length > 0;
        },
        userRequests() {
            console.log(this.$store.getters.requests[this.$store.getters.userId]);
            return this.$store.getters.requests[this.$store.getters.userId];
        }
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
                        <ul v-if="hasRequests">
                            <request-item v-for="(request, index) in userRequests" :key="index" :request="request"></request-item>
                        </ul>
                        <h1 v-else>All Caught up on requests</h1>
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