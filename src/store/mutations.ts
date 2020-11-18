import { MutationTree } from "vuex";

import { State } from "./state";

const mutations: MutationTree<State> = {

    setData(state, data) {
        state.data = data;
    },
    emptyData(state) {
        state.data = null;
    }
    
}

export default mutations;