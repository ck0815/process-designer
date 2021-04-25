<template>
  <div ref="node" :style="nodeContainerStyle" @mouseup="changeNodePosition">
    <!-- @mouseenter="mouseEnter=true"
    @mouseleave="mouseEnter=false"-->
    <el-row class="node-con">
      <el-col :span="6">
        <img :src="node.img" width="40px" :class="nodeIcoClass" style="float:left;" />
      </el-col>
      <el-col :span="18">
        <div class="flow-node-header">
          <!--左上角的那个图标样式-->
          <!-- <i :class="nodeIcoClass"></i> -->
          <!--鼠标移入到节点中时右上角的【编辑】、【删除】 按钮 v-show="mouseEnter"-->
          <div class="flow-node-operate">
            <a href="javascript:void(0)" @click="editNode">
              <i class="el-icon-edit-outline"></i>
            </a>&nbsp;
            <a href="javascript:void(0)" @click="deleteNode">
              <i class="el-icon-delete"></i>
            </a> &nbsp;
          </div>
        </div>
        <!--节点的正文部分-->
        <div class="flow-node-body">{{node.name}}</div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: {
    node: Object
  },
  data () {
    return {
      // 控制节点操作显示
      // mouseEnter: false
    }
  },
  computed: {
    // 节点容器样式
    nodeContainerStyle () {
      return {
        position: 'absolute',
        width: '175px',
        top: this.node.top,
        left: this.node.left,
        backgroundColor: 'transparent'
      }
    },
    nodeIcoClass () {
      var nodeIcoClass = {}
      // nodeIcoClass[this.node.img] = true
      // 添加该class可以推拽连线出来
      nodeIcoClass['flow-node-drag'] = true
      return nodeIcoClass
    }
  },
  methods: {
    // 删除节点
    deleteNode () {
      this.$emit('deleteNode', this.node)
    },
    // 编辑节点
    editNode () {
      this.$emit('editNode', this.node)
    },
    // 鼠标移动后抬起
    changeNodePosition () {
      // 避免抖动
      if (
        this.node.left === this.$refs.node.style.left &&
        this.node.top === this.$refs.node.style.top
      ) {
        return
      }
      this.$emit('changeNodeSite', {
        nodeId: this.node.id,
        left: this.$refs.node.style.left,
        top: this.$refs.node.style.top
      })
    }
  }
}
</script>

<style>
.node-con {
  border: 1px solid #ccc;
  border-radius: 6px;
  background: #ffffff;
  padding: 2px 8px;
  cursor: pointer;
  box-shadow: 0 0 2px #ccccccf3 inset;
}
.node-con:hover {
  box-shadow: 0 0 6px #ccc inset;
}

.flow-node-header {
  height: 20px;
}

.flow-node-header a {
  text-decoration: none;
  line-height: 25px;
  vertical-align: middle;
}

.flow-node-header a img {
  line-height: 25px;
  vertical-align: middle;
  margin-bottom: 5px;
}

.flow-node-body {
  text-align: center;
  height: 20px;
  line-height: 20px;
  color: #333;
  font-size: 13px;
}

/* 修改、删除按钮样式*/
.flow-node-operate {
  position: absolute;
  top: 0px;
  right: 0px;
  line-height: 20px;
}
</style>
