<template>
    <el-form :model="rule" :rules="rules" ref="forms" class="demo-ruleForm" label-width="100px">
        <el-form-item prop="tid" label="产品分类">
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
        <el-form-item label="单价" prop="price">
            <el-input placeholder="请输入单价" type="Number" oninput="value=(value.match(/\d+(\.\d{0,2})?/)||[''])[0]" v-model="rule.price" class="inputNumber" clearable></el-input>
        </el-form-item>
        <el-form-item label="库存量" prop="inventory">
            <el-input placeholder="请输入库存量" type="Number" oninput="value=value.replace(/\-/g,'')" v-model="rule.inventory" class="inputNumber" clearable></el-input>
        </el-form-item>
        <el-form-item label="序号" prop="sort">
            <el-input placeholder="请输入序号" type="Number" oninput="value=value.replace(/\-/g,'')" v-model="rule.sort" class="inputNumber" clearable></el-input>
        </el-form-item>
        <el-form-item label="立即上架" prop="isSale">
            <el-switch v-model="rule.isSale"
            :active-value="1"
            :inactive-value="0"
            ></el-switch>
        </el-form-item>
        <el-form-item label="商品图片" prop="photo">
            <Resource @imglist="setImgArray"></Resource>
        </el-form-item>
        <el-form-item label="内容" prop="contents">
            <quill-editor class="ql-editor-class"
                v-model="rule.contents"
                ref="myQuillEditor"
                :options="editorOption"
                @focus="onEditorFocus($event)"
                @blur="onEditorBlur($event)"
                @change="onEditorChange($event)">
            </quill-editor>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submit">提交</el-button>
            <el-button @click="reset">重置</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import Resource from '@/components/Resource';

    export default {
        data() {
            return {
                name: 'edit',
                options: [],
                editorOption: {},
                rule: {
                    id: 0,
                    tid: '',
                    title: '',
                    price: null,
                    inventory: 0,
                    sort: 0,
                    isSale: 1,
                    contents: '',
                    photo: ''
                },
                rules: {
                    tid: { required: true, message: '请选择分类' },
                    title: { required: true, message: '请输入标题' },
                    price: {required: true, message: '请输入单价'},
                    inventory: {required: true, message: '请输入库存量'},
                    photo: {required: true, message: '请上传商品图片',trigger:["blur","change"]},
                    sort: {required: true, message: '请输入序号'},
                },
            }
        },
        computed: {
            editor() {
                return this.$refs.myQuillEditor.quill;
            },
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
                            this.$http.post('/api/product/add',this.rule).then(() => {
                                this.$message({
                                    message: '操作成功',
                                    type: 'success'
                                });
                                this.$router.push('/goods/sale');
                            })
                        }else {
                            this.$http.put('/api/product/edit',this.rule).then(() => {
                                this.$message({
                                    message: '操作成功',
                                    type: 'success'
                                });
                                this.$router.push('/goods/sale');
                            }).catch(()=> {
                                return false;
                            })
                        }
                        
                    }
                });
            },
            reset() {
                this.$refs['forms'].resetFields();
            },
            setImgArray(data) {
                //接收图片选择子组件反回用户选中的图片数组信息
                this.rule.photo = JSON.stringify(data);
                this.$refs['forms'].validate(()=> {
                    
                });
            },
            onEditorReady(editor) { },// 准备编辑器
            onEditorBlur(){}, // 失去焦点事件
            onEditorFocus(){}, // 获得焦点事件
            onEditorChange(){}, // 内容改变事件
            saveHtml:function(event){
                // alert(this.content);
            }
        },
        components: {Resource}
    }
</script>
<style>
.ql-editor{height:400px;}
.ql-editor-class {
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        line-height: 1.42;
        height: 100%;
        outline: none;
        padding: 0 !important;
        tab-size: 4;
        -moz-tab-size: 4;
        text-align: left;
        word-wrap: break-word;
    }
/* .ql-snow .ql-color-picker .ql-picker-label svg, .ql-snow .ql-icon-picker .ql-picker-label svg{vertical-align: top;}
.ql-snow .ql-picker-label::before{vertical-align: top;} */
</style>