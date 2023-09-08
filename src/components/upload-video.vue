<template>
	<div>
		<template>
			<div style="position: relative">
				<video
					controls="controls"
					style="height: 130px; width: 250px"
					v-if="vData.url"
				>
					<source :src="vData.url" type="video/mp4" />
					<source :src="vData.url" type="video/ogg" />
					<source :src="vData.url" type="video/webm" />
					<source :src="vData.url" type="video/avi" />
					<source :src="vData.url" type="video/3gpp" />
				</video>
				<div v-if="vData.url">
					<el-icon
						type="md-close"
						style="position: absolute; top: 0; left: 230px"
						@click="Remove"
					></el-icon>
				</div>
			</div>
		</template>
		<el-upload
			v-if="!vData.url"
			ref="upload"
			class="upload-demo"
			:show-file-list="false"
			:before-upload="handleBeforeUpload"
			:on-success="handleSuccess"
			drag
			action=""
			:disabled="disabled"
			style="display: inline-block"
		>
			<div class="ne-upload-window">
        <el-icon class="avatar-uploader-icon" v-if="!vData.visible"></el-icon>
        <el-button :loading="vData.visible" v-if="vData.visible"></el-button>
				<div class="ne-upload-window-text">上传视频</div>
			</div>
			<template #tip>
				<div class="el-upload__tip">
					支持mp4、MOV格式视频，且大小不要超过50M.
				</div>
			</template>
		</el-upload>
	</div>
</template>

<script setup lang="ts">
  /*
  ** reactive:  只能 给对象、数组添加响应式
  **      ref:  给值类型添加响应式
  **    toRef:  针对一个响应式对象（reactive 封装）的 prop（属性）创建一个ref
  */
  import { reactive, toRef, ref, watch, onMounted} from 'vue'
  const emit = defineEmits(["videoUpload"])

  /******** props ********/
  const props = defineProps({
    editVideo: String,
    disabled: Boolean,
  })
  console.log('props', props)

  /******** data ********/
  const vData = ref({
    url: '',
    isShow: true,
    visible: false,
  })

  const qData = reactive({
    uploadList: [],
  })

  /******** watch ********/
  watch(
    () => props.editVideo,
    (newVal, oldVal) => {
      if (typeof newVal == Number) {
          this.url = '';
        } else {
          this.url = decodeURI(editVideo);
        }
    }
  )

  /******** mounted ********/
  onMounted(() => {
    if (typeof props.editVideo == Number) {
			vData.url = '';
		} else {
			vData.url = decodeURI(props.editVideo);
		}
  })

  /******** methods ********/
  // 删除视频
  const Remove = () => {
    vData.url = '';
    emit('videoUpload', '');
	}

  // 文件格式不正确
  const handleFormatError = (file) => {
    ElNotification({
      title: '文件格式不正确',
      message: '文件' + file.name + '格式不正确，请上传mp4格式',
      type: 'warning'
    });
    vData.visible = false;
  }

  // 文件大小超出限制
  const handleMaxSize = (file) => {
    ElNotification({
      title: '超出文件大小范围',
      message: '文件' + file.name + ' 太大了, 不允许超过 50M.',
      type: 'warning'
    });
    vData.visible = false;
  }

  // 文件大小超出限制
  const handleMaxTime = (file) => {
    ElNotification({
      title: '超出文件时长范围',
      message: '文件' + file.name + ' 时长太长了, 不允许超过 3分钟.',
      type: 'warning'
    });
    vData.visible = false;
  }

  // 上传成功
  const handleSuccess = (res, file) => {}

  // 上传之前
  const handleBeforeUpload = (file) => {
    vData.visible = true
    const check = qData.uploadList.length <= 1;
    console.log('file.type======', file.type)
    if (!check) {
      ElNotification({
        title: '不能超过1个视频',
        type: 'warning'
      });
      return false;
    } else if ( file.type !== "video/mp4" && file.type !== "video/quicktime" ) {
      // mp4, .mov
      handleFormatError(file);
      return false;
    } else if ( file.size > 50*1024*1024 ) {
      handleMaxSize(file);
      return false;
    } else {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("path", "files/bt-operation-dashboard/");
      upload(formData).then(async (data) => {
        updateDataAudio(data);
        // console.log("成功了吗？", data)
        // const videoDuration = await this.getVideoDuration(file);
        // console.log('获取video时间长度', videoDuration)
        // const videoLimitTime = 60 * 3
        // if (videoDuration < videoLimitTime) {
        //     this.updateDataAudio(data);
        // } else {
        //     this.handleMaxTime(file);
        //     return false
        // }
      });
    }
  }

  // 上传
  const upload = (formData) => {
    return new Promise(resolve => {
      resolve('success');
    })
  }

  // 更新视频
  const updateDataAudio = (value) => {
    vData.url = value;
    emit('videoUpload', vData.url)
    vData.visible = false;
  }
  
  // 获取video时间长度
  const getVideoDuration = (file) => {
    const url = URL.createObjectURL(file);
    const audioElement = new Audio(url);
    return new Promise((resolve,reject)=>{
      audioElement.addEventListener("loadedmetadata", function() {
          resolve(parseInt(audioElement.duration));
      });
    })
  }
</script>

<style scoped>
.upload-demo {
  width: 120px;
  height: 120px;
}
.el-upload-dragger {
  width: 120px;
  height: 120px;
}
</style>
