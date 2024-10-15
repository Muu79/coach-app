<template>
    <label>{{ label }}<input :type="inputType" :placeholder="placeholder" v-model="input"
            @input="$emit('update', input)" :style="isError && {'border': '1px solid red'}" />
            <span>{{ errorText }}</span></label>
</template>

<script>
export default {
    props: {
        inputType: {
            type: String,
            required: false,
            default: 'text'
        },
        placeholder: {
            type: String,
            required: false,
            default: 'Enter Text Here'
        },
        label: {
            type: String,
            required: false,
            default: ''
        },
        isError: {
            type: Boolean,
            required: false,
            default: false
        },
        errorText: {
            type: String,
            required: false,
            default: ''
        },
        preFill: {
            type: String,
            required: false,
            default: ''
        }
    },
    data() {
        return {
            input: this.preFill
        }
    }
}
</script>


<style scoped>
input {
    font: inherit;
    color: inherit;
    background-color: hsl(176, 30%, 30%);
    border: none;
    padding: 0.25rem 0.5rem;
    border-radius: 6px;
    box-sizing: border-box;
    cursor: text;
    max-width: 100%;
}

label {
    border-radius: 6px;
}

label span {
    color: red;
    font-size: 0.75rem;
    display: block;
    margin-top: 0.25rem;
}
</style>