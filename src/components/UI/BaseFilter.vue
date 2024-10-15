<template>
    <base-card class="filter-card">
        <template #title>
            <h3>Filter</h3>
        </template>
        <template #default>
            <div v-for="(option, index) in options" :key="index">
                <label :for="'filter::' + option" class="form-control">
                    <input type="checkbox" :value="option" :name="'filter::' + option" v-model="selected"/>
                    {{ option }}
                </label>
            </div>
        </template>
    </base-card>
</template>

<script>
export default {
    data() {
        return {
            selected: new Set()
        }
    },
    props: {
        options: {
            type: Array,
            required: true
        }
    },
    emits: ['update'],
    methods: {
        updateFilter(val) {
            this.$emit('update', val);
        }
    },
    watch: {
        selected: {
            handler(val) {
                this.updateFilter(val);
            },
            deep: true
        }
    }
}
</script>

<style scoped>
input {
    margin: 0.1rem 0.5rem;
    appearance: none;
    background-color: inherit;
    font: inherit;
    color: currentColor;
    width: 1.15em;
    height: 1.15em;
    border: 0.15em solid currentColor;
    border-radius: 0.15em;
    transform: translateY(-0.075em);
    display: grid;
    place-content: center;
}

h3 {
    margin: 0;
    font-size: 1.5rem;
    text-align: center;
}

input[type="checkbox"]::before {
    content: "";
    width: 0.65em;
    height: 0.65em;
    transform: scale(0);
    transition: 120ms transform ease-in-out;
    box-shadow: inset 1em 1em 0 hsl(176, 30%, 70%);
}

input[type="checkbox"]:checked::before {
  transform: scale(1);
}

.form-control {
    font-family: inherit, sans-serif;
    font-size: 1rem;
    font-weight: bold;
    line-height: 1.1;
    display: grid;
    grid-template-columns: 1em auto;
    gap: 1em;
    align-items: center;
}

.filter-card {
    width: fit-content !important;
    margin: 1rem;
    margin-left: 3rem;
    position: sticky;
    top: 25vh;
    
}
</style>