<template>
    <table class="divide-y divide-gray-200">
        <thead class="bg-gray-50">
            <tr>
                <th
                    v-for="head in tHead"
                    :key="head"
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                    {{ head }}
                </th>
            </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="d in data" :key="d.name">
                <td v-for="value in d" :key="value" class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 cursor-pointer">
                    {{ value }}
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
export default {
    name: 'Table',
    props: {
        tHead: { type: Array, required: true },
        data: { type: Array, required: true }
    }
};
</script>
