<template>
    <li>
        <base-card>
            <template #title>
                <div>
                    <h2>{{ fullName }}</h2>
                    <h4>{{ email }} {{ phone }}</h4>
                    <h4><base-badge v-for="(exp, index) in expertise" :key="index">{{ exp }}</base-badge></h4>
                    <h5>${{ coach.price }}/hr</h5>
                </div>
            </template>
            <template #default>
                <div>
                    <p>{{ description }}</p>
                </div>
                <div v-if="!preview">
                    <router-view v-if="isSelected" :key="$route.path" v-slot="{ Component, path }">
                        <transition mode="out-in" appear>
                            <component :is="Component" :key="path" />
                        </transition>
                    </router-view>
                    <base-button :clickHandler="toggleDetails" v-if="!isSelected" class="contact-button">Contact
                        Coach</base-button>
                </div>
            </template>
        </base-card>
    </li>
</template>

<script>
export default {
    props: {
        coach: {
            type: {
                id: String,
                firstName: String,
                lastName: String,
                expertise: String,
                description: String
            },
            required: true
        },
        selectedCoachID: {
            type: String,
            required: false
        },
        selectCoach: {
            type: Function,
            required: false
        },
        preview: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    data() {
        return {
            isSelected: false
        };
    },
    computed: {
        fullName() {
            if (this.coach.firstName === '' && this.coach.lastName === '') return 'Coach Name'
            return `${this.coach.firstName} ${this.coach.lastName}`;
        },
        expertise() {
            if (this.coach.expertise.length === 0 || this.coach.expertise.some(exp => exp === '')) return ['Example', 'Expertise'];
            else return this.coach.expertise;
        },
        description() {
            if (this.coach.description.trim() === '') return 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum';
            else return this.coach.description;
        },
        email() {
            if (this.coach.details.email === '') return 'name@mail.com';
            else return this.coach.details.email;
        },
        phone() {
            if (this.coach.details.phone === '') return '(123)-456-7890';
            else return `(${this.coach.details.phone.slice(0, 3)})-${this.coach.details.phone.slice(3, 6)}-${this.coach.details.phone.slice(6)}`;
        }
    },
    watch: {
        selectedCoachID() {
            this.isSelected = this.selectedCoachID === this.coach.id;
        }
    },
    methods: {
        toggleDetails() {
            this.$router.push('/coaches/request/' + this.coach.id);
            this.selectCoach(this.coach.id);
            this.showDetails = !this.showDetails;
        }
    }
}
</script>

<style scoped>
.card {
    max-width: 80%;
}

.contact-button {
    margin-top: 1.5rem;
}

li {
    display: flex;
    justify-content: center;
}

h4 {
    font-size: 1rem;
    display: flex;
    padding: 0.5rem;
    gap: 0.5rem;
}

h2 {
    text-align: left;
}

p {
    font-size: 1.1rem;
}

@keyframes grow-fade {
    from {
        transform: scale(0);
        opacity: 0;
    }

    to {
        transform: scale(1);
        opacity: 1;
    }
}

@keyframes button-fade {
    from {
        opacity: 1;
        transform: translateX(0) translateY(0);

    }

    to {
        opacity: 0;
    }
}

.v-enter-active {
    animation: grow-fade 0.2s;
}

.v-leave-active {
    animation: button-fade 0.1s;
}
</style>