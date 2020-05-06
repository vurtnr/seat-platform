<template>
  <div class="app-container">
    <el-button
      type="primary"
    >
      {{ $t('permission.createRole') }}
    </el-button>
    <el-table
      :data="roles"
      style="width: 100%;margin-top:30px;"
      border
    >
      <el-table-column
        align="center"
        :label="$t('permission.roleKey')"
        width="220"
      >
        <template slot-scope="scope">
          {{ scope.row.key }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        :label="$t('permission.roleName')"
        width="220"
      >
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column
        align="header-center"
        :label="$t('permission.description')"
      >
        <template slot-scope="scope">
          {{ scope.row.description }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="small"
          >
            {{ $t('permission.editPermission') }}
          </el-button>
          <el-button
            type="danger"
            size="small"
          >
            {{ $t('permission.delete') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { getRoles } from '@/api/roles'
import { IRoleData } from '@/api/types'

@Component({
  name: 'Role'
})
export default class extends Vue {
  private roles: Array<IRoleData> = []
  private roleLoading = false

  created() {
    this.getRoles()
    console.log(this.roles)
  }

  private async getRoles() {
    this.roleLoading = true
    const { data } = await getRoles({})
    this.roles = data
    this.roleLoading = false
  }
}
</script>

<style>

</style>
