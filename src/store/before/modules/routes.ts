// interface
interface StateInterface {
  routes: Array<any>,
}

// state
const state = (): object => ({
  routes: [],
});

// getters
const getters = {
  routes: (state: StateInterface) => state.routes,
};

// mutations
const mutations = {
  setRoutes(state: StateInterface, routes: Array<any>) {
    state.routes = routes;
  },
  setAllRoutes(state: StateInterface, routes: Array<any>) {
    state.routes = routes;
  },
};

// actions
const actions = {
  // 设置权限路由
  async setRoutes({ commit }, permissions: any) {
    // const finallyAsyncRoutes = await filterAsyncRoutes([...asyncRoutes], permissions);
    // commit('setRoutes', finallyAsyncRoutes);
  },

  // 设置所有路由
  async setAllRoutes({ commit }) {
    console.log([{id: 1}, {id: 2}])
    // let data = allRoutes as any;
    // localStorage.setItem('menu', data);
    // commit('setAllRoutes', data);
  },
};

export default { state, getters, mutations, actions };