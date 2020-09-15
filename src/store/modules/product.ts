import {
  getList,
  getDevelopmentBoard,
  getAccessories,
  getDevelopmentBoards,
  getProductInfo,
  getProductDefinition
} from '@/api/product'
import {
  VuexModule,
  Module,
  Action,
  Mutation,
  getModule
} from 'vuex-module-decorators'
import {
  IProduction,
  IDevelopmentBoard,
  IPageation,
  IBoardParams,
  IAccessoriesParams,
  IAccessoriesPro
} from '@/interface'
import store from '@/store'

export interface IProductState {
  products: Array<IProduction>
  product: IProduction
  developmentBoards: Array<IDevelopmentBoard>
  developmentBoard: IDevelopmentBoard
  accessories: Array<IAccessoriesPro>
  processInfo: any
}

@Module({ dynamic: true, store, name: "product" })
class Product extends VuexModule implements IProductState {
  accessories: IAccessoriesPro[] = [];
  products: IProduction[] = [];
  product: IProduction = {}
  developmentBoards: IDevelopmentBoard[] = [];
  developmentBoard: IDevelopmentBoard = {
    id: 0,
    model: "",
    name: "",
    accessoryInterfaces: [],
  };

  processInfo: any = {};

  @Mutation
  setProducts(data: Array<IProduction>) {
    this.products = data;
  }

  @Mutation
  setProduct(data: IProduction) {
    this.product = data;
  }

  @Mutation
  setDevelopmentBoard(data: IDevelopmentBoard) {
    this.developmentBoard = data;
  }

  @Mutation
  setAccessories(data: Array<IAccessoriesPro>) {
    this.accessories = data;
  }

  @Mutation
  setDevelopmentBoards(data: Array<IDevelopmentBoard>) {
    this.developmentBoards = data;
  }

  @Mutation
  setProcessInfo(data: any) {
    this.processInfo = data;
  }

  @Action({ commit: "setProducts", rawError: true })
  async getProducts(params: IPageation) {
    const { products } = await getList(params);
    return products;
  }

  @Action({ commit: "setDevelopmentBoards", rawError: true })
  async getDevelopmentBoards(params: IPageation) {
    const { developmentBoards } = await getDevelopmentBoards(params);
    developmentBoards.map((item: IDevelopmentBoard) =>
      item.accessoryInterfaces.sort((a, b) => a.id - b.id)
    );
    return developmentBoards;
  }

  @Action({ commit: "setDevelopmentBoard", rawError: true })
  async getDevelopmentBoard(params: IBoardParams) {
    const { developmentBoard } = await getDevelopmentBoard(params);
    return developmentBoard;
  }

  @Action({ commit: "setAccessories", rawError: true })
  async getAccessories(payload: IAccessoriesParams) {
    const { accessories } = await getAccessories(payload);
    return accessories;
  }

  @Action({ commit: "setProduct", rawError: true })
  async getProductInfo(payload: any) {
    const { product } = await getProductInfo(payload);
    console.log(product)
    return product;
  }

  @Action({ commit: "setProcessInfo", rawError: true })
  async getProcessInfo(payload: any) {
    const { product } = await getProductDefinition(payload);
    return product;
  }
}

export const ProductModule = getModule(Product)
