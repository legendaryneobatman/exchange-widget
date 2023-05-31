<template>
  <div class="container">
    <div class="widget">
      <div class="widget__wrapper">
        <span class="widget__title">Crypto Exchange</span>
        <span class="widget__subtitle">Exchange fast and easy</span>
        <div v-if="availableCurrencies.length !== 0" class="widget__form">
          <input-with-select :options="mock" />
          <inline-svg :src="Swap" />
          <input-with-select :options="availableCurrencies" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import InputWithSelect from "@/components/InputWithSelect.vue";
import Swap from "@/assets/icons/swap.svg";
import { mock } from "@/mock";
import { Currency } from "@/@types/currency";
import { ref } from "vue";

const baseURL = "https://api.changenow.io/v2/exchange/currencies";
const params = {
  flow: "standard",
};
const searchParams = new URLSearchParams(params);
const availableCurrencies = ref<Currency[] | []>([]);

fetch(`${baseURL}?${searchParams}`, {
  method: "GET",
  headers: {
    "x-changenow-api-key":
      "c9155859d90d239f909d2906233816b26cd8cf5ede44702d422667672b58b0cd",
  },
})
  .then((response) => response.json())
  .then((data: Currency[]) => (availableCurrencies.value = [...data]))
  .catch((error) => console.error(error));
</script>

<style lang="scss">
*,
html,
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: "Vollkorn", serif;
  font-style: normal;
  height: 100vh;
}

.container {
  margin-inline: auto;
  width: max(100%, 1920px);
  height: 100%;
}

.widget {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1400px;
  height: 800px;
  color: #282828;

  &__wrapper {
    display: flex;
    flex-direction: column;
    width: 960px;
  }

  &__title {
    font-weight: 300;
    font-size: 50px;
    line-height: 120%;
  }

  &__subtitle {
    margin-top: 16px;
    font-size: 20px;
    line-height: 100%;
  }

  &__form {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-top: 60px;
  }
}
</style>
