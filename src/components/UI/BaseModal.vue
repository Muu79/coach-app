<template>
    <div id="back-drop" v-show="show"></div>
    <Transition name="modal" :appear="!fixed">
        <div class="modal" v-show="show">
            <base-card>
                <template #title class="card-header">
                    <section class="modal-header">
                        <slot name="modalTitle"></slot>
                    </section>
                </template>
                <template #default>
                    <section class="modal-body">
                        <slot name="content">
                        </slot>
                        <base-button :clickHandler="() => $emit('close')" v-if="!fixed" class="modal-button">Close</base-button>
                    </section>
                </template>
            </base-card>
        </div>
    </Transition>
</template>

<script>
export default {
    emits: ['close'],
    props: {
        show: {
            type: Boolean,
            required: true
        },
        fixed: {
            type: Boolean,
            required: false,
            default: false
        }
    }
}
</script>

<style scoped>
#back-drop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.75);
    z-index: 101;
}

.modal {
    position: fixed;
    top: 15vh;
    left: 10vw;
    width: 80%;
    z-index: 102;
}

.card {
    padding: 0 !important;
}
.card-header {
    padding: 0 !important;
    margin: 0 !important;   
} 


.modal-header {
    background-color: #333;
    color: hsl(176, 50%, 50%);
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    border-radius: 12px 12px 0 0;
}

.modal-body {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: space-between;
}
.modal-body > * {
    margin-top: 1rem;
    margin: auto;
}
.modal-button {
    max-width: fit-content;
}

.modal-enter-from, 
.modal-leave-to {
    transform: translateY(-100vh);
    opacity: 0;
}
.modal-enter-to, 
.modal-leave-from {
    transform: translateY(0);
    opacity: 1;
}
.modal-enter-active, .modal-leave-active {
    transition: all 0.5s;
}
</style>