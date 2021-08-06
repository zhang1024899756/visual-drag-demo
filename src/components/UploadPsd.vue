<template>
  <div class="upload-psd-btn-wrapper">
    <el-upload
            action
            :before-upload="beforeUpload"
            accept=".psd"
            :show-file-list="false">
        <slot></slot>
    </el-upload>
  </div>
</template>

<script>
import psdFormatteToJson from '@/utils/psdFormatteToJson'

const PSD = require('psd.js')

export default {
    methods: {
        beforeUpload(file) {
            if (file.size > 20 * 1024 * 1024) {
                this.$message.error('psd文件不能超过20M！')
                return
            }
            let temp1 = file.name.split('.')
            let temp = temp1[temp1.length - 1]
            if (!['psd'].includes(temp)) {
                this.$message.error('请上传psd文件')
                return false
            }
            this.analysePsd(file)
            return false
        },
        async analysePsd(file) {
            const url = window.URL.createObjectURL(file)
            let psd = await PSD.fromURL(url)
            psdFormatteToJson(psd.tree().export())
        },
    },
}
</script>

<style lang="scss" scoped>
.upload-psd-btn-wrapper{
  display: inline-block;
}
</style>