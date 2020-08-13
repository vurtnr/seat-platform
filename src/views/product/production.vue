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
        prop="model"
        label="产品型号"
        align="center"
        width="150"
      />
      <el-table-column
        prop="name"
        label="产品名称"
        align="center"
        width="120"
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
          <el-button size="mini">
            编辑
          </el-button>
          <el-button size="mini" type="danger">
            删除
          </el-button>
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
      :visible.sync="dialogFormVisible"
      :title="$t(dialogFormTitle)"
      top="5vh"
      width="60%"
      height="800px"
    >
      <el-form
        ref="form"
        :inline="true"
        :model="productInfo"
        label-width="80px"
        size="mini"
      >
        <el-form-item label="产品名称">
          <el-input v-model="productInfo.name"></el-input>
        </el-form-item>
        <el-form-item label="产品型号">
          <el-input v-model="productInfo.model"></el-input>
        </el-form-item>
        <el-form-item label="产品描述">
          <el-input v-model="productInfo.note" style="width:400px"></el-input>
        </el-form-item>
      </el-form>
      <el-tabs tab-position="left" style="margin-top:20px;">
        <el-tab-pane label="产品详情">
          <basic-infomation ref="basic" @set-product-data="setProductInfo" />
        </el-tab-pane>
        <el-tab-pane label="功能列表">
          <div class="product-content"></div>
        </el-tab-pane>
      </el-tabs>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveProduct"
          >保存</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { IProductOriginal,IAccessories } from "@/interface";
import { ProductModule } from "@/store/modules/product";
import Pagination from "@/components/Pagination/index.vue";
import BasicInfomation from "@/components/Product/BasicInfomation.vue";

@Component({
  name: "production",
  components: {
    Pagination,
    BasicInfomation,
  },
})
export default class extends Vue {
  get products() {
    return ProductModule.products;
  }
  private form = {};
  private formInline = {};
  private total: number = 0;
  private listQuery = {
    page: 0,
    pageSize: 10,
  };
  private productInfo: IProductOriginal = {};
  private dialogFormVisible = false;
  private dialogFormTitle = "dialog.product_dialog_title";
  private innerVisible = false;

  async mounted() {
    await ProductModule.getProducts(this.listQuery);
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

  private setProductInfo(jsonData: any) {
    this.productInfo = jsonData;
  }

  private saveProduct() {
    const accessories : Array<IAccessories> = []
    const accessoryArray = this.$refs.basic.accessInterfaces
    accessoryArray.forEach((item:any) => {
      accessories.push({accessoryInterface:{id:item.id},accessory:{id:item.accessory.id}})
    })
    this.productInfo.accessories = accessories
    this.productInfo.developmentBoard = {id:this.$refs.basic.board.id}
    console.log(this.productInfo)
  }
}
</script>

<style lang="scss">
.product-content {
  width: 100%;
  display: flex;
  height: 550px;
  min-height: 550px;
}
</style>
