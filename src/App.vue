<template>
    <div id="app">
        <div class="wrapper">
            <form class="form">
                <ClientData />
            </form>
        </div>
    </div>
</template>

<script>
import ClientData from "./components/ClientData.vue";

export default {
    name: "App",
    components: {
        ClientData,
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
    }
}
</style>
