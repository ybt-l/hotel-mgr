import { createStore } from 'vuex';
import { character, user, hotelClassify } from '@/service';
import { getCharacterInfoById } from '@/helpers/character';
import { result } from '@/helpers/utils';

export default createStore({
  state: {
    characterInfo: [],
    hotelClassify: [],
    userInfo: {},
    userCharacter: {},
  },
  mutations: {
    setCharacterInfo(state, characterInfo) {
      state.characterInfo = characterInfo;
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    },
    setUserCharacter(state, userCharacter) {
      state.userCharacter = userCharacter;
    },
    setHotelClassify(state, hotelClassify) {
      state.hotelClassify = hotelClassify;
    }
  },
  actions: {
    async getHotelClassify(store) {
      const res = await hotelClassify.list();

      result(res)
        .success(({ data }) => {
          store.commit('setHotelClassify', data);
        })
    },
    async getCharacterInfo(store) {
      const res = await character.list();

      result(res)
        .success(({ data }) => {
          store.commit('setCharacterInfo', data);
        })
    },
    async getUserInfo(store) {
      const res = await user.info();

      result(res)
        .success(({ data }) => {
          store.commit('setUserInfo', data);
          store.commit('setUserCharacter', getCharacterInfoById(data.character));
        })
    }
  },

});
