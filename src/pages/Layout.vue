<template>
  <v-app id="inspire">
    <v-navigation-drawer
      :dark="dark"
      persistent
      :mini-variant="miniVariant"
      v-model="drawer"
      enable-resize-watcher
      fixed
      right
      app
    >
      <!--<v-toolbar flat class="transparent">-->
        <!--<v-list class="pa-0">-->
          <!--<v-list-tile avatar>-->
            <!--<v-list-tile-avatar>-->
              <!--<img src="../assets/name.png">-->
            <!--</v-list-tile-avatar>-->
            <!--<v-list-tile-content>-->
              <!--<v-list-tile-title>{{ username }}</v-list-tile-title>-->
            <!--</v-list-tile-content>-->
          <!--</v-list-tile>-->
        <!--</v-list>-->
      <!--</v-toolbar>-->
      <!--<v-divider/>-->
      <v-list class="pt-0" dense>
        <v-list-group
          v-model="item.active"
          v-for="item in items"
          :key="item.title"
          :prepend-icon="item.action"
          no-action
        >
          <!--一级菜单-->
          <v-list-tile slot="activator">
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <!--二级菜单-->
          <v-list-tile v-for="subItem in item.items" :key="subItem.title" :to="item.path + subItem.path">
            <v-list-tile-content>
              <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon>{{ subItem.action }}</v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="cyan" dark fixed app>
      <!--<img src="../assets/logo.png" style="float: left;margin-left: -9%"/>-->
      <h2 class="title font-weight-black">Instant chat</h2>
      <v-spacer></v-spacer>
      <v-toolbar-title>即时聊天</v-toolbar-title>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
    </v-toolbar>
    <!--style="background-image: url('https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1562843322690&di=0bbf80d22bb3c3f12df05724d95b06f6&imgtype=0&src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201311%2F15%2F175104gjozvdtjvzz6xqhs.jpg')"-->
    <v-content style="padding: 15px 0px 0px;">
      <div>
        <!--锚点-->
        <router-view></router-view>
      </div>
    </v-content>
    <!--底部-->
    <v-footer
      height="auto"
      color="white"
    >
      <!--color="cyan lighten-1"--(lighten-1):减1颜色变淡，反之亦然-->
      <v-layout
        justify-center
        row
        wrap
      >
        <v-btn
          v-for="link in links"
          :key="link"
          color="white"
          flat
          round
        >
          {{ link }}
        </v-btn>
        <v-flex
          style="background-color: white"
          py-3
          text-xs-center
          black--text
          xs12
        >
          &copy;2018 — <strong>花花世界</strong>
        </v-flex>
      </v-layout>
    </v-footer>
  </v-app>
</template>

<script>
  import menus from '../menu'
  export default {
    data: () => ({
      drawer: false,
      dark: false,
      miniVariant: false,
      username: '花花',
      links: [
        'Home',
        'About Us',
        'Team',
        'Services',
        'Blog',
        'Contact Us'
      ]
    }),
    name: "Layout",
    watch: {},
    props: {
      source: String
    },
    computed: {
      items(){
        return menus;
      }
    },
    methods:{
      toCar(){
        this.$router.push("/chat/cards")
      }
    }
  }
</script>

<style scoped>

</style>
