import { MutationTree } from 'vuex'
import State, {
    YiYuanLouYu,
    ZhongDianShuiShouTop5,
    XinXiFaBu,
    ShuiShouBoDong,
    QianRuQianChu,
    DangJian,
    LouZhangOverview,
    DiaoYanNianDuTongJi,
    DiaoYanFenLeiTongJi,
    WeiJieJueFenLeiTongJi
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
    }
}
export default mutations
