import Enum from '@/utils/enum'

export class LouYuZongLan {
    constructor(
        public huGuanQiYeZongShu = 0,
        public shuiShouZongE = 0,
        public zhongDianQiYeShu = 0,
        public zhongDianQiYeShuiShouZongE = 0,
        public shuiShouZanBi = 0,
    ) {}
    static fromServer(serverData) {
        return new LouYuZongLan(
            serverData.bdNumC,
            serverData.bdTax,
            serverData.bdNumFocusC,
            serverData.bdTaxFocus, // TODO 前端：重点企业税收总额 --- 后端：企业税收增加数
            serverData.bdRatioTax,
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
    constructor(public jiTuanZiGuan = 0, public siCaiQiYe = 0, public xvNiZhuChe = 0) {}
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
            new YiYuanLouYu(serverData.bnName5, serverData.bnTax5),
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
            new ZhongDianShuiShouTop5(serverData.fsRsName2, serverData.fsRsTax2),
            new ZhongDianShuiShouTop5(serverData.fsRsName3, serverData.fsRsTax3),
            new ZhongDianShuiShouTop5(serverData.fsRsName4, serverData.fsRsTax4),
            new ZhongDianShuiShouTop5(serverData.fsRsName5, serverData.fsRsTax5),
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
        const upAndDown = {
            upNum: serverData.wnNumTaxAsc,
            upPercent: serverData.wnNumTaxAscRate,
            downNum: serverData.wnNumTaxDsc,
            downPercent: serverData.wnNumTaxDscRate,
        }
        const upLog = [
            ['月份', '上升20-50%', '上升50-80%', '上升>80%'],
            [serverData.wnNumTax180Name1, serverData.wnNumTax18020upp1, serverData.wnNumTax18050upp1, serverData.wnNumTax18080upp1],
            [serverData.wnNumTax180Name2, serverData.wnNumTax18020upp2, serverData.wnNumTax18050upp2, serverData.wnNumTax18080upp2],
            [serverData.wnNumTax180Name3, serverData.wnNumTax18020upp3, serverData.wnNumTax18050upp3, serverData.wnNumTax18080upp3],
            [serverData.wnNumTax180Name4, serverData.wnNumTax18020upp4, serverData.wnNumTax18050upp4, serverData.wnNumTax18080upp4],
            [serverData.wnNumTax180Name5, serverData.wnNumTax18020upp5, serverData.wnNumTax18050upp5, serverData.wnNumTax18080upp5],
            [serverData.wnNumTax180Name6, serverData.wnNumTax18020upp6, serverData.wnNumTax18050upp6, serverData.wnNumTax18080upp6],
        ]
        const downLog = [
            ['月份', '下降20-50%', '下降50-80%', '下降>80%'],
            [serverData.wnNumTax180Name1, -serverData.wnNumTax18020downp1, -serverData.wnNumTax18050downp1, -serverData.wnNumTax18080downp1],
            [serverData.wnNumTax180Name2, -serverData.wnNumTax18020downp2, -serverData.wnNumTax18050downp2, -serverData.wnNumTax18080downp2],
            [serverData.wnNumTax180Name3, -serverData.wnNumTax18020downp3, -serverData.wnNumTax18050downp3, -serverData.wnNumTax18080downp3],
            [serverData.wnNumTax180Name4, -serverData.wnNumTax18020downp4, -serverData.wnNumTax18050downp4, -serverData.wnNumTax18080downp4],
            [serverData.wnNumTax180Name5, -serverData.wnNumTax18020downp5, -serverData.wnNumTax18050downp5, -serverData.wnNumTax18080downp5],
            [serverData.wnNumTax180Name6, -serverData.wnNumTax18020downp6, -serverData.wnNumTax18050downp6, -serverData.wnNumTax18080downp6],
        ]
        return new ShuiShouBoDong(upAndDown, upLog, downLog)
        // const data = {
        //     upAndDown: {
        //         upNum: 12,
        //         upPercent: 120,
        //         downNum: 18,
        //         downPercent: 67
        //     },
        //     upLog: [
        //         ['月份', '上升20-50%', '上升50-80%', '上升>80%'],
        //         ['2月', 100, 10, 30],
        //         ['3月', 10, 110, 20],
        //         ['4月', 100, 10, 30],
        //         ['5月', 100, 10, 30],
        //         ['6月', 200, 120, 30],
        //         ['7月', 50, 110, 40]
        //     ],
        //     downLog: [
        //         ['月份', '下降20-50%', '下降50-80%', '下降>80%'],
        //         ['2月', -100, -10, -30],
        //         ['3月', -10, -110, -20],
        //         ['4月', -100, -10, -30],
        //         ['5月', -100, -10, -30],
        //         ['6月', -200, -120, -30],
        //         ['7月', -50, -110, -40]
        //     ]
        // }
        // return data
    }
}

class InAndOut {
    constructor(public inNum = 0, public inPercent = 0, public outNum = 0, public outPercent = 0) {}
}
export class QianRuQianChu {
    constructor(public inAndOut = new InAndOut(), public inLog: (string | number)[][] = [], public outLog: (string | number)[][] = []) {}
    static fromServer(serverData) {
        const inAndOut = new InAndOut(
            serverData.wnNumMoveIn,
            serverData.wnNumMoveInRate.toFixed(1),
            serverData.wnNumMoveOut,
            serverData.wnNumMoveOutRate.toFixed(1),
        )
        const inLog: (string | number)[][] = [
            [serverData.wnNumMove180Name1, serverData.wnNumMove180upp1],
            [serverData.wnNumMove180Name2, serverData.wnNumMove180upp2],
            [serverData.wnNumMove180Name3, serverData.wnNumMove180upp3],
            [serverData.wnNumMove180Name4, serverData.wnNumMove180upp4],
            [serverData.wnNumMove180Name5, serverData.wnNumMove180upp5],
            [serverData.wnNumMove180Name6, serverData.wnNumMove180upp6],
        ]
        const {
            wnNumMove180downp1: downp1,
            wnNumMove180downp2: downp2,
            wnNumMove180downp3: downp3,
            wnNumMove180downp4: downp4,
            wnNumMove180downp5: downp5,
            wnNumMove180downp6: downp6,
        } = serverData
        const outLog: (string | number)[][] = [
            [serverData.wnNumMove180Name1, downp1 < 0 ? downp1 : -downp1],
            [serverData.wnNumMove180Name2, downp2 < 0 ? downp2 : -downp2],
            [serverData.wnNumMove180Name3, downp3 < 0 ? downp3 : -downp3],
            [serverData.wnNumMove180Name4, downp4 < 0 ? downp4 : -downp4],
            [serverData.wnNumMove180Name5, downp5 < 0 ? downp5 : -downp5],
            [serverData.wnNumMove180Name6, downp6 < 0 ? downp6 : -downp6],
        ]
        return new QianRuQianChu(inAndOut, inLog, outLog)
    }
}

export class DangJian {
    constructor(
        public dangZhiBu = 0,
        public qiYeZuTuan = 0,
        public dangJianHuoDong = 0,
        public huoDongPinTai = 0,
        public zhiYuanZhe = 0,
        public zhiYuanZheHuoDong = 0,
    ) {}
    static fromServer(serverData) {
        return new DangJian(
            serverData.partyNum,
            serverData.partyNumService,
            serverData.partyNumActivity,
            serverData.partyNumPlatform,
            serverData.partyNumVolunteer,
            serverData.partyNumVolunteerActivity,
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
        public wanChengLv = 0,
    ) {}
    static fromServer(serverData) {
        return new LouZhangOverview(
            serverData.numB,
            serverData.numVisit,
            serverData.numVisitB,
            serverData.numProblem,
            serverData.numUnresolve,
            Number(serverData.ratioCompletion) * 100,
        )
    }
}
export class DiaoYanNianDuTongJi {
    constructor(public months: string[] = [], public yiChuLi: number[] = [], public weiChuLi: number[] = []) {}
    static fromServer(serverData) {
        if (!Array.isArray(serverData)) {
            // throw new Error('大调研年度数据统计：数据格式错误')
            console.error('大调研年度数据统计：数据格式错误')
            return new DiaoYanNianDuTongJi()
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
    ['星期日', 120, 10, 70, 40, 44, 55, 22, 44],
]
const year = [
    { name: '党的建设类', value: 100 },
    { name: '共用事业类', value: 200 },
    { name: '安全监管类', value: 300 },
    { name: '交通建设类', value: 100 },
    { name: '公安政法类', value: 120 },
    { name: '科教文卫类', value: 120 },
    { name: '社会管理类', value: 110 },
    { name: '其他', value: 100 },
]
export type YearValueType = {
    name: string
    value: number
}
export type WeekValueType = string | number
function formatWeek(weekday: number) {
    switch (weekday) {
        case 1:
            return '一'
        case 2:
            return '二'
        case 3:
            return '三'
        case 4:
            return '四'
        case 5:
            return '五'
        case 6:
            return '六'
        case 7:
            return '日'

        default:
            return ''
    }
}
function getServerWeekdayName(weekday: number) {
    switch (weekday) {
        case 1:
            return '星期一'
        case 2:
            return '星期二'
        case 3:
            return '星期三'
        case 4:
            return '星期四'
        case 5:
            return '星期五'
        case 6:
            return '星期六'
        case 7:
            return '星期日'

        default:
            return ''
    }
}
export class DiaoYanFenLeiTongJi {
    constructor(public year: YearValueType[] = [], public week: WeekValueType[][] = []) {}
    static fromServer(serverData, type: 'year' | 'week') {
        if (type === 'week') {
            if (serverData.length === 0) {
                return []
            }
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

                const found = serverData.find(item => item.xaxis == getServerWeekdayName(weekDay))
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
                    value: v,
                })
            })
            return year
        } else {
            throw new Error('无效的类型：' + type)
        }
    }
}

export class ZhongDianQiYeFenXi {
    constructor(public year = '2020', public num = 0, public num60 = 0, public num100 = 0, public num500 = 0) {}
    static fromServer(serverData) {
        return new ZhongDianQiYeFenXi(serverData.fsYear, 10000, serverData.fsNum60, serverData.fsNum100, serverData.fsNum500)
    }
}
export class ZhongDianQiYe {
    /**
     * 重点企业列表里的某个企业
     * @param name 企业名字
     * @param type 1:60 万;2:100 万;3:500 万
     */
    constructor(public name = '', public type: 1 | 2 | 3 = 1) {}
    static fromServer(serverData) {
        if (!Array.isArray(serverData)) {
            // throw new Error('楼长信息：数据格式错误')
            console.error('楼长信息：数据格式错误')
            return []
        }
        return serverData.map(item => {
            return new ZhongDianQiYe(item.name, item.ctype)
        })
    }
}
export class WeiJieJueFenLeiTongJi {
    constructor(public category = '', public count = 0) {}
    static fromServer(serverData) {
        if (!Array.isArray(serverData)) {
            // throw new Error('未解决问题分类统计：数据格式错误')
            console.error('未解决问题分类统计：数据格式错误')
            return []
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
        public manYiDu = 0,
        public wanChengLv = 0,
    ) {}
    static fromServer(serverData) {
        if (!Array.isArray(serverData)) {
            // throw new Error('楼长信息：数据格式错误')
            console.error('楼长信息：数据格式错误')
            return []
        }
        return serverData.map(item => {
            const manYiDu = Number(item.satisfaction)
            const wanChengLv = Number(item.rate) * 100
            return new LouZhang(
                item.id,
                item.name,
                item.owner == 1,
                item.companyCnt,
                item.buildsCnt,
                item.tax60Cnt,
                item.visitCnt,
                item.unresolveCnt,
                manYiDu,
                wanChengLv,
            )
        })
    }
}

export class XinXi {
    constructor(public id = -1, public category = '', public title = '', public content = '') {}
    static fromServer(serverData) {
        if (!Array.isArray(serverData)) {
            // throw new Error('新闻信息：数据格式错误')
            console.error('新闻信息：数据格式错误')
            return []
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
    constructor(
        public id = -1,
        public louZhang = '',
        public category = '',
        public title = '',
        public desc = '',
        public louYu = '',
        public qiYe = '',
        public time = '',
    ) {}
    static fromServer(serverData) {
        if (Array.isArray(serverData)) {
            return serverData.map(item => {
                return new WenTi(
                    item.id,
                    item.master,
                    item.category,
                    item.title,
                    item.desc,
                    item.bname,
                    item.company || item.comany,
                    new Date(item.ctime).toLocaleString(),
                )
            })
        } else {
            return new WenTi(
                serverData.id,
                serverData.master,
                serverData.category,
                serverData.title,
                serverData.desc,
                serverData.bname,
                serverData.company,
                new Date(serverData.ctime).toLocaleString(),
            )
        }
    }
}

export class QiYe {
    constructor(
        public id = -1,
        public name = '',
        public address = '',
        public shuiShou = 0,
        public area = 0,
        public contact = '',
        public shangHui = '',
        public tag = '',
    ) {}
    static fromServer(serverData) {
        if (Array.isArray(serverData)) {
            return serverData.map(item => {
                return new QiYe(item.id, item.company, item.address, item.tax, item.area, item.contact, item.cName, item.tag)
            })
        } else {
            // throw new Error('不合法的企业数据格式：期待数组')
            console.error('不合法的企业数据格式：期待数组')
            return []
        }
    }
}

export class LouZhangZhi {
    constructor(public louZhang = '', public zouFangCiShu = 0, public weiJieJue = 0, public wanChengLv = 0) {}
}

export class DangZhiBu {
    constructor(public name = '', public num = 0, public address = '') {}
}

export class YuJingQiYe {
    constructor(
        public id = -1,
        public name = '',
        public status: 1 | 2 = 1, // 1:上升/迁入;2:下降/迁出
        public coordx = -1,
        public coordy = -1,
    ) {}
    static fromServer(data) {
        if (Array.isArray(data)) {
            return data.map(item => {
                // 目前经纬度暂无，需要从 buildings 里去找楼宇的经纬度
                return new YuJingQiYe(item.id, item.name, item.status, item.longitude, item.latitude)
            })
        } else {
            // throw new Error('不合法的企业数据格式：期待数组')
            console.error('不合法的企业数据格式：期待数组')
            return []
        }
    }
}

export class LouYu {
    constructor(
        public id = -1,
        public name = '',
        public address = '',
        public area = 0,
        public shuiShou = '',
        public louZhangZhi = new LouZhangZhi(),
        public dangZhiBu: DangZhiBu[] = [],
        public qiYeList: QiYe[] = [],
        public coordx = 0,
        public coordy = 0,
    ) {}
    static fromServer(serverData) {
        if (Array.isArray(serverData)) {
            return serverData.map(item => {
                const qiYeList = QiYe.fromServer(item.companyDetailsResponseList) || []
                const louZhangZhi = new LouZhangZhi(item.master, item.visitcnt, item.unresolvecnt, Number(item.rate) * 100)

                return new LouYu(item.id, item.name, item.address, item.area, item.tax, louZhangZhi, [], qiYeList, item.longitude, item.latitude)
            })
        } else {
            // throw new Error('不合法的楼宇数据格式：期待数组')
            console.error('不合法的楼宇数据格式：期待数组')
            return []
        }
    }
}

export class YuJingList {
    constructor(public shuiShouList: YuJingQiYe[] = [], public inAndOutList: YuJingQiYe[] = []) {}
    static fromServer(serverData) {
        const shuiShouList = YuJingQiYe.fromServer(serverData.taxOverviews)
        const inAndOutList = YuJingQiYe.fromServer(serverData.moveOverviews)
        return new YuJingList(shuiShouList, inAndOutList)
    }
}

export class LouYuCoord {
    constructor(public id = -1, public x = 0, public y = 0) {}
}

export class QiYe2LouYu {
    /**
     *
     * @param qiYeName 企业名称
     * @param id 楼宇 id
     * @param name 楼宇名称
     * @param coordx 楼宇坐标 x
     * @param coordy 楼宇坐标 y
     */
    constructor(public qiYeName = '', public id = -1, public name = '', public coordx = -1, public coordy = -1) {}
    static fromServer(louYuList: LouYu[]) {
        const qiYe2Louyu = new Map<string, QiYe2LouYu>()
        louYuList.forEach(louyu => {
            louyu.qiYeList.forEach(qiYe => {
                qiYe2Louyu.set(qiYe.name, new QiYe2LouYu(qiYe.name, louyu.id, louyu.name, louyu.coordx, louyu.coordy))
            })
        })
        return qiYe2Louyu
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
    qianRuQianChu = new QianRuQianChu()
    dangJian = new DangJian()
    louZhangOverview = new LouZhangOverview()
    diaoYanNianDuTongJi = new DiaoYanNianDuTongJi()
    diaoYanFenLeiTongJi = new DiaoYanFenLeiTongJi()
    weiJieJueFenLeiTongJi: WeiJieJueFenLeiTongJi[] = []
    zhongDianQiYe = new ZhongDianQiYeFenXi()
    zhongDianQiYeList: ZhongDianQiYe[] = []
    louZhang: LouZhang[] = []
    xinXi: XinXi[] = []
    weiJieJueList: WenTi[] = []
    louYuList: LouYu[] = []
    louYuCoords: LouYuCoord[] = []
    yuJingList = new YuJingList()

    qiYe2Louyu = new Map<string, QiYe2LouYu>()

    client_id = 'sh-ptcs-city'
    client_version = '1.0.0'
    token = ''
    uid = -1
}

export default new State()
