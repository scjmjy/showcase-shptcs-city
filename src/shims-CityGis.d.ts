declare namespace CityGis {
    class Bridge {
        constructor(arg: any)

        Invoke(command: string, config: Record<string, any>): void
        addEventListener(func: any, _this: any): any
    }
}
