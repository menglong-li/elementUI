<template>
        <div>
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="ruleForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pass">
                    <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="password">
                    <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </template>
    
    <script>
    export default {
        data() {
            var vaildpass = (rule, value, callback) => {
                if(value != this.ruleForm.pass) {
                    callback(new Error('两次密码不一致'));
                }else {
                    callback();
                }
            };
            return {
                name: 'Login',
                ruleForm:{
                    username:'',
                    pass:'',
                    password:''
                },
                rules:{
                    username:[
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                        {min:3,message:'用户名长度错误',trigger:'blur'},
                    ],
                    pass:[
                        {required: true, message: '请输入密码', trigger: 'blur'},
                    ],
                    password:[
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {validator:vaildpass,trigger:'blur'},
                    ],
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