import { defineComponent, ref, onMounted } from 'vue';
import { hotel, hotelClassify } from '@/service';
import { useRouter } from 'vue-router';
import { message, Modal, Input } from 'ant-design-vue';
import { result, formatTimestamp } from '@/helpers/utils';
import { getClassifyTitleById } from '@/helpers/hotel-classify';
import AddOne from './AddOne/index.vue';
import Update from './Update/index.vue';



export default defineComponent({
  components: {
    AddOne,
    Update,
  },
  props: {
    simple: Boolean,
  },
  setup(props) {
    const router = useRouter();

    const columns = [
      {
        title: '房间名',
        dataIndex: 'name',
      },
      {
        title: '价格',
        dataIndex: 'price',
      },
      {
        title: '库存',
        slots: {
          customRender: 'count',
        }
      },
      {
        title: '管理员',
        dataIndex: 'admin',
      },
      {
        title: '发布时间',
        dataIndex: 'publishDate',
        slots: {
          customRender: 'publishDate',
        }
      },
      {
        title: '分类',
        slots: {
          customRender: 'classify',
        },
      },
    ];

    if (!props.simple) {
      columns.push(
        {
          title: '操作',
          slots: {
            customRender: 'actions',
          }
        });
    };

    const total = ref(0);
    const show = ref(false);
    const showUpdateModal = ref(false);
    const list = ref([]);
    const curPage = ref(1);
    const keyword = ref('');
    const isSearch = ref(false);
    const curEditHotel = ref({});


    //获取房间列表
    const getList = async () => {
      const res = await hotel.list({
        page: curPage.value,
        size: 5,
        keyword: keyword.value,
      });

      result(res)
        .success(({ data }) => {
          const { list: l, total: t } = data;
          list.value = l;
          total.value = t;
        });
    }

    onMounted(async () => {
      getList();
    });
    //切页
    const setPage = (page) => {
      curPage.value = page;
      getList();
    }

    //搜索
    const onSearch = () => {
      getList();
      isSearch.value = Boolean(keyword.value);
    }

    //回到全部列表
    const backAll = () => {
      keyword.value = '';
      isSearch.value = false;
      getList();
    };

    //删除列表项
    const remove = async ({ text: record }) => {
      const { _id } = record;
      const res = await hotel.remove(_id);

      result(res)
        .success(({ msg }) => {
          message.success(msg);

          getList();
        });
    };

    const updateCount = (type, record) => {
      let word = '增加';
      if (type === 'OUT_COUNT') {
        word = '减少';
      }

      Modal.confirm({
        title: `要${word}多少库存`,
        content: (
          <div>
            <Input class="hotel_input" />
          </div>
        ),
        onOk: async () => {
          const el = document.querySelector('.hotel_input');
          let num = el.value;
          const res = await hotel.updateCount({
            id: record._id,
            num,
            type,
          })

          result(res)
            .success((data) => {
              if (type === 'IN_COUNT') {
                //入库操作
                num = Math.abs(num);
              } else {
                //出库操作
                num = -Math.abs(num);
              }

              const one = list.value.find((item) => {
                return item._id === record._id;
              })

              if (one) {
                one.count = one.count + num;

                message.success(`成功${word} ${Math.abs(num)} 个`);
              }
            })

        }
      });
    };

    //显示更新弹框
    const update = ({ record }) => {
      showUpdateModal.value = true;
      curEditHotel.value = record;
    }

    //更新列表的某一行数据
    const updateCurHotel = (newData) => {
      Object.assign(curEditHotel.value, newData);
    };

    //进入房间名详情页
    const toDetail = ({ record }) => {
      router.push(`/hotels/${record._id}`);
    }

    const onUploadChange = ({ file }) => {
      if (file.response) {
        result(file.response)
          .success(async (key) => {
            const res = await hotel.addMany(key);

            result(res)
              .success(({ data: { addCount } }) => {
                message.success(`成功添加 ${addCount} 条信息`);

                getList();
              });
          });
      }
    };

    return {
      columns,
      show,
      list,
      formatTimestamp,
      curPage,
      total,
      setPage,
      keyword,
      onSearch,
      backAll,
      isSearch,
      remove,
      updateCount,
      showUpdateModal,
      update,
      curEditHotel,
      updateCurHotel,
      toDetail,
      getList,
      getClassifyTitleById,
      simple: props.simple,
      onUploadChange,
    };
  },
});