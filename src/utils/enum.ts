/* eslint-disable */
/** 
 * 枚举工具类，方便 枚举值、枚举字符串和自定义枚举数据之间的转换
 */
export default class Enum {
	/**
	 * @param nums 枚举值数组
	 * @param strs 枚举字符串数组
	 * @param more 枚举值对应的自定义数据
	 * @param sections <u-section>组件需要用到的
	 */
	constructor(
		public nums: number[],
		public strs: string[],
		public more?: any[],
		public sections?: string[]
	) {
		if (nums.length !== strs.length) {
			throw new Error('枚举配置不正确')
		}
	}
	_num2index(num: number) {
		let index = this.nums.findIndex(n => n === num)
		// if (index === -1) throw new Error('无效的枚举值：' + num)
		if (index === -1) {
			index = this.nums.length - 1
		}
		return index
	}
	_str2index(str: string) {
		let index = this.strs.findIndex(s => s === str)
		// if (index === -1) throw new Error('无效的枚举字符串：' + str)
		if (index === -1) {
			index = this.nums.length - 1
		}
		return index
	}
	_section2index(section: string, compare: (more: any, section: string) => boolean) {
		//@ts-ignore
		//@ts-nocheck
		let index = this.more.findIndex(m => compare(m, section))
		// if (index === -1) throw new Error('无效的section：' + section)
		if (index === -1) {
			index = this.nums.length - 1
		}
		return index
	}

	num2str(num: number) {
		const index = this._num2index(num)
		return this.strs[index]
	}
	num2more(num: number) {
		const index = this._num2index(num)
		//@ts-ignore
		return this.more[index]
	}

	str2num(str: string) {
		const index = this._str2index(str)
		return this.nums[index]
	}

	str2more(str: string) {
		const index = this._str2index(str)
		//@ts-ignore
		return this.more[index]
	}

	section2num(section: string, compare: (more: any, section: string) => boolean ) {
		const index = this._section2index(section, compare)
		return this.nums[index]
	}
}
