<template>
    <div class="form__wrapper">
        <div class="form__input-container">
            <DropDown
                :data="documentTypes"
                :value="'id'"
                :name="'name'"
                :$v="$v"
                :page="page"
                text="Тип документа*"
                :model="formData.documentType"
                @update:model="formData.documentType = $event" />
            <div
                class="form__label-error"
                v-if="
                    $v.formData.stepThree.documentType.$dirty &&
                    !$v.formData.stepThree.documentType.required
                ">
                Выберите значение
            </div>
        </div>

        <div class="form__input-container">
            <label class="form__label">
                Серия
                <input type="text" v-model.trim="formData.passportSeries" />
            </label>
        </div>
        <div class="form__input-container">
            <label class="form__label">
                Номер
                <input type="text" v-model.trim="formData.passportNumber" />
            </label>
        </div>
        <div class="form__input-container">
            <label class="form__label">
                Кем выдан
                <input type="text" v-model.trim="formData.issuedBy" />
            </label>
        </div>
        <div class="form__input-container">
            <label class="form__label">
                Дата выдачи*
                <input
                    type="date"
                    v-model.trim="formData.issueDate"
                    @blur="$v.formData.stepThree.issueDate.$touch()"
                    :class="{
                        error:
                            $v.formData.stepThree.issueDate.$dirty &&
                            !$v.formData.stepThree.issueDate.required,
                    }" />
            </label>
            <div
                class="form__label-error"
                v-if="
                    $v.formData.stepThree.issueDate.$dirty &&
                    !$v.formData.stepThree.issueDate.required
                ">
                Введите значение
            </div>
        </div>
    </div>
</template>

<script>
import DropDown from "@/components/DropDown.vue";

export default {
    name: "ClientDataStepThree",
    components: {
        DropDown,
    },
    props: {
        page: {
            type: Number,
        },
        value: {
            type: Object,
        },
        $v: {
            type: Object,
        },
    },
    emits: ["update:value"],
    data() {
        return {
            documentTypes: [
                { id: "Паспорт", name: "Паспорт" },
                {
                    id: "Свидетельство о рождении",
                    name: "Свидетельство о рождении",
                },
                { id: "Вод. удостоверение", name: "Вод. удостоверение" },
            ],
        };
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
