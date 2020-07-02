<template>
        <div>
            <el-row class="search-add" :gutter="10">
                <el-col :span="9">
                    <el-input placeholder="名称" v-model="searchText"></el-input>
                </el-col>
                <el-col :span="2" :offset="13">
                    <router-link :to="'/goods/type/add'">
                        <el-button type="success">新增</el-button>
                    </router-link>
                </el-col>
            </el-row>
    
            <el-tree
            :data="data"
            show-checkbox
            node-key="id"
            default-expand-all
            :filter-node-method="filterNode"
            :expand-on-click-node="false"
            ref="tree">
            <span class="custom-tree-node" slot-scope="{ node, data }">
                <span>{{ node.label }}</span>
                <span style="margin-left: 30px;">
                    <router-link :to="'/goods/type/edit/'+data.id">
                        <el-button type="text" size="mini">编辑</el-button>
                    </router-link>
                <el-button style="margin-left: 10px;"
                    type="text"
                    size="mini"
                    @click="() => Delete(node, data)">
                    删除
                </el-button>
                </span>
            </span>
            </el-tree>
        </div>
    </template>
    
    <script>
        export default {
            name: 'admin',
            data() {
                return {
                    searchText: '',//搜索框
                    data: [],
                    checkArray:[]//check选中
                }
            },
            watch: {
                searchText(val) {
                    this.$refs.tree.filter(val);
                }
            },
            created() {
                this.getList();
            },
            methods: {
                filterNode(value, data) {
                    if (!value) return true;
                    return data.label.indexOf(value) !== -1;
                },
                convertToTreeData(data, pid) {
                    const result = []
                    let temp = []
                    for (let i = 0; i < data.length; i++) {
                        if (data[i].pid == pid) {
                        const obj = { 'label': data[i].title, 'id': data[i].id }
                        temp = this.convertToTreeData(data, data[i].id)
                        if (temp.length > 0) {
                            obj.children = temp
                        }
                        result.push(obj)
                        }
                    }
                    return result
                },
                getList() {
                    //数据绑定
                    this.$http.get('/api/producttype/getlist').then(results => {
                        this.data = this.convertToTreeData(results['data'],0);
                    });
                },
                Delete(node, data) {
                    //单删
                    if(confirm('确认要删除吗？')) {
                        let ID = data.id;
                        this.$http.delete('/api/producttype/delete',{params:{id:ID}}).then(() => {
                            const parent = node.parent;
                            const children = parent.data.children || parent.data;
                            const index = children.findIndex(d => d.id === data.id);
                            children.splice(index, 1);
                        })
                    }
                },
                checkChange(val) {
                    this.checkArray = val;
                },
                deleteAll() {
                    if(confirm('确认要删除吗？')) {
                        let ids = [];
                        for(let x of this.checkArray) {
                            ids.push(x.id);
                        }
                        if(ids.length == 0) {
                            return false;
                        }
                        if(this.checkArray.length > 0) {
                            this.$http.delete('/api/producttype/delete',{params:{id:ids.toString()}}).then(() => {
                                this.getList();
                            })
                        }
                    }
                }
            }
        }
    </script>