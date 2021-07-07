<!-- TODO: 这个页面后续将用 JSX 重构 -->
<template>
    <div class="attr-list">
        <div>
            <el-collapse :value='0'>
                <el-collapse-item :size="optionSize" v-for="(group, i) in collapseGroup" :key="i" :title="group.title" :name="i">
                    <div v-for="(key, index) in styleFormatter(group.groupArr)" :key="index">
                        <p :class="optionLabel">{{map[key]}}</p>
                        <el-color-picker :size="optionSize" v-if="key == 'borderColor'" v-model="curComponent.style[key]"></el-color-picker>
                        <el-color-picker :size="optionSize" v-else-if="key == 'color'" v-model="curComponent.style[key]"></el-color-picker>
                        <el-color-picker :size="optionSize" v-else-if="key == 'backgroundColor'" v-model="curComponent.style[key]">
                        </el-color-picker>
                        <el-select :size="optionSize" v-else-if="selectKey.includes(key)" v-model="curComponent.style[key]">
                            <template v-if="key == 'textAlign'">
                                <el-option
                                    v-for="item in textAlignOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                ></el-option>
                            </template>
                            <template v-else-if="key == 'borderStyle'">
                                <el-option
                                    v-for="item in borderStyleOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                ></el-option>
                            </template>
                            <template v-else>
                                <el-option
                                    v-for="item in verticalAlignOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                ></el-option>
                            </template>
                        </el-select>
                        <el-input :size="optionSize" type="number" v-else v-model="curComponent.style[key]" />
                    </div>
                </el-collapse-item>
            </el-collapse>
            <div v-if="curComponent && !excludes.includes(curComponent.component)">
                <p :class="optionLabel">内容</p>
                <el-input :size="optionSize" type="textarea" v-model="curComponent.propValue" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            excludes: ['Picture', 'Group'], // 这些组件不显示内容
            textAlignOptions: [
                {
                    label: '左对齐',
                    value: 'left',
                },
                {
                    label: '居中',
                    value: 'center',
                },
                {
                    label: '右对齐',
                    value: 'right',
                },
            ],
            borderStyleOptions: [
                {
                    label: '实线',
                    value: 'solid',
                },
                {
                    label: '虚线',
                    value: 'dashed',
                },
            ],
            verticalAlignOptions: [
                {
                    label: '上对齐',
                    value: 'top',
                },
                {
                    label: '居中对齐',
                    value: 'middle',
                },
                {
                    label: '下对齐',
                    value: 'bottom',
                },
            ],
            selectKey: ['textAlign', 'borderStyle', 'verticalAlign'],
            map: {
                left: 'x 坐标',
                top: 'y 坐标',
                height: '高',
                width: '宽',
                color: '字体颜色',
                backgroundColor: '背景颜色',
                borderStyle: '边框风格',
                borderWidth: '边框宽度',
                borderColor: '边框颜色',
                borderRadius: '边框圆角',
                fontSize: '字体大小',
                fontWeight: '字体粗细',
                lineHeight: '行高',
                letterSpacing: '字间距',
                opacity: '透明度',
                textAlign: '左右对齐',
                verticalAlign: '上下对齐',
                rotate: '旋转',
            },
            optionSize: 'mini',
            collapseGroup: [
                {
                    title: '尺寸',
                    groupArr: ['width', 'height'],
                },
                {
                    title: '坐标',
                    groupArr: ['top', 'left', 'rotate'],
                },
                {
                    title: '颜色',
                    groupArr: ['backgroundColor', 'color', 'opacity'],
                },
                {
                    title: '边框',
                    groupArr: ['borderRadius', 'borderWidth', 'borderColor'],
                },
                {
                    title: '文本',
                    groupArr: ['fontSize', 'fontWeight', 'letterSpacing', 'lineHeight', 'textAlign'],
                },
            ],
        }
    },
    computed: {
        styleKeys() {
            console.log(this.$store.state.curComponent.style)
            return this.$store.state.curComponent? Object.keys(this.$store.state.curComponent.style) : []
        },
        curComponent() {
            return this.$store.state.curComponent
        },
        optionLabel() {
            return {
                'option-label-mini': true,
            }
        },
    },
    methods: {
        styleFormatter(groupArr) {
            return this.styleKeys.filter(item => groupArr.includes(item))
        },
    },
}
</script>

<style lang="scss" scoped>
.option-label-mini {
    line-height: 40px;
    font-size: 12px;
}
.attr-list {
    overflow: auto;
    padding: 20px;
    padding-top: 0;
    height: 100%;
}
</style>
