<template>
    <div>
        <div class="py-2 align-middle inline-block sm:px-6 lg:px-8">
            <Table :tHead="tHead" :data="formatExpenses" />
        </div>
        <v-chart class="chart" :option="option" />
    </div>
</template>

<script>
import store from '@/store';

import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { PieChart } from 'echarts/charts';
import VChart from 'vue-echarts';

use([CanvasRenderer, PieChart]);

import { FETCH_DASHBOARD } from '@/store/actions.type';
import Table from '@/components/Table';

const tHead = ['Expense Categories', 'Total'];

export default {
    name: 'Dashboard',
    setup() {
        return { tHead };
    },
    data() {
        return {
            option: {
                series: [
                    {
                        name: 'My Expenses',
                        type: 'pie',
                        radius: '55%',
                        center: ['60%', '30%'],
                        data: []
                    }
                ]
            }
        };
    },
    components: {
        Table,
        VChart
    },
    beforeRouteEnter(to, from, next) {
        Promise.all([store.dispatch(FETCH_DASHBOARD)]).then(() => {
            next();
        });
    },
    computed: {
        formatExpenses() {
            let expenses = [];
            const getExpenses = this.$store.getters.dashboardExpenses;
            for (let i = 0; i < getExpenses.length; i++) {
                const category = getExpenses[i];
                let total = 0;
                for (let ex = 0; ex < category.expenses.length; ex++) {
                    const element = category.expenses[ex];
                    total += element.amount;
                }
                this.option.series[0].data.push({
                    value: total,
                    name: category.name
                });
                const expense = {
                    name: category.name,
                    value: `$ ${total}`
                };
                expenses.push(expense);
            }
            return expenses;
        }
    }
};
</script>

<style scoped>
.chart {
    height: 400px;
}
</style>
