<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

declare module 'vue/types/vue' {
    interface Vue {
        newInterval(task: Function, interval: number, ...args: any[]): IntervalTask

        clearInterval(task: IntervalTask): boolean
    }
}

export class IntervalTask {
    public intervalId?: number
    constructor(public mixin, public innerId: number, public task: Function, public interval: number, public args: any) {

    }

    stop() {
        this.mixin.clearInterval(this)
        this.intervalId = undefined
    }

    start() {
        if (this.intervalId) {
            return
        }
        this.intervalId = window.setInterval(
            (...args) => {
                this.task(...args)
            },
            this.interval,
            ...this.args
        )
        this.mixin.intervalTasksMap.set(this.innerId, this)
    }
}

@Component
export default class Interval extends Vue {
    name = 'BdIntervalMixin'
    intervalTasksMap =new Map()
    innerIdRecord = 0
    data() {
        return {
        }
    }
    beforeDestroy() {
        this.intervalTasksMap.forEach((value, key) => {
            window.clearInterval(value.intervalId)
        })
        this.intervalTasksMap.clear()
    }
    newInterval(task, interval, immediately, ...args) {
        if (immediately) {
            task(...args)
        }
        const intervalTask = new IntervalTask(this, this.innerIdRecord++, task, interval, args)
        intervalTask.start()
        return intervalTask
    }

    clearInterval(intervalTask) {
        window.clearInterval(intervalTask.intervalId)
        return this.intervalTasksMap.delete(intervalTask.innerId)
    }
}
</script>
