import { NativeModules, NativeEventEmitter } from 'react-native';

const { ToastExample } = NativeModules;

// 1. 创建一个 Emitter 实例，专门绑定到 ToastExample 模块
const ToastEventEmitter = new NativeEventEmitter(ToastExample);

export default {
  // 2. 转发原生方法
  show: ToastExample.show,
  SHORT: ToastExample.SHORT,
  LONG: ToastExample.LONG,

  // 3. 封装监听方法，让外部用起来更简单
  addListener: (callback) => {
    return ToastEventEmitter.addListener('onToastShown', callback);
  },
  
  // 4. 暴露 Emitter 实例（可选，如果外部想自己 addListener）
  emitter: ToastEventEmitter,
};
