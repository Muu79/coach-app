<template>
    <main key="auth">
        <Teleport to="#curr-title">
            <h2>User Authentication</h2>
        </Teleport>
        <base-modal fixed :show="loading" v-if="loading">
            <template #modalTitle>
                <h2>Authenticating...</h2>
            </template>
            <template #content><base-spinner></base-spinner></template>
        </base-modal>
        <base-modal :show="!!error" v-if="!!error" @close="() => error = null">
            <template #modalTitle>
                <h2>Authentication Error</h2>
            </template>
            <template #content>
                <p>{{ error }}</p>
            </template>
        </base-modal>
        <base-card>
            <template #title>
                <h3>{{ modeText }}</h3>
            </template>
            <template #default>
                <form @submit.prevent @input="() => { if (!formIsValid) { formIsValid = true; checkForm() } }">
                    <base-input @update="(val) => this.email = val.trim()" type="email" label="Email"
                        placeholder="Enter Your Email" ref="emailRef" :isError="emailError"
                        :errorText="emailErrorText"></base-input>
                    <base-input @update="(val) => this.password = val.trim()" inputType="password" label="Password"
                        placeholder="Enter Password" ref="passwordRef" :isError="passError"
                        :errorText="passErrorText"></base-input>
                    <Transition name="con-pass" mode="out-in">
                        <base-input v-if="mode === 'signup'" @update="(val) => this.confirmPassword = val.trim()"
                            inputType="password" label="Confirm Password" :placeholder="'Confirm Password'"
                            ref="confPassRef" :isError="confPassError" :errorText="confPassErrorText"></base-input>
                    </Transition>
                    <base-button type="submit" :clickHandler="async () => await submitForm()">{{ modeText
                        }}</base-button>
                    <a @click="toggleMode">{{ altText }} Instead</a>
                </form>
            </template>
        </base-card>
    </main>
</template>

<script>
export default {
    data() {
        return {
            email: '',
            password: '',
            confirmPassword: '',
            formIsValid: true,
            mode: 'login',
            loading: false,
            error: null,
        }
    },
    methods: {
        async submitForm() {
            this.checkForm();
            if (this.formIsValid) {
                const authPayload = { email: this.email, password: this.password };
                this.loading = true;
                if (this.mode === 'login') {
                    console.log('Logging In');
                    try { await this.$store.dispatch('logIn', authPayload) }
                    catch (err) { this.error = err.message || 'An error occurred. Please try again later.' }
                } else if (this.mode === 'signup') {
                    try { await this.$store.dispatch('signUp', authPayload) }
                    catch (err) { this.error = err.message || 'An error occurred. Please try again later.' }
                } else {
                    console.log('Invalid Mode');
                }
                this.loading = false;
                if (!this.error) {
                    this.clearForm();
                    this.$router.push('/coaches');
                }
            }
        },
        toggleMode() {
            this.mode = this.mode === 'login' ? 'signup' : 'login';
        },
        checkForm() {
            this.formIsValid = this.checkEmail() && this.checkPassword() && (this.checkConfirmPassword() || this.mode === 'login');
        },
        clearForm() {
            this.email = '';
            this.password = '';
            this.confirmPassword = '';
            this.formIsValid = true;
        },
        checkEmail() {
            const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            return emailRegex.test(this.email);
        },
        checkPassword() {
            const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
            return passwordRegex.test(this.password);
        },
        checkConfirmPassword() {
            return this.confirmPassword === this.password && this.confirmPassword.length > 0;
        }
    },
    computed: {
        altText() {
            return this.mode === 'login' ? 'Sign Up' : 'Login';
        },
        modeText() {
            return this.mode === 'login' ? 'Login' : 'Sign Up';
        },
        emailError() {
            return !this.checkEmail() && !this.formIsValid ? true : false;
        },
        emailErrorText() {
            return this.emailError ? 'Invalid Email' : '';
        },
        passError() {
            return !this.checkPassword() && !this.formIsValid ? true : false;
        },
        passErrorText() {
            return this.passError ? 'Invalid Password; Please ensure password is at least 8 characters and has both a number and capital letter' : '';
        },
        confPassError() {
            return !this.checkConfirmPassword() && !this.formIsValid ? true : false;
        },
        confPassErrorText() {
            return this.confPassError ? 'Passwords do not match' : '';
        }
    }
}
</script>


<style scoped>
form {
    display: grid;
    gap: 1rem;
}

form label {
    font-weight: 700;
}

label {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

main {
    display: grid;
    place-items: center;
    gap: 1rem;
    height: 75vh;
}

main .card {
    width: 90%;
    max-width: 30rem;
    padding-bottom: 0;
}

a {
    text-align: center;
    color: hsl(176, 50%, 50%);
    cursor: pointer;
}

a:hover {
    text-decoration: underline;
}

.con-pass-enter-active {
    animation: fade-slide 0.5s;
}

.con-pass-leave-active {
    animation: fade-slide 0.3s reverse;
}

@keyframes fade-slide {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>