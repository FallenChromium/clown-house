<template>
    <n-space>
        <n-button :on-click="fetch">Refresh</n-button>
        <router-link :to="{ name: 'event', params: { id: 'new' } }">
            <n-button>New</n-button>
        </router-link>
        <n-date-picker v-model:formatted-value="events_since" value-format="yyyy-MM-dd" :actions="[]" :clearable="true"
            format="" size="medium" type="date" :placeholder="'Select date since'" />
        <n-date-picker v-model:formatted-value="events_till" value-format="yyyy-MM-dd" :actions="[]" :clearable="true"
            format="" size="medium" type="date" :placeholder="'Select date till'"/>
    </n-space>
    <n-data-table :columns="columns" :data="data" :bordered="false" />
</template>

<script setup lang="ts">
import type { CityEvent } from '@/client/models/CityEvent';
import { DefaultService } from '@/client'
import { h, ref } from 'vue'
import { NButton, useMessage, type DataTableColumns, NDataTable, NSpace, NDatePicker } from 'naive-ui'
import router from '@/router';
async function fetch() {
    data.value = await DefaultService.readObjectsEventsGet(events_since.value, events_till.value)
}
const createColumns = (): DataTableColumns<CityEvent> => {
    return [
        {
            title: 'ID',
            key: 'id'
        },
        {
            title: 'Название',
            key: 'EventName'
        },
        {
            title: 'Объект',
            key: 'ObjectName'
        },
        {
            title: 'Дата проведения',
            key: 'Date'
        },
        {
            title: 'Тип события',
            key: 'EventTypeName'
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
                                onClick: () => router.push({ name: 'event', params: { id: row.id } })
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
                                onClick: () => {
                                    if (row.id) {
                                        DefaultService.deleteObjectEventsItemIdDelete(row.id).then(async () => { await fetch() })
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
const events_till = ref()
const events_since = ref()
const data = ref()
try {
    data.value = await DefaultService.readObjectsEventsGet()
} catch (error) {
    console.error(error)
}
</script>
