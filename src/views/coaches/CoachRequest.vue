<script>
export default {
    data() {
        return {
            message: '',
            phone: '',
            email: '',
        };
    },
    computed: {
        coach() {
            return this.$store.getters.coach(this.$route.params.id).details;
        },
        coachID() {
            return this.$route.params.id;
        }
    },
    methods: {
        async sendRequest() {
            let requestNum = 0;
            if (this.$store.getters.requests[this.coachID]) {
                requestNum = this.$store.getters.requests[this.coachID].length + 1;
            }else {
                requestNum = 1;
            }
            const requestID = `${this.coachID}r${requestNum}`;
            const payload = {
                message: this.message,
                phone: this.phone,
                email: this.email,
                id: requestID,
                coachID: this.coachID
            };
            await this.$store.dispatch('addRequest', payload);
            await this.$store.dispatch('syncRequests');
            this.$router.push('/requests');
        },
    }
}
</script>

<template>
    <form @submit.prevent>
        <label for="email">Email: <base-input placeholder="Email"
                @update="val => this.email = val"></base-input></label>
        <label for="phone">Phone: <base-input placeholder="Phone Num"
                @update="val => this.phone = val"></base-input></label>
        <label for="request">Request to send to Coach</label>
        <textarea v-model="message" name="request"></textarea>
        <base-button :clickHandler="sendRequest">Send Request</base-button>
    </form>
</template>


<style scoped>
button {
    max-width: 30%;
    margin: 1rem 0;
    align-self: center;
    font-size: 1.1rem;
}

label,
h4 {
    font-weight: 700;
    margin: 0.25rem 0;
}

textarea {
    width: 100%;
    height: 100px;
    resize: vertical;
    font-family: inherit;
    padding: 1rem;
    font-size: 1rem;
}

label {
    font-size: 1.5rem;
    font-weight: 700;
    margin: 1rem 0;
}

form {
    margin: 3rem;
    padding: 1rem;
    background-color: #484848;
    color: rgb(222, 222, 222);
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    width: 100%;
    margin: 3rem auto 0 auto;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

}
</style>