<template>
  <div class="container">
    <div class="widget">
      <div class="widget__wrapper">
        <span class="widget__title">Crypto Exchange</span>
        <span class="widget__subtitle">Exchange fast and easy</span>
        <div v-if="currencyList.length !== 0" class="widget__form">
          <input-with-select
            v-if="primaryInput.currency"
            :options="currencyList"
            :select-value="primaryInput.currency"
            :input-value="primaryInput.value"
            :is-error="primaryInputIsError"
            @on-select="handlePrimarySelect"
            @on-input="handlePrimaryInput"
          />
          <inline-svg :src="Swap" class="widget__swap" @click="handleSwap" />
          <input-with-select
            v-if="secondaryInput.currency"
            :options="currencyList"
            :input-value="secondaryInput.value"
            :select-value="secondaryInput.currency"
            is-read-only
            @on-select="handleSecondarySelect"
          />
        </div>
        <div class="widget__address">
          <div class="widget__email">
            <label>Your Ethereum address</label>
            <input type="email" />
          </div>
          <TextButton class="widget__button" :is-disabled="primaryInputIsError">
            Exchange
            <span
              v-if="primaryInputIsError && !isPairDisabled"
              class="widget__error"
            >
              Exchange amount is below minimum
            </span>
            <span v-else-if="isPairDisabled" class="widget__error">
              This pair is disabled now
            </span>
          </TextButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, reactive, ref } from "vue";

import { EstimatedExchangeAmountRequest } from "@/API/dto/requests/estimated-exchange-amount.request";
import { MinimalExchangeAmountRequest } from "@/API/dto/requests/minimal-exchange-amount.request";
import { Currency } from "@/API/dto/response/list-of-available-currencies.reponse";
import {
  fetchCurrencyList,
  fetchEstimatedExchangeAmount,
  fetchMinimalExchangeAmount,
} from "@/API/requests";
import Swap from "@/assets/icons/swap.svg";
import InputWithSelect from "@/components/InputWithSelect.vue";
import TextButton from "@/components/TextButton.vue";

const currencyList = ref<Currency[]>([]);

const primaryInput = reactive<{
  currency: Currency | null;
  value: string;
  minAmount: number;
}>({
  currency: null,
  value: "0",
  minAmount: 0,
});

const secondaryInput = reactive<{ currency: Currency | null; value: string }>({
  currency: null,
  value: "0",
});

const handleMinimumAmount = async () => {
  if (!primaryInput.currency && !secondaryInput.currency) return;

  const params: MinimalExchangeAmountRequest = {
    fromCurrency: primaryInput.currency?.ticker ?? "",
    toCurrency: secondaryInput.currency?.ticker ?? "",
  };

  try {
    const response = await fetchMinimalExchangeAmount(params);

    primaryInput.minAmount = response.minAmount;
    primaryInput.value = response.minAmount.toString();
  } catch (e) {
    console.log(e);
  }
};

const handleEstimatedExchangeAmount = async () => {
  const params: EstimatedExchangeAmountRequest = {
    fromCurrency: primaryInput.currency?.ticker ?? "",
    toCurrency: secondaryInput.currency?.ticker ?? "",
    fromAmount: Number(primaryInput.value),
  };

  const response = await fetchEstimatedExchangeAmount(params);
  primaryInput.value = response.fromAmount.toString();
  secondaryInput.value = response.toAmount.toString();
};

const handleSwap = async () => {
  const { primary, secondary } = {
    primary: primaryInput.currency,
    secondary: secondaryInput.currency,
  };
  primaryInput.currency = secondary;
  secondaryInput.currency = primary;

  await handleMinimumAmount();
  await handleEstimatedExchangeAmount();
};

const handlePrimaryInput = async (value: string) => {
  primaryInput.value = value;
  if (primaryInputIsError.value) {
    secondaryInput.value = "-";
    return;
  }

  await handleEstimatedExchangeAmount();
};

const handlePrimarySelect = async (item: Currency) => {
  primaryInput.currency = item;
  await handleMinimumAmount();
};

const handleSecondarySelect = async (item: Currency) => {
  if (item === secondaryInput.currency) return;

  secondaryInput.currency = item;
  await handleMinimumAmount();
};

const primaryInputIsError = computed(
  () => primaryInput.minAmount > Number(primaryInput.value)
);

const isPairDisabled = computed(
  () =>
    primaryInput.minAmount === null ||
    primaryInput.minAmount === undefined ||
    secondaryInput.value === null
);

onBeforeMount(async () => {
  currencyList.value = await fetchCurrencyList();
  primaryInput.currency = currencyList.value[0];
  secondaryInput.currency = currencyList.value[0];

  await handleMinimumAmount();
  await handleEstimatedExchangeAmount();
});
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
  width: 100%;
  height: 100%;
  max-width: 1440px;
}

.widget {
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 1400px;
  margin-inline: 20px;
  height: 800px;
  color: #282828;

  &__wrapper {
    display: flex;
    flex-direction: column;
    max-width: 960px;
    width: 100%;
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

    @media only screen and (max-width: 720px) {
      flex-direction: row;
      justify-content: flex-end;
      flex-wrap: wrap;
    }
  }

  &__swap {
    cursor: pointer;
  }

  &__address {
    margin-top: 63px;
    display: flex;
    width: 100%;
    height: 51px;
    gap: 32px;
  }

  &__email {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;

    input {
      background: #f6f7f8;
      border: 1px solid #e3ebef;
      border-radius: 5px;
      padding: 14px 16px;
      font-family: inherit;
      font-size: 16px;
      line-height: 23px;

      &:focus-visible {
        outline: none;
      }
    }

    label {
      position: absolute;
      top: -24px;
    }
  }

  &__button {
    position: relative;

    span {
      position: absolute;
      bottom: -100%;
      font-size: 16px;
      line-height: 23px;
      color: #e03f3f;
      text-transform: lowercase;
    }
  }
}
</style>
