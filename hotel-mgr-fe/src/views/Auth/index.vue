<template>
  <div class="auth">
    <div class="bg"></div>
    <div class="title-info">
      <img src="../../assets/title.jpg" alt="" />
      <h2 class="title">酒店管理系统 后台</h2>
    </div>

    <div class="form">
      <a-tabs>
        <a-tab-pane key="1" tab="登录">
          <div class="item">
            <a-input size="large" placeholder="账户">
              <template v-slot:prefix>
                <UserOutlined />
              </template>
            </a-input>
          </div>

          <div class="item">
            <a-input size="large" placeholder="密码">
              <template v-slot:prefix>
                <LockOutlined />
              </template>
            </a-input>
          </div>

          <div class="item">
            <a href="">忘记密码</a>
          </div>

          <div class="item">
            <a-button size="large" type="primary"> 登录 </a-button>
          </div>
        </a-tab-pane>
        <a-tab-pane key="2" tab="注册">
          <div class="item">
            <a-input
              size="large"
              placeholder="账户"
              v-model:value="regForm.account"
            >
              <template v-slot:prefix>
                <UserOutlined />
              </template>
            </a-input>
          </div>

          <div class="item">
            <a-input
              size="large"
              placeholder="密码"
              v-model:value="regForm.password"
            >
              <template v-slot:prefix>
                <LockOutlined />
              </template>
            </a-input>
          </div>

          <div class="item">
            <a-input size="large" placeholder="邀请码">
              <template v-slot:prefix>
                <MailOutlined />
              </template>
            </a-input>
          </div>

          <div class="item">
            <a href="">忘记密码</a>
          </div>

          <div class="item">
            <a-button size="large" @click="register" type="primary">
              注册</a-button
            >
          </div>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>


<script src='./index.js'></script>

<style lang="scss" scoped>
  @import './index.scss';
</style>