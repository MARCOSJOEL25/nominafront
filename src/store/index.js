import { createStore } from 'vuex'
import {employees} from '../services/Employees.js'

export default createStore({
  state: {
    employees: []
  },
  getters: {
  },
  mutations: {
    setEmployee(state, payload){
      state.employees = payload
    }
  },
  actions: {
    async getEmployee(context){
      const data = await employees()
      context.commit('setEmployee', data)
    },
    
    async despedir(context){
      var data = await employees()
      console.log(data)
      context.commit('setEmployee', data)
      console.log('eliminados')
    }
  },
  modules: {
  }
})
