import Toast from '../../static/vant/toast/toast'

export function toast(message, duration = 1000) {
  Toast({
    message, duration
  });
}
