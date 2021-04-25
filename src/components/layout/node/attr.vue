<template>
  <div class="attr-con">
    <div class="sub-title">设置属性 {{ this.data.name ? "（ "+ this.data.name + " ）" : ''}}</div>

    <div class="form">
      <form-create :rule="list" :option="option" v-model="fApi" />
      <div class="noData" v-if="!list.length">--&nbsp;&nbsp;&nbsp;暂无数据&nbsp;&nbsp;&nbsp;--</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 列表
      data: {},
      fApi: {},
      list: [],
      option: {
        // 提供方法
        mounted: function name ($f) {
          $f.on('department-id-on-change', function (e) {})
          $f.on('btnsubmit-on-click', function () {
            $f.submit()
          })
        },

        // 隐藏按钮 - 使用自定义按钮
        submitBtn: false,
        resetBtn: false,
        // 表单整体显示规则配置
        form: {
          // 行内表单模式
          inline: false,
          // 表单域标签的位置，如果值为 left 或者 right 时，则需要设置 label-width
          labelPosition: 'top',
          // 表单域标签的宽度，例如 '50px'。作为 Form 直接子元素的 form-item 会继承该值。支持 auto。
          labelWidth: 'auto',
          // 用于控制该表单内组件的尺寸 medium / small / mini
          size: 'small'
        },
        onSubmit: function (formData) {}
      }
    }
  },
  created () {},
  methods: {
    creatForm (evnt) {
      console.log(evnt, '表单。。。')
      this.data = evnt || {}
      this.list = evnt.fromJson.length ? evnt.fromJson : []
    }
  }
}
</script>

<style >
.el-cascader,
.el-select,
.el-date-editor {
  width: 100% !important;
}
</style>

<style scoped>
.attr-con {
  padding: 0 20px;
}
.sub-title {
  height: 60px;
  line-height: 60px;
}
.form .noData {
  text-align: center;
  padding: 200px 0;
  color: #999;
}
</style>
