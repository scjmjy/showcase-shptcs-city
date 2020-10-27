export type YiYuanLouYu = {
    name: string
    value: number
}

export type ZhongDianShuiShouTop5 = {
    name: string
    value: number
}
export type XinXiFaBu = {
    id: number
    category: string
    title: string
    img: string
    content: string
}
export type ShuiShouBoDong = {
    upAndDown: {
        upNum: number
        upPercent: number
        downNum: number
        downPercent: number
    }
    upLog: number[][]
    downLog: number[][]
}
export type QianRuQianChu = {
    inAndOut: {
        inNum: number
        inPercent: number
        outNum: number
        outPercent: number
    }
    inLog: number[][]
    outLog: number[][]
}
export type DangJian = {
    dangZhiBu: number
    qiYeZuTuan: number
    dangJianHuoDong: number
    huoDongPinTai: number
    zhiYuanZhe: number
    zhiYuanZheHuoDong: number
}
export type LouZhangOverview = {
    louYuZongShu: number
    zouFangCiShu: number
    zouFangQiYeShu: number
    wenTiZongShu: number
    weiJieJueShu: number
    wanChengLv: number
}
export type DiaoYanNianDuTongJi = {
    months: number[]
    yiChuLi: number[]
    weiChuLi: number[]
}
export type DiaoYanFenLeiTongJi = {
    week: number[][],
    year: number[][]
}
export type ZhongDianQiYe = {
    num: number
    num60: number
    num100: number
    num500: number
}
export type WeiJieJueFenLeiTongJi = number[][]
export default class State {
    yiYuanLouYu: YiYuanLouYu[] = []
    zhongDianShuiShouTop5: ZhongDianShuiShouTop5[] = []
    xinXiFaBu: XinXiFaBu[] = []
    shuiShouBoDong?: ShuiShouBoDong = undefined
    qianRuQianChu?: QianRuQianChu = undefined
    dangJian?: DangJian = undefined
    louZhangOverview?: LouZhangOverview = undefined
    diaoYanNianDuTongJi?: DiaoYanNianDuTongJi = undefined
    diaoYanFenLeiTongJi?: DiaoYanFenLeiTongJi = undefined
    weiJieJueFenLeiTongJi: WeiJieJueFenLeiTongJi = []
    zhongDianQiYe?: ZhongDianQiYe = undefined
}
