<template>
  <div class="content">
    <div class="children">
      <div class="item" v-for="property in properties" :key="property.id">
        <div class="item-content">
          <div class="item-title">
            {{ property.name }}
          </div>
          <template v-if="property.valueType.name === 'BOOL'">
            <el-switch
              v-model="processPorperties[property.id]"
              active-color="#13ce66"
              inactive-color="#ff4949"
            >
            </el-switch>
          </template>
        </div>
      </div>
    </div>
    <div class="event-content">
      <div class="item">
        <div class="header">
          <span class="header-str">流程事件</span>
        </div>
        <el-divider><i class="el-icon-more"></i></el-divider>
        <div
          class="child-item"
          :class="[item.flag ? 'active' : '']"
          v-for="(item, idx) in eventTypes"
          :key="item.id"
          @click="choseItem(idx, item.id)"
        >
          {{ item.name }}
        </div>
      </div>
      <div class="subprocess" v-if="currentEventIndex !== null">
        <el-form :inline="true">
          <el-form-item label="子流程类型">
            <el-select v-model="processEvents[currentEventIndex].subProcessTypeId" placeholder="请选择" @change="choseType">
              <el-option
                v-for="(item, tidx) in originSubprocesses"
                :key="item.id"
                :label="item.name"
                :value="tidx"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="参数"
            v-if="
            processEvents[currentEventIndex].subProcessTypeId !== null &&
              originSubprocesses[processEvents[currentEventIndex].subProcessTypeId] &&
                originSubprocesses[processEvents[currentEventIndex].subProcessTypeId].subprocesses
            "
          >
            <el-select v-model="processEvents[currentEventIndex].subProcessIndex" placeholder="请选择" @change="choseIndex">
              <el-option
                v-for="(item, subidx) in originSubprocesses[processEvents[currentEventIndex].subProcessTypeId]
                  .subprocesses"
                :key="item.id"
                :label="item.label"
                :value="subidx"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            v-if="
              processEvents[currentEventIndex].subProcessIndex !== null &&
              processEvents[currentEventIndex].subProcessTypeId !== null &&
                originSubprocesses[processEvents[currentEventIndex].subProcessTypeId].subprocesses &&
                originSubprocesses[processEvents[currentEventIndex].subProcessTypeId].subprocesses[
                  processEvents[currentEventIndex].subProcessIndex
                ].steps.length <
                  originSubprocesses[processEvents[currentEventIndex].subProcessTypeId].subprocesses[
                    processEvents[currentEventIndex].subProcessIndex
                  ].maxStepsLength
            "
          >
            <el-button type="text" size="mini" @click="addSubprocessesStep(processEvents[currentEventIndex].subProcessTypeId,processEvents[currentEventIndex].subProcessIndex)"
              >添加步骤</el-button
            >
          </el-form-item>
        </el-form>
        <div
          class="subprocess-type-params"
          v-if="
            processEvents[currentEventIndex].subProcessTypeId &&
              !originSubprocesses[processEvents[currentEventIndex].subProcessTypeId].subprocesses
          "
        >
          <SubProcessForm
            :subProcessStepProperties="
              originSubprocesses[processEvents[currentEventIndex].subProcessTypeId].property
            "
            :currentStepProperties="
              originSubprocesses[processEvents[currentEventIndex].subProcessTypeId].properties
            "
          />
        </div>
        <div
          class="subprocess-list"
          v-if="
            processEvents[currentEventIndex].subProcessTypeId !== null &&
              processEvents[currentEventIndex].subProcessIndex !== null &&
              originSubprocesses[processEvents[currentEventIndex].subProcessTypeId].subprocesses &&
              originSubprocesses[processEvents[currentEventIndex].subProcessTypeId].subprocesses[
                processEvents[currentEventIndex].subProcessIndex
              ].steps.length > 0
          "
        >
          <div
            class="list-item"
            v-for="(item, odx) in originSubprocesses[processEvents[currentEventIndex].subProcessTypeId]
              .subprocesses[processEvents[currentEventIndex].subProcessIndex].steps"
            :key="odx"
          >
            <div style="width:100%;display:flex;align-items:center;">
              <div class="item-str">步骤{{ odx + 1 }}</div>
              <el-popover placement="bottom-end" width="400" trigger="click">
                <SubProcessForm
                  :subProcessStepProperties="
                    originSubprocesses[processEvents[currentEventIndex].subProcessTypeId].subprocesses[
                      processEvents[currentEventIndex].subProcessIndex
                    ].steps[odx]
                  "
                  :currentStepProperties="
                    originSubprocesses[processEvents[currentEventIndex].subProcessTypeId].subprocesses[
                      processEvents[currentEventIndex].subProcessIndex
                    ].properties
                  "
                />
                <div class="edit-button" slot="reference">
                  <i class="el-icon-edit"></i>
                </div>
              </el-popover>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import SubProcessForm from "./SubprocessForm.vue";

@Component({
  name: "ProcessStepProperty",
  components: { SubProcessForm },
})
export default class extends Vue {
  @Prop({
    default: () => {
      return {};
    },
  })
  properties!: any;

  @Prop({
    default: () => {
      return {};
    },
  })
  eventTypes!: any;

  @Prop({
    default: () => {
      return {};
    },
  })
  originSubprocesses!: any;

  private processPorperties: any[] = [];
  private accessoryArray: any[] = [];
  private currentEventIndex: any = null;
  private subprocessTypeId: any = null;
  private subprocessParamsIndex: any = null;
  private processEvents: any[] = [];

  mounted() {
    this.accessoryArray = [...this.eventTypes];
    for(let property of this.properties){
      const {id,valueType:{name}} = property;
      if(name === 'BOOL'){
         this.processPorperties[id] = false
      }else{
         this.processPorperties[id] = ""
      }
     
    }
  }

  private choseItem(idx: number, id: number) {
    this.accessoryArray.map((item: any, i: number) => {
      let tempFlag = false;
      if (item.id === id) {
        const event = {...item,subProcessTypeId:null,subProcessIndex:null,subProcessParameter:""}
       this.processEvents.push(event);
        tempFlag = true;
      }
      this.$set(this.accessoryArray[i], "flag", tempFlag);
    });
    this.currentEventIndex = idx;
  }

  private addSubprocessesStep(typeid:number,index:number) {
    this.$emit(
      "addSubprocessesStep",
      typeid,
      index
    );
  }
  private choseType(value:number){
    this.$set(this.processEvents[this.currentEventIndex],"subProcessTypeId",value)
  }

  private choseIndex(index:number){
    this.$set(this.processEvents[this.currentEventIndex],"subProcessIndex",index)
  }
}
</script>

<style lang="scss" scoped>
.content {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .children {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .item {
      width: 49%;
      margin-bottom: 20px;
      .item-content {
        width: 100%;
        height: 36px;
        line-height: 36px;
        display: flex;
        align-items: center;
        .item-title {
          margin-right: 10px;
          color: #333;
          text-align: center;
        }
      }
    }
  }
  .event-content {
    width: 100%;
    display: flex;
    padding: 10px;
    max-height: 400px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    border: 1px solid #ebeef5;
    .item {
      padding: 10px;
      margin-right: 20px;
      min-height: 350px;
      max-height: 400px;
      overflow: auto;
      width: 30%;
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
    .subprocess {
      flex: 1;
      padding: 10px;
      display: flex;
      flex-direction: column;
      .subprocess-type-params {
        width: 100%;
        line-height: 30px;
        display: flex;
        justify-content: flex-start;
      }

      .subprocess-list {
        width: 100%;
        padding: 20px;
        font-size: 14px;
        font-weight: bold;
        display: flex;
        line-height: 36px;
        flex-wrap: wrap;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        border-radius: 4px;
        border: 1px solid #ebeef5;
        .list-item {
          width: 33%;
          padding: 0 5px;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 36px;
          line-height: 36px;
          border-radius: 4px;
          border: 1px solid #ebeef5;
          color: #303133;
          box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
          margin-bottom: 10px;
          text-align: center;
          font-weight: bold;
          cursor: pointer;
          .item-str {
            width: 85%;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .edit-button {
            display: inline-block;
            height: 20px;
            width: 20px;
            line-height: 20px;
            border-radius: 50%;
            color: #409eff;
            font-size: 10px;
            border: 1px solid #409eff;
            &:hover {
              background-color: #409eff;
              color: #fff;
            }
          }
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
    }
  }
}
</style>
