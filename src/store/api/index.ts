import request from '@/utils/request'

const API_URL_BASE = '/api/v1/zhly'
const API_URLS = {
    login_post: API_URL_BASE + '/user/login',
    overview_get: API_URL_BASE + '/overview',
    louzhangzhi_overview_get: API_URL_BASE + '/bsoverview',
    research_get: API_URL_BASE + '/research',
    louzhang_get: API_URL_BASE + '/masters',
    xinxi_get: API_URL_BASE + '/information',
    contract_list_post: API_URL_BASE + '/contract/list',
    contract_add_post: API_URL_BASE + '/contract/add',
    contract_update_post: API_URL_BASE + '/contract/update',
    contract_get_post: API_URL_BASE + '/contract/queryById/'
}

type PageParam = {
    id: number // 楼宇 id
    page: number // 当前页
    pageSize: number // 每页个数
}

export default {
    login(username: string, passwd: string) {
        return request({
            method: 'POST',
            url: API_URLS.login_post,
            data: {
                username,
                passwd
            }
        })
    },
    /** 获取大屏展示数据集合 */
    requestOverview() {
        return request({
            method: 'GET',
            url: API_URLS.overview_get
        })
    },
    /** 获取楼长制模块的概览数据 */
    requestLouZhangZhi() {
        return request({
            method: 'GET',
            url: API_URLS.louzhangzhi_overview_get
        })
    },
    /** 获取大调研年度统计数据 */
    requestResearch() {
        return request({
            method: 'GET',
            url: API_URLS.research_get
        })
    },
    /** 获取楼长数据 */
    requestLouZhang() {
        return request({
            method: 'GET',
            url: API_URLS.louzhang_get
        })
    },
    /** 获取信息新闻数据 */
    requestXinxi() {
        return request({
            method: 'GET',
            url: API_URLS.xinxi_get
        })
    },
    getYiYuanLouYu() {
        const data = [
            { name: '万达广场', value: '2.2' },
            { name: '方特广场', value: '1.6' },
            { name: '圣道大广场', value: '1.5' },
            { name: '499广场', value: '1.35' },
            { name: '89广场', value: '1.0' }
        ]
        return Promise.resolve({ data })
    },
    getZhongDianShuiShouTop5() {
        const data = [
            { name: '万达广场', value: '1200' },
            { name: '方特广场', value: '1000' },
            { name: '圣道大广场', value: '1100' },
            { name: '499广场', value: '200' },
            { name: '89广场', value: '800' }
        ]
        return Promise.resolve({ data })
    },
    getXinXiFaBu() {
        const data = [
            { id: 1, category: '政策信息', title: '中国共产党第N届会议指南', img: '', content: '' },
            { id: 2, category: '党建活动', title: '2020年党建活动中心组织援助动员会议', img: '', content: '' },
            { id: 3, category: '党建活动', title: '2020年党建活动中心组织援助动员会议', img: '', content: '' },
            { id: 4, category: '党建活动', title: '2020年党建活动中心组织援助动员会议', img: '', content: '' },
            { id: 5, category: '招商信息', title: '长寿街道楼宇大楼面对全市同行招商引资', img: '', content: '' },
            { id: 6, category: '政策信息', title: '中国共产党第N届会议指南', img: '', content: '' },
            { id: 7, category: '党建活动', title: '2020年党建活动中心组织援助动员会议', img: '', content: '' },
            { id: 8, category: '党建活动', title: '2020年党建活动中心组织援助动员会议', img: '', content: '' },
            { id: 9, category: '招商信息', title: '长寿街道楼宇大楼面对全市同行招商引资', img: '', content: '' },
            { id: 10, category: '党建活动', title: '2020年党建活动中心组织援助动员会议', img: '', content: '' },
            { id: 11, category: '政策信息', title: '中国共产党第N届会议指南', img: '', content: '' },
            { id: 12, category: '党建活动', title: '2020年党建活动中心组织援助动员会议', img: '', content: '' },
            { id: 13, category: '党建活动', title: '2020年党建活动中心组织援助动员会议', img: '', content: '' },
            { id: 14, category: '党建活动', title: '2020年党建活动中心组织援助动员会议', img: '', content: '' }
        ]
        return Promise.resolve({ data })
    },
    getShuiShouBoDong() {
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
        return Promise.resolve({ data })
    },
    getQianRuQianChu() {
        const data = {
            inAndOut: {
                inNum: 18,
                inPercent: 40,
                outNum: 18,
                outPercent: 67
            },
            inLog: [
                [2, 100],
                [3, 120],
                [4, 90],
                [5, 100],
                [6, 180],
                [7, 120]
            ],
            outLog: [
                [2, -80],
                [3, -100],
                [4, -120],
                [5, -140],
                [6, -100],
                [7, -140]
            ]
        }
        return Promise.resolve({ data })
    },
    getDangJian() {
        const data = {
            dangZhiBu: 41,
            qiYeZuTuan: 2.5,
            dangJianHuoDong: 67,
            huoDongPinTai: 41,
            zhiYuanZhe: 2.5,
            zhiYuanZheHuoDong: 67
        }
        return Promise.resolve({ data })
    },
    getLouZhangOverview() {
        const data = {
            louYuZongShu: 51,
            zouFangCiShu: 4500,
            zouFangQiYeShu: 3046,
            wenTiZongShu: 500,
            weiJieJueShu: 80,
            wanChengLv: 87
        }
        return Promise.resolve({ data })
    },
    getDiaoYanNianDuTongJi() {
        const data = {
            months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            weiChuLi: [100, 200, 300, 400, 200, 400, 500, 100, 90, 10, 110, 220],
            yiChuLi: [200, 300, 400, 300, 500, 600, 700, 200, 190, 210, 1110, 920]
        }
        return Promise.resolve({ data })
    },
    getDiaoYanFenLeiTongJi() {
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
        return Promise.resolve({ data: { week, year } })
    },
    getWeiJieJueFenLeiTongJi() {
        const data = [
            { name: '党的建设类', value: 100 },
            { name: '共用事业类', value: 200 },
            { name: '安全监管类', value: 300 },
            { name: '交通建设类', value: 100 },
            { name: '公安政法类', value: 120 },
            { name: '科教文卫类', value: 120 },
            { name: '社会管理类', value: 110 },
            { name: '其他', value: 100 }
        ]
        return Promise.resolve({ data })
    },
    getLouZhangWeiJiejueWenTi(id: number) {
        const wenTi = [
            '问题：经济纠纷类',
            '问题：企业科技平台连接失败',
            '问题：经济纠纷类',
            '问题：企业科技平台连接失败',
            '问题：经济纠纷类',
            '问题：企业科技平台连接失败',
            '问题：经济纠纷类',
            '问题：企业科技平台连接失败',
            '问题：经济纠纷类',
            '问题：企业科技平台连接失败',
            '问题：经济纠纷类',
            '问题：企业科技平台连接失败',
            '问题：经济纠纷类',
            '问题：企业科技平台连接失败',
            '问题：经济纠纷类',
            '问题：企业科技平台连接失败',
            '问题：经济纠纷类',
            '问题：企业科技平台连接失败'
        ]
        const fenLei = [
            { name: '党的建设类', value: 100 },
            { name: '共用事业类', value: 200 },
            { name: '安全监管类', value: 300 },
            { name: '交通建设类', value: 100 },
            { name: '公安政法类', value: 120 },
            { name: '科教文卫类', value: 120 },
            { name: '社会管理类', value: 110 },
            { name: '其他', value: 100 }
        ]
        const name = '谢太白'
        return Promise.resolve({ name, wenTi, fenLei })
    },
    getWenTiDetail(id: number) {
        const detail = {
            louYu: '998广场',
            qiYe: '上海市盒马科技有限公司',
            louZhang: '张慧琴',
            category: '经济综合类',
            date: '2020.09.09',
            content:
                '经济九分是指经济法律关系主题之间因经济权利和经济义务的矛盾而引起去的正义。经济九分是指经济法律关系主题之间因经济权利和经济义务的矛盾而引起去的正义。经济九分是指经济法律关系主题之间因经济权利和经济义务的矛盾而引起去的正义。经济九分是指经济法律关系主题之间因经济权利和经济义务的矛盾而引起去的正义。经济九分是指经济法律关系主题之间因经济权利和经济义务的矛盾而引起去的正义。经济九分是指经济法律关系主题之间因经济权利和经济义务的矛盾而引起去的正义。经济九分是指经济法律关系主题之间因经济权利和经济义务的矛盾而引起去的正义。经济九分是指经济法律关系主题之间因经济权利和经济义务的矛盾而引起去的正义。经济九分是指经济法律关系主题之间因经济权利和经济义务的矛盾而引起去的正义。'
        }
        return Promise.resolve(detail)
    },
    getXinXiDetail(id: number) {
        const xinxi = {
            category: '政策信息',
            title: '中国共产党第N届会议指南',
            img: 'https://picsum.photos/300/200',
            content:
                '新华社长沙9月19日电 中共中央总书记、国家主席、中央军委主席习近平9月17日上午在湖南省长沙市主持召开基层代表座谈会并发表重要讲话，听取基层干部群众代表对“十四五”规划编制的意见和建议。他强调，人民对美好生活的向往就是我们的奋斗目标。五年规划编制涉及经济社会发展方方面面，同人民群众生产生活息息相关，需要把加强顶层设计和坚持问计于民统一起来，鼓励广大人民群众和社会各界以各种方式建言献策，推动“十四五”规划编制顺应人民意愿、符合人民所思所盼。'
        }
        return Promise.resolve(xinxi)
    },
    getQiYeInLouYu(param: PageParam) {
        const data = {
            total: 10,
            pageNum: param.page,
            pageSize: param.pageSize,
            hasPreviousPage: param.page > 0,
            hasNextPage: param.page < 10,
            list: [
                {
                    name: 'xxx公司',
                    address: '莫某地址',
                    tax: '1000万',
                    area: '300㎡',
                    contact: '某摩巨人',
                    cc: '某某商会',
                    tag: '重点企业'
                }
            ]
        }
        return Promise.resolve({ data })
    },
    getDangZhiBu(param: PageParam) {
        const data = {
            total: 10,
            page: param.page,
            pageSize: param.pageSize,
            hasPreviousPage: param.page > 0,
            hasNextPage: param.page < 10,
            list: [
                {
                    name: 'xxx党支部',
                    address: '莫某地址',
                    members: 10
                }
            ]
        }
        return Promise.resolve({ data })
    },
    /** @param id 楼宇 id*/
    getLouYuInfo(id: number) {
        const data = {
            name: 'xxx大厦',
            address: '莫某地址',
            qiYe: 100,
            area: '300m2',
            tax: '2.2亿',
            louZhangZhi: {
                louZhang: '李太白',
                visit: 200,
                problems: 200,
                rate: 86
            }
        }
        return Promise.resolve({ data })
    },
    getZhongDianQiYe() {
        const data = {
            year: 2020,
            num: 1000,
            num60: 810,
            num100: 500,
            num500: 40
        }
        return Promise.resolve({ data })
    }
}
