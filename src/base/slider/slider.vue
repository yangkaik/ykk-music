<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot>

      </slot>
    </div>
    <div class="dots">

    </div>
  </div>
</template>

<script type="text/ecmascript-6">
//  import Bscoll from 'better-scroll'
  import { addClass } from 'common/js/dom'

  export default {
    props: {
      // 轮播
      loop: {
        type: Boolean,
        default: true
      },
      // 循环轮播
      autoPlay: {
        type: Boolean,
        default: true
      },
      // 轮播间隔
      interval: {
        type: Number,
        default: 4000
      }
    },
    // dom渲染再完执行
    mounted () {
      setTimeout(() => {
        this._setSliderWidth()
        this._initSlider()
      }, 20)
    },
    methods: {
      // 计算轮播宽度
      _setSliderWidth () {
        // 所有子容器
        this.children = this.$refs.sliderGroup.children
        let width = 0
        // 子容器宽度（屏幕宽度）
        let sliderWidth = this.$refs.slider.clientWidth
        // 循环图片张数
        for (let i = 0; i < this.children.length; i++) {
          // 子容器的dom
          let child = this.children[i]
          // 子容器dom添加class
          addClass(child, 'slider-item')
          // 子容器的宽度
          child.style.width = sliderWidth + 'px'
          // 容器宽度总和
          width += sliderWidth
          // 当循环滚动时，slider的宽度需要为两倍
          if (this.loop) {
            width += 2 * sliderWidth
          }
          this.$refs.sliderGroup.style.width = width + 'px'
        }
      },
      // 初始化轮播
      _initSlider () {

      }
    }
  }
</script>

<style scoped lang="stylus">
  @import "~common/stylus/variable"

  .slider
    min-height: 1px
    .slider-group
      position: relative
      overflow: hidden
      white-space: nowrap
      .slider-item
        float: left
        box-sizing: border-box
        overflow: hidden
        text-align: center
        a
          display: block
          width: 100%
          overflow: hidden
          text-decoration: none
        img
          display: block
          width: 100%
    .dots
      position: absolute
      right: 0
      left: 0
      bottom: 12px
      text-align: center
      font-size: 0
      .dot
        display: inline-block
        margin: 0 4px
        width: 8px
        height: 8px
        border-radius: 50%
        background: $color-text-l
        &.active
          width: 20px
          border-radius: 5px
          background: $color-text-ll
</style>
