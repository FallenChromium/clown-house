<template>
    <div :style="{ display: 'flex', placeItems: 'left' }">
        <n-form :model="formValue" size="medium" :inline="false" :label-width="80" label-align="left"
            label-placement="top" :show-feedback="true" :show-label="true" :show-require-mark="true" :rules="rules"
            require-mark-placement="right">

            <n-form-item label="id" path="id">
                <n-input-number v-model:value="formValue.id" :clearable="false" :disabled="true" :min="1" :step="1"
                    size="medium" :show-button="false" />
            </n-form-item>
            <n-form-item label="Event Type" path="EventTypeId">
                <n-select :options="eventTypesList" v-model:value="formValue.EventTypeId" size="medium"
                    placeholder="Choose an event type..." :multiple="false" :clearable="false" />
            </n-form-item>
            <n-form-item label="Date" path="Date">
                <n-date-picker v-model:formatted-value="formValue.Date" value-format="yyyy-MM-dd" :actions="[]"
                    :clearable="false" format="" size="medium" type="date" />
            </n-form-item>
            <n-form-item label="Name" path="EventName">
                <n-input v-model:value="formValue.EventName" :clearable="false" type="text" size="medium" />
            </n-form-item>
            <n-form-item label="Hosted in" path="CityObjectId">
                <n-select :options="objectsList" v-model:value="formValue.CityObjectId" size="medium"
                    placeholder="Choose a city object..." :multiple="false" :clearable="false" />
            </n-form-item>
        </n-form>
    </div>
    <n-button v-on:click="save" :style="{ align: 'right' }">Save</n-button>



</template>
<script async setup lang="ts">

import { DefaultService, type CityEvent, type CityEventType, type CityObject, type CityObjectOwner, type CityObjectReadModel, type CityObjectType } from '@/client';
import router from '@/router';
import { Save } from '@vicons/ionicons5';
import { NForm, NFormItem, NInput, NDatePicker, NSelect, NInputNumber, NButton, NAvatar, NText, type SelectRenderLabel, type SelectRenderTag } from 'naive-ui';
import { computed, h, ref } from 'vue'

const props = defineProps<{
    id: number
}>()

const isNew: boolean = isNaN(props.id)

const formValue = ref<CityEvent>(<CityEvent>{})

async function newEntry() {
    const new_id: number = await DefaultService.createObjectEventsPost(formValue.value)
    return new_id
}

async function saveChanges() {
    return await DefaultService.updateObjectEventsItemIdPatch(props.id, formValue.value)
}

async function save() {
    if (isNew) {
        const new_id = await newEntry()
    }
    else {
        await saveChanges()
    }
    router.push({ name: "events" })

}

if (!isNew) {
    formValue.value = await DefaultService.readObjectEventsItemIdGet(props.id)
}
// fetch dropdowns
const eventTypes = ref<Array<CityEventType>>(await DefaultService.readObjectsEventTypesGet())
const objects = ref<Array<CityObject>>( await DefaultService.readObjectsObjectsGet())
const eventTypesList = computed(() => eventTypes.value.map((event: CityEventType) => {
    return {
        value: event.id,
        label: event.EventTypeName,
    }
}))
const objectsList = computed(() => objects.value.map((object: CityObject) => {
    return {
        value: object.id,
        label: object.ObjectName
    }
}))

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

