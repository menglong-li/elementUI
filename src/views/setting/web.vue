<template>
    <el-form :model="rule" :rules="rules" ref="forms" class="demo-ruleForm globalForm" label-width="100px">
        <el-form-item label="网站标题" prop="title">
            <el-input placeholder="请输入网站标题" v-model="rule.title" clearable></el-input>
        </el-form-item>
        <el-form-item label="关键词" prop="keys">
            <el-input placeholder="请输入关键词" v-model="rule.keys" clearable></el-input>
        </el-form-item>
        <el-form-item label="网站描述" prop="des">
            <el-input type="textarea" placeholder="请输入网站描述" v-model="rule.des" clearable></el-input>
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
            return {
                name: 'web',
                rule: {
                    title: '',
                    keys: '',
                    des: '',
                },
                rules: {
                    title: [
                        { required: true, message: '不能为空' }
                    ],
                    keys: [
                        { required: true, message: '不能为空' }
                    ],
                    des: [
                        { required: true, message: '不能为空' }
                    ]
                },
            }
        },
        methods: {
            submit() {
                this.$refs['forms'].validate(valid => {
                    if(valid) {
                        this.$http.put('/api/setting/put',this.rule).then(data => {
                        }).catch(error => {
                        })
                    }
                });
            },
            reset() {
                this.$refs['forms'].resetFields();
            }
        },
        created() {
            this.$http.get('/api/setting/getweb').then(data => {
                this.rule = data['data'];
            })
        },
    }
</script>