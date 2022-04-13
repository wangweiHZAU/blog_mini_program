// app.js

App({
  onLaunch() {
    // 展示本地存储能力 不超过10M
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // wx.setStorage({
    //   key: 'postList',
    //   data: dataObj.postList,
    //   success: ()=>{
    //     console.log('localStorage read success')
    //   },
    //   fail: ()=>{
    //     console.log('localStorage read failed')
    //   },
    //   complete: ()=>{
    //     console.log('localStorage read finish')
    //   }
    // })
    if(!wx.getStorageSync('postList')){
      var dataObj =  require('./data/data.js')
      wx.setStorageSync('postList', dataObj.postList)
    }
    

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    userInfo: null
  }
})
