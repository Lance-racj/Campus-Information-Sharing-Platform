Component({
  properties: {
    helpItem: {},
    handle: Boolean
  },
  methods: {
    deleteItem(e: WechatMiniprogram.TouchEvent) {
      const { id } = e.currentTarget.dataset;
      this.triggerEvent('getDeleteID', id);
    },
    updateItem(e: WechatMiniprogram.TouchEvent) {
      const { id } = e.currentTarget.dataset;
      this.triggerEvent('getUpdateID', id);
    }
  }
})