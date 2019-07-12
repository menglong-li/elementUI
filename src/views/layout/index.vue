<template>
        <el-container>
                <div class="zhezhao" :class="menuOpen" @click="toggle"></div>
                <el-row class="tac" :class="menuOpen">
                  <el-col :span="24">
                    <el-menu
                      default-active="2"
                      class="el-menu-vertical-demo"
                      :collapse="isCollapse"
                      background-color="rgb(48, 65, 86)"
                      text-color="rgb(191, 203, 217)"
                      active-text-color="rgb(191, 203, 217)">
                      <el-submenu index="1">
                        <template slot="title">
                          <i class="el-icon-location"></i>
                          <span>导航一</span>
                        </template>
                        <el-menu-item index="1-1">选项1</el-menu-item>
                        <el-menu-item index="1-2">选项2</el-menu-item>
                        <el-menu-item index="1-3">选项3</el-menu-item>
                      </el-submenu>
                      <el-menu-item index="2">
                        <i class="el-icon-menu"></i>
                        <span slot="title">导航二</span>
                      </el-menu-item>
                      <el-menu-item index="3" disabled>
                        <i class="el-icon-document"></i>
                        <span slot="title">导航三</span>
                      </el-menu-item>
                      <el-menu-item index="4">
                        <i class="el-icon-setting"></i>
                        <span slot="title">导航四</span>
                      </el-menu-item>
                    </el-menu>
                  </el-col>
                </el-row>
          
                <el-container id="Contents" :class="menuOpen">
                  <el-header>
                    <el-row>
                      <el-col :span="1"><i class="el-icon-s-fold" @click="toggle"></i></el-col>
                      <el-col :span="11">
                        <el-breadcrumb separator-class="el-icon-arrow-right">
                          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                          <el-breadcrumb-item>活动管理</el-breadcrumb-item>
                        </el-breadcrumb>
                      </el-col>
                      <el-col :span="12">
                        <el-dropdown>
                          <span class="el-dropdown-link">
                            admin<i class="el-icon-arrow-down el-icon--right"></i>
                          </span>
                          <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>首页</el-dropdown-item>
                            <el-dropdown-item>个人中心</el-dropdown-item>
                            <el-dropdown-item>技术支持</el-dropdown-item>
                            <el-dropdown-item divided @click.native="loginout">退出登陆</el-dropdown-item>
                          </el-dropdown-menu>
                        </el-dropdown>
                      </el-col>
                    </el-row>
                  </el-header>
                  <el-main>
                    <router-view />
                  </el-main>
                </el-container>
              </el-container>
</template>

<script>
        export default {
          data() {
            return {
              name: 'Layout',
              isCollapse: false,
              menuOpen: 'open'
            }
          },
          methods: {
            toggle() {
              if(this.isCollapse){
                this.isCollapse = false;
                this.menuOpen = 'open';
              }else {
                this.isCollapse = true;
                this.menuOpen = 'close';
              }
            },
            async loginout() {
              await this.$store.commit('loginOut');
              this.$router.push('/login');
            }
          },
          created:function() {
            if(window.screen.width < 736) {
              this.isCollapse = true;
              this.menuOpen = 'close';
            }
          }
        }
        </script>
        
        <style lang="scss">
        body{margin: 0px;}
        #app {
          font-family: 'Avenir', Helvetica, Arial, sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          text-align: center;
          color: #2c3e50;
        }
        .tac{position: fixed!important;z-index: 999;}
        .el-menu{border:none!important;text-align: left;}
        .el-menu-vertical-demo:not(.el-menu--collapse){ height: 100%;
            width: 200px;
            min-height: 100vh;
          }
        .el-menu-vertical-demo.el-menu--collapse{min-height: 100vh;}
        .el-menu .el-menu-item:hover,.el-menu li div:hover{background-color: rgb(38,52,69)!important;}
        .el-submenu .el-menu-item{background-color: #1f2d3d!important;}
        .el-submenu .el-menu-item:hover{background-color: #001528!important;}
        
        
        
        #Contents{
          transition: margin-left 0.3s;
          -moz-transition: margin-left 0.3s; /* Firefox 4 */
          -webkit-transition: margin-left 0.3s; /* Safari 和 Chrome */
          -o-transition: margin-left 0.3s; /* Opera */
          &.open{margin-left: 200px;}
          &.close{margin-left: 64px;}
        }
        
        .el-header,.el-header .el-breadcrumb{line-height: 60px; vertical-align: middle; text-align: left;}
        .el-header i:first-child{font-size: 22px;position:relative;top:0.1rem;}
        .el-header .el-breadcrumb{ margin-left: 15px;}
        
        .el-dropdown{float: right;}
        .el-header .el-dropdown-link {cursor: pointer;color: #409EFF;}
        .el-header .el-icon-arrow-down {font-size: 12px;}
        
        @media screen and (max-width: 736px) {
          .tac.open{left: 0px; }
          .tac.close{left: -64px; }
          #Contents.open,#Contents.close{margin-left: 0px;}
          .zhezhao.open{
            background: #000;
            opacity: .3;
            width: 100%;
            top: 0;
            height: 100%;
            position: absolute;
            z-index: 999;}
        }
        </style>