<template>
    <el-form :model="rule" :rules="rules" ref="forms" class="demo-ruleForm" label-width="100px">
        <el-form-item label="产品分类">
            <el-select v-model="rule.tid" placeholder="请选择分类">
                <el-option v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="标题" prop="title">
            <el-input placeholder="请输入标题" v-model="rule.title" clearable></el-input>
        </el-form-item>
        <el-form-item label="原价" prop="originalprice">
            <el-input placeholder="请输入原价" type="Number" oninput="value=(value.match(/\d+(\.\d{0,2})?/)||[''])[0]" v-model="rule.originalprice" class="inputNumber" clearable></el-input>
        </el-form-item>
        <el-form-item label="单价" prop="price">
            <el-input placeholder="请输入单价" type="Number" oninput="value=(value.match(/\d+(\.\d{0,2})?/)||[''])[0]" v-model="rule.price" class="inputNumber" clearable></el-input>
        </el-form-item>
        <el-form-item label="库存量" prop="inventory">
            <el-input placeholder="请输入库存量" type="Number" oninput="value=value.replace(/\-/g,'')" v-model="rule.inventory" class="inputNumber" clearable></el-input>
        </el-form-item>
        <el-form-item label="返还积分" prop="integral">
            <el-input placeholder="请输入返还积分" type="Number" oninput="value=value.replace(/\-/g,'')" v-model="rule.integral" class="inputNumber" clearable></el-input>
        </el-form-item>
        <el-form-item label="序号" prop="sort">
            <el-input placeholder="请输入序号" type="Number" oninput="value=value.replace(/\-/g,'')" v-model="rule.sort" class="inputNumber" clearable></el-input>
        </el-form-item>
        <el-form-item label="支付方式">
            <el-checkbox-group v-model="rule.isintegral">
                <el-checkbox label="现金" name="0"></el-checkbox>
                <el-checkbox label="积分" name="1"></el-checkbox>
            </el-checkbox-group>
        </el-form-item>
        <el-form-item label="立即上架" prop="isSale">
            <el-switch v-model="rule.isSale"></el-switch>
        </el-form-item>
        <el-form-item>
            <el-upload
                name="photo"
                :action="uploadUrl"
                :headers="token"
                :multiple="true"
                :limit="20"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-error="uploadError">
                <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
        </el-form-item>
        <el-form-item label="内容" prop="contents">
            <el-input placeholder="请输入库存量" v-model="rule.contents" clearable></el-input>
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
                uploadUrl: process.env.VUE_APP_API + '/api/product/uploadimg',
                token: {
                    Authorization: this.$store.state.token
                },
                options: [],
                dialogImageUrl: '',
                dialogVisible: false,
                rule: {
                    id: 0,
                    tid: '',
                    title: '',
                    originalprice: null,
                    price: null,
                    inventory: null,
                    integral: null,
                    sort: 0,
                    isintegral: [],
                    isSale: true,
                    contents: '',
                    photo: []
                },
                rules: {
                    title: { required: true, message: '请输入标题' },
                    originalprice: {required: true, message: '请输入原价'},
                    price: {required: true, message: '请输入单价'},
                    inventory: {required: true, message: '请输入库存量'},
                    integral: {required: true, message: '请输入返还积分'},
                    sort: {required: true, message: '请输入序号'},
                },
            }
        },
        created() {
            this.getType();
            if(this.$route.params.id) {
                this.$http.get('/api/admin/getview/'+this.$route.params.id).then(data => {
                    this.rule = data['data'];
                    this.rule.passvalid = this.rule.password;
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
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            uploadError(err, file, fileList) {
                this.$message({
                    message:err,
                    type: 'error'
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
                        if(this.rule.id == 0) {
                            this.$http.post('/api/admin/register',this.rule).then(() => {
                                this.$router.push('/setting/admin');
                            })
                        }else {
                            this.$http.put('/api/admin/edit',this.rule).then(() => {
                                this.$router.push('/setting/admin');
                            }).catch(()=> {
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