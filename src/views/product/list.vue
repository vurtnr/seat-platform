<template>
  <div class="app-container">
    <el-form
      :inline="true"
      :model="formInline"
      class="demo-form-inline"
    >
      <el-form-item label="设备型号">
        <el-input
          v-model="formInline.num"
          placeholder="设备型号"
        />
      </el-form-item>
      <el-form-item label="设备名称">
        <el-input
          v-model="formInline.name"
          placeholder="设备名称"
        />
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          @click="onSubmit"
        >
          查询
        </el-button>
      </el-form-item>
    </el-form>
    <el-row>
      <el-button
        type="success"
        @click="dialogFormVisible = true"
      >
        新增
      </el-button>
    </el-row>
    <el-table
      :data="products"
      style="width: 100%"
      height="500"
    >
      <el-table-column
        fixed
        prop="number"
        label="型号"
        align="center"
        width="150"
      />
      <el-table-column
        prop="name"
        label="名称"
        align="center"
        width="120"
      />
      <el-table-column
        prop="status"
        label="状态"
        align="center"
        width="120"
      />
      <el-table-column
        prop="desc"
        align="center"
        label="描述"
      />
      <el-table-column
        prop="createTime"
        align="center"
        label="创建时间"
      />
      <el-table-column
        label="操作"
        width="180"
        align="center"
      >
        <template slot-scope="scope">
          <el-button size="mini">
            编辑
          </el-button>
          <el-button
            size="mini"
            type="danger"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />
    <el-dialog
      :visible.sync="dialogFormVisible"
      :title="$t(dialogFormTitle)"
    >
      <div class="dialog-container">
        <el-form
          ref="form"
          :model="form"
          label-width="120px"
        >
          <el-form-item label="设备名称">
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item label="描述">
            <el-input
              v-model="form.desc"
              type="textarea"
            />
          </el-form-item>
          <div class="properties-container">
            <div class="properties-header">
              增加硬件属性
              <el-button
                size="mini"
                icon="el-icon-plus"
                circle
                @click="addProperty"
              />
            </div>
            <div style="flex:1">
              <div class="item-container">
                <el-table
                  :data="tableData"
                  stripe
                  style="width: 100%"
                >
                  <el-table-column
                    label="配件名称"
                    width="180"
                    header-align="center"
                  >
                    <template slot-scope="scope">
                      <el-input
                        v-model="scope.row.name"
                        placeholder="请输入内容"
                      />
                    </template>
                  </el-table-column>
                  <el-table-column
                    width="250"
                    label="配件属性"
                    header-align="center"
                  >
                    <template slot-scope="scope">
                      <el-select
                        v-model="scope.row.valueType"
                        placeholder="请选择"
                      >
                        <el-option
                          v-for="item in types"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        />
                      </el-select>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </div>
          <!-- <el-form-item label="设备配件信息">
            <div class="item-container">
              <el-table
                :data="tableData"
                stripe
                style="width: 100%"
                :show-header="false"
              >
                <el-table-column
                  prop="name"
                  label="配件名称"
                  width="180"
                />
                <el-table-column width="250">
                  <template slot-scope="scope">
                    <el-select
                      v-model="scope.row.type"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in types"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-form-item> -->
          <el-form-item>
            <el-button
              type="primary"
              @click="onSubmit"
            >
              立即创建
            </el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Pagination from '@/components/Pagination/index.vue'

interface IProduct {
  number: string
  name: string
  status: number
  hardware: Array<any>
  desc: string
  createTime: string
}

interface IListQuery {
  totalPage?: number
  products?: Array<IProduct>
}

@Component({
  name: 'productList',
  components: {
    Pagination
  }
})
export default class extends Vue {
  private formInline: Record<string, any> = {};
  private products: Array<IProduct> = [];
  private total = 0;
  private listQuery: IListQuery = {};
  private form: Record<string, any> = {};
  private types: Array<Record<string, any>> = [
    {
      value: '选项1',
      label: '黄金糕'
    },
    {
      value: '选项2',
      label: '双皮奶'
    },
    {
      value: '选项3',
      label: '蚵仔煎'
    },
    {
      value: '选项4',
      label: '龙须面'
    },
    {
      value: '选项5',
      label: '北京烤鸭'
    }
  ];

  private tableData: Array<Record<string, any>> = [];
  private dialogFormVisible = false;
  private dialogFormTitle = 'dialog.add_equipment';

  private onSubmit() {
    console.log(111)
  }

  private getList() {
    console.log(2222)
  }

  private addProperty() {
    this.tableData.push({ name: '', valueType: null })
  }
}
</script>

<style lang="scss" scoped>
.item-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.dialog-container {
  display: flex;
  justify-content: center;
}
.properties-container {
  width: 100%;
  text-align: center;
  font-size: 14px;
  display: flex;
  margin-bottom: 50px;
  .properties-header {
    width: 150px;
    padding: 0 12px 0 0;
    font-size: 14px;
    color: #1f2d3d;
    line-height: 36px;
    font-weight: 700;
    float: left;
    text-align: right;
    display: inline-block;
  }
}
</style>
