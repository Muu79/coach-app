<template>
    <li>
        <base-card>
            <template #title>
                <h1>Request {{ request.id.slice(request.id.indexOf('r') + 1) }}</h1>
            </template>
            <template #default>
                <ul>
                    <li>Email: {{ request.email }}</li>
                    <li>Phone: {{ request.phone }}</li>
                    <li>Message: {{ request.message }}</li>
                </ul>
                <base-button :clickHandler="deleteRequest">Delete Request</base-button>
            </template>
        </base-card>
    </li>
</template>

<script>
export default {
    props: {
        request: {
            type: {
                id: String,
                email: String,
                phone: String,
                message: String
            },
            required: true
        }
    },
    methods: {
        deleteRequest() {
            console.log(this.request.id);
            this.$store.dispatch('deleteRequest', this.request);
            this.$store.dispatch('syncRequests');
        }
    }
}
</script>

<style scoped>
li {
    margin: 1rem 0;
}

ul {
    list-style: none;
    padding: 0;
}

span {
    color: red;
    font-size: 1.5rem;
    cursor: pointer;
    position: relative;
    right: 0;
    top: 0;
}
</style>