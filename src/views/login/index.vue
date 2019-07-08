<template>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
        <el-form-item prop="username">
            <el-input placeholder="请输入用户名" v-model="ruleForm.username">
                <template slot="prepend"><i class="el-icon-user-solid"></i></template>
            </el-input>
        </el-form-item>
        <!-- <el-form-item label="用户名" prop="username">
            <el-input v-model=""></el-input>
        </el-form-item> -->
        <el-form-item prop="pass">
            <el-input placeholder="请输入密码" type="password" v-model="ruleForm.pass" autocomplete="off">
                <template slot="prepend"><i class="el-icon-lock"></i></template>
            </el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
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
                if(valid) {
                    alert('验证成功');
                }else {
                    return false;
                }
            });
        },
    },
}
</script>

<style scope>
body{ background-color: rgb(48, 65, 86);}
form{width: 400px; margin: 200px auto 0 auto;}
form button{width: 100%;}
.el-input__inner{border-color: #DCDFE6!important;}
</style>