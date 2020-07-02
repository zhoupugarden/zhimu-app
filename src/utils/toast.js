import Toast from '../../static/vant/toast/toast'

export function toast(message, duration = 3000) {
  Toast({
    message, duration
  });
}
