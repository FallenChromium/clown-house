<template>
    <n-button :on-click="fetch" :style="{marginBottom: '10px'}">Refresh</n-button>
    <n-grid x-gap="12" :cols="2">
        <n-gi>
            <router-link :to="{ name: 'objectType', params: { id: 'new' } }">
                <n-button>New object type</n-button>
            </router-link>
            <n-data-table :columns="objectTypeColumns" :data="objectTypeData" :bordered="true" :style="{ marginTop: '10px' }" />
        </n-gi>
        <n-gi>
            <router-link :to="{ name: 'eventType', params: { id: 'new' } }">
                <n-button>New event type</n-button>
            </router-link>
            <n-data-table :columns="eventTypeColumns" :data="eventTypeData" :bordered="true" :style="{ marginTop: '10px' }" />
        </n-gi>
    </n-grid>
</template>

<script async setup lang="ts">
import type { CityEvent } from '@/client/models/CityEvent';
import { DefaultService, type CityEventType, type CityObjectType } from '@/client'
import { h, ref } from 'vue'
import { NButton, type DataTableColumns, NDataTable, NSpace, NGi, NGrid } from 'naive-ui'
import router from '@/router';
import { RouterLink } from 'vue-router';
const objectTypeColumns:  DataTableColumns<CityObjectType> = [
        {
            title: 'ID',
            key: 'id'
        },
        {
            title: 'Object Type',
            key: 'ObjectTypeName'
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
                                onClick: () => router.push({ name: 'objectType', params: { id: row.id } })
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
                                        DefaultService.deleteObjectObjectTypesItemIdDelete(row.id).then(async () => { await fetch() })
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
const eventTypeColumns:  DataTableColumns<CityEventType> = [
        {
            title: 'ID',
            key: 'id'
        },
        {
            title: 'Event Type',
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
                                onClick: () => router.push({ name: 'eventType', params: { id: row.id } })
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
                                        DefaultService.deleteObjectEventTypesItemIdDelete(row.id).then(async () => { await fetch() })
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


const objectTypeData = ref()
const eventTypeData = ref()
async function fetch() {
    objectTypeData.value = await DefaultService.readObjectsObjectTypesGet()
    eventTypeData.value = await DefaultService.readObjectsEventTypesGet()
}
await fetch()
</script>
