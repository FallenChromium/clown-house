<template>
    <div :style="{ display: 'flex', placeItems: 'left' }">
        <n-form :model="formValue" size="medium" :inline="false" :label-width="80" label-align="left"
            label-placement="top" :show-feedback="true" :show-label="true" :show-require-mark="true" :rules="rules"
            require-mark-placement="right">

            <n-form-item label="id" path="id">
                <n-input-number v-model:value="formValue.id" :clearable="false" :disabled="true" :min="1" :step="1"
                    size="medium" :show-button="false" />
            </n-form-item>
            <n-form-item label="Object Type" path="ObjectType">
                <n-select :options="typesList" v-model:value="formValue.ObjectTypeId" size="medium"
                    placeholder="Choose an object type..." :multiple="false" :clearable="false" />
            </n-form-item>
            <n-form-item label="Address" path="Address">
                <n-input v-model:value="formValue.Address" :clearable="false" type="text" size="medium" />
            </n-form-item>
            <n-form-item label="Name" path="Name">
                <n-input v-model:value="formValue.ObjectName" :clearable="false" type="text" size="medium" />
            </n-form-item>
            <n-form-item label="Capacity" path="Capacity">
                <n-input-number v-model:value="formValue.Capacity" :clearable="false" :step="1" size="medium"
                    :show-button="true" />
            </n-form-item>
            <n-form-item label="Owner" path="Owner">
                <n-select :options="ownersList" :render-label="renderLabel" :render-tag="renderSingleSelectTag"
                    v-model:value="formValue.OwnerId" size="medium" placeholder="Choose the owner" :multiple="false"
                    :clearable="false" />
            </n-form-item>
            <n-form-item label="DateOpened" path="DateOpened">
                <n-date-picker v-model:formatted-value="formValue.DateOpened" value-format="yyyy-MM-dd" :actions="[]"
                    :clearable="false" format="" size="medium" type="date" />
            </n-form-item>
            <n-form-item label="PeriodStart" path="PeriodStart">
                <n-date-picker v-model:formatted-value="formValue.PeriodStart" value-format="yyyy-MM-dd" :actions="[]"
                    :clearable="false" format="" size="medium" type="date" />
            </n-form-item>
            <n-form-item label="PeriodEnd" path="PeriodEnd">
                <n-date-picker v-model:formatted-value="formValue.PeriodEnd" value-format="yyyy-MM-dd" :actions="[]"
                    :clearable="false" format="" size="medium" type="date" />
            </n-form-item>

        </n-form>
    </div>
    <n-button v-on:click="save" :style="{ align: 'right' }">Save</n-button>



</template>
<script async setup lang="ts">

import { DefaultService, type CityObject, type CityObjectOwner, type CityObjectType } from '@/client';
import router from '@/router';
import { Save } from '@vicons/ionicons5';
import { NForm, NFormItem, NInput, NDatePicker, NSelect, NInputNumber, NButton, NAvatar, NText, type SelectRenderLabel, type SelectRenderTag } from 'naive-ui';
import { computed, h, ref } from 'vue'

const props = defineProps<{
    id: number
}>()

const isNew: boolean = isNaN(props.id)

const formValue = ref<CityObject>(<CityObject>{})

async function newEntry() {
    const new_id: number = await DefaultService.createObjectObjectsPost(formValue.value)
    return new_id
}

async function saveChanges() {
    return await DefaultService.updateObjectObjectsItemIdPatch(props.id, formValue.value)
}

async function save() {
    if (isNew) {
        const new_id = await newEntry()
        router.push({ name: "objects", params: { id: new_id } })
    }
    else {
        await saveChanges()
        router.push({ name: "objects" })
    }
}

if (!isNew) {
    formValue.value = await DefaultService.readObjectObjectsItemIdGet(props.id)
}
// fetch dropdowns
const owners = ref<Array<CityObjectOwner>>(await DefaultService.readObjectsObjectOwnersGet())
const objectTypes = ref<Array<CityObjectType>>(await DefaultService.readObjectsObjectTypesGet())

const ownersList = computed(() => owners.value.map((owner: CityObjectOwner) => {
    return {
        value: owner.id,
        label: owner.OwnerName,
        description: owner.LeaderFullName + ", " + (owner.Type ? "юр.лицо" : "физ.лицо")
    }
}))
const typesList = computed(() => objectTypes.value.map((type: CityObjectType) => {
    return {
        value: type.id,
        label: type.ObjectTypeName,
    }
}))
console.log(ownersList.value);
console.log(typesList.value);

const renderSingleSelectTag: SelectRenderTag = ({ option }) => {
    return h(
        'div',
        {
            style: {
                display: 'flex',
                alignItems: 'center'
            }
        },
        [
            option.label as string
        ]
    )
}
const renderLabel: SelectRenderLabel = (option) => {
    return h(
        'div',
        {
            style: {
                display: 'flex',
                alignItems: 'center'
            }
        },
        [
            h(
                'div',
                {
                    style: {
                        marginLeft: '12px',
                        padding: '4px 0'
                    }
                },
                [
                    h('div', null, [option.label as string]),
                    h(
                        NText,
                        { depth: 3, tag: 'div' },
                        {
                            default: () => option.description
                        }
                    )
                ]
            )
        ]
    )
}

const rules = {
    id: [

    ], ObjectType: [

    ], Address: [

    ], Name: [

    ], Capacity: [

    ], Owner: [

    ], DateOpened: [

    ], PeriodRange: [

    ],
}

</script>

