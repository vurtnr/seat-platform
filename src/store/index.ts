import Vue from 'vue'
import Vuex from 'vuex'
import { AppState } from './modules/app'
import { UserState } from './modules/user'
import { IParamsState } from './modules/params'

Vue.use(Vuex)

export interface RootState{
  app: AppState
  params: IParamsState
  user: UserState
}

export default new Vuex.Store<RootState>({})
