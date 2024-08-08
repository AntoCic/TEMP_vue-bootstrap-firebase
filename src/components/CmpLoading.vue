<template>
    <div class="loader text-white">
        <div class="spinner-box my-5 mx-auto">
            <div class="spinner"></div>
            <span class="smile"></span>
        </div>
        <p class="text-center">{{ store.loading.msg }}</p>
    </div>
</template>

<script>
import { store } from '../store.js';
export default {
    data() {
        return {
            store,
        }
    },
    mounted() {
        document.body.style.overflow = 'hidden';
    },
    unmounted() {
        document.body.style.overflow = 'auto';
    }
}
</script>

<style lang="scss" scoped>
.loader {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: wait;
    background-color: #0000009f;
}

.spinner-box {
    max-width: 200px;
    max-height: 200px;
    width: 50vw;
    height: 50vw;
    position: relative;

    .spinner {
        position: absolute;
        top: 50%;
        left: 50%;
        translate: -50% -50%;
        width: 70%;
        height: 70%;
        border-radius: 50%;
        box-shadow: -50px 0px 50px #c8f859, -50px -50px 50px #6359f8, 0px -50px 50px 0px #9c32e2, 50px -50px 50px #f36896, 50px 0 50px #ff0b0b, 50px 50px 50px 0px #ff5500, 0 50px 50px 0px #ff9500, -50px 50px 50px 0px #ffb700;
        animation: rotation360 1.5s linear infinite;
    }
}

@keyframes rotation360 {
    to {
        transform: rotate(360deg);
    }
}

.smile {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #1f1f1f;
    position: absolute;
    top: 50%;
    left: 50%;
    translate: -50% -50%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
}

.smile::after,
.smile::before {
    content: "";
    display: inline-block;
    width: 35%;
    height: 35%;
    background-color: #fff;
    background-image: radial-gradient(circle 20px, #0d161b 100%, transparent 0);
    background-repeat: no-repeat;
    border-radius: 50%;
    animation: eyeMove 10s infinite, blink 10s infinite;
}

@keyframes eyeMove {

    0%,
    10% {
        background-position: 0px 0px;
    }

    13%,
    40% {
        background-position: -15px 0px;
    }

    43%,
    70% {
        background-position: 15px 0px;
    }

    73%,
    90% {
        background-position: 0px 15px;
    }

    93%,
    100% {
        background-position: 0px 0px;
    }
}

@keyframes blink {

    0%,
    10%,
    12%,
    20%,
    22%,
    40%,
    42%,
    60%,
    62%,
    70%,
    72%,
    90%,
    92%,
    98%,
    100% {
        height: 35%;
    }

    11%,
    21%,
    41%,
    61%,
    71%,
    91%,
    99% {
        height: 10%;
    }
}
</style>