<template>
  <div class="body">
    <div class="loginBg"></div>
    <div class="loginForm">
      <h3 class="loginTitle">智慧园区-登录</h3>
      <a-card class="login-card">
         <a-form layout="vertical">
          <a-form-item label="账号" :label-col="{ span: 4 }" :wrapper-col="{ span: 24 }" labelAlign="left" layout="vertical">
            <a-input style="width: 100%;"></a-input>
          </a-form-item>
          <a-form-item label="密码" :label-col="{ span: 4 }" :wrapper-col="{ span: 24 }" labelAlign="left" layout="vertical">
            <a-input-password style="width: 100%;"></a-input-password>
          </a-form-item>
          <a-form-item>
            <a-checkbox>记住我</a-checkbox>
          </a-form-item>
          <a-form-item>
            <a-button type="primary" style="width: 100%;border-radius: 4px;">登录</a-button>
          </a-form-item>
         </a-form>
         <p style="color: red;">仅用于IT培训教学使用,为保障您的个人信息安全,请勿向平台录入任何个人敏感信息（如手机号、身份证号等）！</p>
      </a-card>
    </div>
  </div>
</template>

<style lang="less">
.body {
  display: flex;
  align-items: stretch;
  height: 100vh;
  .loginBg {
    // flex: 3;
    height: 100%;
    width: 60%;
    background: rgba(38, 72, 176) url(../../assets/common/login-bg-e4ea539c.svg) no-repeat center / cover;
    border-top-right-radius: 45px;
    background-position: right top;
    // padding: 0 100px;
  }
  .loginForm {
    margin: 200px 10% 0;
    flex: 1;
    .ant-card {
      width: 100%;
      border: none;
      padding: 0;
      .ant-card-body{
        padding: 0;
      }
    }
    .loginTitle{
      padding-bottom: 76px;
      font-size: 26px;
      font-weight: 500;
      color: #1e2023;
    }
  }
}
.ant-form-item-label > label {
  font-size: 16px;
  color: #8b929d;
}
</style>