<template>
  <div class="login-box">
    <video ref="video" id="video" autoplay loop muted>
        <source src="http://terryzvk.top/bg.mp4" type="video/mp4"  />
    </video>
    <span id="voice"></span>
    <div class="login_container">
      <el-form ref="form" :label-position="labelPosition" :rules="rules" label-width="100px" :model="form">
        <el-form-item v-if="!isloginPage" label="用户名" prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item  label="邮箱" prop="email">
          <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="密码"  v-if="isloginPage" prop="password">
          <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="密码"  v-if="!isloginPage" prop="password1">
          <el-input type="password" v-model="form.password1" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" v-if="!isloginPage" prop="password2">
          <el-input type="password"  v-model="form.password2" placeholder="请输入密码"></el-input>
        </el-form-item>

        <el-form-item v-if="isloginPage" class="tc">
          <el-button class="submit_btn" size="large" type="primary" @click="handleLogin">登录</el-button>
        </el-form-item>
        <el-form-item v-if="isloginPage" style="color:#fff">没账号？去<router-link :to="{name: '/register'}"><span style="fontSize:16px">注册</span></router-link>一个吧</el-form-item>
        <el-form-item v-else class="tc">
          <el-button class="submit_btn" size="large" type="primary" @click="handleRegister">注册</el-button>
        </el-form-item>
        <el-form-item v-if="!isloginPage" style="color:#fff">已有账号？去<router-link :to="{name: '/login'}"><span style="fontSize:16px">登录</span></router-link></el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        labelPosition: 'right',
        isloginPage: true,
        muted: false,
        form: {
          username: undefined,
          email: undefined,
          password: undefined,
          password1: undefined,
          password2: undefined
        },
        rules: {
          username: [
            { required: true, message: '用户名不能为空', trigger: 'blur'},
          ],
          email: [
            { required: true, message: '邮箱不能为空', trigger: 'blur'},
          ],
          password: [
            { required: true, message: '密码不能为空', trigger: 'blur'},
          ],
          password1: [
            { required: true, message: '密码不能为空', trigger: 'blur'},
          ],
          password2: [
            { required: true, message: '确认密码不能为空', trigger: 'blur'},
          ]
        }
      };
    },
    watch: {
      '$route.path': function (newVal) {
        if (newVal === '/login') {
          console.log('欢迎进入登录页面')
          this.isloginPage = true
        }
        if (newVal === '/register') {
          console.log('欢迎进入注册页面')
          this.isloginPage = false
        }
      }
    },
    created () {
    },
    mounted () {
      this.$nextTick(() => {
        let voiceBtn = document.getElementById('voice')
        let video = document.getElementById('video')
        voiceBtn.addEventListener('click', function() {
          video.muted = !video.muted
        })
        document.querySelectorAll('input').forEach((item)=> {item.style='background:transparent;color:#fff'})
        document.querySelectorAll('.el-form-item__label').forEach((item)=> {item.style.color='#fff'})
      })
    },
    methods: {
      handleRegister () {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.$store.dispatch('login/register', this.form).then(res => {
              console.log(res)
              this.$router.push({ name: '/login' })
            })
          } else {
            console.log('error submit!!');
            return false
          }
        })
      },
      handleLogin () {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.$store.dispatch('login/login', this.form).then(res => {
              console.log(res)
              this.$router.push({ path: '/', replace: true })
            })
          } else {
            console.log('error submit!!');
            return false
          }
        })
      }
    }
  }
</script>
<style lang="less" scoped>
  #voice{
    cursor: pointer;
    position: absolute;
    left: 10px;
    top: 10px;
    width: 20px;
    height: 20px;
    display: inline-block;
    background: url('./../../assets/img/voice.png') no-repeat;
  }
  button, .el-input input {
    background: transparent;
  }
  /deep/ .el-input__inner{
    background: transparent;
    font-family: 'lifeisstrange'!important;
  }
  /deep/ .el-form-item__label{
    color: #fff;
  }
  video{  
    position: fixed;  
    right: 0px;  
    bottom: 0px;  
    min-width: 100%;  
    min-height: 100%;  
    height: auto;  
    width: auto;
    z-index:-11       
  }  
  source{  
    min-width: 100%;  
    min-height: 100%;  
    height: auto;  
    width: auto;  
   } 
  .login_container {
    padding-top: 30vh;
    height: 70vh;
    margin: auto;
    width: 500px;
    margin-right: 38vh;
  }
  .submit_btn{
    font-family: 'lifeisstrange'!important;
  }
</style>
