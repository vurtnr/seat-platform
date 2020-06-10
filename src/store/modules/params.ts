import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'
import { getParams } from '@/api/params'
import { IParams } from '@/api/types'
import store from '@/store'
export interface IParamsState {
  params: Array<IParams>
}

@Module({ dynamic: true, store, name: 'params' })
class Params extends VuexModule implements IParamsState {
  public params: Array<IParams> = [];

  @Mutation
  private SET_PARAMS(list: Array<IParams>) {
    this.params = list
  }

  @Action({ rawError: true })
  public async getParams(params?: Record<string, any>) {
    const { data } = await getParams(params)
    this.SET_PARAMS(data.items)
  }
}

export const PramsModule = getModule(Params)
