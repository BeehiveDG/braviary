import axios from "axios";
import { config as BraviaryConfig } from '../../config';

// initial state
const state = {
    zookeeperEagleList: [],
    zookeeperUserList: []
}
  
// getters
const getters = {
    
}
  
// actions
const actions = {
    // ------------------------------------------------------------------
    // Eagles
    // ------------------------------------------------------------------
    retrieveEagleList({commit, rootState}){	
        return new Promise((resolve, reject) => {
            let _token = rootState.user.userToken;
            let _authorizedHeader = BraviaryConfig.getAuthorized_Header(_token);
            let _url = BraviaryConfig.getAPI_URL('Get_Zookeeper_Eagle_List');
            axios.get(_url, _authorizedHeader)
            .then(response => {	
                let _successResponse = response.data['Success'];
                let _zookeeperEagleList = _successResponse.eagles;

                commit('updateEagleList', _zookeeperEagleList);
                resolve(_successResponse.eagles);
            })	
            .catch((error) => {	
                reject(error);	
            });	              
        })
    },
    retrieveUserList({commit, rootState}){	
        return new Promise((resolve, reject) => {
            let _token = rootState.user.userToken;
            let _authorizedHeader = BraviaryConfig.getAuthorized_Header(_token);
            let _url = BraviaryConfig.getAPI_URL('Get_Zookeeper_User_List');
            axios.get(_url, _authorizedHeader)
            .then(response => {	
                let _successResponse = response.data['Success'];
                let _zookeeperUserList = _successResponse.users;

                commit('updateUserList', _zookeeperUserList);
            })	
            .catch((error) => {	
                reject(error);	
            });	              
        })
    },
}
  
// mutations
const mutations = {
    updateEagleList(state, zookeeperEagleList){
        zookeeperEagleList.sort(function(eagle1, eagle2) {
            // Descending order
            return eagle2.id - eagle1.id;
        });
        state.zookeeperEagleList = zookeeperEagleList;
    },
    updateUserList(state, zookeeperUserList){
        state.zookeeperUserList = zookeeperUserList;
    }
}
  
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
  