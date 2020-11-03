import Enum from '@/utils/enum'

export class LouYuZongLan {
    constructor(
        public huGuanQiYeZongShu = 0,
        public shuiShouZongE = 0,
        public zhongDianQiYeShu = 0,
        public zhongDianQiYeShuiShouZongE = 0,
        public shuiShouZanBi = 0
    ) { }
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
    constructor(public shangHuiQiYeShu = 0, public shangHuiQiYeShuiShouZongE = 0, public xinZengHuiYuanShu = 0) { }
    static fromServer(serverData) {
        return new ChangShouShangHui(serverData.cmNum, serverData.cmTax, serverData.cmNumNew)
    }
}
export class QiTaLouYuQiYe {
    constructor(public jiTuanZiGuan = 0, public siCaiQiYe = 0, public xvNiZhuChe = 0) { }
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
    constructor(public name = '', public value = 0) { }
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
    constructor(public name = '', public value = 0) { }
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
    constructor(public upNum = 0, public upPercent = 0, public downNum = 0, public downPercent = 0) { }
}
export class ShuiShouBoDong {
    constructor(public upAndDown = new UpDown(), public upLog: (number | string)[][] = [], public downLog: (number | string)[][] = []) { }
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
    ) { }
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
    ) { }
    static fromServer(serverData) {
        return new LouZhangOverview(
            serverData.numB,
            serverData.numVisit,
            serverData.numVisitB,
            serverData.numProblem,
            serverData.numUnresolve,
            Number(serverData.ratioCompletion) * 100
        )
    }
}
export class DiaoYanNianDuTongJi {
    constructor(public months: string[] = [], public yiChuLi: number[] = [], public weiChuLi: number[] = []) { }
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
const week = [
    ['星期几', '党的建设类', '社会团期类', '共用事业类', '安全监管类', '交通建设类', '公安政法类', '科教文卫类', '社会管理类'],
    ['星期一', 100, 10, 30, 40, 44, 55, 22, 44],
    ['星期二', 10, 110, 20, 10, 54, 15, 52, 74],
    ['星期三', 100, 10, 30, 40, 44, 55, 22, 44],
    ['星期四', 100, 10, 30, 40, 44, 55, 22, 44],
    ['星期五', 200, 120, 30, 40, 44, 55, 22, 44],
    ['星期六', 50, 110, 40, 40, 44, 55, 22, 44],
    ['星期日', 120, 10, 70, 40, 44, 55, 22, 44]
]
const year = [
    { name: '党的建设类', value: 100 },
    { name: '共用事业类', value: 200 },
    { name: '安全监管类', value: 300 },
    { name: '交通建设类', value: 100 },
    { name: '公安政法类', value: 120 },
    { name: '科教文卫类', value: 120 },
    { name: '社会管理类', value: 110 },
    { name: '其他', value: 100 }
]
export type YearValueType = {
    name: string
    value: number
}
export type WeekValueType = string | number
function formatWeek(weekday: number) {
    switch (weekday) {
        case 1:

            return '一';
        case 2:

            return '二';
        case 3:

            return '三';
        case 4:

            return '四';
        case 5:

            return '五';
        case 6:

            return '六';
        case 7:

            return '日';

        default:
            return '';
    }
}
export class DiaoYanFenLeiTongJi {
    constructor(public year: YearValueType[] = [], public week: WeekValueType[][] = []) { }
    static fromServer(serverData, type: 'year' | 'week') {
        if (type === 'week') {
            const week: WeekValueType[][] = []
            const catSet = new Set<string>()
            serverData.forEach(item => {
                item.yvalues.forEach(v => {
                    catSet.add(v.cname)
                })
            })
            week[0] = ['星期几']
            catSet.forEach(cat => {
                week[0].push(cat)
            })

            for (let index = 0; index < 7; index++) {
                const weekDay = index + 1
                week[weekDay] = []
                const weekDayData = week[weekDay]
                weekDayData.push(formatWeek(weekDay))

                const found = serverData.find(item => Number(item.xaxis) === weekDay)
                if (found) {
                    catSet.forEach(cat => {
                        const catValue = found.yvalues.find(y => y.cname === cat)
                        if (catValue) {
                            weekDayData.push(catValue.cvalue)
                        } else {
                            weekDayData.push(0)
                        }
                    })
                } else {
                    catSet.forEach(cat => {
                        weekDayData.push(0)
                    })
                }
            }
            return week
        } else if (type === 'year') {
            // 分类 -- 数量
            const mapCategory2Count = new Map<string, number>()
            serverData.forEach(item => {
                item.yvalues.forEach(v => {
                    const cat = mapCategory2Count.get(v.cname)
                    if (cat) {
                        mapCategory2Count.set(v.cname, cat + v.cvalue)
                    } else {
                        mapCategory2Count.set(v.cname, v.cvalue)
                    }
                })
            })
            const year: YearValueType[] = []
            mapCategory2Count.forEach((v, k) => {
                year.push({
                    name: k,
                    value: v
                })
            })
            return year
        } else {
            throw new Error("无效的");

        }
    }
}

export class ZhongDianQiYe {
    constructor(public year = '2020', public num = 0, public num60 = 0, public num100 = 0, public num500 = 0) { }
    static fromServer(serverData) {
        return new ZhongDianQiYe(serverData.fsYear, 10000, serverData.fsNum60, serverData.fsNum100, serverData.fsNum500)
    }
}
export class WeiJieJueFenLeiTongJi {
    constructor(public category = '', public count = 0) { }
    static fromServer(serverData) {
        if (!Array.isArray(serverData)) {
            throw new Error('未解决问题分类统计：数据格式错误')
        }
        return serverData.map(item => {
            return new WeiJieJueFenLeiTongJi(item.cname, item.count)
        })
    }
}

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
    ) { }
    static fromServer(serverData) {
        if (!Array.isArray(serverData)) {
            throw new Error('楼长信息：数据格式错误')
        }
        return serverData.map(item => {
            return new LouZhang(item.id, item.name, item.owner, item.companyCnt, item.buildsCnt, item.tax60Cnt, item.visitCnt, item.unresolveCnt, 98, 95)
        })
    }
}

export class XinXi {
    constructor(public id = -1, public category = '', public title = '', public content = '') { }
    static fromServer(serverData) {
        if (!Array.isArray(serverData)) {
            throw new Error('新闻信息：数据格式错误')
        }
        return serverData.map(item => {
            return new XinXi(item.id, item.cname, item.title, item.content)
        })
    }
}
const nums = [0, 1, 2, 3]
const strs = ['业委会和物业管理类问题', '政务服务咨询需求', '社会管理类其他', '其他']
const colors = ['rgb(253,209,0)', 'rgb(253,209,0)', 'rgb(199,255,65)', 'rgb(255,121,48)']
export const WentiCategoryEnum = new Enum(nums, strs, colors)

export class WenTi {
    constructor(public id = -1, public louZhang = '', public category = '', public title = '', public desc = '', public louYu = '', public qiYe = '', public time = '') { }
    static fromServer(serverData) {
        if (Array.isArray(serverData)) {
            return serverData.map(item => {
                return new WenTi(item.id, item.master, item.category, item.title, item.desc, item.bname, item.company, new Date(item.ctime).toLocaleString())
            })
        } else {
            return new WenTi(serverData.id, serverData.master, serverData.category, serverData.title, serverData.desc, serverData.bname, serverData.company, new Date(serverData.ctime).toLocaleString())
        }
    }
}

export class QiYe {
    constructor(public id = -1, public name = '', public address = '', public shuiShou = 0, public area = 0, public contact = '', public shangHui = '', public tag = '') {}
    static fromServer(serverData) {
        if (Array.isArray(serverData)) {
            return serverData.map(item => {
                return new QiYe(item.id, item.company, item.address, item.tax, item.area, item.contact, item.cName, item.tag)
            })
        } else {
            throw new Error("不合法的企业数据格式：期待数组")
        }
    }
}

export class LouYu {
    constructor(public id = -1, public name = '', public address = '', public area = 0, public shuiShou = '', public qiYeList: QiYe[] = [], public coordx = 0, public coordy = 0) {}
    static fromServer(serverData) {
        if (Array.isArray(serverData)) {
            return serverData.map(item => {
                const qiYeList = QiYe.fromServer(item.companyDetailsResponseList)

                const x = (Math.random() * 100) + (-2039.7808672166966)
                const y = (Math.random() * 100) + (1370.848078007506)

                return new LouYu(item.id, item.name, item.address, item.area, item.tax, qiYeList, x, y)
            })
        } else {
            throw new Error("不合法的楼宇数据格式：期待数组")
        }
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
    diaoYanFenLeiTongJi = new DiaoYanFenLeiTongJi
    weiJieJueFenLeiTongJi: WeiJieJueFenLeiTongJi[] = []
    zhongDianQiYe = new ZhongDianQiYe()
    louZhang: LouZhang[] = []
    xinXi: XinXi[] = []
    weiJieJueList: WenTi[] = []
    louYuList: LouYu[] = []

    client_id = 'sh-ptcs-city'
    client_version = '1.0.0'
    token = ''
    uid = -1
}

export default new State()
