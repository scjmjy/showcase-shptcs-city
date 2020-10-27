import { EventEmitter } from 'events'
import Vue from 'vue'
/**
 * 用来管理 popup 弹窗的管理工具类
 */
export default class PopupManager extends EventEmitter {
    // popup信息事件名称 - 传给该 popup 组件的数据
    // private popupMap = new Map<string, PopupOpts>()
    private popupMap = {}
    private zIndex = 100
    constructor() {
        super()
    }
    addPopup(popupEvName: string, $el: Vue, data: any) {
        const found = this.popupMap[popupEvName]
        if (found) {
            found.data = data
        } else {
            const innerData = {
                show: false,
                $el,
                data
            }
            const proxy = new Proxy(innerData, {
                set: (target, key, value) => {
                    if (key === 'show') {
                        // 在赋新的值之前调用此行，获得当前是否正在显示
                        const isShowing = target.show

                        target[key] = value
                        const evName = value === true ? 'popup-show' : 'popup-hide'
                        this.emit(evName, {
                            name: popupEvName,
                            $el,
                            isShowing,
                            totalShowCount: this.showCount()
                        })
                    }
                    return true
                }
            })
            this.popupMap[popupEvName] = proxy
        }
    }
    getPopup(popupEvName: string) {
        const found = this.popupMap[popupEvName]
        return found
    }
    // toggle(popupEvName: string, data: any) {
    //     const found = this.popupMap[popupEvName]
    //     if (found) {
    //         found.show = !found.show
    //         if (data) {
    //             found.data = data
    //         }
    //     } else {
    //         throw new Error("popup event name not found : " + popupEvName)
    //     }
    // }
    show(popupEvName: string, data: any) {
        const found = this.popupMap[popupEvName]
        if (found) {
            found.show = true
            if (data) {
                found.data = data
            }
        } else {
            throw new Error('popup event name not found : ' + popupEvName)
        }
    }

    showCount() {
        let count = 0
        Object.values(this.popupMap).forEach((popup: any) => {
            if (popup.show) {
                count++
            }
        })
        return count
    }
    nextZIndex() {
        return this.zIndex++
    }
}
