<script>
import CoachItem from './CoachItem.vue';
export default {
    components: {
        CoachItem
    },
    data() {
        return {
            formData: {
                firstName: '',
                lastName: '',
                details: {
                    email: '',
                    phone: ''
                },
                expertise: [],
                price: 0,
                description: ''
            },
            errors: {
                firstName: false,
                lastName: false,
                email: false,
                phone: false,
                expertise: false,
                price: false,
                description: false
            },
        }
    },
    computed: {
        previewCoach() {
            return {
                id: `c${this.$store.getters.coaches.length + 1}`,
                ...this.formData
            }
        },
        someError() {
            return Object.values(this.errors).some(err => err);
        }
    },
    methods: {
        async submitForm() {
            if (this.checkForm()) {
                const payload = {
                    ...this.formData,
                    id: `${this.$store.getters.userId}`
                };
                await this.$store.dispatch('addCoach', payload);
                await this.$store.dispatch('syncCoaches');
                this.formData = {
                    firstName: '',
                    lastName: '',
                    details: {
                        email: '',
                        phone: ''
                    },
                    expertise: [],
                    price: 0,
                    description: ''
                };
                this.$router.push('/coaches');
            }
        },
        checkForm() {
            if (this.formData.firstName === '' || this.formData.lastName === '' || this.formData.details.email === '' || this.formData.details.phone === '' || this.formData.expertise.length === 0 || this.formData.price === 0 || this.formData.description === '') {
                this.markErrors();
                this.errors = true;
                return false;
            } else {
                this.errors = false;
                return true;
            }
        },
        markErrors() {
            this.$refs.firstName.$el.style.border = this.formData.firstName === '' ? '1px solid red' : 'none';
            this.$refs.lastName.$el.style.border = this.formData.lastName === '' ? '1px solid red' : 'none';
            this.$refs.email.$el.style.border = this.formData.details.email === '' ? '1px solid red' : 'none';
            this.$refs.phone.$el.style.border = this.formData.details.phone === '' ? '1px solid red' : 'none';
            this.$refs.expertise.$el.style.border = this.formData.expertise.length === 0 ? '1px solid red' : 'none';
            this.$refs.price.$el.style.border = this.formData.price === 0 ? '1px solid red' : 'none';
            this.$refs.description.$el.style.border = this.formData.description === '' ? '1px solid red' : 'none';
        },
        preFill(payload) {
            this.formData = payload;
        },
    },
    beforeMount() {
        if (this.$store.getters.isAuth) {
            const coach = this.$store.getters.coaches.find(coach => coach.id === this.$store.getters.userId);
            if (coach) {
                this.preFill(coach);
            }
        }
    }
}
</script>

<template>
    <main>
        <teleport to="#curr-title">
            <h2>{{this.$store.getters.isCoach ? 'Edit Your Details' : 'Become A Coach'}}</h2>
        </teleport>
        <base-modal :show="!$store.getters.isAuth" fixed>
            <template #modalTitle>
                <h1>Register as a Coach</h1>
            </template>
            <template #content>
                <p>You must be logged in to register as a coach. Please log in or sign up to continue.</p>
                <base-link to="/auth">Login/Signup</base-link>
            </template>
        </base-modal>
        <base-card>
            <template #title>
                <h1>Register as a Coach</h1>
            </template>
            <form @submit.prevent @input="() => { if (errors) markErrors() }">
                <div id="name-inputs">
                    <div class="form-control">
                        <base-input ref="firstName" name="firstName"
                                @update="val => formData.firstName = val" :type="'text'"
                                placeholder="Enter First Name" label="First Name" :preFill="formData.firstName"/>
                    </div>
                    <div class="form-control">
                        <base-input ref="lastName" name="lastName"
                                @update="val => formData.lastName = val" :type="'text'"
                                placeholder="Enter Last Name" label="Last Name" :preFill="formData.lastName"/>
                    </div>
                </div>
                <div id="contact-input">
                    <div class="form-control">
                        <base-input ref="email" name="email"
                                @update="val => formData.details.email = val" :inputType="'email'"
                                placeholder="Enter Email Address" label="Email" :preFill="formData.details.email"/>
                    </div>
                    <div class="form-control">
                        <base-input ref="phone" name="phone"
                                @update="val => formData.details.phone = val" :inputType="'tel'"
                                placeholder="Enter Phone Number" label="Phone" :preFill="formData.details.phone"/>
                    </div>
                </div>
                <div class="form-control">
                    <base-input ref="expertise" name="expertise"
                            @update="val => formData.expertise = val.split(',')" :inputType="'text'"
                            placeholder="Enter Expertise (comma separated)" label="Expertise" :preFill="formData.expertise.join(',')"/>
                </div>
                <div class="form-control">
                    <base-input ref="price" name="price"
                            @update="val => formData.price = val" :inputType="'number'"
                            placeholder="Enter Price per Hour" label="Price/Hr" :preFill="formData.price"/>
                </div>
                <div class="form-control">
                    <base-input ref="description" name="description"
                            @update="val => formData.description = val" :inputType="'text'"
                            placeholder="Enter A Short Description" label="Description" :preFill="formData.description"/>
                </div>
                <base-button :clickHandler="() => submitForm()">Submit</base-button>
            </form>
        </base-card>
        <section name="preview" class="preview">
            <h3>Preview</h3>
            <CoachItem :coach="previewCoach" preview></CoachItem>
        </section>
    </main>
</template>

<style scoped>
.form-control {
    margin: 1rem 0;
    width: 100%;
}

.form-control label {
    font-weight: 700;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: left;
}

.form-control label input {
    width: 100%;
}

.card {
    min-width: 50%;
    max-width: 50% !important;
    margin: 1rem auto 1rem 1.5rem !important;
}

form {
    display: flexbox;
}

h1 {
    text-align: center;
}

h3 {
    text-align: center;
    margin: 5rem auto 1rem auto;
    font-size: 3rem;
}

main {
    display: flex;
    flex-direction: row;
}

.preview {
    margin: 0 auto;
}
</style>