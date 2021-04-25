// 菜单栏配置
const menuList = [
  {
    id: '1',
    type: 'group',
    name: '操作系统',
    children: [
      {
        id: '1-1',
        type: 'timer',
        name: 'CentOS',
        img: require('@/assets/flow/centos.png'),
        // 表单模板
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
        id: '1-2',
        type: 'task',
        name: 'coreos',
        img: require('@/assets/flow/coreos.png'),
        // 表单模板
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
        id: '1-3',
        type: 'task',
        name: 'Debian',
        img: require('@/assets/flow/debian.png')
      },
      {
        id: '1-4',
        type: 'task',
        name: 'Fedora',
        img: require('@/assets/flow/fedora.png')
      },
      {
        id: '1-5',
        type: 'task',
        name: 'FreeBSD',
        img: require('@/assets/flow/freebsd.png')
      },
      {
        id: '1-6',
        type: 'task',
        name: 'Oracle_Linux',
        img: require('@/assets/flow/Oracle12c.png')
      },
      {
        id: '1-7',
        type: 'task',
        name: 'Redhat',
        img: require('@/assets/flow/redhat.png')
      },

      {
        id: '1-8',
        type: 'task',
        name: 'SUSE',
        img: require('@/assets/flow/opensuse.png')
      },

      {
        id: '1-9',
        type: 'task',
        name: 'Ubuntu',
        img: require('@/assets/flow/ubuntu.png')
      },
      {
        id: '1-10',
        type: 'task',
        name: 'Windows',
        img: require('@/assets/flow/windows.png')
      }
    ]
  },
  {
    id: '2',
    type: 'group',
    name: '系统配置',
    children: [
      {
        id: '2-1',
        type: 'timer',
        name: 'Mysql',
        img: require('@/assets/flow/SamplemySQLschema.png')
      },
      {
        id: '2-2',
        type: 'task',
        name: 'Zabbix2',
        img: require('@/assets/flow/Zabbix.png')
      }
    ]
  },
  {
    id: '3',
    type: 'group',
    name: '应用软件',
    children: [
      {
        id: '3-1',
        type: 'timer',
        name: 'Tomcat1',
        img: require('@/assets/flow/tomcat.png')
      },
      {
        id: '3-2',
        type: 'task',
        name: 'Zabbix-Agent',
        img: require('@/assets/flow/Zabbix.png')
      }
    ]
  },
  {
    id: '4',
    type: 'group',
    name: '应用配置',
    children: [
      {
        id: '4-1',
        type: 'timer',
        name: 'Apache',
        img: require('@/assets/flow/tomcat.png')
      },
      {
        id: '4-2',
        type: 'task',
        name: 'Zabbix',
        img: require('@/assets/flow/Zabbix.png')
      }
    ]
  }
]
// 对应表单配置

export default {
  menuList
}
