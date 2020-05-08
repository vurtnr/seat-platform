<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form
        :inline="true"
        :model="listQuery"
      >
        <el-form-item label="用户名">
          <el-input
            v-model="listQuery.name"
            :placeholder="$t('table.name')"
            style="width:200px"
            class="filter-item"
            @keyup.enter.native="handleFilter"
          />
        </el-form-item>
        <el-form-item label="状态">
          <el-select
            v-model="listQuery.status"
            placeholder="请选择"
          >
            <el-option
              v-for="item in statusList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">
            查询
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="filter-container">
      <el-button
        size="small"
        plain
        type="success"
        icon="el-icon-circle-plus"
        @click="showAddDialog"
      >
        邀请
      </el-button>
      <!-- <el-button
        size="small"
        plain
        type="danger"
        icon="el-icon-error"
      >
        禁用
      </el-button> -->
    </div>
    <div class="filter-container">
      <el-table
        :key="tableKey"
        v-loading="listLoading"
        :data="list"
        fit
        highlight-current-row
        style="width: 100%;"
        @sort-change="sortChange"
        @expand-change="expandChange"
      >
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-row
            :gutter="20"
              v-for="item in props.row.peoples"
              :key="item.phone"
              class="merchant-users"
            >
                <el-col :span="4" style="display:flex;align-items:center;justify-content:center;">
                  <el-avatar
                    shape="square"
                    :size="30"
                    fit="cover"
                    :src="item.avatar"
                  />
                </el-col>
                <el-col :span="4">{{item.name}}</el-col>
                <el-col :span="4">{{item.phone}}</el-col>
                <el-col :span="4">{{item.email}}</el-col>
                <el-col :span="8">
                   <el-button type="success" v-if="item.status === 3" plain size="small">启用</el-button>
                   <el-button type="primary" v-if="item.status === 1" plain size="small">禁用</el-button>
                   <el-button type="danger" plain size="small">删除</el-button>
                </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column
          header-align="center"
          align="center"
          prop="name"
          :label="$t('table.merchantname')"
        />
        <el-table-column
          header-align="center"
          align="center"
          prop="address"
          :label="$t('table.address')"
        />
        <el-table-column
          header-align="center"
          align="center"
          prop="email"
          :label="$t('table.email')"
        />
        <el-table-column
          header-align="center"
          align="center"
          prop="phone"
          :label="$t('table.phone')"
        />
        <el-table-column
          label="操作"
          width="100px"
          header-align="center"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              plain
              @click.native.stop="onEditor(scope.id)"
            >
              {{ $t("table.btn.check") }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
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
      <el-form
        ref="dataForm"
        :model="tempUserData"
        label-position="left"
        label-width="100px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item
          :label="$t('form.user.name')"
          prop="name"
        >
          <el-input v-model="tempUserData.name" />
        </el-form-item>
        <!-- <el-form-item :label="$t('form.user.password')" prop="name">
          <el-input type="password" v-model="tempUserData.password" autocomplete="off"/>
        </el-form-item>
        <el-form-item :label="$t('form.user.checkPass')" prop="checkPass">
          <el-input type="password" v-model="tempUserData.checkPass" autocomplete="off"></el-input>
        </el-form-item> -->
        <el-form-item
          :label="$t('form.user.email')"
          prop="email"
        >
          <el-input v-model="tempUserData.email" />
        </el-form-item>
        <el-form-item
          :label="$t('form.user.phone')"
          prop="phone"
        >
          <el-input v-model="tempUserData.phone" />
        </el-form-item>
        <el-form-item
          :label="$t('form.user.role')"
          prop="role"
        >
          <el-select
            v-model="tempUserData.role"
            multiple
            placeholder="请选择"
            style="width:300px"
          >
            <el-option
              v-for="item in roles"
              :key="item.key"
              :label="item.name"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select
            v-model="tempUserData.status"
            placeholder="请选择"
          >
            <el-option
              v-for="item in statusList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogFormVisible = false">
          {{ $t("table.cancel") }}
        </el-button>
        <el-button type="primary">
          {{ $t("table.confirm") }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { getUsers, defaultUserData, getMerchants } from '@/api/users'
import { getRoles } from '@/api/roles'
import { IUserData, IRoleData } from '@/api/types'
import Pagination from '@/components/Pagination/index.vue'

@Component({
  name: 'User',
  components: {
    Pagination
  }
})
export default class extends Vue {
  private tableKey = 0;
  private listLoading = false;
  private list: Array<IUserData> = [];
  private roles: Array<IRoleData> = [];
  private dialogFormVisible = false;
  private dialogFormTitle = 'dialog.user_add';
  private statusList = [
    { value: 1, label: '启用', type: 'success' },
    { value: 2, label: '冻结', type: '' },
    { value: 3, label: '禁用', type: 'danger' }
  ];

  private total = 0;
  private tempUserData = defaultUserData;

  private listQuery = {
    page: 1,
    limit: 20,
    name: undefined,
    status: undefined,
    sort: '+id'
  };

  async created() {
    this.getList()
    const { data } = await getRoles({})
    this.roles = data
  }

  private async getList() {
    this.listLoading = true
    const { data } = await getMerchants(this.listQuery)
    console.log(data)
    this.list = data.items
    this.total = data.total

    setTimeout(() => {
      this.listLoading = false
    }, 0.5 * 1000)
  }

  private handleFilter() {
    this.listQuery.page = 1
    this.getList()
  }

  private sortChange(data: any) {
    const { prop, order } = data
    if (prop === 'id') {
      this.sortByID(order)
    }
  }

  private expandChange(data: any) {
    console.log(data)
  }

  private sortByID(order: string) {
    if (order === 'ascending') {
      this.listQuery.sort = '+id'
    } else {
      this.listQuery.sort = '-id'
    }
    this.handleFilter()
  }

  private showAddDialog() {
    this.dialogFormTitle = 'dialog.user_add'
    this.dialogFormVisible = true
  }

  private onEditor() {
    this.dialogFormTitle = 'dialog.user_editor'
    this.dialogFormVisible = true
  }
}
</script>

<style lang="scss" scoped>
.merchant-users {
  display: flex;
  align-items: center;
  height:40px;
  line-height:40px;
  margin-bottom: 10px;
  width:100%;
}
</style>
