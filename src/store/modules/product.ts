import {
  getList,
  getDevelopmentBoard,
  getAccessories,
  getDevelopmentBoards,
} from "@/api/product";
import {
  VuexModule,
  Module,
  Action,
  Mutation,
  getModule,
} from "vuex-module-decorators";
import {
  IProductOriginal,
  IDevelopmentBoard,
  IPageation,
  IBoardParams,
  IAccessoriesParams,
  IAccessoriesPro,
} from "@/interface";
import store from '@/store'

export interface IProductState {
  products: Array<IProductOriginal>;
  productInfo: IProductOriginal;
  developmentBoards: Array<IDevelopmentBoard>;
  developmentBoard: IDevelopmentBoard;
  accessories: Array<IAccessoriesPro>;
}
 
@Module({ dynamic: true, store, name: "product" })
class Product extends VuexModule implements IProductState {
  accessories: IAccessoriesPro[] = [];
  products: IProductOriginal[] = [];
  productInfo: IProductOriginal = {};
  developmentBoards: IDevelopmentBoard[] = [];
  developmentBoard: IDevelopmentBoard = {
    id: 0,
    model: "",
    name: "",
    accessoryInterfaces: [],
  };

  @Mutation
  setProducts(data: Array<IProductOriginal>) {
    this.products = data;
  }

  @Mutation
  setProductInfo(data: IProductOriginal) {
    this.productInfo = data;
  }

  @Mutation
  setDevelopmentBoard(data: IDevelopmentBoard) {
    this.developmentBoard = data;
  }

  @Mutation
  setAccessories(data:Array<IAccessoriesPro>){
    this.accessories = data
  }

  @Mutation
  setDevelopmentBoards(data: Array<IDevelopmentBoard>) {
    console.log("data:", data);
    this.developmentBoards = data;
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
    return accessories
  }
}

export const ProductModule = getModule(Product);