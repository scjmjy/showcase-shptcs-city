export default class PageController {
    constructor(api, pgeSize) {
        this.pageCache = 0 // 请求页数的缓存
        this.page = 0 // 当前页数
        this.pageSize = pgeSize || 20 // 请求页数的行数，实际返回的数据可能小于这个数
        this.size = 0 // 当前页数的实际行数
        this.pages = 0 // 一共有多少业
        this.total = 0 // 一共有多少行
        this.hasPreviousPage = false
        this.hasNextPage = false
        this.filter = {}
        this.sortName = ''
        this.sortOrder = ''
        this.api = api
    }

    fetch(page) {
        return this.api({
            page,
            pageSize: this.pageSize,
            sort: this.sortOrder ? this.sortOrder : undefined,
            sortName: this.sortName ? this.sortName : undefined,
            ...this.filter
        })
    }

    gotoPage(page) {
        this.pageCache = page
        return new Promise((resolve, reject) => {
            this.fetch(page)
                .then(res => {
                    const data = res.data
                    let conflict = false
                    if (data.pageNum !== this.pageCache) {
                        // 说明在请求第data.pageNum页的数据之后，又请求了第this.pageCache页的数据
                        conflict = true
                    } else {
                        this.page = data.pageNum
                        // this.pageSize = data.pageSize
                        this.size = data.size
                        this.pages = data.pages
                        this.hasPreviousPage = data.hasPreviousPage
                        this.hasNextPage = data.hasNextPage
                        this.total = data.total
                    }
                    resolve({ conflict, page: data.pageNum, list: data.list })
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    resize(size) {
        this.pageSize = size
        return this.gotoPage(1)
    }

    prePage() {
        if (this.hasPreviousPage) {
            return this.gotoPage(this.page - 1)
        } else {
            return Promise.reject('已经是第一页了')
        }
    }

    nextPage() {
        if (this.hasNextPage) {
            return this.gotoPage(this.page + 1)
        } else {
            return Promise.reject('已经是最后一页了')
        }
    }

    refresh() {
        return this.gotoPage(this.page)
    }

    // order: DESC | ASC
    sort(sortName, order) {
        if (order !== 'DESC' && order !== 'ASC') {
            throw new Error('排序顺序参数错误')
        }
        this.sortName = sortName
        this.sortOrder = order
        return this
    }

    clearSort() {
        this.sortName = ''
        this.sortOrder = ''
        return this
    }

    addFilter(key, value) {
        this.filter[key] = value
        return this
    }

    clearFilter(key) {
        delete this.filter[key]
        return this
    }

    addAllFilters(filters) {
        this.filter = filters
        return this
    }
    clearAllFilters() {
        this.filter = {}
        return this
    }
}
