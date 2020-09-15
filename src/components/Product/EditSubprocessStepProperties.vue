<template>
  <div
    class="process-item subprocess-content"
  >
    <el-select
      v-model="currentSubproccessTypeId"
      placeholder="请选择"
      @change="changeTypes"
    >
      <el-option
        v-for="item in processInfo.subProcesses.types"
        :key="item.id"
        :label="item.name"
        :value="item.id"
      >
      </el-option>
    </el-select>
    <div class="items-content" >
      <div
        class="subprocess-items edit-property"
      >
        <div class="header">
          <span class="header-str">子流程参数列表</span>
        </div>
        <el-form :inline="true" style="margin-top:20px;">
          <el-form-item label="预设参数">
            <el-select
              placeholder="请选择预设参数"
              v-model="currentSubprocessProIndex"
              @change="choiseSubprocessProperties"
            >
              <el-option
                v-for="(item, index) in currentProcessStepItem.subprocessSteps"
                :key="item.id"
                :label="item.name"
                :value="index"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="text" size="mini" @click="addSubStep()"
              >添加步骤</el-button
            >
          </el-form-item>
        </el-form>
        <!-- <div
          class="item "
          v-for="(item, index) in currentSubprocessPro.steps"
          :key="item.id"
        >
          <div style="width:100%;display:flex;align-items:center;">
            <div class="item-str">步骤{{ index + 1 }}</div>
            <div
              class="plus-button"
              @click="showPropertiesSetting(item, index)"
            >
              <i class="el-icon-edit"></i>
            </div>
          </div>
        </div> -->
      </div>
      <!-- <div class="subprocess-items edit-property">
        <div class="header">
          <span class="header-str">步骤参数</span>
        </div>
        <el-divider><i class="el-icon-more"></i></el-divider>
        <SubProcessForm
          :subProcessStepProperties="currentProcessStepItem.subProcessParameter"
          :currentStepProperties="currentStepProperties"
          @saveSubprocessStep="saveSubprocessStep"
          @changeStatusForProperty="changeStatusForProperty"
        />
      </div>
      <el-dialog
        width="30%"
        title="步骤参数"
        :visible.sync="dialogTableVisible"
        append-to-body
      >
        <SubProcessForm
          :subProcessStepProperties="
            Object.keys(currentSubprocessStep).length > 0
              ? currentSubprocessStep.properties
              : {}
          "
          :currentStepProperties="currentStepProperties"
          @saveSubprocessStep="saveSubprocessStep"
          @changeStatusForProperty="changeStatusForProperty"
        />
      </el-dialog> -->
    </div>
  </div>
</template>

<script lang="ts">
import {Vue,Component,Prop} from 'vue-property-decorator'
import { ProductModule } from "@/store/modules/product";

@Component({
  name:'EditSubprocessStepProperties'
})
export default class extends Vue {

  get processInfo(){
    return ProductModule.processInfo;
  }
  private currentSubproccessTypeId:number = 0;
  private currentSubprocessProIndex:number = 0;
  private changeTypes(){

  }
  private choiseSubprocessProperties(){

  }
  private addSubStep(){

  }
};
</script>

<style></style>
