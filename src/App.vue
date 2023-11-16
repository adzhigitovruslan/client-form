<template>
    <div id="app">
        <div class="wrapper">
            <form class="form">
                <template v-if="page === 1">
                    <ClientData v-model="formData.stepOne" :$v="$v" />
                    <button
                        class="form__submit"
                        @click.prevent="changeStep('next')">
                        Next
                    </button>
                </template>
                <template v-if="page === 2">
                    <ClientDataStepTwo v-model="formData.stepTwo" :$v="$v" />
                    <div class="form__buttons">
                        <button
                            class="form__submit"
                            @click.prevent="changeStep('prev')">
                            prev
                        </button>
                        <button
                            class="form__submit"
                            @click.prevent="changeStep('next')">
                            Next
                        </button>
                    </div>
                </template>
            </form>
        </div>
    </div>
</template>

<script>
import ClientData from "./components/ClientData.vue";
import ClientDataStepTwo from "./components/ClientDataStepTwo.vue";
import { required, minLength, maxLength } from "vuelidate/lib/validators";

export default {
    name: "App",
    components: {
        ClientData,
        ClientDataStepTwo,
    },
    data() {
        return {
            page: 2,
            formData: {
                stepOne: {
                    name: "",
                    surname: "",
                    middleName: "",
                    phoneNumber: "",
                    dateOfBirth: "",
                    sex: "",
                    selectedDoctor: "",
                    selectedGroupClient: [],
                    checkbox: false,
                },
                stepTwo: {
                    postalCode: "",
                    country: "",
                    district: "",
                    city: "",
                    street: "",
                    house: "",
                },
            },
        };
    },
    validations: {
        formData: {
            stepOne: {
                name: { required },
                surname: { required },
                phoneNumber: {
                    required,
                    minLength: minLength(11),
                    maxLength: maxLength(11),
                },
                dateOfBirth: { required },
                selectedGroupClient: { required },
            },
        },
    },
    methods: {
        changeStep(step) {
            this.$v.$touch();
            if (this.$v.$invalid) {
                return;
            }
            if (step === "next") this.page += 1;
            if (step === "prev" && this.page !== 1) this.page -= 1;
        },
    },
};
</script>

<style lang="scss">
* {
    margin: 0;
    padding: 0;
    border: 0;
    outline: none;
}
html,
body {
    height: 100%;
    width: 100%;
    font-size: 100%;
    line-height: 1;
    -ms-text-size-adjust: 100%;
    -moz-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    scroll-behavior: smooth;
}
#app {
    min-height: 100%;
    width: 100%;
    background-color: #ccc;
}
.wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    padding: 50px;
    @media (max-width: 1200px) {
        padding: calc(15px + (50 - 15) * ((100vw - 320px) / (1200 - 320)));
    }
    & .form {
        background-color: #fff;
        display: block;
        max-width: 350px;
        width: 100%;
        border-radius: 15px;
        padding: 30px;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
            0 4px 6px -2px rgba(0, 0, 0, 0.05);
        @media (max-width: 1200px) {
            padding: calc(10px + (30 - 10) * ((100vw - 320px) / (1200 - 320)));
        }
        &__submit {
            display: block;
            padding: 10px 15px;
            background-color: #4285f4;
            color: #ffffff;
            line-height: 1.25;
            font-weight: 500;
            width: 100%;
            border-radius: 15px;
            margin-top: 25px;
            text-transform: uppercase;
            cursor: pointer;
        }
        &__buttons {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 20px;
        }
    }
}
</style>
