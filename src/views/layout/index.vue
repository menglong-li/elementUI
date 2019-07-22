<template>
  <el-container>
    <div class="zhezhao" :class="menuOpen" @click="toggle"></div>
    <el-row class="tac" :class="menuOpen">
      <el-col :span="24">
        <el-menu :router="true" :default-active="this.$route.path" class="el-menu-vertical-demo" :collapse="isCollapse"
          background-color="rgb(48, 65, 86)" text-color="rgb(191, 203, 217)" active-text-color="rgb(64, 158, 255)">
          <el-menu-item index="/home">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-submenu index="/setting">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span>系统设置</span>
            </template>
            <el-menu-item index="/setting/web">参数设置</el-menu-item>
            <el-menu-item index="/setting/admin">管理员</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-user"></i>
              <span>会员管理</span>
            </template>
            <el-menu-item index="3-1">会员信息</el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-goods"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item index="4-1">在售商品</el-menu-item>
            <el-menu-item index="4-2">下架商品</el-menu-item>
            <el-menu-item index="4-3">商品类别</el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-truck"></i>
              <span>订单管理</span>
            </template>
            <el-menu-item index="5-1">订单管理</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>

    <el-container id="Contents" :class="menuOpen">
      <el-header>
        <el-row>
          <el-col :span="1"><i class="el-icon-s-fold" @click="toggle"></i></el-col>
          <el-col :span="11">
            <Breadcrumb></Breadcrumb>
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
  import Breadcrumb from '@/components/Breadcrumb';
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
        if (this.isCollapse) {
          this.isCollapse = false;
          this.menuOpen = 'open';
        } else {
          this.isCollapse = true;
          this.menuOpen = 'close';
        }
      },
      async loginout() {
        await this.$store.commit('loginOut');
        this.$router.push('/login');
      }
    },
    created: function () {
      if (window.screen.width < 736) {
        this.isCollapse = true;
        this.menuOpen = 'close';
      }
    },
    components: { Breadcrumb },
  }
</script>

<style lang="scss">
li{list-style: none;}
  .tac {
    position: fixed !important;
    z-index: 999;
  }

  .el-menu {
    border: none !important;
    text-align: left;
  }

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    height: 100%;
    width: 200px;
    min-height: 100vh;
  }

  .el-menu-vertical-demo.el-menu--collapse {
    min-height: 100vh;
  }

  .el-menu .el-menu-item:hover,
  .el-menu li div:hover {
    background-color: rgb(38, 52, 69) !important;
  }

  .el-submenu .el-menu-item {
    background-color: #1f2d3d !important;
  }

  .el-submenu .el-menu-item:hover {
    background-color: #001528 !important;
  }


  #Contents {
    transition: margin-left 0.3s;
    -moz-transition: margin-left 0.3s;
    /* Firefox 4 */
    -webkit-transition: margin-left 0.3s;
    /* Safari 和 Chrome */
    -o-transition: margin-left 0.3s;

    /* Opera */
    &.open {
      margin-left: 200px;
    }

    &.close {
      margin-left: 64px;
    }
  }

  .el-header,
  .el-header .el-breadcrumb {
    line-height: 60px;
    vertical-align: middle;
    text-align: left;
  }

  .el-header i:first-child {
    font-size: 22px;
    position: relative;
    top: 0.1rem;
  }

  .el-header .el-breadcrumb {
    margin-left: 15px;
  }

  .el-dropdown {
    float: right;
  }

  .el-header .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }

  .el-header .el-icon-arrow-down {
    font-size: 12px;
  }

  .tableDel-Page{display: flex; margin-top: 20px; justify-content:space-between;}
  .tableDel-Page .delete{flex:1;}
  .tableDel-Page .el-pagination{flex:1; margin-top: 0px; text-align: right;}

  @media screen and (max-width: 736px) {
    .tac.open {
      left: 0px;
    }

    .tac.close {
      left: -64px;
    }

    #Contents.open,
    #Contents.close {
      margin-left: 0px;
    }

    .zhezhao.open {
      background: #000;
      opacity: .3;
      width: 100%;
      top: 0;
      height: 100%;
      position: fixed;
      z-index: 999;
    }
  }
</style>