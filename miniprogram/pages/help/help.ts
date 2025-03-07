import { helpItem } from '../../types/helpInterface';
import helpService from '../../api/helpService';

Page({
  data: {
    swipeList: [
      {
        url: '../../assets/images/help.png',
        type: 'url',
        target: 'www.baidu.com'
      },
      {
        url: '../../assets/images/help2.png',
        type: 'product',
        target: '1'
      },
    ],
    list: [] as helpItem[],
  },
  onLoad() {
    this.getList();
  },
  getList() {
    helpService.getHelpList().then((res) => {
      this.setData({
        list: res
      })
    })
  },
  toSearch() {
    wx.navigateTo({
      url: '../helpSearch/helpSearch',
    })
  },
  goToHelpDetail(event: WechatMiniprogram.TouchEvent) {
    wx.navigateTo({
      url: '../helpDetail/helpDetail?data='+JSON.stringify(event.currentTarget.dataset.item)
    })
  }
})