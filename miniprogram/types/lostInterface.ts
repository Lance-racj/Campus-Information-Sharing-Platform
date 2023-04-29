export interface pic {
  url: string,
  name: string
}

export interface lostItem<T> {
  openid: string,
  type: number
  classify_1: string,
  classify_2: string,
  name: string,
  date: string,
  region: string,
  phone: string,
  desc: string,
  imgList: Array<pic>,
  time: T
}

export interface lostItemDetail<T> extends lostItem<T> {
  _id: string
}
