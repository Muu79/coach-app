<script>
import CoachItem from './CoachItem.vue';
export default {
    data() {
        return {
            selectedCoachID: null,
            selected: new Set(),
            mount: true,
            doneLoading: false,
        };
    },
    components: {
        CoachItem
    },
    methods: {
        selectCoach(coachID) {
            this.selectedCoachID = coachID;
        },
        onUpdate(val) {
            this.selected = val;
        }
    },
    computed: {
        expertise() {
            const coaches = this.$store.getters.coaches;
            const expertise = new Set();
            for (const coach of coaches) {
                for (const exp of coach.expertise) {
                    expertise.add(exp.toLowerCase());
                }
            }
            return Array.from(expertise);
        },
        coaches() {
            if (this.selected.size === 0) {
                return this.$store.getters.coaches;
            } else {
                return this.$store.getters.coaches.filter(coach => {
                    return coach.expertise.some(exp => this.selected.has(exp.toLowerCase()));
                });
            }
        }
    },
    emits: ['loading', 'loaded', 'error'],
    async beforeCreate() {
        this.$emit('loading');
        await this.$store.dispatch('loadCoaches').then(() => {
            this.$emit('loaded');
        }).catch(() => {
            this.$emit('error');
        }).finally(() => {
            this.$emit('loaded');
            this.doneLoading = true;
        });
    },


}
</script>

<template>
    <main v-if="doneLoading">
        <teleport to="#curr-title" >
            <h2>Coach List</h2>
        </teleport>
        <base-filter :options="expertise" @update="onUpdate" class="filter"></base-filter>
        <ul>
            <coach-item v-for="coach in coaches" :key="coach.id" :coach="coach" :selectedCoachID="selectedCoachID"
                :selectCoach="selectCoach"></coach-item>
        </ul>
    </main>
</template>

<style scoped>
ul {
    list-style: none;
    margin: 0;
    padding: 0;
}


ul {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(70%, 70%));
    justify-content: center;
    gap: 1rem;
}

.filter {
    position: sticky;
    top: 5rem;
}

main {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
}

@media (max-width: 1200px) {
    ul {
        grid-template-columns: repeat(auto-fill, minmax(90%, 90%));
    }

    main {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .filter {
        position: relative !important;
        top: 0 !important;
    }
}
</style>