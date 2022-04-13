import { getDiffTime } from '../util/util.js'

class DBPost {
  constructor(postId) {
    this.storageKeyName = 'postList'
    this.postId = postId
  }
  getAllPostData() {
    var res = wx.getStorageSync(this.storageKeyName)
    if (!res) {
      res = require('../data/data.js').postList
      this.execSetStorageSync(res)
    }
    return res
  }
  execSetStorageSync(data) {
    wx.setStorageSync(this.storageKeyName, data)
  }

  getPostItemById(){
    var postData = this.getAllPostData(), len = postData.length
    for (var i=0; i<len; ++i){
      if (postData[i].postId == this.postId){
        return {
          index:i,
          data: postData[i]
        }
      }
    }
  }

  updatePostData(category){
    var itemData = this.getPostItemById(),
      postData = itemData.data,
      allPostData = this.getAllPostData()
    switch(category){
      case 'collect':
        if (!postData.collectionStatus){
          postData.collectionNum++;
          postData.collectionStatus = true;
        } else{
          postData.collectionNum--;
          postData.collectionStatus = false
        }
        break
      default:
        break
    }
    allPostData[itemData.index] = postData
    this.execSetStorageSync(allPostData)
    return postData
  }

  getCommentData(){
    var itemData = this.getPostItemById().data;
    itemData.comments.sort(this.compareWithTime)
    var len=itemData.comments.length, 
      comment 
    for (var i=0; i<len; i++){
      comment = itemData.comments[i]
      comment.create_time = getDiffTime(comment.create_time, true)
    }
    return itemData.comments
  }

  compareWithTime(v1, v2){
    var flag = parseFloat(v1.create_time) - parseFloat(v2.create_time)
    switch (flag){
      case 0:
        return 0
      case flag < 0:
        return -1
      case flag > 0:
        return 1
      default:
        break

    }

  }

  collect(){
    return this.updatePostData('collect')
  }
}


export {DBPost}