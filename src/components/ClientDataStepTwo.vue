<template>
    <div class="form__wrapper">
        <div class="form__input-container">
            <label class="form__label">
                Индекс
                <input type="text" v-model.trim="formData.postalCode" />
            </label>
        </div>
        <div class="form__input-container">
            <label class="form__label">
                Страна
                <input type="text" v-model.trim="formData.country" />
            </label>
        </div>
        <div class="form__input-container">
            <label class="form__label">
                Область
                <input type="text" v-model.trim="formData.district" />
            </label>
        </div>
        <div class="form__input-container">
            <label class="form__label">
                Город*
                <input
                    type="text"
                    v-model.trim="formData.city"
                    @blur="$v.formData.stepTwo.city.$touch()"
                    :class="{
                        error:
                            $v.formData.stepTwo.city.$dirty &&
                            !$v.formData.stepTwo.city.required,
                    }" />
            </label>
            <div
                class="form__label-error"
                v-if="$v.formData.stepTwo.city.$dirty && !$v.formData.stepTwo.city.required">
                Введите значение
            </div>
        </div>
        <div class="form__input-container">
            <label class="form__label">
                Улица
                <input type="text" v-model.trim="formData.street" />
            </label>
        </div>
        <div class="form__input-container">
            <label class="form__label">
                Дом
                <input type="text" v-model.trim="formData.house" />
            </label>
        </div>
    </div>
</template>

<script>
export default {
    name: "ClientDataStep2",
    props: {
        value: {
            type: Object,
        },
        $v: {
            type: Object,
        },
    },
    emits: ["update:value"],
    data() {
        return {};
    },
    computed: {
        formData() {
            return this.value;
        },
    },
};
</script>

<style scoped lang="scss">
.form {
    &__wrapper {
        display: flex;
        flex-direction: column;
        gap: 25px;
    }
    &__input-container {
        position: relative;
        & input {
            height: 18px;
        }
        & input,
        & select {
            background-color: #fff;
            padding: 10px;
            border-radius: 15px;
            box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
            border: 1px solid #e5e7eb;
            margin-top: 5px;
            font-size: 16px;
            appearance: none;
            -moz-appearance: none;
            -webkit-appearance: none;
        }
        & input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
            -webkit-appearance: none;
        }
        & select {
            cursor: pointer;
        }
        & img {
            position: absolute;
            right: 15px;
            bottom: 10px;
            width: 20px;
            transform: rotate(90deg);
            pointer-events: none;
        }
    }
    &__label {
        position: relative;
        display: flex;
        flex-direction: column;
        &-error {
            position: absolute;
            margin-top: 2px;
            font-size: 14px;
            color: #e61919;
        }
        & .error {
            border-color: #e61919;
        }
    }
}
</style>
