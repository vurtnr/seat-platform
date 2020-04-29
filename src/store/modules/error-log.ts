import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators'
import Vue from 'vue'
import store from '@/store'

interface IErrorLog {
  err: Error
  vm: Vue
  info: string
  url: string
}

export interface ErrorLogState {
  logs: Array<IErrorLog>
}

@Module({ dynamic: true, store, name: 'errorLog' })
class ErrorLog extends VuexModule implements ErrorLogState {
  public logs: Array<IErrorLog> = []

  @Mutation
  private ADD_ERROR_LOG(log: IErrorLog) {
    this.logs.push(log)
  }

  @Mutation
  private CLEAR_ERROR_LOG() {
    this.logs.splice(0)
  }

  @Action
  public AddErrorLog(log: IErrorLog) {
    this.ADD_ERROR_LOG(log)
  }

  @Action
  public ClearErrorLog() {
    this.CLEAR_ERROR_LOG()
  }
}

export const ErrorLogModule = getModule(ErrorLog)
