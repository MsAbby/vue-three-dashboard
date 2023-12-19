<template>
  <span>
    <Upload v-if="uploadType === 'button'" :on-format-error="handleFormatError" :before-upload="handleUpload" :show-upload-list="false" action="" style="display:inline-block;">
      <Button icon="ios-cloud-upload-outline" :loading='isLoading' :disabled="disabled">
        <span v-if='!isLoading'>{{ uploadBtnName }}</span>
        <span v-else>上传中...</span>
      </Button>
    </Upload>
    <div id="upload-fileComponent">
      <div v-if="uploadType === 'module'">
        <div v-if="uploadData && showImg !== 'label1'" class="upload_img">
          <img v-if="isImgOrVideo === 'img'" :src="uploadData" @click="handleView"/>
          <video v-if="isImgOrVideo === 'video'" :src="uploadData" :autoplay="autoplay" controls="controls" loop="loop"></video>
          <div v-if="isUpdate" class="upload_img-cover" v-show="!disabled && isImgOrVideo === 'img'">
           <PlayCircleOutlined @click.native="delImg" />
          </div>
          <div v-if="isUpdate" class="upload_video-cover" v-show="!disabled && isImgOrVideo === 'video'">
            <PlayCircleOutlined @click.native="delVideo" />
          </div>
        </div>
        <div class="flex" v-if="!uploadData">
          <div class="loadingDiv">
            <Spin size="large" v-if="isLoading"></Spin>
          </div>
          <Upload
            v-show="!disabled"
            :style="{ display: (!uploadData && showImg === 'label2') || showImg !== 'label2' ? 'inline-block' : 'none' }"
            ref="upload"
            :show-upload-list="false"
            :before-upload="handleUpload"
            type="drag"
            action
            style="display: inline-block;"
          >
            <div class="ne-upload-window">
              <PlayCircleOutlined />
              <div class="ne-upload-window-text">{{ uploadBoxTxt }}</div>
            </div>
          </Upload>
        </div>
      </div>
    </div>
    <PreviewImg ref="preview"></PreviewImg>
  </span>
</template>

<script>
import PreviewImg from '@/component/PreviewImg'
export default {
  name: 'uploadFiles',
  // @update事件 传出数据事件
  components: {
    PreviewImg
  },
  props: {
    // 暂不支持文件多选上传
    isImgOrVideo: {
      type: String,
      default: 'img',
    }, // 上传图片或视频时须注意  // 默认图片
    uploadBoxTxt: {
      type: String,
      default: '上传图片',
    },
    //上传有没有加cdn
    upLoadServeType: {
      type: String,
      default: '_api_gateway',
    },
    uploadType: {
      type: String,
      default: 'module',
    }, // 上传类型
    uploadBtnName: {
      type: String,
      default: '上 传',
    }, // 上传按钮名称
    uploadData: {
      // 上传数据
      type: String,
    },
    uploadUrl: {
      // 上传地址
      type: String,
      default: '/compose/tencent',
    },
    uploadSize: {
      // 上传文件大小限制(M) 默认10
      type: Number,
      default: 5,
    },
    showImg: {
      // label0默认  label1:无展示框 label2: 上传后上传按钮消失
      type: String,
      default: 'label0',
    },
    isUpdate: {
      type: Boolean,
      default: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    format: {
      type: Array,
      default: () => {
        return ['jpg', 'jpeg', 'png','gif'];
      },
    },
    autoplay:{
      type: Boolean,
      default: true,
    },
    imgPreview: {
      // 上传图片是否可预览
      type: Boolean,
      default: false,
    },
    needVideoDuration: {
      // 是否需要视频播放时常数据
      type: Boolean,
      default: true,
    },
    ratio: {
      type: Array,
      default: ()=>[],
    },
    hasSnapshot: { //是否需要视频封面截图
      type: Boolean,
      default: false,
    }
  },

  data() {
    return {
      isLoading: false,
      videoSize: 0, // 社区帖子 上传视频需要返回视频大小
    };
  },
  methods: {
    handleView() {
      if(this.imgPreview) {
        this.$refs.preview.imgDetail(this.uploadData)
      }else {
        return
      }
    },
    videoDetail(url) {
      window.open(url);
    }, // 打开视频
    delImg() {
      console.log('delImg');
      this.$emit('updateData', '');
    },
    delVideo() {
      console.log('delVideo');
      this.$emit('updateDataVideo', '');
    },
    upload(formData) {
      this.isLoading = true;
      if(this.upLoadServeType == 'bt_file') {
        formData.append('from', '运营平台cdn');
        formData.append('profile', 'public');
      }
      if(this.uploadUrl == '/v2.0/file-service/upload') { // 采用公共上传接口，能获取视频封面图
        formData.append('from', 'bt-operation-dashboard');
        formData.append("profile", "public");
        formData.append("useSnapshot", true);
        formData.append("time", 1);
      }
      return new Promise((resolve) => {
          this.$axios[this.upLoadServeType]
          .post(this.uploadUrl, formData, { timeout: 600000 })
          .then((res) => {
            const result = res.data;
            this.isLoading = false;
            if (result.data && result.data.downloadUrl) { // 用于上传cdn接口的数据返回处理
              if(this.hasSnapshot){ // 需要截图的
                resolve({
                  downloadUrl: result.data.downloadUrl,
                  snapshotUrl: result.data.snapshotUrl
                });
              }else{
                resolve(result.data.downloadUrl);
              }
            }
            if (result.data && result.data.url) {
              resolve(result.data.url);
            }
            if (result.url && result.url !== '') {
              resolve(result.url);
            }
          })
          .catch(() => {
            this.isLoading = false;
            this.$Notice.error({
              title: '上传失败',
            });
          });
      });
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: '文件格式不正确',
        desc: '文件 ' + file.name + ' 格式不正确，请上传 ' + this.format.join('、') + '格式的文件。',
      });
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: '超出文件大小限制',
        desc: '文件 ' + file.name + ' 太大，不能超过 ' + this.uploadSize + 'M。',
      });
    },
    handleRatio(file) {
      return new Promise((resolve, reject) => {
        let _URL = window.URL || window.webkitURL;
        let img = new Image();
        img.onload = () => {
          console.log(123,img.width, img.height);
          const rate = img.width/img.height;
          const ratio = this.ratio[0]/this.ratio[1];
          if(rate!==ratio){
            resolve(true);
          }else{
            resolve(false);
          }
        };
        img.src = _URL.createObjectURL(file);
      })
      
    },
    getVideoDuration(file) {
      var url = URL.createObjectURL(file);
      var audioElement = new Audio(url);
      return new Promise((resolve,reject)=>{
        audioElement.addEventListener("loadedmetadata", function() {
          resolve(parseInt(audioElement.duration))
        });
      })
    },
    async handleUpload(file) {
      const names = file.name.split('.');
      const fileName = names[names.length - 1];
      let arr = String(this.format).split(',');
      let videoSize = file.size / 1024 / 1024;
      this.videoSize = Math.ceil(videoSize);
      if (arr.indexOf(fileName.toLocaleLowerCase()) === -1) {
        this.handleFormatError(file);
      } else if (file.size > this.uploadSize * 1024 * 1024) {
        this.handleMaxSize(file);
      } else if(this.ratio.length>0 && await this.handleRatio(file)){ // 判断比例是否符合,ratio传了就代表有比例要求
        this.$Notice.warning({
          title: '图片比例不符合要求',
          desc: '图片比例不符合，需要上传 ' + this.ratio[0] + ':'+ this.ratio[1] +'比例图片',
        });
      }else {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('path', 'files/bt-operation-dashboard/');
        this.upload(formData).then(async (data) => {
          if (this.isImgOrVideo === 'img') {
            this.$emit('updateData', data, file);
          } else {
            if(this.needVideoDuration) {
              const videoDuration = await this.getVideoDuration(file);
              if(this.hasSnapshot){ // 需要视频封面截图
                 this.$emit('updateDataVideo', data.downloadUrl, file, this.videoSize, videoDuration, data.snapshotUrl);
              }else{
                 this.$emit('updateDataVideo', data, file, this.videoSize, videoDuration);
              }
             
            }else {
              this.$emit('updateDataVideo', data, file, this.videoSize)
            }
          }
        });
      }
      return false;
    },
  },
  created() {},
};
</script>

<style lang="less">
#upload-fileComponent .upload_img {
  display: inline-block;
  box-sizing: border-box;
  max-width: 200px;
  height: 100%;
  text-align: center;
  line-height: 0;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  margin-right: 4px;
}
#upload-fileComponent .upload_img img,
#upload-fileComponent .upload_img video {
  width: 100%;
  height: auto;
}
#upload-fileComponent .upload_img-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(170, 153, 153, 0.6);
}
#upload-fileComponent .upload_img:hover .upload_img-cover {
  display: block;
}
#upload-fileComponent .upload_img-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  display: inline-block;
  position: absolute;
  top: calc(50% - 10px);
  left: calc(50% - 10px);
}

#upload-fileComponent .upload_video-cover {
  display: block;
  position: absolute;
  top: 0;
  right: 0;
  width: 30px;
  height: 30px;
  background: rgba(170, 153, 153, 0.6);
}
#upload-fileComponent .upload_video-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  display: inline-block;
  position: absolute;
  top: calc(50% - 10px);
  left: calc(50% - 10px);
}
.loadingDiv {
  position: absolute;
  left: 36px;
  top: 36px;
  z-index: 1;
}
</style>
