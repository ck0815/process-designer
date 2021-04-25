<template>
  <div>
    <h1 class="logo">logo</h1>
    <el-menu default-active="2" class="el-menu-vertical-demo">
      <el-submenu :index="item.id" v-for="item in menuList" :key="item.id">
        <!--一级菜单名称、不可拖拽 -->
        <template slot="title">
          <span>{{item.name}}</span>
        </template>

        <el-menu-item-group>
          <draggable @end="addNode" v-model="item.children" v-bind="draggableOptions">
            <el-menu-item v-for="ele in item.children" :key="ele.id" :index="ele.id" :id="ele.id">
              <img :src="ele.img" width="32px" style="margin-right:10px;" />
              {{ele.name}}
            </el-menu-item>
          </draggable>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import config from '@/components/layout/config.js'

export default {
  components: {
    draggable
  },
  data () {
    return {
      // 类型   // group  --  timer
      // 菜单列表
      menuList: config.menuList,

      // 拖拽插件配置项
      draggableOptions: {
        // 定义是否列表单元是否可以在列表容器内进行拖拽排序；
        sort: false,
        // 当拖动filter时是否触发event.preventDefault()默认触发
        preventOnFilter: false
      },

      // 鼠标位置
      mousePosition: {
        left: -1,
        top: -1
      }
    }
  },
  created () {
    /**
     * 以下是为了解决在火狐浏览器上推拽时弹出tab页到搜索问题
     * @param event
     */
    if (this.isFirefox()) {
      let that = this
      document.body.ondrop = function (event) {
        // 解决火狐浏览器无法获取鼠标拖拽结束的坐标问题
        that.mousePosition.left = event.layerX
        that.mousePosition.top = event.clientY - 50
        event.preventDefault()
        event.stopPropagation()
      }
    }
  },
  methods: {
    // 拖拽结束时触发
    addNode (evt) {
      var id = evt.item.attributes.id.value
      this.$emit('addNode', evt, this.getMenu(id), this.mousePosition)
      console.log(evt, this.getMenu(id), this.mousePosition, '拖拽结束时触发')
    },

    // 根据类型获取左侧菜单对象
    getMenu (id) {
      for (let i = 0; i < this.menuList.length; i++) {
        let children = this.menuList[i].children
        for (let j = 0; j < children.length; j++) {
          if (children[j].id === id) {
            return children[j]
          }
        }
      }
    },

    // 是否是火狐浏览器
    isFirefox () {
      var userAgent = navigator.userAgent
      if (userAgent.indexOf('Firefox') > -1) {
        return true
      }
      return false
    }
  }
}
</script>
<style scoped>
.logo {
  height: 60px;
  line-height: 60px;
  padding: 0 20px;
  text-align: center;
}
</style>
