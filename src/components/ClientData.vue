<template>
    <div class="form__wrapper">
        <div class="form__input-container">
            <label class="form__label">
                Фамилия
                <input type="text" />
            </label>
        </div>
        <div class="form__input-container">
            <label class="form__label">
                Имя
                <input type="text" />
            </label>
        </div>
        <div class="form__input-container">
            <label class="form__label">
                Отчество
                <input type="text" />
            </label>
        </div>
        <div class="form__input-container">
            <label class="form__label">
                Дата рождения
                <input type="date" />
            </label>
        </div>
        <div class="form__input-container">
            <label class="form__label">
                Номер телефона
                <input type="number" />
            </label>
        </div>
        <div class="form__input-container">
            <label class="form__label">
                Пол
                <input type="text" />
            </label>
        </div>
        <div class="form__input-container">
            <DropDown
                :data="groupClient"
                multiSelect
                :value="'id'"
                :name="'name'"
                text="Группа клиентов"
                :model="selectedGroups"
                @update:model="selectedGroups = $event" />
        </div>
        <div class="form__input-container">
            <DropDown
                :data="doctors"
                :value="'id'"
                :name="'name'"
                text="Лечащий врач"
                :model="selectedDoctor"
                @update:model="selectedDoctor = $event" />
        </div>
        <div class="checkbox__container">
            <input type="checkbox" id="cbx" class="cbx" />
            <label for="cbx" class="check">
                Не отправлять СМС
                <svg width="18px" height="18px" viewBox="0 0 18 18">
                    <path
                        d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
                    <polyline points="1 9 7 14 15 4"></polyline>
                </svg>
            </label>
        </div>
        <button type="submit" class="form__submit">Next</button>
    </div>
</template>

<script>
import DropDown from "@/components/DropDown.vue";

export default {
    name: "ClientData",
    components: {
        DropDown,
    },
    data() {
        return {
            selectedDoctor: "",
            selectedGroups: [],
            groupClient: [
                { id: "VIP", name: "VIP" },
                { id: "Проблемные", name: "Проблемные" },
                { id: "ОМС", name: "ОМС" },
            ],
            doctors: [
                { id: "Иванов", name: "Иванов" },
                { id: "Захаров", name: "Захаров" },
                { id: "Чернышева", name: "Чернышева" },
            ],
        };
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
        text-transform: uppercase;
    }
}
.check {
    display: flex;
    width: 100%;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    position: relative;
    margin: auto;
    -webkit-tap-highlight-color: transparent;
    transform: translate3d(0, 0, 0);
    &:hover:before {
        opacity: 1;
    }
    &:hover {
        & svg {
            stroke: #4285f4;
        }
    }
    & svg {
        position: relative;
        z-index: 1;
        fill: none;
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke: #c8ccd4;
        stroke-width: 1.5;
        transform: translate3d(0, 0, 0);
        transition: all 0.2s ease;
        & path {
            stroke-dasharray: 60;
            stroke-dashoffset: 0;
        }
        & polyline {
            stroke-dasharray: 22;
            stroke-dashoffset: 66;
        }
    }
}

.cbx {
    display: none;
    &:checked {
        & + .check svg {
            stroke: #4285f4;
        }
        & + .check svg path {
            stroke-dashoffset: 60;
            transition: all 0.3s linear;
        }
        & + .check svg polyline {
            stroke-dashoffset: 42;
            transition: all 0.2s linear;
            transition-delay: 0.15s;
        }
    }
}
</style>
