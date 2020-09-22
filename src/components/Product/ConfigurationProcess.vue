<template>
  <div>
    <div class="process-content">
      <div class="process-item">
        <div class="header">
          <span class="header-str">流程列表</span>
          <div class="add-btn" @click="addStep" title="新建流程">
            <i class="el-icon-plus"></i>
          </div>
        </div>
        <el-divider><i class="el-icon-more"></i></el-divider>
        <div
          class="accessory-item"
          :class="[steps[i].flag ? 'active' : '']"
          v-for="i in Object.keys(steps)"
          :key="i"
        >
          <div style="display:flex;align-items:center;justify-content:center;">
            <span style="flex:1;">{{ steps[i].name }}</span>
            <el-tooltip effect="dark" content="添加步骤" placement="top">
              <div class="add-btn" @click="setCurrentStep(steps[i])">
                <i class="el-icon-plus"></i>
              </div>
            </el-tooltip>

            <div
              class="add-btn"
              @click="showEditorProcessEventAndSubprocess(i)"
            >
              <i class="el-icon-more"></i>
            </div>
          </div>
        </div>
      </div>
      <div
        class="process-item"
        v-if="currentStep && currentStep.stepList.length > 0"
        style="flex:1"
      >
        <div class="header">
          <span class="header-str">流程步骤列表</span>
        </div>
        <el-divider><i class="el-icon-more"></i></el-divider>
        <div
          class="accessory-item"
          :class="[v.flag ? 'active' : '']"
          v-for="(v, i) in currentStep.stepList"
          :key="v.id"
        >
          <el-collapse accordion @change="choiseProcessStep(v, i)">
            <el-collapse-item :title="v.name" :name="v.id">
              <div class="subprocess-type-params">
                <el-form :inline="true" class="demo-form-inline">
                  <el-form-item label="子流程类型">
                    <el-select
                      v-model="v.subprocessTypeId"
                      placeholder="请选择"
                    >
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
                    label="子流程预设参数"
                    v-if="
                      originSubprocesses[v.subprocessTypeId] &&
                        originSubprocesses[v.subprocessTypeId].subprocesses
                    "
                  >
                    <el-select
                      v-model="v.subprocessParamsIndex"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="(item, subidx) in originSubprocesses[
                          v.subprocessTypeId
                        ].subprocesses"
                        :key="item.id"
                        :label="item.label"
                        :value="subidx"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item
                    v-if="
                      v.subprocessParamsIndex !== null &&
                        originSubprocesses[v.subprocessTypeId].subprocesses &&
                        originSubprocesses[v.subprocessTypeId].subprocesses[
                          v.subprocessParamsIndex
                        ].steps.length <
                          originSubprocesses[v.subprocessTypeId].subprocesses[
                            v.subprocessParamsIndex
                          ].maxStepsLength
                    "
                  >
                    <el-button
                      type="text"
                      size="mini"
                      @click="
                        addSubprocessesStep(
                          v.subprocessTypeId,
                          v.subprocessParamsIndex
                        )
                      "
                      >添加步骤</el-button
                    >
                  </el-form-item>
                </el-form>
              </div>
              <div
                class="subprocess-type-params"
                v-if="
                  v.subprocessTypeId &&
                    !originSubprocesses[v.subprocessTypeId].subprocesses
                "
              >
                <SubProcessForm
                  :subProcessStepProperties="
                    originSubprocesses[v.subprocessTypeId].property
                  "
                  :currentStepProperties="
                    originSubprocesses[v.subprocessTypeId].properties
                  "
                />
              </div>
              <div
                class="subprocess-list"
                v-if="
                  v.subprocessTypeId !== null &&
                    v.subprocessParamsIndex !== null &&
                    originSubprocesses[v.subprocessTypeId].subprocesses &&
                    originSubprocesses[v.subprocessTypeId].subprocesses[
                      v.subprocessParamsIndex
                    ].steps.length > 0
                "
              >
                <div
                  class="list-item"
                  v-for="(item, odx) in originSubprocesses[v.subprocessTypeId]
                    .subprocesses[v.subprocessParamsIndex].steps"
                  :key="odx"
                >
                  <div style="width:100%;display:flex;align-items:center;">
                    <div class="item-str">步骤{{ odx + 1 }}</div>
                    <el-popover
                      placement="bottom-end"
                      width="400"
                      trigger="click"
                    >
                      <SubProcessForm
                        :subProcessStepProperties="
                          originSubprocesses[v.subprocessTypeId].subprocesses[
                            v.subprocessParamsIndex
                          ].steps[odx]
                        "
                        :currentStepProperties="
                          originSubprocesses[v.subprocessTypeId].subprocesses[
                            v.subprocessParamsIndex
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
              <el-divider><i class="el-icon-more"></i></el-divider>
              <div class="step-settings">
                <el-form :inline="true">
                  <el-form-item label="成功后执行">
                    <el-select
                      placeholder="请选择"
                      v-model="v.nextStepOnDone"
                      style="width:100px;"
                    >
                      <el-option
                        v-for="(item, index) in currentStep.stepList"
                        :key="item.id"
                        :label="`步骤${index + 1}`"
                        :value="index"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="失败后执行">
                    <el-select
                      placeholder="请选择"
                      v-model="v.nextStepOnError"
                      style="width:100px;"
                    >
                      <el-option
                        v-for="(item, index) in currentStep.stepList"
                        :key="item.id"
                        :label="`步骤${index + 1}`"
                        :value="index"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="监听事件">
                    <el-select placeholder="请选择" v-model="v.eventId">
                      <el-option
                        v-for="item in eventTypes"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-form>
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
      </div>
    </div>
    <el-dialog
      :visible.sync="subprocessShow"
      title="子流程"
      top="5vh"
      width="55%"
      append-to-body
    >
      <process-step-property
        v-loading="saveEvents"
        ref="events"
        :properties="processProperties"
        :eventTypes="processEventTypes"
        :originSubprocesses="originSubprocesses"
        @addSubprocessesStep="addSubprocessesStep"
      />
      <div slot="footer" class="dialog-footer">
        <el-button @click="subprocessShow = false">
          取 消
        </el-button>
        <el-button @click="saveProcessEventsAndSubprocess">
          保存
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { ProductModule } from "@/store/modules/product";
import SubProcessForm from "./SubprocessForm.vue";
import ProcessStepProperty from "./ProcessStepProperty.vue";

@Component({
  name: "ConfigurationProcess",
  components: { SubProcessForm, ProcessStepProperty },
})
export default class extends Vue {
  @Prop({ type: Number, default: 0 }) readonly id!: number;
  private loading: boolean = false;
  private steps: any = {};
  private index: number = 0;
  private currentStep: any = null;
  private eventTypes: any[] = [];
  private currentProcessStepItem: any = {};
  private currentProcessStepIndex: number = 0;
  private originSubprocesses: any[] = [];
  private subprocessShow: boolean = false;
  private processProperties: any[] = [];
  private processEventTypes: any[] = [];
  private currentStepId: any = null;
  private saveEvents:boolean = false;

  get product() {
    return ProductModule.product;
  }

  get processInfo() {
    return ProductModule.processInfo;
  }
  async mounted() {
    this.loading = true;
    await ProductModule.getProductInfo({ productId: this.id });
    const {
      developmentBoard,
      accessories,
      processes: { eventTypes, properties },
    } = this.product;
    const payload: any = {};
    payload.developmentBoardId = developmentBoard.id;
    payload.accessories = accessories;
    this.processProperties = properties;
    this.processEventTypes = eventTypes;
    await ProductModule.getProcessInfo(payload);
    new Promise((resolve) => {
      const { subProcesses } = this.processInfo;
      const { subProcesses: subp, types, stepTypes } = subProcesses;
      let properties: any = {};
      for (let i in stepTypes) {
        properties[stepTypes[i].id] = stepTypes[i].properties;
      }

      for (let idx in subp) {
        for (let jdx in subp[idx]) {
          subp[idx][jdx]["maxStepsLength"] = subp[idx][jdx].steps.length;
        }
      }

      for (let i in types) {
        const subprocessArray = subp[types[i].id];
        if (properties[types[i].id]) {
          for (let j in subprocessArray) {
            subprocessArray[j].properties = properties[types[i].id];
            subprocessArray[j].label =
              types[i].name + " 参数" + (parseInt(j) + 1);
            subprocessArray[j].steps = [];
          }
        } else {
          const { properties } = types[i];
          const property: any = Object.create({});
          if (properties.length > 0) {
            for (let p in properties) {
              if (properties[p].valueType.name === "BOOL") {
                property[properties[p].id] = false;
              } else {
                property[properties[p].id] = null;
              }
            }
          }
          types[i].property = property;
        }
        if (subp[types[i].id]) {
          types[i].subprocesses = subprocessArray;
        }
      }
      resolve(types);
    }).then((types: any) => {
      this.originSubprocesses = types;
      const { eventTypes } = this.product.processes;
      this.eventTypes = eventTypes;
      this.loading = false;
    });
  }

  private addStep() {
    const id = new Date().getTime();
    this.$set(this.steps, id, {
      id,
      name: "流程" + (this.index + 1),
      stepList: [],
    });
    this.index += 1;
  }

  private setCurrentStep(step: any) {
    Object.keys(this.steps).map((key: any, index: number) => {
      let currentStep = Object.assign({}, this.steps[key], { flag: false });
      if (parseInt(key) === parseInt(step.id)) {
        currentStep = Object.assign({}, this.steps[key], { flag: true });
        const index = currentStep.stepList.length;
        currentStep.stepList.push({
          id: new Date().getTime(),
          name: "步骤" + (index + 1),
          subprocessTypeId: null,
          subprocessParamsIndex: null,
          // subProcessParameter:null,
          index,
          flag: false,
          nextStepOnError: null,
          nextStepOnDone: null,
          eventId: null,
        });
      }
      this.$set(this.steps, key, currentStep);
    });
    this.currentStep = step;
    // this.currentSubproccessTypeId = null
    // this.currentSubprocessProIndex = null
  }

  private choiseProcessStep(step: any, index: number) {
    this.currentStep.stepList.map((item: any, i: number) => {
      let tempFlag = false;
      if (item.id === step.id) {
        tempFlag = true;
      }
      this.$set(this.currentStep.stepList[i], "flag", tempFlag);
    });
    this.currentProcessStepItem = { ...step };
    this.currentProcessStepIndex = index;
  }

  private addSubprocessesStep(
    subprocessTypeId: any,
    subprocessParamsIndex: any
  ) {
    const item = this.originSubprocesses[subprocessTypeId].subprocesses;
    const child = item[subprocessParamsIndex];
    const pro_form: any = {};
    for (let i in child.properties) {
      pro_form[child.properties[i].id] =
        child.properties[i].valueType.name === "BOOL" ? false : null;
    }
    child.steps.push({ ...pro_form });

    this.$set(
      this.originSubprocesses[subprocessTypeId].subprocesses,
      subprocessParamsIndex,
      Object.assign(child, { steps: child.steps })
    );
  }

  showEditorProcessEventAndSubprocess(value: any) {
    this.currentStepId = value;
    // console.log(value);
    this.subprocessShow = true
  }
  private saveProcessEventsAndSubprocess() {
    this.saveEvents = true;
    const propertyValues:any[] = [];
    for(let property in this.$refs.events.processPorperties){
      const obj:any = {};
      obj.propertyId = property;
      obj.value = this.$refs.events.processPorperties[property]
      propertyValues.push(obj)
    }
    const processEvents:any[] = [];
    console.log(this.$refs.events.processEvents)
    for(let item of this.$refs.events.processEvents){
      if(item.subProcessTypeId !== undefined && item.subProcessTypeId !== null){
        const obj:any = {};
        obj.eventId = item.id;
        obj.subProcessTypeId = this.originSubprocesses[item.subProcessTypeId].id;
        obj.subProcessIndex = item.subProcessIndex || 0;
        const arr = this.originSubprocesses.filter(os => os.id === obj.subProcessTypeId && os.property);
        console.log(arr)
        if(arr.length > 0){
          obj.subProcessParameter = Object.values(arr[0].property)[0]
        }
        processEvents.push(obj)
      }
    }
    for(let key in this.steps){
      if(key === this.currentStepId){
        const obj = this.steps[key]
        this.$set(this.steps,key,{...obj,propertyValues,processEvents})
      }
    }
    this.saveEvents = false;
    this.$message({
      message:"流程事件属性已保存",
      type:'success'
    })
    this.subprocessShow = false;
  }
}
</script>

<style lang="scss">
.process-content {
  width: 100%;
  display: flex;
  padding: 10px;
  height: 600px;

  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 4px;

  border: 1px solid #ebeef5;

  .process-item {
    padding: 10px;
    margin-right: 20px;
    height: 580px;
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
      .add-btn {
        display: inline-block;
        width: 25px;
        height: 25px;
        line-height: 25px;
        text-align: center;
        cursor: pointer;
        color: #67c23a;
        border-radius: 50%;
        border: 1px solid #67c23a;
        &:hover {
          background: #67c23a;
          color: #ffffff;
          border: none;
        }
      }
    }
    .accessory-item {
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
      &:hover {
        cursor: pointer;
        border-color: #409eff;
      }
      &.active {
        border-color: #409eff;
        color: #409eff;
      }
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
      .add-btn {
        margin-left: 20px;
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
      .step-settings {
        width: 100%;
        margin-top: 20px;
        display: flex;
        line-height: 30px;
        flex-wrap: wrap;
        .setting-item {
          width: 33.3%;
        }
      }
    }
    &.subprocess-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      margin-right: 0;
      overflow: hidden;
      .items-content {
        width: 100%;
        display: flex;
        margin-top: 20px;
        .subprocess-items {
          display: flex;
          flex-direction: column;
          padding: 10px;
          height: 500px;
          box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
          border-radius: 4px;
          border: 1px solid #ebeef5;
          width: 50%;
          &.edit-property {
            flex: 1;
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
          }
          &:first-child {
            margin-right: 2%;
          }
          .item {
            width: 100%;
            padding: 0 5px;
            display: flex;
            align-items: center;
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
            &:hover {
              cursor: pointer;
              border-color: #409eff;
            }
            &.active {
              border-color: #409eff;
              color: #409eff;
            }
            .item-str {
              width: 85%;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
            .plus-button {
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
          }
        }
      }
    }
  }
}
.blank-process-step {
  width: 100%;
  color: #ccc;
  font-size: 16px;
  text-align: center;
}
</style>
<style>
.el-collapse-item__content {
  padding-bottom: 0;
}
</style>
