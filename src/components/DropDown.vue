<template>
    <div :id="id" class="drop-down__wrapper">
        <div v-if="text" class="drop-down__text">
            {{ text }}
        </div>
        <div class="drop-down__content">
            <div
                class="drop-down__field"
                :class="{
                    placeholder:
                        placeholder &&
                        !(
                            (fieldValue && !multiSelect) ||
                            (multiSelect &&
                                fieldValue &&
                                Array.isArray(fieldValue) &&
                                fieldValue.length > 0)
                        ),
                    open_select: openSelect,
                    disabled: disabled,
                    multiSelect: multiSelect,
                    error:
                        (page &&
                            page === 1 &&
                            $v?.formData.stepOne.selectedGroupClient.$dirty &&
                            !$v?.formData.stepOne.selectedGroupClient.required) ||
                        (page &&
                            page === 3 &&
                            $v?.formData.stepThree.documentType.$dirty &&
                            !$v?.formData.stepThree.documentType.required),
                }"
                @click="changeOpenSelect">
                <transition name="field">
                    <div>
                        <div
                            v-if="
                                multiSelect &&
                                fieldValue &&
                                Array.isArray(fieldValue) &&
                                fieldValue.length > 0
                            "
                            class="multi">
                            <span
                                v-for="field in fieldValue"
                                :key="'drop_down_field_' + field.value"
                                class="element">
                                <span>{{ field.name }}</span>
                                <div
                                    class="filed_delete"
                                    @click.stop="deleteField(field)">
                                    <svg
                                        width="14"
                                        height="14"
                                        viewBox="0 0 14 14"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M4 4L10.5 10.5"
                                            stroke="#999999"
                                            stroke-width="1.5" />
                                        <path
                                            d="M4 10.5L10.5 4"
                                            stroke="#999999"
                                            stroke-width="1.5" />
                                    </svg>
                                </div>
                            </span>
                        </div>
                        <span v-else-if="!multiSelect && fieldValue">{{
                            fieldValue
                        }}</span>
                        <span v-else>{{ placeholder }}</span>
                    </div>
                </transition>

                <div class="actions">
                    <div
                        v-if="fieldValue && showClearButton"
                        class="clear_button"
                        @click.stop="clearField" />
                    <transition>
                        <div class="arrow" />
                    </transition>
                </div>
            </div>
            <transition name="select">
                <div
                    v-if="openSelect"
                    :id="'select_' + id"
                    class="drop-down__select">
                    <template v-if="convertedData && convertedData.length > 0">
                        <div
                            v-for="item in convertedData"
                            :key="'drop_down_' + value + '_' + item[value]"
                            class="drop-down__element"
                            @click="changeModel(item)">
                            <template v-if="multiSelect">
                                <CheckboxComponent
                                    :active="
                                        model &&
                                        Array.isArray(model) &&
                                        model.includes(item[value])
                                    " />
                            </template>
                            <template v-if="typeof name === 'string'">
                                {{ item[name] }}
                            </template>
                            <template v-else-if="Array.isArray(name)">
                                <div
                                    v-for="(itemName, itemKey) in name"
                                    :key="'drop_down_name_' + itemName">
                                    {{ item[itemName] }}
                                    {{ name.length - 1 !== itemKey ? " " : "" }}
                                </div>
                            </template>
                        </div>
                    </template>
                    <template v-else>
                        <div class="drop-down__element not_found">
                            <span>Ничего не найдено</span>
                        </div>
                    </template>
                </div>
            </transition>
        </div>
        <div v-if="error" class="drop-down__error">
            <transition name="error">
                <span>{{ errorText }}</span>
            </transition>
        </div>
    </div>
</template>

<script>
import CheckboxComponent from "@/components/Checkbox";

export default {
    name: "DropDown",
    components: { CheckboxComponent },
    props: {
        page: {
            type: Number,
        },
        $v: {
            type: Object,
        },
        text: {
            default: false,
            type: [String, Boolean],
        },
        placeholder: {
            default: "Выберите значение",
            type: [String, Boolean],
        },
        showClearButton: {
            default: true,
            type: Boolean,
        },
        disabled: {
            default: false,
            type: Boolean,
        },
        data: {
            default: Array,
            type: [Array, Object, Boolean],
        },
        multiSelect: {
            default: false,
            type: Boolean,
        },
        name: {
            default: "name",
            type: [String, Array],
        },
        value: {
            default: "id",
            type: String,
        },
        error: {
            default: false,
            type: Boolean,
        },
        errorText: {
            default: "",
            type: String,
        },
        model: {
            default: false,
            type: [Number, String, Array, Boolean],
        },
    },
    emits: ["update:model"],
    data() {
        return {
            searchText: "",
            modelValue: "",
            openSelect: false,
            id: false,
        };
    },
    computed: {
        convertedData() {
            let data = JSON.parse(JSON.stringify(this.data));
            if (!Array.isArray(data)) {
                for (const key in data) {
                    if (typeof data[key] === "object") {
                        data[key] = { ...{ _key: key }, ...data[key] };
                    } else {
                        data[key] = {
                            _key: key,
                            _value: data[key],
                        };
                    }
                }
                data = Object.values(data);
            }

            return data;
        },
        fieldValue() {
            if ((this.model || this.model === 0) && !this.multiSelect) {
                const model = this.data.find(
                    (item) => item[this.value] === this.model
                );
                if (typeof this.name === "object") {
                    let name = "";
                    this.name.forEach((itemName, ind) => {
                        name += model[itemName];
                        if (ind !== this.name.length - 1) name += " ";
                    });
                    return name;
                }
                return model[this.name];
            } else if (this.model && Array.isArray(this.model)) {
                const array = [];
                this.model.forEach((item) => {
                    const model = this.data.find(
                        (itemData) => itemData[this.value] === item
                    );
                    if (typeof this.name === "object") {
                        let name = "";
                        this.name.forEach((itemName, ind) => {
                            name += model[itemName];
                            if (ind !== this.name.length - 1) name += " ";
                        });
                        array.push({
                            name: name,
                            value: model[this.value],
                        });
                    } else {
                        array.push({
                            name: model[this.name],
                            value: model[this.value],
                        });
                    }
                });
                return array;
            }
            return false;
        },
    },
    mounted() {
        this.scrollPage();
        this.getId();
    },
    methods: {
        getId() {
            this.id = "drop_down_id_" + Math.random().toString(16).slice(2);
        },
        scrollPage() {
            window.addEventListener("scroll", () => {
                this.openSelect = false;
            });
        },
        deleteField(item) {
            let model = JSON.parse(JSON.stringify(this.model || []));

            if (
                this.model &&
                Array.isArray(this.model) &&
                this.model.includes(item.value)
            ) {
                const index = this.model.findIndex(
                    (itemIndex) => itemIndex === item.value
                );
                model.splice(index, 1);
            }
            this.$emit("update:model", model);
        },
        changeOpenSelect() {
            if (!this.disabled) {
                this.openSelect = !this.openSelect;
            }
        },
        clearField() {
            this.$emit("update:model", null);
        },
        changeModel(item) {
            if (this.multiSelect) {
                let model = JSON.parse(JSON.stringify(this.model || []));
                if (
                    this.model &&
                    Array.isArray(this.model) &&
                    this.model.includes(item[this.value])
                ) {
                    const index = this.model.findIndex(
                        (itemIndex) => itemIndex === item[this.value]
                    );
                    model.splice(index, 1);
                } else if (
                    this.model &&
                    Array.isArray(this.model) &&
                    !this.model.includes(item[this.value])
                ) {
                    model.push(item[this.value]);
                }
                if (this.$v)
                    this.$v.formData.stepOne.selectedGroupClient.$touch();
                this.$emit("update:model", model);
            } else {
                this.$emit("update:model", item[this.value]);
                this.changeOpenSelect();
            }
        },
    },
};
</script>

<style scoped lang="scss">
.drop-down {
    &__wrapper {
        display: flex;
        gap: 6px;
        flex-direction: column;
        width: auto;
        font-weight: 500;
        font-size: 16px;
        line-height: 19px;
    }
    &__content {
        position: relative;
    }
    &__select {
        width: auto;
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.25);
        border-radius: 15px;
        background: #ffffff;
        overflow-y: auto;
        overflow-x: hidden;
        position: absolute;
        z-index: 10;
        min-width: 200px;
        min-height: 92px;
        display: flex;
        flex-direction: column;
    }
    &__element {
        height: 46px;
        min-height: 46px;
        display: flex;
        align-items: center;
        cursor: pointer;
        padding: 0 15px;
        transition: background-color 0.3s ease-in-out;
        gap: 10px;
        &.not_found {
            justify-content: center;
            color: #999999;
            pointer-events: none;
            margin: auto;
        }
        &:not(.not_found):hover {
            background-color: #f1f1f1;
        }
    }
    &__field {
        align-items: center;
        display: flex;
        justify-content: space-between;
        width: inherit;
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.25);
        border-radius: 15px;
        background: #ffffff;
        padding: 0 15px;
        color: #000000;
        height: 40px;
        cursor: pointer;
        @media (max-width: 1200px) {
            padding: 0 calc(10px + (15 - 10) * ((100vw - 320px) / (1200 - 320)));
        }
        &:hover {
            & .clear_button {
                display: flex;
            }
        }
        & .clear_button {
            background-image: url("@/assets/close_icon_14.svg");
            background-size: 14px;
            background-repeat: no-repeat;
            background-position: center;
            width: 14px;
            height: 14px;
            display: none;
        }
        & .arrow {
            background-image: url("@/assets/arrow.svg");
            background-size: 14px;
            background-repeat: no-repeat;
            background-position: center;
            width: 14px;
            height: 8px;
            transition: all 0.3s ease-in-out;
        }
        & .actions {
            margin-left: 10px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 5px;
        }
        &.disabled {
            pointer-events: none;
            background: #ebebeb;
        }
        &.placeholder {
            color: #696969;
        }
        & span {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        &.error {
            border: 1px solid #ff4433;
        }
        & .multi {
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
            overflow: hidden;
            padding: 5px 0;
            align-items: center;
            & .element {
                display: flex;
                gap: 5px;
                align-items: center;
                width: max-content;
                background: #eaf2ff;
                border-radius: 47px;
                padding: 5px 10px;
                transition: all 0.3s ease-in-out;
                position: relative;
                font-size: 16px;
                @media (max-width: 1200px) {
                    font-size: calc(
                        14px + (16 - 14) * ((100vw - 320px) / (1200 - 320))
                    );

                    padding: 5px
                        calc(5px + (10 - 5) * ((100vw - 320px) / (1200 - 320)));
                }
                &:hover {
                    padding-right: 24px;
                    & .filed_delete {
                        display: flex;
                        opacity: 1;
                    }
                }
                & .filed_delete {
                    width: 14px;
                    height: 29px;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    opacity: 0;
                    display: none;
                    transition: all 0.3s ease-in-out;
                    position: absolute;
                    right: 10px;
                }
            }
        }
        &.open_select .arrow {
            transform: rotate(180deg);
        }
    }
}

.drop-down__wrapper .drop_down_error {
    color: #ff4433;
}

.select-enter-active,
.select-leave-active,
.field-enter-active,
.field-leave-active,
.error-enter-active,
.error-leave-active {
    transition: opacity 0.3s ease-in-out;
}

.error-enter-from,
.error-leave-to,
.select-enter-from,
.select-leave-to,
.field-enter-from,
.field-leave-to {
    opacity: 0;
}
</style>
