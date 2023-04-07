import { createStore } from 'vuex'
import {employees, postAndPut, Delete, login, extra, prestaciones} from '../services/Employees.js'

export default createStore({
  state: {
    employees: [],
    isLogin: false
  },
  getters: {
  },
  mutations: {
    setEmployee(state, payload){
      state.employees = payload
    },
    setLogin(state){
      state.isLogin = true
    }
  },
  actions: {
    async getEmployee(context){
      const data = await employees()
      context.commit('setEmployee', data)
    },
    async postEmployee(context, payload){
      console.log(await postAndPut(payload))
    },
    async DeleteEmployee(context, id){
      console.log(await Delete(id))
    },
    async LoginEmployee(context, payload){
      const resp = await login(payload);
      if(resp){
        context.commit('setLogin')
        return true
      } 
        return false
    },
    async extraEmployee(context, id, extras){
      const resp = await extra(id, extras);
      console.log('respuesta de la peticion', resp)
    },
    async prestaciones(context, id){
      const resp = await prestaciones(id);
      return resp
    }
  },
})
