import { MutationTree } from 'vuex'
import { setToken } from '@/utils/token'
import {
    State,
    LouYuZongLan,
    ChangShouShangHui,
    QiTaLouYuQiYe,
    ZhongDianQiYe,
    YiYuanLouYu,
    ZhongDianShuiShouTop5,
    XinXiFaBu,
    ShuiShouBoDong,
    QianRuQianChu,
    DangJian,
    LouZhangOverview,
    DiaoYanNianDuTongJi,
    DiaoYanFenLeiTongJi,
    WeiJieJueFenLeiTongJi,
    LouZhang
} from './state'

const mutations: MutationTree<State> = {
    setAll(state, payload) {
        state.yiYuanLouYu = payload.yiYuanLouYu as YiYuanLouYu[]
        state.yiYuanLouYu.sort((a, b) => a.value - b.value)

        state.zhongDianShuiShouTop5 = payload.zhongDianShuiShouTop5 as ZhongDianShuiShouTop5[]
        state.zhongDianShuiShouTop5.sort((a, b) => a.value - b.value)

        state.xinXiFaBu = payload.xinXiFaBu as XinXiFaBu[]
        state.shuiShouBoDong = payload.shuiShouBoDong as ShuiShouBoDong
        state.qianRuQianChu = payload.qianRuQianChu as QianRuQianChu
        state.dangJian = payload.dangJian as DangJian
        state.louZhangOverview = payload.louZhangOverview as LouZhangOverview
        state.diaoYanNianDuTongJi = payload.diaoYanNianDuTongJi as DiaoYanNianDuTongJi
        state.diaoYanFenLeiTongJi = payload.diaoYanFenLeiTongJi as DiaoYanFenLeiTongJi
        state.weiJieJueFenLeiTongJi = payload.weiJieJueFenLeiTongJi as WeiJieJueFenLeiTongJi
        state.zhongDianQiYe = payload.zhongDianQiYe as ZhongDianQiYe
        state.louYuZongLan = payload.louYuZongLan as LouYuZongLan
        state.changShouShangHui = payload.changShouShangHui as ChangShouShangHui
    },

    ['SET-AUTH'](state, { uid, token }) {
        state.uid = uid
        state.token = token
        setToken(token)
    },

    ['SET-OVERVIEW'](state, res) {
        state.louYuZongLan = LouYuZongLan.fromServer(res)

        state.changShouShangHui = ChangShouShangHui.fromServer(res)

        state.qiTaLouYuQiYe = QiTaLouYuQiYe.fromServer(res)

        state.zhongDianQiYe = ZhongDianQiYe.fromServer(res)
        // 企业总数从 楼宇总览 获得
        state.zhongDianQiYe.num = state.louYuZongLan.huGuanQiYeZongShu

        state.yiYuanLouYu = YiYuanLouYu.fromServer(res)

        // TODO 后台数据为 null
        // state.zhongDianShuiShouTop5 = ZhongDianShuiShouTop5.fromServer(res)

        state.shuiShouBoDong = ShuiShouBoDong.fromServer(res)

        state.dangJian = DangJian.fromServer(res)
    },

    ['SET-LOUZHANGZHI'](state, res) {
        state.louZhangOverview = LouZhangOverview.fromServer(res)
    },

    ['SET-RESEARCH'](state, res) {
        state.diaoYanNianDuTongJi = DiaoYanNianDuTongJi.fromServer(res)
    },

    ['SET-LOUZHANG'](state, res) {
        state.louZhang= LouZhang.fromServer(res)
    },

    ['SET-XINXI'](state, res) {
        state.louZhang= LouZhang.fromServer(res)
    }
}
export default mutations
