<template>
  <el-container class="h100">
    <!-- 菜单 -->
    <el-aside class="w280">
      <node-menu @addNode="addNode" ref="nodeMenu"></node-menu>
    </el-aside>

    <!--画布-->
    <el-main class="main">
      <el-header class="header-shaow">
        <el-row style="float:right;line-height:60px;">
          <el-button type="primary" size="small" icon="el-icon-document-checked" plain>保存</el-button>
          <el-button
            type="success"
            size="small"
            icon="el-icon-document"
            plain
            @click="dataInfo"
          >流程信息</el-button>
          <el-button
            type="warning"
            icon="el-icon-s-unfold"
            size="small"
            plain
            @click="showAttr = !showAttr"
          ></el-button>
        </el-row>
      </el-header>

      <div class="flow-con bg-grid" ref="nodeMain">
        <!-- 此处拖拽只解决 拖拽得显示问题 -->
        <draggable class="h100">
          <div id="flowContainer" class="container h100">
            <template v-for="(node,index) in data.nodeList">
              <node-flow
                v-show="node.show"
                :id="node.id"
                :node="node"
                @deleteNode="deleteNode"
                @changeNodeSite="changeNodeSite"
                @nodeRightMenu="nodeRightMenu"
                @editNode="editNode"
                :key="index"
              ></node-flow>
            </template>
          </div>
        </draggable>
      </div>
    </el-main>

    <!-- 配置栏 showAttr ? 'slide-left' : -->
    <transition name="moveR">
      <el-aside class="w280" v-if="showAttr">
        <node-attr ref="nodeAttrs"></node-attr>
      </el-aside>
    </transition>

    <!-- 流程数据详情 -->
    <flow-info v-if="flowInfoVisible" ref="flowInfo" :data="data"></flow-info>
    <!-- 流程数据表单 -->
    <!-- <flow-node-form v-if="nodeFormVisible" ref="nodeForm"></flow-node-form> -->
  </el-container>
</template>

<script>
// 节点组件
import nodeMenu from './node/menu'
import nodeFlow from './node/node'
import nodeAttr from './node/attr'
import FlowInfo from './node/info'

// 拖拽插件
import draggable from 'vuedraggable'
// 连线插件
import { jsPlumb } from 'jsplumb'
//
import lodash from 'lodash'
// end

export default {
  components: {
    nodeMenu,
    nodeFlow,
    nodeAttr,
    FlowInfo,

    draggable,
    jsPlumb,
    lodash
  },

  data () {
    return {
      // jsPlumb 实例
      jsPlumb: null,

      // 默认设置参数
      jsplumbSetting: {
        // 动态锚点、位置自适应
        Anchors: [
          'Top',
          'TopCenter',
          'TopRight',
          'TopLeft',
          'Right',
          'RightMiddle',
          'Bottom',
          'BottomCenter',
          'BottomRight',
          'BottomLeft',
          'Left',
          'LeftMiddle'
        ],
        Container: 'flowContainer',
        // 连线的样式 StateMachine、Flowchart straight Bezier
        Connector: 'Flowchart',
        // 鼠标不能拖动删除线
        ConnectionsDetachable: false,
        // 删除线的时候节点不删除
        DeleteEndpointsOnDetach: false,
        // 连线的端点
        // Endpoint: ['Dot', { radius: 5 }],
        Endpoint: ['Rectangle', { height: 10, width: 10 }],
        // 线端点的样式
        EndpointStyle: { fill: 'rgba(255,255,255,0)', outlineWidth: 1 },
        LogEnabled: true, // 是否打开jsPlumb的内部日志记录
        // 绘制线
        PaintStyle: { stroke: 'black', strokeWidth: 3 },
        // 绘制箭头
        Overlays: [['Arrow', { width: 15, length: 15, location: 1 }]],
        RenderMode: 'svg'
      },
      // jsplumb连接参数
      jsplumbConnectOptions: {
        isSource: true,
        isTarget: true,
        // 动态锚点、提供了4个方向 Continuous、AutoDefault
        anchor: 'Continuous'
      },
      jsplumbSourceOptions: {
        /* "span"表示标签，".className"表示类，"#id"表示元素id */
        filter: '.flow-node-drag',
        filterExclude: false,
        anchor: 'Continuous',
        allowLoopback: false
      },
      jsplumbTargetOptions: {
        /* "span"表示标签，".className"表示类，"#id"表示元素id */
        filter: '.flow-node-drag',
        filterExclude: false,
        anchor: 'Continuous',
        allowLoopback: false
      },

      // 是否加载完毕
      loadEasyFlowFinish: false,
      // 控制流程数据显示与隐藏
      flowInfoVisible: false,
      // 控制表单显示与隐藏
      nodeFormVisible: false,
      // end

      // 数据
      data: {},

      // 假数据
      getDataA: {
        name: '流程A',
        nodeList: [
          {
            id: 'nodeA',
            name: '流程A-节点A',
            left: '26px',
            top: '161px',
            img: require('@/assets/flow/SamplemySQLschema.png'),
            show: true,
            fromJson: [
              // 输入框
              {
                type: 'input',
                title: '节点名称',
                field: 'name',
                value: null,
                col: {
                  span: 24
                  // labelWidth: 150,
                },
                props: {
                  placeholder: '请输入资产名称'
                },
                validate: [
                  {
                    message: '资产名称不能为空',
                    required: true
                  },
                  {
                    min: 1,
                    max: 50,
                    trigger: 'change',
                    message: '资产名称的长度限制为50个字符'
                  }
                ],
                options: null,
                children: null,
                emit: null,
                emitPrefix: null
              },
              // 级联
              {
                type: 'cascader',
                title: '节点配置 - 级联',
                field: 'departmentId',
                value: null,
                col: {
                  span: 24
                },
                props: {
                  clearable: true,
                  options: [
                    {
                      keywords: null,
                      pageNo: 1,
                      pageSize: 10,
                      id: 2,
                      name: '测试部门',
                      parentId: 0,
                      tel: null,
                      description: '本地数据库-普通部门',
                      createTime: null,
                      deleted: null,
                      departmentDtoList: null,
                      regionId: null,
                      parentName: null
                    },
                    {
                      keywords: null,
                      pageNo: 1,
                      pageSize: 10,
                      id: 5,
                      name: '销售部门',
                      parentId: 0,
                      tel: null,
                      description: '本地数据库-销售部',
                      createTime: null,
                      deleted: null,
                      departmentDtoList: null,
                      regionId: null,
                      parentName: null
                    },
                    {
                      keywords: null,
                      pageNo: 1,
                      pageSize: 10,
                      id: 6,
                      name: '上海',
                      parentId: 0,
                      tel: null,
                      description: null,
                      createTime: null,
                      deleted: null,
                      departmentDtoList: null,
                      regionId: null,
                      parentName: null
                    },
                    {
                      keywords: null,
                      pageNo: 1,
                      pageSize: 10,
                      id: 7,
                      name: '运维开发',
                      parentId: 0,
                      tel: null,
                      description: null,
                      createTime: null,
                      deleted: null,
                      departmentDtoList: null,
                      regionId: null,
                      parentName: null
                    },
                    {
                      keywords: null,
                      pageNo: 1,
                      pageSize: 10,
                      id: 8,
                      name: '成都',
                      parentId: 0,
                      tel: null,
                      description: null,
                      createTime: null,
                      deleted: null,
                      departmentDtoList: null,
                      regionId: null,
                      parentName: null
                    },
                    {
                      keywords: null,
                      pageNo: 1,
                      pageSize: 10,
                      id: 9,
                      name: '研发部',
                      parentId: 0,
                      tel: null,
                      description: null,
                      createTime: null,
                      deleted: null,
                      departmentDtoList: null,
                      regionId: null,
                      parentName: null
                    },
                    {
                      keywords: null,
                      pageNo: 1,
                      pageSize: 10,
                      id: 14,
                      name: '部门删除-关联用户',
                      parentId: 0,
                      tel: null,
                      description: '部门删除-关联用户',
                      createTime: null,
                      deleted: null,
                      departmentDtoList: null,
                      regionId: null,
                      parentName: null
                    },
                    {
                      keywords: null,
                      pageNo: 1,
                      pageSize: 10,
                      id: 16,
                      name: '部门删除-关联资源',
                      parentId: 0,
                      tel: null,
                      description: '部门删除-关联资源',
                      createTime: null,
                      deleted: null,
                      departmentDtoList: null,
                      regionId: null,
                      parentName: null
                    },
                    {
                      keywords: null,
                      pageNo: 1,
                      pageSize: 10,
                      id: 17,
                      name: '关联用户',
                      parentId: 0,
                      tel: null,
                      description: '关联用户111',
                      createTime: null,
                      deleted: null,
                      departmentDtoList: null,
                      regionId: null,
                      parentName: null
                    },
                    {
                      keywords: null,
                      pageNo: 1,
                      pageSize: 10,
                      id: 18,
                      name: '部门-关联资产',
                      parentId: 0,
                      tel: null,
                      description: '关联资产',
                      createTime: null,
                      deleted: null,
                      departmentDtoList: null,
                      regionId: null,
                      parentName: null
                    },
                    {
                      keywords: null,
                      pageNo: 1,
                      pageSize: 10,
                      id: 42,
                      name: '科技部',
                      parentId: 0,
                      tel: null,
                      description: null,
                      createTime: null,
                      deleted: null,
                      departmentDtoList: null,
                      regionId: null,
                      parentName: null
                    }
                  ],
                  placeholder: '请选择使用部门',
                  expandTrigger: 'hover',
                  props: {
                    children: 'departmentDtoList',
                    label: 'name',
                    checkStrictly: true,
                    value: 'id'
                  }
                },
                validate: null,
                options: null,
                children: null,
                emit: ['change'],
                emitPrefix: 'departmentId-on'
              },
              // 下拉框
              {
                type: 'select',
                title: '节点配置 - 下拉框',
                field: 'userId',
                value: null,
                col: {
                  span: 24
                },
                props: {
                  placeholder: '请选择使用人'
                },
                validate: null,
                options: [
                  {
                    label: '胡顺顺',
                    value: 2
                  },
                  {
                    label: '赵松',
                    value: 3
                  },
                  {
                    label: '孙付云',
                    value: 4
                  },
                  {
                    label: '管理员1',
                    value: 5
                  },
                  {
                    label: '普通用户1',
                    value: 6
                  },
                  {
                    label: '技术人员1',
                    value: 7
                  },
                  {
                    label: '技术经理1',
                    value: 8
                  },
                  {
                    label: '服务台1',
                    value: 9
                  },
                  {
                    label: '管理员2',
                    value: 23
                  },
                  {
                    label: '普通用户2',
                    value: 24
                  },
                  {
                    label: '技术人员2',
                    value: 25
                  },
                  {
                    label: '技术经理2',
                    value: 26
                  },
                  {
                    label: '服务台2',
                    value: 27
                  },
                  {
                    label: '胡波用户',
                    value: 39
                  },
                  {
                    label: '胡波技术人员',
                    value: 40
                  },
                  {
                    label: '胡波技术经理',
                    value: 41
                  },
                  {
                    label: '胡波服务台',
                    value: 42
                  },
                  {
                    label: '胡波管理员',
                    value: 43
                  },
                  {
                    label: 'bbbb',
                    value: 47
                  }
                ],
                children: null,
                emit: null,
                emitPrefix: null
              },
              // 时间选择器
              {
                type: 'DatePicker',
                title: '节点配置 - 时间选择器',
                field: 'buyDate',
                value: null,
                col: {
                  span: 24
                },
                props: {
                  clearable: true,
                  editable: false,
                  format: 'yyyy-MM-dd',
                  placeholder: '请选择购买日期',
                  type: 'date'
                },
                validate: null,
                options: null,
                children: null,
                emit: null,
                emitPrefix: null
              },
              // 多行文本
              {
                type: 'input',
                title: '节点配置 - 多行文本',
                col: {
                  span: 24
                },
                field: 'textarea_1578020124000_6974',
                value: '',
                props: {
                  disabled: false,
                  placeholder: '',
                  type: 'textarea'
                },
                validate: [],
                options: null,
                children: null,
                emit: null,
                emitPrefix: null
              }
            ]
          },
          {
            id: 'nodeB',
            name: '流程A-节点B',
            left: '340px',
            top: '161px',
            img: require('@/assets/flow/SamplemySQLschema.png'),
            show: true,
            fromJson: []
          },
          {
            id: 'nodeC',
            name: '流程A-节点C',
            left: '739px',
            top: '161px',
            img: require('@/assets/flow/SamplemySQLschema.png'),
            show: true,
            fromJson: []
          }
        ],
        lineList: [
          {
            from: 'nodeA',
            to: 'nodeB'
          },
          {
            from: 'nodeB',
            to: 'nodeC'
          }
        ]
      },

      // 属性栏显示
      showAttr: false
    }
  },
  mounted () {
    // 创建实例
    this.jsPlumb = jsPlumb.getInstance()
    console.log(this.jsPlumb, '创建实例')

    this.$nextTick(() => {
      // 默认加载流程A的数据、在这里可以根据具体的业务返回符合流程数据格式的数据即可
      this.dataReload(this.getDataA)
    })
  },
  methods: {
    // 随机数
    getUUID () {
      return Math.random()
        .toString(36)
        .substr(3, 10)
    },

    // 加载流程图
    dataReload (data) {
      // console.log(data, '数据')
      // this.easyFlowVisible = false
      this.data.nodeList = []
      this.data.lineList = []

      this.$nextTick(() => {
        // 拷贝对象
        data = lodash.cloneDeep(data)
        this.data = data
        // this.easyFlowVisible = true

        this.$nextTick(() => {
          // 创建实例
          this.jsPlumb = jsPlumb.getInstance()

          this.$nextTick(() => {
            this.jsPlumbInit()
          })
        })
      })
    },

    // 生成 节点方法
    jsPlumbInit () {
      // jsPlumb实例化完成
      this.jsPlumb.ready(() => {
        // 导入默认配置
        this.jsPlumb.importDefaults(this.jsplumbSetting)

        // 会使整个jsPlumb立即重绘。
        this.jsPlumb.setSuspendDrawing(false, true)

        // 初始化节点
        this.loadEasyFlow()

        // 单点击了连接线,
        this.jsPlumb.bind('click', (conn, originalEvent) => {
          this.$confirm('确定删除所点击的线吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
            .then(() => {
              this.jsPlumb.deleteConnection(conn)
            })
            .catch(() => { })
        })

        // 连线
        this.jsPlumb.bind('connection', evt => {
          let from = evt.source.id
          let to = evt.target.id
          //
          if (this.loadEasyFlowFinish) {
            this.data.lineList.push({ from: from, to: to })
          }
        })

        // 删除连线回调
        this.jsPlumb.bind('connectionDetached', evt => {
          this.deleteLine(evt.sourceId, evt.targetId)
        })

        // 改变线的连接节点
        this.jsPlumb.bind('connectionMoved', evt => {
          this.changeLine(evt.originalSourceId, evt.originalTargetId)
        })

        // 单击endpoint
        // jsPlumb.bind("endpointClick", function (evt) {
        //   console.log('endpointClick', evt)
        // })
        // // 双击endpoint
        // jsPlumb.bind("endpointDblClick", function (evt) {
        //   console.log('endpointDblClick', evt)
        // })
        // contextmenu
        // this.jsPlumb.bind('contextmenu', evt => {
        //   console.log('contextmenu', evt)
        // })

        // 连线
        this.jsPlumb.bind('beforeDrop', evt => {
          let from = evt.sourceId
          let to = evt.targetId
          if (from === to) {
            this.$message.error('不能连接自己')
            return false
          }
          if (this.hasLine(from, to)) {
            this.$message.error('不能重复连线')
            return false
          }
          if (this.hashOppositeLine(from, to)) {
            this.$message.error('不能回环')
            return false
          }
          this.$message({
            message: '连线成功',
            type: 'success'
          })
          return true
        })

        // beforeDetach
        this.jsPlumb.bind('beforeDetach', evt => {
          console.log('beforeDetach', evt)
        })
      })
    },

    // 加载流程图
    loadEasyFlow () {
      // 初始化节点
      for (var i = 0; i < this.data.nodeList.length; i++) {
        let node = this.data.nodeList[i]
        // 设置源点，可以拖出线连接其他节点
        this.jsPlumb.makeSource(node.id, this.jsplumbSourceOptions)
        // 设置目标点，其他源点拖出的线可以连接该节点
        this.jsPlumb.makeTarget(node.id, this.jsplumbTargetOptions)

        this.jsPlumb.draggable(node.id, {
          containment: 'parent'
        })
      }

      // 初始化连线
      for (let i = 0; i < this.data.lineList.length; i++) {
        let line = this.data.lineList[i]
        this.jsPlumb.connect(
          {
            source: line.from,
            target: line.to
          },
          this.jsplumbConnectOptions
        )
      }

      this.$nextTick(function () {
        this.loadEasyFlowFinish = true
      })
    },

    // 删除线
    deleteLine (from, to) {
      this.data.lineList = this.data.lineList.filter(function (line) {
        if (line.from === from && line.to === to) {
          return false
        }
        return true
      })
    },

    // 改变连线
    changeLine (oldFrom, oldTo) {
      this.deleteLine(oldFrom, oldTo)
    },

    // 改变节点的位置
    changeNodeSite (data) {
      for (var i = 0; i < this.data.nodeList.length; i++) {
        let node = this.data.nodeList[i]
        if (node.id === data.nodeId) {
          node.left = data.left
          node.top = data.top
        }
      }
    },

    /**
     * 拖拽结束后添加新的节点
     * @param evt 拖拽dom对象
     * @param nodeMenu 被添加的节点对象
     * @param mousePosition 鼠标拖拽结束的坐标
     */
    addNode (evt, nodeMenu, mousePosition) {
      // 获取目标区域在页面中得位置 top and left 最小和最大值
      // 目标区域
      let nodeMain = this.$refs.nodeMain.getBoundingClientRect()
      let nodeMainval = {
        top: {
          min: nodeMain.top,
          max: nodeMain.bottom
        },
        left: {
          min: nodeMain.left,
          max: nodeMain.right
        }
      }
      let mousexy = {
        top: mousePosition.top,
        left: mousePosition.left
      }
      // 结束位置
      if (mousexy.top < 0 && mousexy.left < 0) {
        mousexy.left = evt.originalEvent.x
        mousexy.top = evt.originalEvent.y
      }
      // console.log(nodeMainval, '目标区域..')
      // console.log(mousexy, width, '拖拽元素..')

      // 判断是否在目标区域
      if (
        mousexy.top > nodeMainval.top.min &&
        mousexy.top < nodeMainval.top.max &&
        mousexy.left > nodeMainval.left.min &&
        mousexy.left < nodeMainval.left.max
      ) {
        // 鼠标坐标处理 减去侧边栏宽度 减去顶部高度
        let top = mousexy.top - 60
        let left = mousexy.left - 280

        // 获取随机数 -> 处理坐标
        let nodeId = this.getUUID()
        let node = {
          id: nodeId,
          name: nodeMenu.name,
          top: top + 'px',
          left: left + 'px',
          img: nodeMenu.img,
          show: true,
          fromJson: nodeMenu.fromJson // 表单模板
        }
        this.data.nodeList.push(node)
        // console.log('目标区域中。。。', node, this.data)
        this.$nextTick(function () {
          this.jsPlumb.makeSource(nodeId, this.jsplumbSourceOptions) // 配置元素并随后从该元素中拖动连接时，将创建并分配一个新的端点
          this.jsPlumb.makeTarget(nodeId, this.jsplumbTargetOptions)
          this.jsPlumb.draggable(nodeId, {
            containment: 'parent'
          })
        })
      } else {
        this.$notify({
          title: '警告',
          message: '拖拽节点超出目标区域',
          type: 'warning'
        })
      }
      console.log(this.data, 'this.data')
    },

    /**
     * 删除节点
     * @param nodeId 被删除节点的ID
     */
    deleteNode (nodeObj) {
      this.$confirm('确定要删除节点' + nodeObj.name + '?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        closeOnClickModal: false
      })
        .then(() => {
          /**
           * 这里需要进行业务判断，是否可以删除
           */
          this.data.nodeList = this.data.nodeList.filter(function (node) {
            if (node.id === nodeObj.id) {
              // 伪删除，将节点隐藏，否则会导致位置错位
              node.show = false
            }
            return true
          })
          this.$nextTick(function () {
            this.jsPlumb.removeAllEndpoints(nodeObj.id)
          })
        })
        .catch(() => { })
      return true
    },

    nodeRightMenu (nodeId, evt) {
      this.menu.show = true
      this.menu.curNodeId = nodeId
      this.menu.left = evt.x + 'px'
      this.menu.top = evt.y + 'px'
    },

    /**
     * 编辑节点
     * @param nodeId 被点击编辑的节点的ID
     */
    editNode (node) {
      // 判断属性栏是否显示
      if (!this.showAttr) {
        this.showAttr = true
      }

      // 子组件生成表单信息
      this.$nextTick(() => {
        this.$refs.nodeAttrs.creatForm(node)
      })

      // this.nodeFormVisible = true
      // this.$nextTick(function () {
      //   this.$refs.nodeForm.init(this.data, nodeId)
      // })
    },

    // 流程数据信息
    dataInfo () {
      this.flowInfoVisible = true
      this.$nextTick(function () {
        this.$refs.flowInfo.init()
      })
    },

    // 是否具有该线
    hasLine (from, to) {
      for (var i = 0; i < this.data.lineList.length; i++) {
        var line = this.data.lineList[i]
        if (line.from === from && line.to === to) {
          return true
        }
      }
      return false
    },

    // 是否含有相反的线
    hashOppositeLine (from, to) {
      return this.hasLine(to, from)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#flowContainer {
  position: relative;
}
.bg-grid {
  background-image: linear-gradient(
      90deg,
      rgba(180, 180, 180, 0.15) 10%,
      rgba(0, 0, 0, 0) 10%
    ),
    linear-gradient(rgba(180, 180, 180, 0.18) 10%, rgba(0, 0, 0, 0) 10%);
  background-size: 12px 12px;
}
.header-shaow {
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.07);
}
.h100 {
  height: 100%;
}
.w280 {
  width: 280px !important;
  box-shadow: 0 2px 0 4px rgba(131, 86, 86, 0.07);
}
.main {
  padding: 0;
}
.flow-con {
  height: calc(100% - 60px);
}

/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
::-webkit-scrollbar {
  width: 8px; /*滚动条宽度*/
  height: 8px; /*滚动条高度*/
}
/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track {
  /* -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1); */
  border-radius: 8px; /*滚动条的背景区域的圆角*/
  background-color: rgba(0, 0, 0, 0); /*滚动条的背景颜色*/
}
/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  border-radius: 8px; /*滚动条的圆角*/
  /* -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3); */
  background-color: rgba(0, 0, 0, 0.1); /*滚动条的背景颜色*/
}

.moveR-enter,
.moveR-leave-to {
  margin-right: -280px;
}
.moveR-enter-active,
.moveR-leave-active {
  transition: all 0.3s linear;
}
</style>
