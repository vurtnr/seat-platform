<template>
  <div class="app-container">
    <el-form
      :inline="true"
      :model="formInline"
      class="demo-form-inline"
    >
      <el-form-item label="板材型号">
        <el-input
          v-model="formInline.num"
          placeholder="板材型号"
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
        @click="onAdd"
      >
        新增
      </el-button>
      <el-button type="danger">
        删除
      </el-button>
    </el-row>
    <el-table
      :data="params"
      style="width: 100%"
      height="500"
    >
      <el-table-column
        fixed
        prop="model"
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
        label="操作"
        width="180"
        align="center"
      >
        <template slot-scope="scope">
          <el-button size="mini">
            添加事件进程
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
    <el-dialog
      title="新增板材"
      :visible.sync="dialogFormVisible"
      width="30%"
    >
      <div class="dialog-container">
        <el-form
          :model="form"
          style="width:100%;"
        >
          <el-form-item
            label="型号"
            label-width="60px"
          >
            <el-input
              v-model="form.number"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item
            label="名称"
            label-width="60px"
          >
            <el-input
              v-model="form.name"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item
            label="状态"
            label-width="60px"
          >
            <el-input
              v-model="form.status"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item
            label="描述"
            label-width="60px"
          >
            <el-input
              v-model="form.describe"
              type="textarea"
              placeholder="请输入内容"
              rows="10"
              maxlength="100"
              show-word-limit
            />
          </el-form-item>
        </el-form>
        <div
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="dialogFormVisible = false">
            取 消
          </el-button>
          <el-button
            type="primary"
            @click="dialogFormVisible = false"
          >
            确 定
          </el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { PramsModule } from '@/store/modules/params'
@Component({
  name: 'setting'
})
export default class extends Vue {
  get params() {
    return PramsModule.params
  }

  private formInline: Record<string, any> = {};
  private tableData: Array<Record<string, any>> = [];
  private dialogFormVisible = false;
  private form: Record<string, any> = {};
  private onSubmit() {
    console.log(1111)
  }

  private onAdd() {
    this.dialogFormVisible = true
  }

  async mounted() {
    await PramsModule.getParams()
  }
}
</script>

<style lang="scss" scoped>
.dialog-container {
  display: flex;
  height: 500px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .transfer-footer {
    margin-left: 20px;
    padding: 6px 5px;
  }
}
a {
  position: relative;
  color: rgba(255, 255, 255, 1);
  text-decoration: none;
  background-color: rgba(219, 87, 5, 1);
  font-family: "Yanone Kaffeesatz";
  font-weight: 700;
  font-size: 12px;
  display: block;
  padding: 4px;
  -webkit-border-radius: 8px;
  -moz-border-radius: 8px;
  border-radius: 8px;
  -webkit-box-shadow: 0px 5px 0px rgba(219, 31, 5, 1),
    0px 5px 15px rgba(0, 0, 0, 0.7);
  -moz-box-shadow: 0px 5px 0px rgba(219, 31, 5, 1),
    0px 5px 15px rgba(0, 0, 0, 0.7);
  box-shadow: 0px 5px 0px rgba(219, 31, 5, 1), 0px 5px 15px rgba(0, 0, 0, 0.7);
  // margin: 100px auto;
  width: 80px;
  height: 20px;
  margin-bottom: 20px;
  text-align: center;

  -webkit-transition: all 0.1s ease;
  -moz-transition: all 0.1s ease;
  -ms-transition: all 0.1s ease;
  -o-transition: all 0.1s ease;
  transition: all 0.1s ease;
}

a:active {
  -webkit-box-shadow: 0px 3px 0px rgba(219, 31, 5, 1),
    0px 3px 6px rgba(0, 0, 0, 0.9);
  -moz-box-shadow: 0px 3px 0px rgba(219, 31, 5, 1),
    0px 3px 6px rgba(0, 0, 0, 0.9);
  box-shadow: 0px 3px 0px rgba(219, 31, 5, 1), 0px 3px 6px rgba(0, 0, 0, 0.9);
  position: relative;
  top: 6px;
}
</style>
