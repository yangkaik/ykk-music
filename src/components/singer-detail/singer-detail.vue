<template>
  <transition name="slide">
    <div class="singer-detall">
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import { mapGetters } from 'vuex'
  import { getSingerDetail } from 'api/singer'
  import { createSong } from 'common/js/song'

  export default {
    data () {
      return {
        song: []
      }
    },
    computed: {
      ...mapGetters([
        'singer'
      ])
    },
    created () {
      this._getDetail()
      console.log(this.singer)
    },
    methods: {
      _getDetail () {
        // 没有取到id，返回singer页面
        if (!this.singer.id) {
          this.$router.push('/singer')
        }
        getSingerDetail(this.singer.id).then((res) => {
          this.song = this._normalizeSongs(res.data.list)
          console.log(this.song)
        })
      },
      _normalizeSongs (list) {
        let ret = []
        list.forEach((item) => {
          let {musicData} = item
          if (musicData.songid && musicData.albummid) {
            ret.push(createSong(musicData))
          }
        })
        return ret
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import "~common/stylus/variable"
  .singer-detall
    position: fixed
    z-index: 100
    top: 0
    left: 0
    right: 0
    bottom: 0
    background: $color-background

  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)


</style>
