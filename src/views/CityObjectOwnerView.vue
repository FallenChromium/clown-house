<template>
    <div :style="{ display: 'flex', placeItems: 'left' }">
        <n-form :model="formValue" size="medium" :inline="false" :label-width="80" label-align="left"
            label-placement="top" :show-feedback="true" :show-label="true" :show-require-mark="true" :rules="rules"
            require-mark-placement="right">

            <n-form-item label="id" path="id">
                <n-input-number v-model:value="formValue.id" :clearable="false" :disabled="true" :min="1" :step="1"
                    size="medium" :show-button="false" />
            </n-form-item>
            <n-form-item label="Is a legal entity" path="Type">
                <n-switch v-model:value="formValue.Type" size="medium" :default-value="true"
                    placeholder="Choose an object type..." :multiple="false" :clearable="false" />
            </n-form-item>
            <n-form-item label="Owner name" path="OwnerName">
                <n-input v-model:value="formValue.OwnerName" :clearable="false" type="text" size="medium" />
            </n-form-item>
            <n-form-item label="Leader Full Name" path="Name">
                <n-input v-model:value="formValue.LeaderFullName" :clearable="false" type="text" size="medium" />
            </n-form-item>
        </n-form>
    </div>
    <n-button v-on:click="save" :style="{ align: 'right' }">Save</n-button>

</template>
        
<script async setup lang="ts">

import { DefaultService, type CityObject, type CityObjectOwner, type CityObjectType } from '@/client';
import router from '@/router';
import { Save } from '@vicons/ionicons5';
import { NForm, NFormItem, NInput, NInputNumber, NSwitch, NButton } from 'naive-ui';
import { computed, h, ref } from 'vue'

const props = defineProps<{
    id: number
}>()

const isNew: boolean = isNaN(props.id)

const formValue = ref<CityObjectOwner>(<CityObjectOwner>{Type: false})

async function newEntry() {
    const new_id: number = await DefaultService.createObjectObjectOwnersPost(formValue.value)
    return new_id
}

async function saveChanges() {
    return await DefaultService.updateObjectObjectOwnersItemIdPatch(props.id, formValue.value)
}

async function save() {
    if (isNew) {
        const new_id = await newEntry()
    }
    else {
        await saveChanges()
    }
    router.push({ name: "objectOwners" })

}

if (!isNew) {
    formValue.value = await DefaultService.readObjectObjectOwnersItemIdGet(props.id)
}



const rules = {
    id: [

    ], Type: [

    ], OwnerName: [

    ], LeaderFullName: [

    ]
}
</script>
