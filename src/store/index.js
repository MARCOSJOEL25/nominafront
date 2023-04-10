import { createStore } from 'vuex'
import {employees, postAndPut, Delete, login, extra, prestaciones, search} from '../services/Employees.js'

export default createStore({
  state: {
    employees: [],
    employeesInactive: [],
    total: 0,
    totalActive: 0,
    totalInactive: 0,
    isLogin: false,
    totalPage: 0,
    page: 1,
  },
  getters: {
  },
  mutations: {
    setEmployee(state, payload){
      state.page = payload.Page
      state.totalPage = payload.totalPages
      state.total = payload.total
      state.totalActive = payload.totalactive
      state.totalInactive = payload.totalinactive
      state.employees = payload.active
      state.employeesInactive = payload.inactive
    },
    setListEmployee(state, payload){
      state.employees = payload
    },
    setLogin(state){
      state.isLogin = true
    }
  },
  actions: {
    async getEmployee(context, page){
      const data = await employees(page)
      console.log('pagination' ,data)
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
    async extraEmployee(context, extrasModel){
      console.log("desde vuex", extrasModel)
      const resp = await extra(extrasModel);
      console.log('respuesta de la peticion', resp)
    },
    async prestaciones(context, id){
      const resp = await prestaciones(id);
      return resp
    },

    async searchEmployee(context, searchModel){
      const resp = await search(searchModel)
      context.commit('setListEmployee', resp)
    }
  },
})
