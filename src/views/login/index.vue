<template>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
        <el-form-item prop="username">
            <el-input placeholder="请输入用户名" v-model="ruleForm.username">
                <template slot="prepend"><i class="el-icon-user-solid"></i></template>
            </el-input>
        </el-form-item>
        <el-form-item prop="pass">
            <el-input placeholder="请输入密码" type="password" v-model="ruleForm.pass" autocomplete="off">
                <template slot="prepend"><i class="el-icon-lock"></i></template>
            </el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">{{this.$store.getters.isLogin}}</el-button>
            <el-button @click="loginout">退出</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
export default {
    data() {
        return {
            name: 'Login',
            ruleForm:{
                username:'',
                pass:'',
            },
            rules:{
                username:[
                    {required: true, message: '请输入用户名', trigger: 'blur'},
                    {min:3,message:'用户名长度错误',trigger:'blur'},
                ],
                pass:[
                    {required: true, message: '请输入密码', trigger: 'blur'},
                ]
            },
        }
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                let params = {
                    params: {
                        username: this.ruleForm.username,
                        pass: this.ruleForm.pass
                    }
                }
                if(valid) {
                    this.$http.get('/api/Login/in',params).then(data => {
                        if(data.status == 200) {
                            this.$store.commit('loginIn',data['data']['token']);
                            this.$router.push('/');
                        }
                    }).catch(error => {
                        console.log(error);
                    });
                }else {
                    return false;
                }
            });
        },
        loginout() {
            this.$http.get('/api/news/getlist').then(data => {
                console.log(data['data']);
            });
        }
    },
    created() {
        document.getElementsByTagName('body')[0].style.backgroundColor = 'rgb(48, 65, 86)';
    },
    beforeDestroy() {
        document.getElementsByTagName('body')[0].style.backgroundColor = '';
    },
}
</script>

<style scope>
form{width: 400px; margin: 200px auto 0 auto;}
form button{width: 100%;}
.el-input__inner{border-color: #DCDFE6!important;}
</style>