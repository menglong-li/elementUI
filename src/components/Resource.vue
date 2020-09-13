<template>
    <div id="ml-Resource">
        <!--图片组-->
        <ul class="ml-imglist">
            <li v-for="(item,index) in selImgList" :key="index">
                <img :src="item" alt="">
                <div class="ml-imglist-button">
                    <i class="el-icon-delete" @click="imgdelete(index)"></i>
                </div>
            </li>
        </ul>
        <!--End:图片组-->
        <!--按钮-->
        <div id="ml-Resource-button" @click.stop @click="onOpen">
            <i class="el-icon-plus"></i>
        </div>
        <!--End:按钮-->
        <div class="ml-img-manage" :style="{'width':width + 'vw','height':height + 'px'}" @click.stop v-show="load">
            <div class="upload">
                <el-upload
                    ref="uploadImg"
                    name="photo"
                    :action="uploadUrl"
                    :headers="token"
                    :show-file-list="false"
                    :limit="20"
                    :multiple="true"
                    :on-success="onSuccess"
                    :on-error="uploadError">
                    <el-button size="small" type="text">上传图片</el-button>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
            </div>
            <div class="imgresource">
                <div class="item" v-for="(item,index) in fileList" :key="index">
                    <div class="zfx"><img :src='item' @click="selImg(index)" width="100%" alt=""></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Resource',
        data() {
            return {
                load: false,//面板开关
                width:60,//面板宽度
                height:380,//面板高度
                spannum: 4,//imgresource下显示图片列数
                fileList: [], //上传成功的图片数组
                selImgList: [],//选中并准备要上传的图片数组
                uploadUrl: process.env.VUE_APP_API + '/api/uploadimg',//图片上传api
                token: {
                    Authorization: this.$store.state.token
                },
                dialogImageUrl: '',
                dialogVisible: false,
            }
        },
        created() {
            this.$http.get('/api/files/getImgs').then(result => {
                this.fileList = result.data;
            });
        },
        mounted() {
            let _this = this;
            //#region 点击任意位置关闭图片空间
            document.onclick = function() {
                if(_this.load == true) {
                    _this.load = false;
                }
            };
            //#endregion
        },
        updated() {
        },
        methods: {
            onOpen() {
                this.load = true;
                let imglistEl = document.getElementsByClassName('ml-imglist')[0];
                let top = imglistEl.getBoundingClientRect().top;
                if(top > this.height) {
                    document.getElementsByClassName('ml-img-manage')[0].style.top = `-${this.height}px`;
                }else {
                    document.getElementsByClassName('ml-img-manage')[0].style.top = '';
                }
                //定义imgresource高度
                let imgresource = document.getElementsByClassName('imgresource')[0]
                imgresource.style.height = this.height - 60 +'px';
                let imgcol = 100 / this.spannum + '%';
                for(let item of imgresource.getElementsByClassName('item')) {
                    item.style.width = imgcol;
                }
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            onSuccess(res,file,fileList) {
                this.fileList.unshift(process.env.VUE_APP_API +'/'+res);
                // this.$refs.uploadImg.clearFiles();
            },
            uploadError(err) {
                this.$message({
                    message:err,
                    type: 'error'
                });
            },
            selImg(i) {
                //选中图片
                this.selImgList.push(this.fileList[i]);
                //向父组件传送用户选择的图片信息
                this.$emit('imglist',this.selImgList);
            },
            //#region 删除图片
            imgdelete(i) {
                this.selImgList.splice(i,1);
            }
            //#endregion
        },
    }
</script>

<style scoped>
#ml-Resource{ position: relative;}
#ml-Resource ul.ml-imglist{margin: 0; padding: 0; display: inline-block;}
#ml-Resource ul.ml-imglist li{ width: 128px; height: 128px; overflow: hidden;border-radius: 6px; margin-right: 15px;
display: inline-block; position: relative;}
#ml-Resource ul.ml-imglist li img{ width: 100%; height: 100%;}
#ml-Resource-button{
    display: inline-block;
    background-color: #fbfdff;
    border: 1px dashed #c0ccda;
    border-radius: 6px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 128px;
    height: 128px;
    cursor: pointer;
    line-height: 126px;
    vertical-align: top; text-align: center; 
}
#ml-Resource-button i.el-icon-plus{font-size: 28px;color:#8c939d;}
#ml-Resource .ml-img-manage{ 
    position: absolute; z-index: 999; padding: 0px 15px 0 10px;
    border: 1px solid #cccccc; background-color: #ffffff;}
#ml-Resource .ml-img-manage .upload{ height: 35px; line-height: 35px; margin-bottom: 15px; text-align: right; border-bottom: 1px solid #cccccc;}
.imgresource{ overflow-y: auto; width: 100%;}
.imgresource .item{display: inline-block; width: 25%; padding: 0 10px;box-sizing:border-box;}
.imgresource .item .zfx{position: relative; width: 100%;height: 0;padding-bottom: 100%;}
.imgresource .item .zfx img{ position: absolute; cursor: pointer;
      top: 0;
      left: 0;
      width: 100%;height: 100%;}
#ml-Resource .ml-imglist-button{position: absolute;left: 0; bottom: 0px;height: 30px; line-height: 30px;
 font-size: 16px; background-color: rgba(0,0,0,0.5); width: 100%;align-items: center;
    display: none;
}
#ml-Resource .ml-imglist-button i{opacity: 1; color: #ffffff; cursor: pointer;}
#ml-Resource .ml-imglist li:hover .ml-imglist-button{display: flex;justify-content: center; }
</style>