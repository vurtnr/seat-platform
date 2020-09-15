<template>
  <el-form ref="form" :model="subProcessStepProperties" label-width="150px">
    <el-form-item
      v-for="pro in currentStepProperties"
      :label="pro.name"
      :key="pro.id"
    >
      <el-select
        v-if="pro.valueType.name === 'ENUM_INT'"
        v-model="subProcessStepProperties[pro.id]"
        :placeholder="pro.note"
        style="width:200px;"
      >
        <el-option
          v-for="(item, index) in pro.optionalValues"
          :key="index"
          :label="item.note"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-switch
        v-else-if="pro.valueType.name === 'BOOL'"
        v-model="subProcessStepProperties[pro.id]"
        active-color="#13ce66"
        inactive-color="#ff4949"
      >
      </el-switch>
      <el-input
        v-else
        v-model="subProcessStepProperties[pro.id]"
        :placeholder="pro.name"
        style="width:200px;"
        @input="updateView($event)"
      ></el-input>
    </el-form-item>
    
  </el-form>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({
  name: "SubprocessForm",
})
export default class extends Vue {
  @Prop({
    default: () => {
      return {};
    },
  })
  subProcessStepProperties!: any;
  @Prop({
    default: () => {
      return [];
    },
  })
  currentStepProperties!: any[];


  private updateView(e:any) {
    this.$forceUpdate()
} 
}
</script>

<style></style>
