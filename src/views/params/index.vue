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
      title="新增功能"
      :visible.sync="dialogFormVisible"
      width="30%"
    >
      <div class="dialog-container">
        <el-form
          :model="form"
          style="width:100%;"
        >
          <el-form-item
            label-width="120px"
            label="功能"
          >
            <el-select
              v-model="funcType"
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
          <template v-if="funcType === 1 || funcType === 2">
            <el-form-item
              label-width="120px"
              label="阀数"
            >
              <el-select
                v-model="piston"
                placeholder="请选择"
                @change="change"
              >
                <el-option
                  label="1"
                  value="1"
                />
                <el-option
                  label="2"
                  value="2"
                />
                <el-option
                  label="3"
                  value="3"
                />
              </el-select>
            </el-form-item>
          </template>
          <template v-if="funcData.length > 0">
            <el-form-item
              label-width="120px"
              label="硬件设置"
            >
              <el-table
                :data="funcData"
                style="width: 100%"
              >
                <el-table-column
                  prop="name"
                  label="名称"
                  width="80px"
                />
                <el-table-column
                  prop="type"
                  label="类别"
                >
                  <template slot-scope="scope">
                    <el-select
                      v-model="scope.row.funcType"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in scope.row.type"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </template>
                </el-table-column>
              </el-table>
            </el-form-item>
            <el-form-item
              label-width="120px"
              label="执行时间(s)"
            >
              <el-input v-model="processTime">
                <template slot="append">
                  秒
                </template>
              </el-input>
            </el-form-item>
            <el-form-item
              label-width="120px"
              label="等待时间"
            >
              <el-input v-model="waitTime">
                <template slot="append">
                  秒
                </template>
              </el-input>
            </el-form-item>
          </template>
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
            @click="save"
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

interface IFunc {
  value: number
  label: string
}

interface IFuncData {
  id: number
  name: string
  type: Array<Record<string, any>>
  flag: boolean
  funcType?: number
}

@Component({
  name: 'setting'
})
export default class extends Vue {
  get params() {
    return PramsModule.params
  }

  private options: Array<IFunc> = [
    { value: 1, label: '大便冲水' },
    { value: 2, label: '小便冲水' }
  ];

  private formInline: Record<string, any> = {};
  private tableData: Array<Record<string, any>> = [];
  private dialogFormVisible = false;
  private form: Record<string, any> = {};
  private funcType = null;
  private funcData: Array<IFuncData> = [];
  private piston = null;
  private waitTime = 0;
  private processTime = 0;

  private onSubmit() {
    console.log(1111)
  }

  private onAdd() {
    this.dialogFormVisible = true
  }

  async mounted() {
    // await PramsModule.getParams()
  }

  private save() {
    console.log(this.funcData)
  }

  private change() {
    this.funcData = []
    for (let i = 0; i < this.piston; i++) {
      const data = {
        id: i + 1,
        name: i + 1 + '号阀',
        type: [
          { value: '01', label: '单稳态' },
          { value: '02', label: '双稳态' }
        ],
        flag: false
      }
      this.funcData.push(data)
    }
    // this.funcData = [
    //   {
    //     id: 1,
    //     name: '1号阀',
    //     type: [
    //       { value: '01', label: '单稳态' },
    //       { value: '02', label: '双稳态' }
    //     ],
    //     flag: false
    //   },
    //   {
    //     id: 2,
    //     name: '2号阀',
    //     type: [
    //       { value: '01', label: '单稳态' },
    //       { value: '02', label: '双稳态' }
    //     ],
    //     flag: false
    //   },
    //   {
    //     id: 3,
    //     name: '3号阀',
    //     type: [
    //       { value: '01', label: '单稳态' },
    //       { value: '02', label: '双稳态' }
    //     ],
    //     flag: false
    //   }
    // ]
  }
}
</script>

<style lang="scss" scoped>
.dialog-container {
  display: flex;
  height: 600px;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  .dialog-footer {
    position: absolute;
    bottom: 0;
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
