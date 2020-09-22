<template>
  <div class="event-content" v-loading="loading">
    <div class="item">
      <div class="header">
        <span class="header-str">产品配件</span>
      </div>
      <el-divider><i class="el-icon-more"></i></el-divider>
      <div
        class="child-item"
        :class="[item.flag ? 'active' : '']"
        v-for="(item, idx) in accessoryArray"
        :key="item.id"
        @click="choseItem(idx, item.id)"
      >
        {{ item.name }}
      </div>
    </div>
    <div class="item" v-if="currentEventIndex !== null">
      <div class="header">
        <span class="header-str">事件列表</span>
      </div>
      <el-divider><i class="el-icon-more"></i></el-divider>
      <div
        class="child-item"
        :class="[idx === currentEventItemIndex ? 'active' : '']"
        v-for="(item, idx) in accessoryArray[currentEventIndex].events"
        :key="item.id"
        @click="showEventStep(idx)"
      >
        {{ item.name }}
      </div>
    </div>
    <div class="item" v-if="currentEventItemIndex !== null">
      <div class="header">
        <span class="header-str">绑定步骤</span>
      </div>
      <el-divider><i class="el-icon-more"></i></el-divider>
      <el-form ref="ruleForm" label-width="100px">
        <el-form-item label="流程步骤">
          <el-select
            v-model="currentStep"
            placeholder="请选择需要绑定的流程步骤"
            @change="bindStep"
          >
            <el-option
              v-for="(item, idx) in product.processes.processes"
              :key="idx"
              :label="'步骤'+(idx + 1)"
              :value="idx"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { ProductModule } from "@/store/modules/product";
@Component({
  name: "ButtonEventSetting",
})
export default class extends Vue {
  @Prop({ type: Number, default: 0 }) readonly id!: number;
  private loading: boolean = false;
  private accessoryArray: any[] = [];
  private currentEventIndex: any = null;
  private currentEventItemIndex: any = null;
  private eventValues: any = {};
  private currentStep: any = null;

  get product() {
    return ProductModule.product;
  }
  get accessories() {
    return ProductModule.accessories;
  }

  async mounted() {
    this.loading = true;
    await ProductModule.getProductInfo({ productId: this.id });
    const { processTriggers } = this.product;
    const { events } = processTriggers;
    const accessoryKeys = Object.keys(events);
    for (let key of accessoryKeys) {
      const res = await ProductModule.getAccessories({
        accessoryTypeId: parseInt(key),
        page: 0,
        pageSize: 100,
      });
      this.accessoryArray.push({
        id: res[0].id,
        flag: false,
        name: res[0].name,
        events: events[res[0].id],
      });
    }
    this.loading = false;
  }

  private choseItem(idx: number, id: number) {
    this.accessoryArray.map((item: any, i: number) => {
      let tempFlag = false;
      if (item.id === id) {
        tempFlag = true;
      }
      this.$set(this.accessoryArray[i], "flag", tempFlag);
    });
    this.currentEventIndex = idx;
  }

  private showEventStep(idx: number) {
    this.currentEventItemIndex = idx;
    this.currentStep = null;
  }

  private bindStep(value:number){
    const {id} = this.accessoryArray[this.currentEventIndex].events[this.currentEventItemIndex]
    this.eventValues[id] = value
  }
}
</script>

<style lang="scss" scoped>
.event-content {
  width: 100%;
  display: flex;
  padding: 10px;
  height: 600px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  border: 1px solid #ebeef5;
  .item {
    padding: 10px;
    margin-right: 20px;
    height: 580px;
    overflow: auto;
    width: 33%;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    border: 1px solid #ebeef5;
    .header {
      width: 100%;
      display: flex;
      align-items: center;
      .header-str {
        margin: 10px 0;
        font-size: 16px;
        font-weight: bold;
        margin-right: 10px;
      }
    }
    .child-item {
      width: 100%;
      min-height: 36px;
      line-height: 36px;
      border-radius: 4px;
      border: 1px solid #ebeef5;
      color: #303133;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      margin-bottom: 10px;
      text-align: center;
      font-weight: bold;
      padding: 5px 10px;
      cursor: pointer;
      &:hover {
        border-color: #409eff;
      }
      &.active {
        border-color: #409eff;
        color: #409eff;
      }
    }
  }
}
</style>
