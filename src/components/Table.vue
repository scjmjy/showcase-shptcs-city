<template>
    <el-table
        v-loading="loading"
        :data="list"
        stripe
        height="100%"
        class="table-custom"
        row-class-name="table-row"
        cell-class-name="table-cell"
        header-row-class-name="table-header-row"
        header-cell-name="table-header-cell"
        @row-click="onRowClick"
    >
        <el-table-column prop="louzhang" label="楼长" width="70px" />
        <el-table-column prop="category" label="类别" width="140px" />
        <el-table-column prop="title" label="标题" max-width="200px" />
    </el-table>
</template>

<script lang="ts">
import Vue from 'vue'
import ScrollList from '@/components/ScrollList.vue'

export default Vue.extend({
    name: 'Table',
    data() {
        return {
            loading: false
        }
    },
    methods: {
        onRowClick(row, column, event) {
            this.$root.$emit('popup-problem-detail', { id: row.index, category: row.category })
        }
    }
})
</script>

<style lang="scss" scoped>
.container {
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;

    .title {
        font-size: 20px;
        font-weight: bold;
        color: white;
        margin-bottom: 10px;
        // text-shadow: 0 0 5px white;
    }

    .table-container {
        border: 1px solid rgb(46, 69, 101);
        overflow: auto;
        flex: 1;
    }
}
</style>

<style lang="scss">
.table-custom {
    background-color: transparent !important;

    &.el-table {
        .cell {
            white-space: nowrap;
        }
        tr {
            background-color: transparent;
            border: none !important;
        }
        .el-table--striped .el-table__body tr.el-table__row--striped td {
            background-color: rgb(255, 255, 255, 0.05);
        }
        .el-table--enable-row-hover .el-table__body tr:hover > td {
            background-color: rgb(255, 255, 255, 0.2);
        }
        td,
        th {
            padding: 6px 0;
            background-color: transparent;
            border: none !important;
        }
        &::before {
            display: none;
        }
    }
    .table-row {
        color: #00f6ff;
    }
    .table-row:hover {
        text-decoration: underline;
        cursor: pointer;
    }
    .table-row:active {
        transform: translate(2px, 2px);
    }
    .table-header-row {
        color: white;
    }
}
</style>
