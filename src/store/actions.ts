import { ActionTree } from "vuex";
import axios, { AxiosStatic } from 'axios';

import { State } from "./state"

const actions: ActionTree<State, State> = {

    /**Calles a mutation to empty data in the store before filtering it using parameters and adding it again 
     * to the Vue store
     */
    emptyData(context, data) {
        context.commit('emptyData', data);
    },

    /**Simple async function that uses axios to make requests to the AWS server
     *  it saves the results in the vue store
     * @param param can be used to provide a list of parameters that can be used to filter the request
     * */
    async getData(context, param) {

        try {

            const result = await axios({
                method: 'put',
                url: context.state.APIUrl,
                data: param
            });

            context.commit("setData", result.data.assets);

        } catch (err) {

            console.error(err);
        }
    }
}

export default actions;
