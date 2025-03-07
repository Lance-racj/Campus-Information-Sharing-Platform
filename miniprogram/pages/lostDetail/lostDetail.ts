import lostService from '../../api/lostService';
import Notify from '@vant/weapp/notify/notify';
import { lostItemDetail } from '../../types/lostInterface';
import formatTime from '../../utils/formatTime';

Page({
  data: {
    data: {} as lostItemDetail<string>,
    show: false,
    isCollect: false,
    comment: ''
  },
  onLoad(options: Record<string, string>) {
    const data = JSON.parse(options.data);
    this.setData({data})
    this.checkFollow();
  },
  async checkFollow(){
    const res = await lostService.checkFollow({id: this.data.data._id, openid: this.data.data.openid});
    if (res === 'success') this.setData({isCollect: true});
    else this.setData({isCollect: false})
  },
  showPopup() {
    this.setData({ show: true });
  },
  onClose() {
    this.setData({ show: false });
  },
  // 复制手机号
  copyNumber() {
    wx.setClipboardData({
      data: this.data.data.phone,
      success: () => {
        wx.showToast({
          icon: "none",
          title: "内容已复制"
        })
        this.onClose();
      }
    })
  },
  // 收藏
  async toCollection() {
    if (this.data.isCollect) { // 取消收藏
      lostService.unfollow({id: this.data.data._id, openid: this.data.data.openid});
      this.checkFollow();
      Notify({
        type: 'primary',
        message: '取消收藏成功'
      })
    } else { // 收藏
      lostService.follow(this.data.data);
      this.checkFollow();
      Notify({ 
        type: 'primary', 
        message: '收藏成功' 
      });
    }
  },
  getComment(e: any) {
    this.setData({
      comment: e.detail.value
    })
  },
  submitComment() {
    if (this.data.comment === '') {
      Notify({
        type: 'danger',
        message: '请检查是否填入内容'
      })
      return;
    }
    const params = {
      nickname: wx.getStorageSync('account').username,
      content: this.data.comment,
      time: formatTime(new Date().getTime()),
      _id: this.data.data._id
    }
    lostService.publishComment(params).then((res) => {
      if(typeof res === 'object') {
        Notify({
          type: 'primary',
          message: '发布评论成功'
        })
        this.setData({
          comment: ''
        })
        this.setData({
          data: res
        })
      } else {
        Notify({
          type: 'danger',
          message: '发布评论失败'
        })
      }
    })
  }
})