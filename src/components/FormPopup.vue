<template>
    <div class="popup">
        <div class="popup__wrapper">
            <div class="popup__icon" @click="closePopup">
                <img
                    src="@/assets/close_icon_14.svg"
                    alt="иконка закрытия попап" />
            </div>
            <p>Форма успешно отправлена</p>
        </div>
    </div>
</template>

<script>
export default {
    emits: ["update:value"],
    methods: {
        closePopup() {
            this.$emit("closePopup", false);
        },
    },
};
</script>

<style lang="scss" scoped>
.popup {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.7);
    bottom: 0;
    &__wrapper {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #fff;
        width: 300px;
        height: 300px;
        font-size: 20px;
        border-radius: 15px;
        @media (max-width: 1200px) {
            width: calc(250px + (300 - 250) * ((100vw - 320px) / (1200 - 320)));
            font-size: calc(
                16px + (20 - 16) * ((100vw - 320px) / (1200 - 320))
            );
        }
    }
    &__icon {
        position: absolute;
        top: 15px;
        right: 15px;
        width: 30px;
        height: 30px;
        cursor: pointer;
        & img {
            height: 100%;
            width: 100%;
        }
    }
}
</style>
