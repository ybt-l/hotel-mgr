import { defineComponent, reactive } from 'vue';
import { hotel } from '@/service';
import { message } from 'ant-design-vue';
import store from '@/store';
import { result, clone } from '@/helpers/utils';

const defaultFormData = {
  name: '',
  price: 0,
  admin: '',
  publishDate: 0,
  classify: '',
  count: '',
};

export default defineComponent({
  props: {
    show: Boolean,
  },
  setup(props, context) {
    const addForm = reactive(clone(defaultFormData));

    if (store.state.hotelClassify.length) {
      addForm.classify = store.state.hotelClassify[0]._id;
    }

    const submit = async () => {
      const form = clone(addForm);
      form.publishDate = addForm.publishDate.valueOf();
      const res = await hotel.add(form);

      result(res)
        .success((d, { data }) => {
          Object.assign(addForm, defaultFormData);
          message.success(data.msg);

          context.emit('getList');
        });
    };

    const close = () => {
      context.emit('update:show', false);
    }

    return {
      addForm,
      submit,
      props,
      close,
      store: store.state,
    };
  },
});

