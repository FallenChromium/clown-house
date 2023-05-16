<template>
    <div :style="{ display: 'flex', placeItems: 'left' }">
        <n-form :model="formValue" size="medium" :inline="false" :label-width="80" label-align="left"
            label-placement="top" :show-feedback="true" :show-label="true" :show-require-mark="true" :rules="rules"
            require-mark-placement="right">

            <n-form-item label="id" path="id">
                <n-input-number v-model:value="formValue.id" :clearable="false" :disabled="true" :min="1" :step="1"
                    size="medium" :show-button="false" />
            </n-form-item>
            <n-form-item label="Object type name" path="ObjectTypeName">
                <n-input v-model:value="formValue.ObjectTypeName" type="text" size="medium" />
            </n-form-item>

        </n-form>
    </div>
    <n-button v-on:click="save" :style="{ align: 'right' }">Save</n-button>



</template>
<script async setup lang="ts">

import { DefaultService, type CityEventType, type CityObjectOwner, type CityObjectType} from '@/client';
import router from '@/router';
import { Save } from '@vicons/ionicons5';
import { NForm, NFormItem, NInput, NDatePicker, NSelect, NInputNumber, NButton, NAvatar, NText, type SelectRenderLabel, type SelectRenderTag } from 'naive-ui';
import { computed, h, ref } from 'vue'

const props = defineProps<{
    id: number
}>()

const isNew: boolean = isNaN(props.id)

const formValue = ref<CityObjectType>(<CityObjectType>{})

async function newEntry() {
    const new_id: number = await DefaultService.createObjectObjectTypesPost(formValue.value)
    return new_id
}

async function saveChanges() {
    return await DefaultService.updateObjectObjectTypesItemIdPatch(props.id, formValue.value)
}

async function save() {
    if (isNew) {
        const new_id = await newEntry()
    }
    else {
        await saveChanges()
    }
    router.push({ name: "settings" })

}

if (!isNew) {
    formValue.value = await DefaultService.readObjectObjectTypesItemIdGet(props.id)
}

const rules = {
    id: [

    ], ObjectTypeName: [
    ]
}

</script>

