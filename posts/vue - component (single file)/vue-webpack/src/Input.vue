<template>
    <div>
        <p>{{ msg }}</p>

        <input type="text" v-model="message"/>
        <br />
        <br />

        <input type="text" :value="msg" @input="changeMessage"/>

        <p>{{ message }}</p>
    </div>
</template>

<script>
    export default {
        props: [
            'msg'
        ],
        data() {
            return {
                message: ''
            }
        },
        methods: {
            changeMessage(event) {
                this.message = event.target.value;
                this.$emit('messageChanged', this.message);
            }
        }
    }
</script>