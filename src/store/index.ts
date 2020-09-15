import Vue from 'vue'
import Vuex from 'vuex'
import { AppState } from './modules/app'
import { UserState } from './modules/user'
import { IParamsState } from './modules/params'
import { IProductState } from './modules/product'

Vue.use(Vuex)

export interface RootState {
  app: AppState
  params: IParamsState
  user: UserState
  product: IProductState
}

export default new Vuex.Store<RootState>({})
