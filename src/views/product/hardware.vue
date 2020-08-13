<template>
  <div class="app-container">
    <el-form
      :inline="true"
      :model="formInline"
      class="demo-form-inline"
    >
      <el-form-item label="硬件型号">
        <el-input
          v-model="formInline.num"
          placeholder="硬件型号"
        />
      </el-form-item>
      <el-form-item label="硬件名称">
        <el-input
          v-model="formInline.name"
          placeholder="硬件名称"
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
        prop="photo"
        label="图片"
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
      width="700px"
    >
      <div class="dialog-container">
        <el-form
          ref="form"
          :model="form"
          label-width="80px"
          style="width:500px"
        >
          <el-form-item label="硬件类别">
            <el-select
              v-model="form.hardwareType"
              placeholder="请选择"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="硬件名称">
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item label="硬件型号">
            <el-input v-model="form.number" />
          </el-form-item>
          <el-form-item label="描述">
            <el-input
              v-model="form.desc"
              type="textarea"
            />
          </el-form-item>
          <el-form-item label="图片">
            <el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
            >
              <i class="el-icon-plus" />
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img
                width="100%"
                :src="dialogImageUrl"
                alt=""
              >
            </el-dialog>
          </el-form-item>
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
  private dialogFormVisible = false;
  private dialogFormTitle = 'dialog.hardware_add';
  private form: Record<string, any> = {};
  private dialogImageUrl = '';
  private dialogVisible = false;
  private options: Array<Record<string, any>> = [
    {
      value: '选项1',
      label: '阀'
    },
    {
      value: '选项2',
      label: '控制器'
    },
    {
      value: '选项3',
      label: '喷管'
    }
  ];

  private onSubmit() {
    console.log(111)
  }

  private getList() {
    console.log(2222)
  }

  private handleRemove(
    file: Record<string, any>,
    fileList: Array<Record<string, any>>
  ) {
    console.log(file)
    console.log(fileList)
  }

  private handlePictureCardPreview(file: Record<string, any>) {
    this.dialogImageUrl = file.url
    this.dialogVisible = true
  }
}
</script>

<style lang="scss" scoped>
.dialog-container {
  display: flex;
  justify-content: center;
}
</style>
