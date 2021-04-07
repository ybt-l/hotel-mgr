import { defineComponent, reactive } from 'vue';
import { hotel } from '@/service';
import { message } from 'ant-design-vue';
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

    const submit = async () => {
      const form = clone(addForm);
      form.publishDate = addForm.publishDate.valueOf();
      const res = await hotel.add(form);

      result(res)
        .success((d, { data }) => {
          Object.assign(addForm, defaultFormData);
          message.success(data.msg);
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
    };
  },
});

