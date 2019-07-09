<template>
    <div class="page">
        <van-cell-group>
            <van-field
                v-model="username"
                left-icon="contact"
                placeholder="请输入手机号码"
                />
            <van-field
                v-model="password"
                left-icon="closed-eye"
                placeholder="请输入密码"
                />
        </van-cell-group>
        <van-button type="primary" size="large" @click="submit">确定</van-button>
    </div>
</template>
<script>
import { CellGroup, Button, Cell, Toast } from 'vant';
export default {
    components: {
        [CellGroup.name]: CellGroup,
        [Button.name]: Button,
        [Cell.name]: Cell,
        [Toast.name]: Toast,
    },
    data() {
        return {
            username: '',
            password: '',
        }
    },
    methods: {
        submit() {
            Toast('哈哈哈！！！')
        }
    }
}
</script>
<style lang="less">
    // .page {

    // }
</style>

