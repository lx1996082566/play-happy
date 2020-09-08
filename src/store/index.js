import Vue from 'vue'
import { getToken, setToken, removeToken } from '@/utils/auth.js'
let eventBus = new Vue({
    data() {
        return {
            userInfo: '',
            currentTab: ''
        }
    },
    methods: {
        setUserInfo(userInfo) {
            this.userInfo = userInfo
        },
        setCurrentTab(tab) {
            this.currentTab = tab
        },
        getToken() {
            return getToken()
        },
        setToken(token) {
            setToken(token)
        },
        removeToken() {
            removeToken()
        }
    }
});
export default eventBus