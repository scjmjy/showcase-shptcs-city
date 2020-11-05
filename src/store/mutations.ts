import { MutationTree } from 'vuex'
import store from '@/store'
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
    LouZhang,
    WenTi,
    XinXi,
    YearValueType,
    WeekValueType,
    LouYu
} from './state'

const coords = [
    { id: 5, x: -2203.509286, y: 1546.649312 },
    { id: 6, x: -2279.798086, y: 1648.59968 },
    { id: 7, x: -2823.374694, y: 1434.295456 },
    { id: 8, x: -3011.504998, y: 1374.92048 },
    { id: 9, x: -2849.46087, y: 1397.093696 },
    { id: 10, x: -2874.543878, y: 1487.224128 },
    { id: 11, x: -2840.721618, y: 809.2186864 },
    { id: 12, x: -3780.660519, y: 548.5675189 },
    { id: 13, x: -2806.127014, y: 1009.717087 },
    { id: 14, x: -2761.813414, y: 1085.939711 },
    { id: 15, x: -2402.012326, y: 920.7296633 },
    { id: 16, x: -2605.352774, y: 1123.094303 },
    { id: 17, x: -2780.336966, y: 983.3936633 },
    { id: 18, x: -4494.260789, y: 812.2547176 },
    { id: 19, x: -4230.115112, y: -347.9168019 },
    { id: 20, x: -4145.416999, y: -175.4036177 },
    { id: 21, x: -4075.828135, y: 1.69030242 },
    { id: 22, x: -3913.819687, y: 223.0978866 },
    { id: 23, x: -4255.698984, y: -452.180418 },
    { id: 24, x: -3261.447399, y: 371.5170868 },
    { id: 25, x: -3120.498887, y: 810.9835192 },
    { id: 26, x: -3181.706023, y: 652.905919 },
    { id: 27, x: -3282.504583, y: 525.6093109 },
    { id: 28, x: -3110.219431, y: 937.7423033 },
    { id: 29, x: -3013.284614, y: 900.4265273 },
    { id: 30, x: -4888.116712, y: 840.7324792 },
    { id: 31, x: -4613.923592, y: 1107.131519 },
    { id: 32, x: -3953.935783, y: 1517.197312 },
    { id: 33, x: -4515.530024, y: 1169.400096 },
    { id: 34, x: -4485.599784, y: -348.3870739 },
    { id: 35, x: -3872.973991, y: 1583.019296 },
    { id: 36, x: -3807.858087, y: 1691.523328 },
    { id: 37, x: -3733.657703, y: 1770.066112 },
    { id: 38, x: -4600.674312, y: 563.7061109 },
    { id: 39, x: -4749.258184, y: 109.5327025 },
    { id: 40, x: -5053.64948, y: 429.6243188 },
    { id: 41, x: -4933.433768, y: 361.2968628 },
    { id: 42, x: -5114.291624, y: 464.7924789 },
    { id: 44, x: -5065.666184, y: 791.3325112 },
    { id: 45, x: -3881.034727, y: 462.5562869 },
    { id: 46, x: -3780.660519, y: 548.5675189 },
    { id: 47, x: -3038.706918, y: 1746.139104 },
    { id: 48, x: -3566.739975, y: 430.6682868 },
    { id: 49, x: -3406.173997, y: 424.1043324 },
    { id: 50, x: -3340.466183, y: 501.4868789 },
    { id: 51, x: -3275.106215, y: 688.2592631 },
    { id: 52, x: -5031.635208, y: 759.3397111 },
    { id: 53, x: -4230.115112, y: -347.9168019 },
    { id: 54, x: -5093.546103, y: 781.3779512 }
]

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
        state.weiJieJueFenLeiTongJi = payload.weiJieJueFenLeiTongJi as WeiJieJueFenLeiTongJi[]
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

        state.zhongDianShuiShouTop5 = ZhongDianShuiShouTop5.fromServer(res)

        state.shuiShouBoDong = ShuiShouBoDong.fromServer(res)
        state.qianRuQianChu = QianRuQianChu.fromServer(res)

        state.dangJian = DangJian.fromServer(res)
    },

    ['SET-LOUZHANGZHI'](state, res) {
        state.louZhangOverview = LouZhangOverview.fromServer(res)
    },

    ['SET-RESEARCH'](state, res) {
        state.diaoYanNianDuTongJi = DiaoYanNianDuTongJi.fromServer(res)
    },

    ['SET-CATEGORY-RESEARCH'](state, { year, week }) {
        const dataYear = DiaoYanFenLeiTongJi.fromServer(year, 'year')
        const dataWeek = DiaoYanFenLeiTongJi.fromServer(week, 'week')
        state.diaoYanFenLeiTongJi.year = dataYear as YearValueType[]
        state.diaoYanFenLeiTongJi.week = dataWeek as WeekValueType[][]
    },

    ['SET-LOUZHANG'](state, res) {
        state.louZhang = LouZhang.fromServer(res)
    },

    ['SET-XINXI'](state, res) {
        state.xinXi = XinXi.fromServer(res)
    },

    ['SET-WEIJIEJUE'](state, res) {
        state.weiJieJueList = WenTi.fromServer(res) as WenTi[]
    },

    ['SET-WEIJIEJUE-FENLEI'](state, res) {
        state.weiJieJueFenLeiTongJi = WeiJieJueFenLeiTongJi.fromServer(res)
    },

    ['SET-BUILDINGS'](state, res) {
        state.louYuList = LouYu.fromServer(res)
        state.louYuList.forEach(louyu => {
            const coord = coords.find(c => c.id === louyu.id)
            if (coord) {
                louyu.coordx = coord.x
                louyu.coordy = coord.y
            }
        })
    },
    ['SET-BUILDING-COORDINATES']() {
        
    }
}
export default mutations
