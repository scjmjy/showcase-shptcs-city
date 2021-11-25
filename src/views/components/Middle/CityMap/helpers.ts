// import Vue from 'vue'
// import store from '@/store'
// function makeMarkers(key: string, markerCache: any) {
//     if (!markerCache[key]) {
//         new Promise((resovle, reject) => {
//             const markers = [] as any[]
//             const texts = [] as any[]
//             // 楼宇名字<——>税收参数，用来计算楼宇中有几个top5的企业
//             const louyu2shuishou = new Map()
//             this.ZhongDianShuiShouTop10.forEach((qiye, index) => {
//                 // const louyu = this.louYuList.find(l => {
//                 //     return l.qiYeList.find(q => q.name === qiye.name)
//                 // })
//                 const louyu = store.state.qiYe2Louyu.get(qiye.name)

//                 if (louyu) {
//                     const zhongdian = louyu2shuishou.get(louyu.name)
//                     if (zhongdian) {
//                         zhongdian.count++
//                     } else {
//                         louyu2shuishou.set(louyu.name, {
//                             id: louyu.id,
//                             name: louyu.name,
//                             coordx: louyu.coordx,
//                             coordy: louyu.coordy,
//                             count: 1,
//                         })
//                         markers.push({
//                             coordx: louyu.coordx,
//                             coordy: louyu.coordy,
//                             coordz: 100,
//                             iconType: getZhongDian(index),
//                             id: louyu.id,
//                             name: louyu.name,
//                         })
//                     }
//                 }
//             })
//             louyu2shuishou.forEach((zhongdian, louyuName) => {
//                 texts.push({
//                     content: zhongdian.count + '',
//                     louyuName,
//                     font: {
//                         size: 30,
//                         weight: 'bold',
//                     },
//                 })
//                 markers.push({
//                     coordx: zhongdian.coordx,
//                     coordy: zhongdian.coordy,
//                     coordz: 200,
//                     iconType: louyuName,
//                     id: zhongdian.id,
//                     name: zhongdian.name,
//                 })
//             })
//             resovle({
//                 markers,
//                 texts,
//             })
//         })
//             .then(res => {
//                 Vue.set(this.markerCache, key, res)
//             })
//             .finally(() => {
//                 this.loading = false
//             })
//     }
// }
