// pages/publish/publish.ts
Page({
  goToPublishLost() {
    wx.navigateTo({
      url: '../publishLost/publishLost'
    })
  },
  goToPublishIdle() {
    wx.navigateTo({
      url: '../publishIdle/publishIdle'
    })
  }
})
