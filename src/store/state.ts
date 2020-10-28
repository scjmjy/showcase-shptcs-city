export class LouYuZongLan {
    constructor(
        public huGuanQiYeZongShu = 0,
        public shuiShouZongE = 0,
        public zhongDianQiYeShu = 0,
        public zhongDianQiYeShuiShouZongE = 0,
        public shuiShouZanBi = 0
    ) {}
    static fromServer(serverData) {
        return new LouYuZongLan(
            serverData.bdNumC,
            serverData.bdTax,
            serverData.bdNumFocusC,
            serverData.bdTaxFocus, // TODO 前端：重点企业税收总额 --- 后端：企业税收增加数
            serverData.bdRatioTax
        )
    }
}
export class ChangShouShangHui {
    constructor(public shangHuiQiYeShu = 0, public shangHuiQiYeShuiShouZongE = 0, public xinZengHuiYuanShu = 0) {}
    static fromServer(serverData) {
        return new ChangShouShangHui(serverData.cmNum, serverData.cmTax, serverData.cmNumNew)
    }
}
export class QiTaLouYuQiYe {
    constructor(public jiTuanZiGuan = '-', public siCaiQiYe = '-', public xvNiZhuChe = '-') {}
    static fromServer(serverData) {
        return new QiTaLouYuQiYe(serverData.gpNumB, serverData.gpNumF, serverData.gpNumV)
    }
}
export class YiYuanLouYu {
    /**
     *
     * @param name 楼宇名称
     * @param value 金额
     */
    constructor(public name = '', public value = 0) {}
    static fromServer(serverData) {
        const top5 = [
            new YiYuanLouYu(serverData.bnName1, serverData.bnTax1),
            new YiYuanLouYu(serverData.bnName2, serverData.bnTax2),
            new YiYuanLouYu(serverData.bnName3, serverData.bnTax3),
            new YiYuanLouYu(serverData.bnName4, serverData.bnTax4),
            new YiYuanLouYu(serverData.bnName5, serverData.bnTax5)
        ]
        return top5
    }
}
export class ZhongDianShuiShouTop5 {
    /**
     *
     * @param name 重点企业名称
     * @param value 金额
     */
    constructor(public name = '', public value = 0) {}
    static fromServer(serverData) {
        const top5 = [
            new ZhongDianShuiShouTop5(serverData.fsRsName1, serverData.fsRsTax1),
            new YiYuanLouYu(serverData.fsRsName2, serverData.fsRsTax2),
            new YiYuanLouYu(serverData.fsRsName3, serverData.fsRsTax3),
            new YiYuanLouYu(serverData.fsRsName4, serverData.fsRsTax4),
            new YiYuanLouYu(serverData.fsRsName5, serverData.fsRsTax5)
        ]
        return top5
    }
}
export type XinXiFaBu = {
    id: number
    category: string
    title: string
    img: string
    content: string
}
export class UpDown {
    constructor(public upNum = 0, public upPercent = 0, public downNum = 0, public downPercent = 0) {}
}
export class ShuiShouBoDong {
    constructor(public upAndDown = new UpDown(), public upLog: (number | string)[][] = [], public downLog: (number | string)[][] = []) {}
    static fromServer(serverData) {
        // const upAndDown = {
        //     upNum: serverData.wnNumTaxAsc,
        //     upPercent: serverData.wnNumTaxAscRate,
        //     downNum: serverData.wnNumTaxDsc,
        //     downPercent: serverData.wnNumTaxDscRate,
        // }
        // const upLog = [
        //     ['月份', '上升20-50%', '上升50-80%', '上升>80%'],
        //     [serverData.wnNumTax180Name1, serverData.wnNumTax18020p1, serverData.wnNumTax18050p1, serverData.wnNumTax18080p1],
        //     [serverData.wnNumTax180Name2, serverData.wnNumTax18020p2, serverData.wnNumTax18050p2, serverData.wnNumTax18080p2],
        //     [serverData.wnNumTax180Name3, serverData.wnNumTax18020p3, serverData.wnNumTax18050p3, serverData.wnNumTax18080p3],
        //     [serverData.wnNumTax180Name4, serverData.wnNumTax18020p4, serverData.wnNumTax18050p4, serverData.wnNumTax18080p4],
        //     [serverData.wnNumTax180Name5, serverData.wnNumTax18020p5, serverData.wnNumTax18050p5, serverData.wnNumTax18080p5],
        //     [serverData.wnNumTax180Name6, serverData.wnNumTax18020p6, serverData.wnNumTax18050p6, serverData.wnNumTax18080p6]
        // ]
        // const downLog = [
        //         ['月份', '下降20-50%', '下降50-80%', '下降>80%'],
        //     [serverData.wnNumTax180Name1, serverData.wnNumTax18020p1, serverData.wnNumTax18050p1, serverData.wnNumTax18080p1],
        //     [serverData.wnNumTax180Name2, serverData.wnNumTax18020p2, serverData.wnNumTax18050p2, serverData.wnNumTax18080p2],
        //     [serverData.wnNumTax180Name3, serverData.wnNumTax18020p3, serverData.wnNumTax18050p3, serverData.wnNumTax18080p3],
        //     [serverData.wnNumTax180Name4, serverData.wnNumTax18020p4, serverData.wnNumTax18050p4, serverData.wnNumTax18080p4],
        //     [serverData.wnNumTax180Name5, serverData.wnNumTax18020p5, serverData.wnNumTax18050p5, serverData.wnNumTax18080p5],
        //     [serverData.wnNumTax180Name6, serverData.wnNumTax18020p6, serverData.wnNumTax18050p6, serverData.wnNumTax18080p6]
        // ]
        // return new ShuiShouBoDong(upAndDown, upLog, downLog)
        const data = {
            upAndDown: {
                upNum: 12,
                upPercent: 120,
                downNum: 18,
                downPercent: 67
            },
            upLog: [
                ['月份', '上升20-50%', '上升50-80%', '上升>80%'],
                ['2月', 100, 10, 30],
                ['3月', 10, 110, 20],
                ['4月', 100, 10, 30],
                ['5月', 100, 10, 30],
                ['6月', 200, 120, 30],
                ['7月', 50, 110, 40]
            ],
            downLog: [
                ['月份', '下降20-50%', '下降50-80%', '下降>80%'],
                ['2月', -100, -10, -30],
                ['3月', -10, -110, -20],
                ['4月', -100, -10, -30],
                ['5月', -100, -10, -30],
                ['6月', -200, -120, -30],
                ['7月', -50, -110, -40]
            ]
        }
        return data
    }
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
export class DangJian {
    constructor(
        public dangZhiBu = 0,
        public qiYeZuTuan = 0,
        public dangJianHuoDong = 0,
        public huoDongPinTai = 0,
        public zhiYuanZhe = 0,
        public zhiYuanZheHuoDong = 0
    ) {}
    static fromServer(serverData) {
        return new DangJian(
            serverData.partyNum,
            serverData.partyNumService,
            serverData.partyNumActivity,
            serverData.partyNumPlatform,
            serverData.partyNumVolunteer,
            serverData.partyNumVolunteerActivity
        )
    }
}
export class LouZhangOverview {
    constructor(
        public louYuZongShu = 0,
        public zouFangCiShu = 0,
        public zouFangQiYeShu = 0,
        public wenTiZongShu = 0,
        public weiJieJueShu = 0,
        public wanChengLv = 0
    ) {}
    static fromServer(serverData) {
        return new LouZhangOverview(
            serverData.numB,
            serverData.numVisit,
            serverData.numVisitB,
            serverData.numProblem,
            serverData.numUnresolve,
            serverData.ratioCompletion
        )
    }
}
export class DiaoYanNianDuTongJi {
    constructor(public months: string[] = [], public yiChuLi: number[] = [], public weiChuLi: number[] = []) {}
    static fromServer(serverData) {
        if (!Array.isArray(serverData)) {
            throw new Error('大调研年度数据统计：数据格式错误')
        }
        const months: string[] = []
        const yiChuLi: number[] = []
        const weiChuLi: number[] = []
        serverData.forEach(item => {
            months.push(item.month)
            yiChuLi.push(item.resovle)
            weiChuLi.push(item.unresovle)
        })
        return new DiaoYanNianDuTongJi(months, yiChuLi, weiChuLi)
    }
}
export type DiaoYanFenLeiTongJi = {
    week: number[][]
    year: number[][]
}
export class ZhongDianQiYe {
    constructor(public year = '2020', public num = 0, public num60 = 0, public num100 = 0, public num500 = 0) {}
    static fromServer(serverData) {
        return new ZhongDianQiYe(serverData.fsYear, 10000, serverData.fsNum60, serverData.fsNum100, serverData.fsNum500)
    }
}
export type WeiJieJueFenLeiTongJi = number[][]

export class LouZhang {
    constructor(
        public id = -1,
        public name = '',
        public isZongLouZhang = false,
        public qiYeShu = 0,
        public louYuShu = 0,
        public qiYeShu60 = 0,
        public zouFangShu = 0,
        public weiJieJue = 0,
        public manYiDu = 98,
        public wanChengLv = 95
    ) {}
    static fromServer(serverData) {
        if (!Array.isArray(serverData)) {
            throw new Error('楼长信息：数据格式错误')
        }
        return serverData.map(item => {
            return new LouZhang(0, item.name, item.owner, item.companyCnt, item.buildsCnt, item.tax60Cnt, item.visitCnt, item.unresolveCnt, 98, 95)
        })
    }
}

export class XinXi {
    constructor(public category = '', public title = '', public content = '') {}
    static fromServer(serverData) {
        if (!Array.isArray(serverData)) {
            throw new Error('新闻信息：数据格式错误')
        }
        return serverData.map(item => {
            return new XinXi(item.cname, item.title, item.content)
        })
    }
}

export class State {
    louYuZongLan = new LouYuZongLan()
    changShouShangHui = new ChangShouShangHui()
    qiTaLouYuQiYe = new QiTaLouYuQiYe()
    yiYuanLouYu: YiYuanLouYu[] = []
    zhongDianShuiShouTop5: ZhongDianShuiShouTop5[] = []
    xinXiFaBu: XinXiFaBu[] = []
    shuiShouBoDong = new ShuiShouBoDong()
    qianRuQianChu?: QianRuQianChu = undefined
    dangJian = new DangJian()
    louZhangOverview = new LouZhangOverview()
    diaoYanNianDuTongJi = new DiaoYanNianDuTongJi()
    diaoYanFenLeiTongJi?: DiaoYanFenLeiTongJi = undefined
    weiJieJueFenLeiTongJi: WeiJieJueFenLeiTongJi = []
    zhongDianQiYe = new ZhongDianQiYe()
    louZhang: LouZhang[] = []
    xinXi: XinXi[] = []

    client_id = 'sh-ptcs-city'
    client_version = '1.0.0'
    token = ''
    uid = -1
}

export default new State()
