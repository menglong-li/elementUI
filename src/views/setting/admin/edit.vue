<template>
    <el-form :model="rule" :rules="rules" ref="forms" class="demo-ruleForm" label-width="100px">
        <el-form-item label="名称" prop="name">
            <el-input placeholder="请输入名称" v-model="rule.name" clearable></el-input>
        </el-form-item>
        <el-form-item label="账号" prop="username">
            <el-input placeholder="请输入账号" v-model="rule.username" clearable></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input type="password" placeholder="请输入密码" v-model="rule.password" clearable></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="passvalid">
            <el-input type="password" placeholder="确认密码" v-model="rule.passvalid" clearable @input="change($event)"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submit">提交</el-button>
            <el-button @click="reset">重置</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    export default {
        data() {
            var vaildpass = (rule, value, callback) => {
                if(value != this.rule.password) {
                    callback(new Error('两次密码不一致'));
                }else {
                    callback();
                }
            };
            return {
                name: 'edit',
                rule: {
                    id: 0,
                    name: '',
                    username: '',
                    password: '',
                    passvalid: ''
                },
                rules: {
                    name: [
                        { required: true, message: '请输入名称' }
                    ],
                    username:[
                        {required: true, message: '请输入账号', trigger: 'blur'},
                        {min:3,message:'账号长度至少为3位字符',trigger:'blur'},
                    ],
                    password:[
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {min:3, max:32,message:'密码长度限制为3-32位',trigger:'blur'},
                    ],
                    passvalid:[
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {validator:vaildpass,trigger:'blur'},
                    ]
                },
            }
        },
        beforeCreate() {
            if(this.$route.params.id) {
                this.$http.get('/api/admin/getview/'+this.$route.params.id).then(data => {
                    this.rule = data['data'];
                    this.rule.passvalid = this.rule.password;
                }).catch(err => {
                    this.$router.go(-1);
                });
            }
        },
        methods: {
            submit() {
                this.$refs['forms'].validate(valid => {
                    if(valid) {
                        if(this.rule.id == 0) {
                            this.$http.post('/api/admin/register',this.rule).then(() => {
                                this.$router.push('/setting/admin');
                            })
                        }else {
                            this.$http.put('/api/admin/edit',this.rule).then(() => {
                                this.$router.push('/setting/admin');
                            }).catch((err)=> {

                            })
                        }
                        
                    }
                });
            },
            reset() {
                this.$refs['forms'].resetFields();
            },
            change(e){
                //潜入太深，需要刷新
                this.$forceUpdate();
            }
        }
    }
</script>