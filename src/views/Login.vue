<template>
    <div class="login-page-container">
        <div class="login-form">
            <div class="left"></div>
            <div class="right">
                <div class="title">长寿街道楼宇服务大屏</div>
                <el-input v-model="username" class="username" prefix-icon="el-icon-user" placeholder="请输入账号" />
                <el-input v-model="passwd" class="password" prefix-icon="el-icon-key" placeholder="请输入密码" type="password" :show-password="true" />
                <button v-loading="loginLoading" class="login-btn" @click="login">登录</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    name: 'Login',
    props: {},
    data() {
        return {
            username: '',
            passwd: '',
            loginLoading: false
        }
    },
    methods: {
        login() {
            if (!this.username) {
                this.$message.warning('请输入账号！')
                return
            }
            if (!this.passwd) {
                this.$message.warning('请输入密码！')
                return
            }
            const auth = {
                username: this.username,
                passwd: this.passwd
            }
            this.loginLoading = true
            this.$store.dispatch('login', auth)
                .then(res => {
                    console.log('LOG-INFO login: ', res)
                    this.$router.push('/')
                })
                .catch(err => {
                    this.$message.error('登录失败')
                })
                .finally(() => {
                    this.loginLoading = false
                })
        }
    }
})
</script>

<style lang="scss" scoped>
.login-page-container {
    width: 100%;
    height: 100%;
    background-image: url(../assets/img/login-bg.png);
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .login-form {
        width: 1000px;
        height: 500px;
        vertical-align: middle;
        text-align: center;
        border-radius: 10px;
        overflow: hidden;
        .left,
        .right {
            display: inline-block;
            width: 50%;
            height: 100%;
            background-size: 100% 100%;
        }
        .left {
            background-image: url(../assets/img/login-form-left.png);
        }
        .right {
            background-image: url(../assets/img/login-form-right.png);
            float: right;
            .title {
                width: 100%;
                text-align: center;
                margin: 125px 0 40px;
                color: #5794ff;
                font-size: 2em;
                font-weight: 800;
            }
            .username, .password {
                width: 300px;
                height: 40px;
                margin-bottom: 20px;
                font-size: 16px;
            }
            .login-btn {
                margin-top: 20px;
                width: 300px;
                height: 50px;
                background-color: #5794ff;
                color: white;
                border-radius: 30px;
                font-size: 18px;

                &:focus {
                    background-color: #1062f0;
                }
                &:hover {
                    background-color: #377df7;
                }
            }
        }
    }
}

</style>

<style lang="scss">
button,
button:focus,
button:active {
    border: none;
    outline: none;
}
</style>