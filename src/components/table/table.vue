<template>
  <div>
    <!-- 
      表格参数说明：
        data: 绑定的数据；
        stripe: 为true时启用斑马纹，没有该属性时则默认为false;
        border: 设置表格边框，true：有边框；false:没有；默认是没有的；
        size: 表格的尺寸；值：medium / small / mini；
        fit: 列的宽度是否自撑开；默认是true;
        show-header: 是否显示表头；默认是true;
        height: 设置高度，value值是数字，可以固定表头，
        max-height: 设置最大高度，value值是数字，可以用于动态表格高度设置；比设置height更灵活；
        fixed：固定列需要使用fixed属性，它接受 Boolean 值或者leftright，表示左边固定还是右边固定。作用在el-table-column上
        tooltip-effect: 文字超出显示的气泡效果，属性值：dark/light；
        empty-text：没有数据时显示的文字提示；
        header-cell-style： 表头单元格样式设置；
        highlight-current-row： 高亮当前行（Boolean类型）
        row-style: 行样式设置；

     -->
    <div v-if="tableConfig.showTableName" class="tableName">
      {{ tableConfig.tableName }}
    </div>

    <el-table
      :data="tableData"
      style="width: 100%"
      :stripe="true"
      :border="true"
      size="small"
      :fit="true"
      :show-header="true"
      :header-cell-style="headerCellStyle"
      :header-row-style="headerRowStyle"
      :row-style="{ background: 'red' }"
      :highlight-current-row="true"
      tooltip-effect="dark"
      empty-text="没有数据哦"
      @row-click="handleRowClick"
    >
      <el-table-column fixed prop="date" label="日期"> </el-table-column>
      <el-table-column prop="name" label="姓名"> </el-table-column>
      <el-table-column prop="province" label="省份"> </el-table-column>
      <el-table-column prop="city" label="市区"> </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
      <el-table-column prop="zip" label="邮编"> </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button
            @click="handleClick(scope.row)"
            type="primary"
            round
            size="small"
            >查看</el-button
          >
          <el-button type="warning" round size="small">编辑</el-button>
          <el-button type="danger" round size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableRowIndex: -1,
      tableData: [
        {
          id: 1,
          date: "2016-05-02",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address:
            "上海市普陀区金沙江路 1518 海市普陀区金沙江路 1518 海市普陀区金沙江路 1518 海市普陀区金沙江路 1518 海市普陀区金沙江路 1518 海市普陀区金沙江路 1518 海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          id: 2,
          date: "2016-05-04",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1517 弄",
          zip: 200333,
        },
        {
          id: 3,
          date: "2016-05-01",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1519 弄",
          zip: 200333,
        },
        {
          id: 4,
          date: "2016-05-01",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1519 弄",
          zip: 200333,
        },
        {
          id: 5,
          date: "2016-05-01",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1519 弄",
          zip: 200333,
        },
        {
          id: 6,
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1516 弄",
          zip: 200333,
        },
      ],
    };
  },
  props: {
    // 父组件传递过来的表格参数
    tableConfig: {
      type: Object,
      default: () => {},
    },
  },
  mounted() {},
  methods: {
    tableRowClassName() {
      return "";
    },
    handleRowClick(row) {},
    // 表头行的 style 的回调方法，
    headerRowStyle({ row, rowIndex }) {
      return "height:80px;";
    },
    // 表头单元格样式设置
    headerCellStyle({ row, column, rowIndex, columnIndex }) {
      return "text-align:center;color:blue;background:skyblue;border:2px solid red;";
    },
    handleClick(row) {
      console.log(row);
    },
  },
};
</script>
<style lang="scss" scoped>
.tableName {
  font-weight: 600;
  text-align: left;
  margin: 10px 0;
  padding-left: 10px;
  display: flex;
  font-size: 20px;
  line-height: 20px;
}
.tableName:before {
  display: inline-block;
  content: "";
  width: 5px;
  height: 20px;
  background: cornflowerblue;
  margin-right: 5px;
}
</style>