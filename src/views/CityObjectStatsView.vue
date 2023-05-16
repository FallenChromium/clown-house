<template>
    <n-space>
        <n-button :on-click="fetch">Refresh</n-button>
        <router-link :to="{ name: 'objectStat', params: { id: 'new' } }">
            <n-button>New</n-button>
        </router-link>
    </n-space>
    <n-data-table :columns="columns" :data="data" :bordered="false" />
</template>

<script setup lang="ts">
import type { CityObjectStatsReadModel } from '@/client/models/CityObjectStatsReadModel';
import { DefaultService } from '@/client'
import { h, ref } from 'vue'
import { NButton, useMessage, type DataTableColumns, NDataTable, NSpace } from 'naive-ui'
import router from '@/router';
async function fetch() {
    data.value = await DefaultService.readObjectsObjectStatsGet()
}
const createColumns = (): DataTableColumns<CityObjectStatsReadModel> => {
    return [
        {
            title: 'ID',
            key: 'id'
        },
        {
            title: 'Объект',
            key: 'ObjectName'
        },
        {
            title: 'Дата',
            key: 'Date'
        },
        {
            title: 'Количество посещений',
            key: 'Visitors'
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
                                onClick: () => router.push({ name: 'objectStat', params: { id: row.id } })
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
                                        DefaultService.deleteObjectObjectStatsItemIdDelete(row.id).then(async () => { await fetch() })
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
const data = ref<Array<CityObjectStatsReadModel>>(<Array<CityObjectStatsReadModel>>[{}])
try {
    data.value = await DefaultService.readObjectsObjectStatsGet()
} catch (error) {
    console.error(error)
}
</script>
