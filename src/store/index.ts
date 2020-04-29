import Vue from 'vue'
import Vuex from 'vuex'
import { AppState } from './modules/app'

Vue.use(Vuex)

export interface RootState{
  app: AppState
}

export default new Vuex.Store<RootState>({})
