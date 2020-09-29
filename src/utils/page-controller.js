export default class PageController {
    constructor(api, pgeSize) {
        this.page = 0
        this.pageSize = pgeSize || 20
        this.hasPreviousPage = false
        this.hasNextPage = false
        this.total = 0
        this.filter = {}
        this.sortName = ''
        this.sortOrder = ''
        this.api = api
    }

    fetch() {
        return this.api({
            page: this.page,
            pageSize: this.pageSize,
            sort: this.sortOrder ? this.sortOrder : undefined,
            sortName: this.sortName ? this.sortName : undefined,
            ...this.filter
        })
    }
    /** @param {number} page 基于1索引 */
    gotoPage(page, init = false) {
        if (init) {
            this.total = 0
            this.page = 0
        } else if (this.total < page) {
            throw new Error('页数超过最大值')
        }
        const cache = this.page
        this.page = page
        return new Promise((resolve, reject) => {
            this.fetch()
                .then(res => {
                    const data = res.data
                    this.page = data.page
                    this.pageSize = data.pageSize
                    this.hasPreviousPage = data.hasPreviousPage
                    this.hasNextPage = data.hasNextPage
                    this.total = data.total
                    resolve(data.list)
                })
                .catch(err => {
                    this.page = cache
                    reject(err)
                })
        })
    }

    size(size) {
        this.pageSize = size
        return this
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

    reload() {
        //
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

    addFilter(filter) {
        this.filter = filter
        return this
    }

    clearFilter(key) {
        delete this.filter[key]
        return this
    }

    clearAllFilters() {
        this.filter = {}
        return this
    }
}
