<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot>
      </slot>
    </div>
    <div class="dots">
      <span class="dot" v-for="(item,index) in dots" :class="{active:currentPageIndex === index}"></span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import { addClass } from 'common/js/dom'

  export default {
    data () {
      return {
        // 轮播圆点
        dots: [],
        currentPageIndex: 0
      }
    },
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
        this._initDots()
        this._initSlider()
        if (this.autoPlay) {
          this._play()
        }
      }, 20)
    },
    methods: {
      // 圆点
      _initDots () {
        this.dots = new Array(this.children.length)
      },
      // 计算轮播宽度
      _setSliderWidth (isResize) {
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
        }
        // 当循环滚动时，slider的宽度需要为两倍
        if (this.loop && !isResize) {
          width += 2 * sliderWidth
        }
        this.$refs.sliderGroup.style.width = width + 'px'
      },
      // 初始化轮播
      _initSlider () {
        this.slider = new BScroll(this.$refs.slider, {
          // 横轴方向初始化位置
          scrollX: true,
          // 纵轴方向初始化位置
          scrollY: false,
          // 当快速在屏幕上滑动一段距离的时候，会根据滑动的距离和时间计算出动量，并生成滚动动画。设置为 true 则开启动画
          momentum: false,
          // 自动分割容器，用于制作走马灯效果等
          snap: true,
          snapLoop: this.loop,
          snapThreshold: 0.3,
          snapSpeed: 400,
          // 允许点击
          click: true
        })

        this.slider.on('scrollEnd', () => {
          // 通过BScroll自带方法，获取当前index
          let pageIndex = this.slider.getCurrentPage().pageX
          if (this.loop) {
            pageIndex -= 1
          }
          // 将pageIndex赋值给currentPageIndex
          this.currentPageIndex = pageIndex

          if (this.autoPlay) {
            // 防止与手动拖动起冲突，每次滚动结束清空时间
            clearTimeout(this.timer)
            this._play()
          }
        })
      },
      _play () {
        let pageIndex = this.currentPageIndex + 1
        if (this.loop) {
          pageIndex += 1
        }
        // 设置定时器
        this.timer = setTimeout(() => {
          // BScroll自带方法跳转
          this.slider.goToPage(pageIndex, 0, 400)
        }, this.interval)
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import "~common/stylus/variable"

  .slider
    min-height: 1px
    position: relative
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
