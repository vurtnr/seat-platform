<template>
  <div class="app-container">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="产品名称">
        <el-input v-model="formInline.name" placeholder="产品名称" />
      </el-form-item>
      <el-form-item label="开发板型号">
        <el-input v-model="formInline.num" placeholder="开发板型号" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">
          查询
        </el-button>
      </el-form-item>
    </el-form>
    <el-row>
      <el-button type="success" @click="add">
        新增
      </el-button>
    </el-row>
    <el-table :data="products" style="width: 100%" height="500">
      <el-table-column
        fixed
        prop="name"
        label="产品名称"
        align="center"
        width="120"
      />
      <el-table-column
        prop="model"
        label="产品型号"
        align="center"
        width="150"
      />
      <el-table-column
        prop="developmentBoard.model"
        label="开发板型号"
        align="center"
        width="120"
      />
      <el-table-column
        prop="developmentBoard.name"
        label="开发板名称"
        align="center"
        width="120"
      />
      <el-table-column prop="note" align="center" label="描述" />
      <el-table-column label="操作" width="180" align="center">
        <template slot-scope="scope">
          <el-button
            title="配置流程步骤"
            size="mini"
            icon="el-icon-menu"
            circle
            @click="configProcess(scope.row.id)"
          />
          <el-button
            size="mini"
            icon="el-icon-setting"
            circle
            @click="settingButtonEvent(scope.row.id)"
          />
          <el-button size="mini" icon="el-icon-delete" circle />
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.pageSize"
      @pagination="getList"
    />
    <el-dialog
      v-loading="loading"
      :visible.sync="dialogFormVisible"
      :title="$t(dialogFormTitle)"
      top="5vh"
      width="60%"
    >
      <el-form
        :inline="true"
        :rules="rules"
        ref="productInfo"
        :model="productInfo"
        class="demo-form-inline"
      >
        <el-form-item label="产品名称" prop="name">
          <el-input
            v-model="productInfo.name"
            placeholder="产品名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="产品型号">
          <el-input
            v-model="productInfo.model"
            placeholder="产品型号"
          ></el-input>
        </el-form-item>
        <el-form-item label="产品概述">
          <el-input
            v-model="productInfo.note"
            placeholder="产品概述"
            style="width:300px;"
          ></el-input>
        </el-form-item>
      </el-form>
      <basic-infomation
        ref="basic"
        @changeButtonDisabled="changeButtonDisabled"
      />
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取 消
        </el-button>
        <el-button type="primary" @click="saveProduct">
          保存
        </el-button>
      </div>
    </el-dialog>
    <el-dialog
      :visible.sync="processVisible"
      :title="$t(processFormTitle)"
      top="5vh"
      width="65%"
      :destroy-on-close="true"
    >
      <ConfigurationProcess ref="process" :id="currentId" />
      <div slot="footer" class="dialog-footer">
        <el-button>
          取 消
        </el-button>
        <el-button @click="saveProcessList">
          保存
        </el-button>
      </div>
    </el-dialog>
    <el-dialog
      :visible.sync="eventVisible"
      :title="$t(eventFormTitle)"
      top="5vh"
      width="65%"
      :destroy-on-close="true"
    >
    <button-event-setting ref="events" :id="currentId" />
    <div slot="footer" class="dialog-footer">
        <el-button>
          取 消
        </el-button>
        <el-button @click="saveEvents">
          保存
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { IProduction, IAccessories, IDevelopmentBoard } from "@/interface";
import { ProductModule } from "@/store/modules/product";
import Pagination from "@/components/Pagination/index.vue";
import BasicInfomation from "@/components/Product/BasicInfomation.vue";
import ButtonEventSetting from '@/components/Product/ButtonEventSetting.vue'
import ConfigurationProcess from "@/components/Product/ConfigurationProcess.vue";
import { saveProduct } from "@/api/product";

@Component({
  name: "production",
  components: {
    Pagination,
    BasicInfomation,
    ConfigurationProcess,
    ButtonEventSetting
  },
})
export default class extends Vue {
  get products() {
    return ProductModule.products;
  }

  get product() {
    return ProductModule.product;
  }

  private form = {};
  private formInline = {};
  private total = 0;
  private listQuery = {
    page: 1,
    pageSize: 10,
  };

  private productInfo: any = {};
  private dialogFormVisible = false;
  private eventVisible = false;
  private processVisible = false;
  private dialogFormTitle = "dialog.product_dialog_title";
  private processFormTitle = "dialog.process_dialog_title";
  private eventFormTitle = "dialog.event_dialog_title"
  private innerVisible = false;
  private loading = false;
  private step = 1;
  private buttonDisabled = true;
  private currentId = 0;
  private rules: any = {
    name: [
      {
        required: true,
        message: "请输入产品名称",
        trigger: "blur",
      },
    ],
  };

  async mounted() {
    this.loadProducts();
  }

  private cellClass(row: Array<{}>) {
    if (row.columnIndex === 0) {
      return "disabledCheck";
    }
  }

  private onSubmit() {
    console.log(111);
  }

  private getList() {
    console.log("getList");
  }

  private async add() {
    this.dialogFormVisible = true;
    this.listQuery = { page: 0, pageSize: 100 };
    await ProductModule.getDevelopmentBoards(this.listQuery);
  }

  private async loadProducts() {
    const pageParams = {
      page: this.listQuery.page > 0 ? this.listQuery.page - 1 : 0,
      pageSize: this.listQuery.pageSize,
    };
    await ProductModule.getProducts(pageParams);
  }

  private async saveProduct() {
    this.$refs.productInfo.validate(async (valid: any) => {
      if (valid) {
        const accessories: Array<IAccessories> = [];
        const accessoryArray = this.$refs.basic.accessInterfaces;
        accessoryArray.forEach((item: any) => {
          if (item.accessory) {
            accessories.push({
              accessoryInterface: { id: item.id },
              accessory: { id: item.accessory.id },
            });
          }
        });
        if (this.$refs.basic.board.id === 0) {
          this.$message({
            message: "请选择开发板",
            type: "warning",
            duration: 3000,
          });
          return false;
        }
        if (accessories.length === 0) {
          this.$message({
            message: "请选择开发板接口并绑定配件",
            type: "warning",
            duration: 3000,
          });
          return false;
        }

        this.productInfo.accessories = accessories;
        this.productInfo.developmentBoard = { id: this.$refs.basic.board.id };
        this.loading = true;
        const res: any = await saveProduct({ product: this.productInfo });
        this.loading = false;
        if (res.productId) {
          this.$message({
            message: "保存成功",
            type: "success",
            duration: 3000,
          });
          this.productInfo = {};
          this.$refs.basic.clearData();
          this.dialogFormVisible = false;
          this.loadProducts();
        }
      }
    });
  }

  private async getProduct(id: number) {
    await ProductModule.getProduct({ productId: id });
  }

  private changeButtonDisabled(flag: boolean) {
    this.buttonDisabled = flag;
  }

  private async configProcess(id: number) {
    this.processVisible = true;
    this.currentId = id;
  }

  private settingButtonEvent(id:number){
    this.currentId = id;
    this.eventVisible = true;
  }

  private async saveProcessList() {
    const obj = this.$refs.process.steps;
    const originSubprocesses = this.$refs.process.originSubprocesses;
    const processes = new Array();
    for (let key in obj) {
      const steps = new Array();
      obj[key].stepList.forEach((step: any, index: number) => {
        const subprocessType = originSubprocesses[step.subprocessTypeId];
        let stepItem: any = {};
        const { eventId, nextStepOnDone, nextStepOnError } = step;
        stepItem = { index, eventId, nextStepOnDone, nextStepOnError };
        stepItem.subProcessTypeId = subprocessType.id;
        if (step.subprocessParamsIndex !== null) {
          stepItem.subProcessIndex = step.subprocessParamsIndex;
        } else {
          if (Object.keys(subprocessType.property).length > 0) {
            stepItem.subProcessParameter = Object.values(
              subprocessType.property
            )[0];
          }
        }
        steps.push(stepItem);
      });
      processes.push({ steps });
    }

    const payload_product: any = this.product;
    const { accessories:accessArray, developmentBoard } = payload_product;
    delete payload_product.accessories;
    delete payload_product.developmentBoard;
    payload_product['developmentBoard'] = { id:developmentBoard.id}
    const accessories = []
    for(let i of accessArray) {
      const item:any = {}
      const { accessory,accessoryInterface } = i 
      const {id} = accessory;
      item['accessory'] = {id}
      Object.assign(item,{accessoryInterface})
      accessories.push(item)
    }
    payload_product['accessories'] =accessories;
    const list = originSubprocesses.slice(0, 4);
    const types: any = {};
    for (let item of list) {
      types[item.id] = [];
      for (let idx in item.subprocesses) {
        const subparam: any = item.subprocesses[idx];
        const childitem: any = { type: { id: item.id } };
        const steps = new Array(subparam.maxStepsLength).fill({});
        subparam.steps.forEach((subitem: any, sidx: number) => {
          const propertyValues = [];
          for (let key in subitem) {
            const kvmap: any = {};
            kvmap.propertyId = key;
            kvmap.value = subitem[key];
            propertyValues.push(kvmap);
          }
          steps[sidx] = { propertyValues, type: { id: item.id } };
        });
        childitem.steps = steps;
        types[item.id].push(childitem);
      }
    }
    payload_product.processes.processes = processes;
    delete payload_product.subProcesses.stepTypes;
    delete payload_product.subProcesses.types;
    payload_product.subProcesses.subProcesses = types;
    const res: any = await saveProduct({ product: payload_product });
    if (res.result === 0) {
      this.$message({
        message: "保存成功",
        type: "success",
      });
      this.processVisible = false;
      this.$refs.process.steps = {};
      this.$refs.process.originSubprocesses = {};
    }
  }

  private saveEvents(){
    console.log(this.$refs.events.eventValues)
  }
}
</script>
