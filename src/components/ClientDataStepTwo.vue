<template>
  <div class="form__wrapper">
      <div class="form__input-container">
          <label class="form__label">
              Фамилия*
              <input
                  type="text"
                  v-model.trim="formData.surname"
                  @blur="$v.formData.surname.$touch()"
                  :class="{
                      error:
                          $v.formData.surname.$dirty &&
                          !$v.formData.surname.required,
                  }" />
          </label>
          <div
              class="form__label-error"
              v-if="
                  $v.formData.surname.$dirty && !$v.formData.surname.required
              ">
              Введите значение
          </div>
      </div>
      <div class="form__input-container">
          <label class="form__label">
              Имя*
              <input
                  type="text"
                  v-model.trim="formData.name"
                  @blur="$v.formData.name.$touch()"
                  :class="{
                      error:
                          $v.formData.name.$dirty &&
                          !$v.formData.name.required,
                  }" />
          </label>
          <div
              class="form__label-error"
              v-if="$v.formData.name.$dirty && !$v.formData.name.required">
              Введите значение
          </div>
      </div>
      <div class="form__input-container">
          <label class="form__label">
              Отчество
              <input type="text" v-model.trim="formData.middleName" />
          </label>
      </div>
      <div class="form__input-container">
          <label class="form__label">
              Дата рождения*
              <input
                  type="date"
                  v-model.trim="formData.dateOfBirth"
                  @blur="$v.formData.dateOfBirth.$touch()"
                  :class="{
                      error:
                          $v.formData.dateOfBirth.$dirty &&
                          !$v.formData.dateOfBirth.required,
                  }" />
          </label>
          <div
              class="form__label-error"
              v-if="
                  $v.formData.dateOfBirth.$dirty &&
                  !$v.formData.dateOfBirth.required
              ">
              Введите значение
          </div>
      </div>
      <div class="form__input-container">
          <label class="form__label">
              Номер телефона*
              <input
                  type="number"
                  placeholder="e.g. 7 (999) 500 1000"
                  v-model.trim="formData.phoneNumber"
                  @blur="$v.formData.phoneNumber.$touch()"
                  :class="{
                      error:
                          ($v.formData.phoneNumber.$dirty &&
                              !$v.formData.phoneNumber.required) ||
                          ($v.formData.phoneNumber.$dirty &&
                              !$v.formData.phoneNumber.minLength) ||
                          ($v.formData.phoneNumber.$dirty &&
                              !$v.formData.phoneNumber.maxLength),
                  }" />
          </label>
          <div
              class="form__label-error"
              v-if="
                  $v.formData.phoneNumber.$dirty &&
                  !$v.formData.phoneNumber.required
              ">
              Введите значение
          </div>
          <div
              class="form__label-error"
              v-if="
                  ($v.formData.phoneNumber.$dirty &&
                      !$v.formData.phoneNumber.minLength) ||
                  ($v.formData.phoneNumber.$dirty &&
                      !$v.formData.phoneNumber.maxLength)
              ">
              Номер должен состоять из
              {{ $v.formData.phoneNumber.$params.minLength.min }} цифр. Сейчас
              он
              {{ formData.phoneNumber.length }}
          </div>
      </div>
      <div class="form__input-container">
          <label class="form__label">
              Пол
              <input type="text" v-model.trim="formData.sex" />
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
      return {

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
