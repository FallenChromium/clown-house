<template>
    <n-space>
        <n-button :on-click="fetch">Refresh</n-button>
        <router-link :to="{ name: 'objectOwner', params: { id: 'new' } }">
            <n-button>New</n-button>
        </router-link>
    </n-space>
    <n-data-table :columns="columns" :data="data" :bordered="true" :style="{ marginTop: '10px' }" />
</template>

<script async setup lang="ts">
import { DefaultService, type CityObjectOwner } from '@/client'
import { computed, h, ref } from 'vue'
import { NButton, type DataTableColumns, NDataTable, NSpace } from 'naive-ui'
import router from '@/router';
const createColumns = (): DataTableColumns<CityObjectOwner> => {
    return [
        {
            title: 'ID',
            key: 'id'
        },
        {
            title: 'Legal entity',
            key: 'TypeString'
        },
        {
            title: 'Entity name',
            key: 'OwnerName'
        },
        {
            title: 'Leader Full Name',
            key: 'LeaderFullName'
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
                                strong: true,
                                tertiary: true,
                                size: 'small',
                                onClick: () => router.push({ name: 'objectOwner', params: { id: row.id } })
                            },
                            { default: () => 'Edit' }
                        ),
                        h(
                            NButton,
                            {
                                strong: true,
                                tertiary: true,
                                size: 'small',
                                onClick: () => {
                                    if (row.id) {
                                        DefaultService.deleteObjectObjectOwnersItemIdDelete(row.id).then(async () => { await fetch() })
                                    }
                                },
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
const data = ref<Array<CityObjectOwner>>()
async function fetch() {
    data.value = await DefaultService.readObjectsObjectOwnersGet()
}

fetch()
</script>
