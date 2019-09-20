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
      <h2 class="title font-weight-black">INSTANT CHAT</h2>
      <v-spacer></v-spacer>
      <v-toolbar-title @click="">即时聊天</v-toolbar-title>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
    </v-toolbar>
    <v-content style="padding: 0 0 0;">
      <div class="homepage-hero-module">
        <div class="video-container">
          <div :style="fixStyle" class="filter">
            <div id="particles-js">
              <div class="login">
                <div class="login-top">
                  <a style="color: white">INSTANT - 登录</a>
                </div>
                <div class="login-center clearfix">
                  <div class="login-center-img"><img src="../assets/name.png"/></div>
                  <div class="login-center-input">
                    <input type="text" name="" value="" placeholder="请输入您的用户名" v-model="userName"/>
                    <!--<div class="login-center-input-text">用户名不能为空</div>-->
                  </div>
                </div>
                <div class="login-center clearfix">
                  <div class="login-center-img"><img src="../assets/password.png"/></div>
                  <div class="login-center-input">
                    <input type="password" name=""value="" placeholder="请输入您的密码" v-model="passWd"/>
                    <!--<div class="login-center-input-text">密码不能为空</div>-->
                  </div>
                </div>
                <div class="login-button" @click="doLogin">
                  登陆
                </div>
              </div>
              <div class="sk-rotating-plane"></div>
            </div>
          </div>
          <video :style="fixStyle" autoplay loop muted class="fillWidth" v-on:canplay="canplay">
            <source src="../assets/video/G1s.mp4" type="video/mp4"/>
            浏览器不支持 video 标签，建议升级浏览器。
            <source src="../assets/video/G1w.webm" type="video/webm"/>
            浏览器不支持 video 标签，建议升级浏览器。
          </video>
          <div class="poster hidden" v-if="!vedioCanPlay">
            <img :style="fixStyle" src="../assets/video/G1.jpg" alt="">
          </div>
        </div>
      </div>
    </v-content>
    <!--底部-->
    <v-footer
      height="auto"
      color="#263238"
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
        <!--<v-flex-->
          <!--style="background-color: #0496a9"-->
          <!--py-3-->
          <!--text-xs-center-->
          <!--white&#45;&#45;text-->
          <!--xs12-->
        <!--&gt;-->
          <!--&copy;2018 — <strong>花花世界</strong>-->
        <!--</v-flex>-->
      </v-layout>
    </v-footer>
  </v-app>
</template>

<script>
  import menus from '../menu'
  export default {
    data: () => ({
      userName: '',
      passWd: '',
      drawer: false,
      dark: false,
      miniVariant: false,
      links: [
        'Home',
        'About Us',
        'Team',
        'Services',
        'Blog',
        'Contact Us'
      ],
      vedioCanPlay: false,
      fixStyle: ''
    }),
    props: {
      source: String
    },
    methods:{
      doLogin(){
        if(!this.userName || !this.passWd){
          this.openCenter("提示：用户名或密码不能为空!","warning")
          return false;
        }
        const form = {};
        form.username = this.userName;
        form.password = this.passWd;
        this.$http.post("/user/login",this.$qs.stringify(form)).then(resp => {
          if(resp.data.code === 1){
            this.openCenter("恭喜你登录成功!","success")
            this.$router.push("/chat/socket")
          }else if(resp.data.code === -1){
            this.openCenter("提示：用户名或密码错误!","warning")
            this.$router.push("/")
          }
        }).catch(() => {
          this.openCenter("提示：服务端访问失败!","error")
        })
      },
      openCenter(msg,type) {
        this.$message({
          message: msg,
          center: true,
          offset: 120,
          type: type
        });
      },
      canplay() {
        this.vedioCanPlay = true
      }
    },
    computed: {
      items(){
        return menus;
      }
    },
    mounted: function() {
      window.onresize = () => {  //屏幕适应
        const windowWidth = document.body.clientWidth
        const windowHeight = document.body.clientHeight
        const windowAspectRatio = windowHeight / windowWidth
        let videoWidth
        let videoHeight
        if (windowAspectRatio < 0.5625) {
          videoWidth = windowWidth
          videoHeight = videoWidth * 0.5625
          this.fixStyle = {
            height: windowWidth * 0.5625 + 'px',
            width: windowWidth + 'px',
            'margin-bottom': (windowHeight - videoHeight) / 2 + 'px',
            'margin-left': 'initial'
          }
        } else {
          videoHeight = windowHeight
          videoWidth = videoHeight / 0.5625
          this.fixStyle = {
            height: windowHeight + 'px',
            width: windowHeight / 0.5625 + 'px',
            'margin-left': (windowWidth - videoWidth) / 2 + 'px',
            'margin-bottom': 'initial'
          }
        }
      }
      window.onresize()
    }
  }
</script>

<style scoped>
@import "../css/reset.css";
@import "../css/style.css";
</style>
