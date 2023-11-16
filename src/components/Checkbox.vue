<!--
    Props:
    - disabled ......................... Заблокирован ли чекбокс. По умолчанию false
    - active ........................... Активен ли чекбокс. По умолчанию false
    - partly ........................... не реализовано. todo: необходимо сделать состояние, когда обозначается, что выбраны не все чекбоксы

    Emits:
    - click ............................ событие клика. Срабатывает, если disabled === false
-->
<template>
    <div
        class="checkbox_wrapper"
        :class="{
            disabled: disabled,
            active: active,
        }"
        @click="changeActive()">
        <template v-if="active">
            <svg
                width="10"
                height="10"
                viewBox="0 0 14 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M4.75502 10.2349L0.205017 5.68493C-0.0683389 5.41157 -0.0683389 4.96836 0.205017 4.69497L1.19494 3.70502C1.4683 3.43164 1.91154 3.43164 2.1849 3.70502L5.25 6.77009L11.8151 0.205017C12.0885 -0.0683389 12.5317 -0.0683389 12.8051 0.205017L13.795 1.19497C14.0683 1.46833 14.0683 1.91154 13.795 2.18492L5.74498 10.235C5.47159 10.5083 5.02838 10.5083 4.75502 10.2349Z"
                    fill="#4385F6" />
            </svg>
        </template>
    </div>
</template>

<script>
export default {
    name: "CheckboxComponent",
    props: {
        disabled: {
            default: false,
            type: Boolean,
        },
        active: {
            default: false,
            type: Boolean,
        },
    },
    emits: { click: null },
    methods: {
        changeActive() {
            if (!this.disabled) {
                this.$emit("click");
            }
        },
    },
};
</script>

<style scoped>
.checkbox_wrapper {
    height: 14px;
    width: 14px;
    max-height: 14px;
    max-width: 14px;
    border-radius: 4px;
    border: 1px solid transparent;
    cursor: pointer;
    min-width: 14px;
    min-height: 14px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease-in-out;
    background: #eaf2ff;
}

.checkbox_wrapper:hover {
    border-color: #4385f6;
}

.checkbox_wrapper.active {
    background: #eaf2ff;
    border-color: #4385f6;
}

.checkbox_wrapper.disabled {
    pointer-events: none;
    background: #ebebeb;
}
</style>
