<template>
    <div id="app">
        <div class="wrapper">
            <form class="form">
                <transition mode="out-in">
                    <div v-if="page === 1" key="step1">
                        <ClientData
                            v-model="formData.stepOne"
                            :$v="$v"
                            :page="page" />
                        <button
                            class="form__submit"
                            @click.prevent="changeStep('next')">
                            Next
                        </button>
                    </div>
                    <div v-else-if="page === 2" key="step2">
                        <ClientDataStepTwo
                            v-model="formData.stepTwo"
                            :$v="$v" />
                        <div class="form__buttons">
                            <button
                                class="form__submit"
                                @click.prevent="changeStep('prev')">
                                Назад
                            </button>
                            <button
                                class="form__submit"
                                @click.prevent="changeStep('next')">
                                Далее
                            </button>
                        </div>
                    </div>
                    <div v-else-if="page === 3" key="step3">
                        <ClientDataStepThreeVue
                            v-model="formData.stepThree"
                            :$v="$v"
                            :page="page" />
                        <div class="form__buttons">
                            <button
                                class="form__submit"
                                @click.prevent="changeStep('prev')">
                                Назад
                            </button>
                            <button
                                class="form__submit"
                                @click.prevent="changeStep('submit')">
                                Отправить
                            </button>
                        </div>
                    </div>
                </transition>
            </form>
        </div>
        <transition mode="out-in">
            <FormPopup @closePopup="closePopup" v-if="popup" />
        </transition>
    </div>
</template>

<script>
import ClientData from "./components/ClientData.vue";
import ClientDataStepTwo from "./components/ClientDataStepTwo.vue";
import ClientDataStepThreeVue from "./components/ClientDataStepThree.vue";
import FormPopup from "./components/FormPopup.vue";

import { required, minLength, maxLength } from "vuelidate/lib/validators";

export default {
    name: "App",
    components: {
        ClientData,
        ClientDataStepTwo,
        ClientDataStepThreeVue,
        FormPopup,
    },
    data() {
        return {
            popup: false,
            page: 1,
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
                stepThree: {
                    documentType: "",
                    passportSeries: "",
                    passportNumber: "",
                    issuedBy: "",
                    issueDate: "",
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
            stepTwo: {
                city: { required },
            },
            stepThree: {
                documentType: { required },
                issueDate: { required },
            },
        },
    },
    methods: {
        changeStep(step) {
            if (
                step === "next" &&
                this.page === 1 &&
                !this.$v.formData.stepOne.$invalid
            ) {
                this.page = 2;
            } else if (
                step === "next" &&
                this.page === 2 &&
                !this.$v.formData.stepTwo.$invalid
            ) {
                this.page = 3;
            }
            if (step === "prev" && this.page !== 1) this.page -= 1;
            if (
                step === "submit" &&
                this.page === 3 &&
                !this.$v.formData.stepThree.$invalid
            ) {
                this.popup = true;
                setTimeout(() => {
                    this.popup = false;
                }, 2000);
            }
            this.$v.$touch();
            if (this.$v.$invalid) {
                return;
            }
        },
        closePopup(value) {
            this.popup = value;
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
    box-sizing: border-box;
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
            transition: 0.2s;
            cursor: pointer;
            &:hover {
                -webkit-box-shadow: 4px 4px 8px 0px rgba(66, 133, 244, 0.4);
                -moz-box-shadow: 4px 4px 8px 0px rgba(66, 133, 244, 0.4);
                box-shadow: 4px 4px 8px 0px rgba(66, 133, 244, 0.4);
            }
        }
        &__buttons {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 20px;
        }
    }
}
.v-enter-active,
.v-leave-active {
    transition: 0.3s;
}
.v-enter,
.v-leave-to {
    opacity: 0;
}
.v-enter-to,
.v-leave-from {
    opacity: 1;
}
</style>
