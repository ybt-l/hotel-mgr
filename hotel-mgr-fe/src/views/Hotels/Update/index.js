import { defineComponent, reactive, watch } from 'vue';
import { hotel } from '@/service';
import { message } from 'ant-design-vue';
import { result, clone } from '@/helpers/utils';
import moment from 'moment';


export default defineComponent({
  props: {
    show: Boolean,
    hotel: Object,
  },
  setup(props, context) {
    const editForm = reactive({
      name: '',
      price: 0,
      admin: '',
      publishDate: 0,
      classify: '',
    })

    const close = () => {
      context.emit('update:show', false);
    };

    watch(() => props.hotel, (current) => {
      Object.assign(editForm, current);
      editForm.publishDate = moment(Number(editForm.publishDate));
    })

    const submit = async () => {
      const res = await hotel.update({
        id: props.hotel._id,
        name: editForm.name,
        price: editForm.price,
        admin: editForm.admin,
        publishDate: editForm.publishDate.valueOf(),
        classify: editForm.classify,
      });

      result(res)
        .success(({ data, msg }) => {
          context.emit('update', data);
          message.success(msg);
          close();
        })
    };

    return {
      editForm,
      submit,
      props,
      close,
    };
  },
});

