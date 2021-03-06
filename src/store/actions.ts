import { ActionTree } from 'vuex'
import { ChangShouShangHui, LouYuZongLan, State } from './state'
import api from './api'
import { removeToken } from '@/utils/token'

const actions: ActionTree<State, State> = {
    async requestAll({ commit }) {
        const { data: yiYuanLouYu } = await api.getYiYuanLouYu()
        const { data: ZhongDianShuiShouTop10 } = await api.getZhongDianShuiShouTop10()
        const { data: xinXiFaBu } = await api.getXinXiFaBu()
        const { data: shuiShouBoDong } = await api.getShuiShouBoDong()
        const { data: qianRuQianChu } = await api.getQianRuQianChu()
        const { data: dangJian } = await api.getDangJian()
        const { data: louZhangOverview } = await api.getLouZhangOverview()
        const { data: diaoYanNianDuTongJi } = await api.getDiaoYanNianDuTongJi()
        const { data: diaoYanFenLeiTongJi } = await api.getDiaoYanFenLeiTongJi()
        const { data: weiJieJueFenLeiTongJi } = await api.getWeiJieJueFenLeiTongJi()
        const { data: zhongDianQiYe } = await api.getZhongDianQiYe()
        const { data: louYuZongLan } = await api.getLouYuZongLan()
        const { data: changShouShangHui } = await api.getChangShouShangHui()

        const all = {
            louYuZongLan,
            changShouShangHui,
            yiYuanLouYu,
            ZhongDianShuiShouTop10,
            xinXiFaBu,
            shuiShouBoDong,
            qianRuQianChu,
            dangJian,
            louZhangOverview,
            diaoYanNianDuTongJi,
            diaoYanFenLeiTongJi,
            weiJieJueFenLeiTongJi,
            zhongDianQiYe,
        }
        commit('setAll', all)
    },

    async login({ commit }, { username, passwd, code, uuid }) {
        const res = (await api.login(username, passwd, code, uuid)).data
        const auth = {
            uid: res.uid,
            token: res.token,
        }
        commit('SET-AUTH', auth)
        return auth
    },

    // remove token
    resetToken({ commit }) {
        return new Promise(resolve => {
            commit('SET-AUTH', { uid: -1, token: '' })
            removeToken()
            resolve(true)
        })
    },

    async requestOverview({ commit }) {
        const res = (await api.requestOverview()).data
        commit('SET-OVERVIEW', res)
        const fengXian = (await api.requestZhongDianFengXianQiYe()).data
        commit('SET-ZHONGDIAN-FENGXIAN', fengXian)
    },

    async requestLouZhangZhi({ commit }) {
        const res = (await api.requestLouZhangZhi()).data
        commit('SET-LOUZHANGZHI', res)
        return res
    },

    async requestResearch({ commit }) {
        const res = (await api.requestResearch()).data
        commit('SET-RESEARCH', res)
        return res
    },

    async requestCategoryResearch({ commit }) {
        const year = (await api.requestCategoryResearch('year')).data
        const week = (await api.requestCategoryResearch('week')).data
        commit('SET-CATEGORY-RESEARCH', { year, week })
        return { year, week }
    },

    async requestLouZhang({ commit }) {
        const res = (await api.requestLouZhang()).data
        commit('SET-LOUZHANG', res)
        return res
    },

    async requestXinxi({ commit }) {
        const res = (await api.requestXinxi()).data
        commit('SET-XINXI', res)
        return res
    },

    async requestWeiJieJueWenTi({ commit }) {
        const res = (await api.requestWeiJieJueWenTi()).data
        commit('SET-WEIJIEJUE', res)
        return res
    },

    async requestWeiJieJueFenLeiTongJi({ commit }) {
        const res = (await api.requestWeiJieJueFenLeiTongJi()).data
        commit('SET-WEIJIEJUE-FENLEI', res)
        return res
    },

    async requestBuildings({ commit }) {
        const res = (await api.requestBuildings()).data
        commit('SET-BUILDINGS', res)
        return res
    },

    // async queryBuildingCoordinates({ commit, state }) {
    //     commit('SET-BUILDING-COORDINATES')
    //     return true
    // }
    async requestYuJingList({ commit }) {
        const res = (await api.requestYuJingList()).data
        commit('SET-YUJING-LIST', res)
        return true
    },

    async requestZhongDianQiYeList({ commit }) {
        const res = (await api.requestZhongDianQiYeList()).data
        commit('SET-ZHONGDIANQIYE-LIST', res)
        return true
    },
}
export default actions
