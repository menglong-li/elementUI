<template>
    <el-form :model="rule" :rules="rules" ref="forms" class="demo-ruleForm globalForm" label-width="100px">
        <el-form-item label="所属类别">
            <el-select v-model="rule.pid" placeholder="请选择类别">
                <el-option label="一级分类" value="0"></el-option>
                <el-option v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="名称" prop="title">
            <el-input placeholder="请输入名称" v-model="rule.title" clearable></el-input>
        </el-form-item>
        <el-form-item label="序号" prop="sort">
            <el-input placeholder="请输入序号" type="Number" v-model="rule.sort" class="inputNumber" clearable></el-input>
        </el-form-item>
        <el-form-item label="是否显示" prop="isShow">
            <el-switch v-model="rule.isShow"></el-switch>
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
                name: 'edit',
                rule: {
                    id: 0,
                    pid: '0',
                    title: '',
                    sort: 0,
                    isShow: true
                },
                options: [],
                rules: {
                    title:[
                        {required: true, message: '请输入名称', trigger: 'blur'},
                    ],
                    sort:[
                        {required: true, message: '请输入序号', trigger: 'blur'},
                    ],
                    isShow:[
                        {required: true, message: '请选择状态', trigger: 'blur'},
                    ]
                },
            }
        },
        created() {
            this.getType();
            if(this.$route.params.id) {
                this.$http.get('/api/producttype/getview/'+this.$route.params.id).then(data => {
                    this.rule = data['data'];
                    switch(this.rule.isShow) {
                        case 0:
                            this.rule.isShow = false;
                            break;
                        case 1:
                            this.rule.isShow = true;
                            break;
                    }
                    this.rule.pid = Number(this.rule.pid);
                }).catch(() => {
                    this.$router.go(-1);
                });
            }
        },
        methods: {
            async getType() {
                //分类初始化赋值
                await this.$http.get('/api/producttype/getlist').then(results => {
                    this.options = this.convertToTreeData(results['data'],0,0);
                });
            },
            convertToTreeData(data, pid,index) {
                const result = []
                let temp = []
                for (let i = 0; i < data.length; i++) {
                    if (data[i].pid == pid) {
                        let icon = '';
                        for(let i=0;i<index;i++) {
                            icon += '\xa0\xa0';
                        }
                        const obj = {'label': icon + '-' + data[i].title, 'value': data[i].id }
                        temp = this.convertToTreeData(data, data[i].id, index + 1)
                        result.push(obj)
                        if (temp.length > 0) {
                            for(let item in temp) {
                                result.push(temp[item]);
                            }
                        }
                    }
                }
                return result
            },
            submit() {
                this.$refs['forms'].validate(valid => {
                    if(valid) {
                        switch(this.rule.isShow) {
                            case false:
                                this.rule.isShow = 0;
                                break;
                            case true:
                                this.rule.isShow = 1;
                                break;
                        }
                        if(this.rule.id == 0) {
                            this.$http.post('/api/producttype/add',this.rule).then(() => {
                                this.$message({
                                    message:'添加成功',
                                    type: 'success'
                                });
                                this.getType();
                                this.$refs['forms'].resetFields();
                            })
                        }else {
                            this.$http.put('/api/producttype/edit',this.rule).then(() => {
                                this.$message({
                                    message:'修改成功',
                                    type: 'success'
                                });
                                this.$router.go(-1);
                            }).catch(()=> {
                                this.$message({
                                    message:'操作失败',
                                    type: 'error'
                                });
                                return false;
                            })
                        }
                        
                    }
                });
            },
            reset() {
                this.$refs['forms'].resetFields();
            }
        }
    }
</script>