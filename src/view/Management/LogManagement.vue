<template>
  <div>
    <a-table
      :columns="columns"
      :rowKey="record => record.id"
      :dataSource="data"
      :pagination="pagination"
      :loading="loading"
      @change="handleTableChange"
    >
    </a-table>
  </div>
</template>
<script>
import { getLog } from "../../api/api.js";
  const columns = [
    {
      title: '时间',
      dataIndex: 'showTime',
      width: '30%',
    },
    {
      title: '操作者',
      dataIndex: 'Username',
      width: '30%',
    },
    {
      title: '操作内容',
      dataIndex: 'showHandle',
      width: '40%',
    },
  ];

  export default {
    mounted() {
      // this.fetch();
      this.getData();
    },
    data() {
      return {
        data: [],
        pagination: {},
        loading: false,
        columns,
      };
    },
    methods: {
      handleTableChange(pagination) {
        console.log("图表变化")
        console.log(pagination);
        const pager = { ...this.pagination };
        pager.current = pagination.current;
        this.pagination = pager;
        this.getData(pagination.pageSize, pagination.current)
      },
      getData(size, index) {
        this.loading = true;
        getLog(size||10,index||1).then( res => {
          console.log(res);
          const pagination = { ...this.pagination };
          pagination.total = res.data.LogTotalNum;
          this.loading = false;
          res.data.logs = res.data.logs.map( file => {
            var time = new Date(file.TimeStamp*1000);
            file.showTime = `${time.getFullYear()}/${time.getMonth()+1}/${time.getDate()}`
            var handle = "";
            var type = "";
            console.log("类别")
            console.log(file.RequestURI.split('/')[2])
            if(file.RequestMethod == "POST") handle = "添加了";
            else if(file.RequestMethod == "DELETE") handle = "删除了";
            else if(file.RequestMethod == "PUT") handle = "修改了";
            if(file.RequestURI.split('/')[2] == "products") type = "产品";
            else if(file.RequestURI.split('/')[2] == "stories") type = "事件";
            else if(file.RequestURI.split('/')[2] == "members") type = "成员";
            file.showHandle = `${handle}${type}“${file.ModelName}”`
            return file;
          })
          this.data = res.data.logs;
          this.pagination = pagination;
          console.log(this.data)
        })
      },
    },
  };
</script>