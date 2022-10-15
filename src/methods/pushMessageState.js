import emitter from '@/methods/emitter'

export default function (res) {
  if (res.data.success) {
    emitter.emit('push-message', {
      style: 'success',
      title: '更新成功'
    })
  } else {
    const message = typeof res.data.message === 'string' ? [res.data.message] : res.data.message
    emitter.emit('push-message', {
      style: 'danger',
      title: '更新失敗',
      content: message.join('、')
    })
  }
}
