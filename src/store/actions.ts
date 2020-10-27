import { ActionTree } from 'vuex'
import State from './state'
import api from './api'

const actions: ActionTree<State, State> = {
    async requestAll({ commit }) {
        const { data: yiYuanLouYu } = await api.getYiYuanLouYu()
        const { data: zhongDianShuiShouTop5 } = await api.getZhongDianShuiShouTop5()
        const { data: xinXiFaBu } = await api.getXinXiFaBu()
        const { data: shuiShouBoDong } = await api.getShuiShouBoDong()
        const { data: qianRuQianChu } = await api.getQianRuQianChu()
        const { data: dangJian } = await api.getDangJian()
        const { data: louZhangOverview } = await api.getLouZhangOverview()
        const { data: diaoYanNianDuTongJi } = await api.getDiaoYanNianDuTongJi()
        const { data: diaoYanFenLeiTongJi } = await api.getDiaoYanFenLeiTongJi()
        const { data: weiJieJueFenLeiTongJi } = await api.getWeiJieJueFenLeiTongJi()
        const { data: zhongDianQiYe } = await api.getZhongDianQiYe()

        const all = {
            yiYuanLouYu,
            zhongDianShuiShouTop5,
            xinXiFaBu,
            shuiShouBoDong,
            qianRuQianChu,
            dangJian,
            louZhangOverview,
            diaoYanNianDuTongJi,
            diaoYanFenLeiTongJi,
            weiJieJueFenLeiTongJi,
            zhongDianQiYe
        }
        commit('setAll', all)
    }
}
export default actions
