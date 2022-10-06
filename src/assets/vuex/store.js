import {
  createStore
} from 'vuex'

const store = createStore({
  state() {
    return {
      list: JSON.parse(localStorage.getItem('list')) || [{
          tasks: ['to do smth', 'read smth', 'cook smth'],
        },
        {
          tasks: ['learn smth', 'play smth', 'insane'],
        }
      ],
    }
  },
  getters: {
    list(st) {
      return st.list
        .map(el => el.tasks)
        .map((el, k) => el.map((el, i) => {
          return {
            name: el.trim(),
            id: `${k}_${i}`,
          }
        }))
    },
  },
  mutations: {
    updateList(state, { arr, i }) {
      if (state.list[i]) {
        state.list[i].tasks = arr;
        if (!state.list[i].tasks.length) {
          state.list.splice(i, 1);
        }
        localStorage.setItem('list', JSON.stringify(state.list));
        return
      }
      state.list[i] = {
        tasks: arr
      }
      localStorage.setItem('list', JSON.stringify(state.list));
    },
    addItem(state, {
      val,
      i
    }) {
      state.list[i].tasks.push(val);
      localStorage.setItem('list', JSON.stringify(state.list));
    },
  },
  actions: {
    change({commit}, {arr,i}) {
      arr = arr.map(el => el.name);
      commit('updateList', {
        arr,
        i
      });
    },
    add({
      commit
    }, payload) {
      commit('addItem', payload)
    },
  }
})

export default store