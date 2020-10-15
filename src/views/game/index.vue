<template>
  <div>
    <h1>游戏列表</h1>
    <button type="button" @click="handleExcel">导出表格</button>
    <button type="button" @click="resetPage">重置页数</button>
    <button type="button" @click="getCompanyPosition">导出公司表格</button>
  </div>
</template>

<script>
import { export_json_to_excel } from "../../../static/Export2Excel.js";
export default {
  name: "Game",
  data() {
    return {
      page: 0,
    };
  },
  methods: {
    resetPage() {
      this.page = 0;
    },
    handleExcel() {
      this.$http({
        url: "api/info",
        params: {
          page: ++this.page,
        },
      }).then((res) => {
        res.data.code === 200 && this.handleExport(res.data.data);
      });
    },
    /**
     * 格式化表格数据
     */
    formatJson(filterVal, tableData) {
      return tableData.map((v) => {
        return filterVal.map((j) => {
          return v[j];
        });
      });
    },
    /**
     * 处理导出数据
     * @param {*} data 导出数据
     */
    handleExport(data) {
      let positionList = [];
      let formatData = data.map((v) => {
        positionList.push.apply(positionList, v.positionList);
        let { companyId, companyName, companyUrl } = v;
        return {
          companyId,
          companyName,
          companyUrl,
        };
      });
      this.exportCompany(formatData);
      this.exportPosition(positionList);
    },
    exportCompany(data) {
      // 处理数据
      let formatData = this.formatJson(
        ["companyId", "companyName", "companyUrl"],
        data
      );
      export_json_to_excel({
        header: ["companyId", "companyName", "companyUrl"],
        data: formatData,
        filename: "公司",
      });
    },
    exportPosition(data) {
      // 处理数据
      let formatData = this.formatJson(
        ["companyId", "positionId", "positionName", "positionUrl"],
        data
      );
      export_json_to_excel({
        header: ["companyId", "positionId", "positionName", "positionUrl"],
        data: formatData,
        filename: "职位",
      });
    },
    getCompanyPosition() {
      this.$http({
        url: "api/company",
      }).then((res) => {
        res.data.code === 200 && this.handleCompanyPosition(res.data.data);
      });
    },
    handleCompanyPosition(data) {
      let positionList = [];
      data.map((v) => {
        positionList.push.apply(positionList, v);
      });
      this.exportCompanyPosition(positionList);
    },
    exportCompanyPosition(data) {
      // 处理数据
      let formatData = this.formatJson(
        [
          "companyId",
          "companyName",
          "companyUrl",
          "positionId",
          "positionName",
          "positionUrl",
        ],
        data
      );
      export_json_to_excel({
        header: [
          "公司id",
          "公司名称",
          "公司链接",
          "职位id",
          "职位名称",
          "职位链接",
        ],
        data: formatData,
        filename: "招聘公司职位信息",
      });
    },
  },
};
</script>

<style>
</style>