<template>
  <div class="product-content">
    <div class="card-content">
      <h3>开发板</h3>
      <el-radio-group v-model="board" size="medium" @change="choiseBoard">
        <el-radio
          v-for="item in developmentBoards"
          style="width:100%;margin:0 0 10px 0;"
          :key="item.id"
          :label="item"
          border
          >{{ item.name }}</el-radio
        >
      </el-radio-group>
    </div>
    <div class="card-content" v-if="accessInterfaces.length > 0">
      <h3>开发板接口</h3>
      <div
        class="accessory-item"
        v-for="item in accessInterfaces"
        :key="item.id"
        @click="choiseInterface(item)"
      >
        <el-popover
          placement="top-start"
          trigger="hover"
          v-if="item.accessory"
          >
          <div style="display:flex;flex-direction:column;">
            <span>配件型号：{{item.accessory.model}}</span>
            <span>配件型号：{{item.accessory.name}}</span>
          </div>
          <i
            
            slot="reference"
            class="el-icon-circle-check"
            style="margin-left:10px;color:lightgreen;font-weight:bold;"
          ></i>
        </el-popover>
        <span style="margin-left:20px">{{ item.name }}</span>
      </div>
    </div>
    <div
      class="card-content"
      v-if="
        accessoriesArray[accessInterface.id] &&
          accessoriesArray[accessInterface.id].length > 0
      "
    >
      <h3>接口配件</h3>
      <div
        v-for="item in accessoriesArray[accessInterface.id]"
        :key="item.id"
        class="accessory-item"
        :class="[item.choise ? 'active' : '']"
        @click="choiseAccessory(item)"
      >
        <span style="margin-left:30px">{{ item.name }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  IProductOriginal,
  IAccesoryInterface,
  IAccesoriesItem,
  IDevelopmentBoard,
  IAccessoriesPro,
} from "@/interface";
import { ProductModule } from "@/store/modules/product";
import { Component, Vue, Prop } from "vue-property-decorator";

interface ISaveAccessories {
  accessoryInterface: {
    id: number;
  };
  accessory: {
    id: number;
  };
}

interface IAccessoryObj {
  [propName: number]: Array<IAccessoriesPro>;
}

@Component({
  name: "BasicInfomation",
})
export default class extends Vue {
  get developmentBoards() {
    return ProductModule.developmentBoards;
  }

  get accessories() {
    return ProductModule.accessories;
  }

  private loading: boolean = false;
  private board: IDevelopmentBoard = {
    id: 0,
    model: "",
    name: "",
    accessoryInterfaces: [],
  };
  private accessInterfaces: Array<IAccesoryInterface> = [];
  private accessInterface: IAccesoryInterface = { id: 0, index: 0, name: "" };
  private accessoryItem = {};
  private accessoriesArray: IAccessoryObj = {};

  private choiseBoard() {
    this.accessInterfaces = this.board.accessoryInterfaces;
  }

  private async choiseInterface(item: any) {
    this.accessInterface = item;
    const res = await ProductModule.getAccessories({
      accessoryTypeId: this.accessInterface.accessoryType.id,
      page: 0,
      pageSize: 100,
    });
    if (this.accessoriesArray[this.accessInterface.id]) return false;
    this.$set(this.accessoriesArray, item.id, res);
  }

  private choiseAccessory(obj: any = {}) {
    const temp = this.accessoriesArray[this.accessInterface.id];
    delete this.accessoriesArray[this.accessInterface.id];
    temp.map((o: any) => {
      if (o.id === obj.id) {
        o.choise = !o.choise;
        obj.choise = o.choise;
      } else {
        o.choise = false;
      }
    });
    this.$set(this.accessoriesArray, this.accessInterface.id, temp);
    this.accessInterfaces.map((item: any) => {
      if (item.id === this.accessInterface.id) {
        obj.choise ? (item.accessory = obj) : delete item.accessory;
      }
    });
  }
}
</script>

<style lang="scss" scopd>
.card-content {
  width: 30%;
  height: 500px;
  min-height: 500px;
  overflow: auto;
  padding: 10px 20px;
  margin-right: 20px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  border: 1px solid #ebeef5;
  color: #303133;
  transition: 0.3s;
  .accessory-item {
    width: 100%;
    min-height: 36px;
    line-height: 36px;
    border-radius: 4px;
    border: 1px solid #ebeef5;
    color: #303133;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    margin-bottom: 10px;
    &:hover {
      cursor: pointer;
      border-color: #409eff;
    }
    &.active {
      border-color: #409eff;
      color: #409eff;
    }
  }
}
</style>
