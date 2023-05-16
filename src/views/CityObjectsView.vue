<template>
    <n-space>
        <n-button :on-click="fetch">Refresh</n-button>
        <router-link :to="{ name: 'object', params: { id: 'new' } }">
            <n-button>New</n-button>
        </router-link>
        <n-date-picker v-model:formatted-value="active_on" value-format="yyyy-MM-dd" :actions="[]" :clearable="true"
            format="" size="medium" type="date" @update:value="fetch" />
    </n-space>
    <n-select :options="typesList" v-model:value="obj_type" size="medium"
            placeholder="Choose an object type..." :multiple="false" :clearable="true" />
    <n-data-table :columns="columns" :data="data" :bordered="true" :style="{ marginTop: '10px' }" />
</template>

<script async setup lang="ts">
import type { CityEvent } from '@/client/models/CityEvent';
import { DefaultService, type CityObjectType } from '@/client'
import { computed, h, ref } from 'vue'
import { NButton, type DataTableColumns, NDataTable, NSpace, NDatePicker, NSelect } from 'naive-ui'
import router from '@/router';
const createColumns = (): DataTableColumns<CityEvent> => {
    return [
        {
            title: 'ID',
            key: 'id'
        },
        {
            title: 'Object Type',
            key: 'ObjectTypeName'
        },
        {
            title: 'Name',
            key: 'ObjectName'
        },
        {
            title: 'Address',
            key: 'Address'
        },
        {
            title: 'Capacity',
            key: 'Capacity'
        },
        {
            title: 'Owner',
            key: 'OwnerName'
        },
        {
            title: 'Creation date',
            key: 'DateOpened'
        },
        {
            title: 'Opened since',
            key: 'PeriodStart'
        },
        {
            title: 'Opened until',
            key: 'PeriodEnd'
        },
        {
            title: 'Actions',
            key: 'actions',
            render(row) {
                const actions =
                    h(NSpace, {}, () => [
                        h(
                            NButton,
                            {
                                style: {
                                    marginRight: '6px'
                                },
                                strong: true,
                                tertiary: true,
                                size: 'small',
                                onClick: () => router.push({ name: 'object', params: { id: row.id } })
                            },
                            { default: () => 'Edit' }
                        ),
                        h(
                            NButton,
                            {
                                style: {
                                    marginRight: '6px'
                                },
                                strong: true,
                                tertiary: true,
                                size: 'small',
                                onClick: async () => {
                                    if (row.id) {
                                        DefaultService.deleteObjectObjectsItemIdDelete(row.id).then(async () => { await fetch() })
                                    }
                                }
                            },
                            { default: () => 'Delete' }
                        )]

                    )

                return actions
            }
        }
    ]
}

const columns = createColumns()
const data = ref()
const active_on = ref()
const obj_type = ref()
// dropdown
const objectTypes = ref<Array<CityObjectType>>(await DefaultService.readObjectsObjectTypesGet())

const typesList = computed(() => objectTypes.value.map((type: CityObjectType) => {
    return {
        value: type.id,
        label: type.ObjectTypeName,
    }
}))

async function fetch() {
    data.value = await DefaultService.readObjectsObjectsGet(active_on.value, obj_type.value)
}
await fetch()
</script>
