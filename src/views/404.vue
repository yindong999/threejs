<template>
  <div class="">
    <!-- 引入表格组件 -->
    <my-table :tableConfig="tableConfig"></my-table>
  </div>
</template>

<script>
import myTable from "./module/table.vue"
export default {
  components:{ myTable },
  data() { 
    return {
      // 表格参数
      tableConfig: {
        showTableName: true,  // 是否显示表格名字
        tableName: "我是表格名字",
        tableHead: [
          {}
        ] 
      },
      
    }
  },
  methods:{

}
 }
</script>

<style lang="less" scoped>
</style>