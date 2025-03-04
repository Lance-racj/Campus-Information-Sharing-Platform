const express = require('express');
const router = express.Router();
const { Lose, Collection } = require('../../database');

// 发布失物接口
router.post('/publish', async (req, res) => {
  try {
    /* 将前端传过来的数据放入lose数据表中 */
    const {
      openid,
      type,
      classify_1,
      classify_2,
      name,
      date,
      region,
      phone,
      desc,
      imgList,
      status,
      time
    } = req.body;
    await Lose.create({openid, type, classify_1, classify_2, name, date, region, phone, desc, imgList, status, time});
    res.send('success');
  } catch(error) {
    res.send('error', error);
  }
})

// 获取首页的数据
router.get('/list', async (req, res) => {
  try {
    const { type, openid } = req.query;
    let result;
    if (openid) { // 我的失物招领发布
      result = await Lose.find({
        openid,
        type
      })
    } else { // 获取失物招领信息
      result = await Lose.find({
        type
      });
    }
    res.send(result)
  } catch(error) {
    res.send('error');
  }
})

// 获取单人收藏列表
router.get('/follow/list', async (req, res) => {
  try {
    const { openid, type } = req.query;
    const result = await Collection.find({
      openid,
      type
    });
    res.send(result);
  } catch(error) {
    res.send('error');
  }
})

// 获取单个失物招领收藏信息
router.get('/follow/item', async (req, res) => {
  try {
    const { id, openid } = req.query;
    const result = await Collection.find({
      id,
      openid
    })
    if (result.length > 0) {
      res.send('success');
    } else {
      res.send('error');
    }
  } catch(error) {
    res.send('error');
  }
})

// 收藏失物招领帖
router.post('/follow/add', async (req, res) => {
  try {
    /* 将前端传过来的数据放入lose数据表中 */
    const {
      openid,
      type,
      classify_1,
      classify_2,
      name,
      date,
      region,
      phone,
      desc,
      imgList,
      time,
      status,
      _id
    } = req.body;
    await Collection.create({openid, type, classify_1, classify_2, name, date, region, phone, desc, imgList, status, time, id: _id});
    res.send('success');
  } catch(error) {
    res.send('error', error);
  }
})

// 取消收藏失物招领帖
router.post('/follow/del', async (req, res) => {
  try {
    const {id, openid} = req.body;
    await Collection.findOneAndRemove({
      id,
      openid
    })
    res.send('success');
  } catch(error) {
    res.send('error');
  }
})

// 删除失物招领帖子
router.post('/delete', async (req, res) => {
  const { _id } = req.body;
  try {
    await Lose.findByIdAndRemove(_id);
    await Collection.findOneAndRemove({
      id: _id
    });
    res.send('success');
  } catch(error) {
    res.send('error');
  }
})

router.post('/edit', async (req, res) => {  // 将status由0修改为1
  try {
    const { _id } = req.body;
    const item = await Lose.findById(_id);
    if (!item) {
      res.status(404).json({ message: 'Item not found' });
    }
    item.status = 1;
    await item.save();
    res.send('success');
  } catch(error) {
    res.send('error');
  }
})

// 提交评论
router.post('/comment/add', async (req, res) => {
  const { content, nickname, time, _id } = req.body;
  try {
    const { commentList } = await Lose.findById(_id);
    commentList.push({
      nickname,
      content,
      time
    });
    await Lose.findByIdAndUpdate(_id, {
      commentList
    })
    const result = await Lose.findById(_id);
    res.send(result);
  } catch(error) {
    res.send('error');
  }
})

// 模糊检索物品名字
router.get('/search/name', async (req, res) => {
  try {
    const { name } = req.query;
    const _name = new RegExp(name, 'i');
    const result = await Lose.find({
      name: _name
    });
    res.send(result);
  } catch(error) {
    res.send('error');
  }
})

module.exports = router;
