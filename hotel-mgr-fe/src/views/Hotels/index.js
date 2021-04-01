import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    const columns = [
      {
        title: '名字',
        dataIndex: 'name',
      },
      {
        title: '年龄',
        dataIndex: 'age',
      }
    ];
    const dataSource = [
      {
        name: '小龙',
        age: 29
      }
    ];

    return {
      columns,
      dataSource,
    };
  },
});