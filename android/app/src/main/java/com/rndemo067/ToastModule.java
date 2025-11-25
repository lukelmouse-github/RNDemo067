package com.rndemo067;

import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.util.HashMap;
import java.util.Map;

public class ToastModule extends ReactContextBaseJavaModule {
    private static ReactApplicationContext reactContext;

    private static final String DURATION_SHORT_KEY = "SHORT";
    private static final String DURATION_LONG_KEY = "LONG";

    public ToastModule(ReactApplicationContext context) {
        super(context);
        reactContext = context;
    }

    @NonNull
    @Override
    public String getName() {
        return "ToastExample";
    }

    @Nullable
    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put(DURATION_SHORT_KEY, Toast.LENGTH_SHORT);
        constants.put(DURATION_LONG_KEY, Toast.LENGTH_LONG);
        return constants;
    }

    // 发送事件的辅助方法
    private void sendEvent(String eventName, @Nullable WritableMap params) {
        getReactApplicationContext()
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }

    // 必须实现的方法：addListener
    // 即使你什么都不做，也必须写这个方法，否则 JS 端使用 NativeEventEmitter 时会报错
    @ReactMethod
    public void addListener(String eventName) {
        // Keep: Required for RN built-in Event Emitter Calls.
    }

    // 必须实现的方法：removeListeners
    // 即使你什么都不做，也必须写这个方法，否则 JS 端使用 NativeEventEmitter 时会报错
    @ReactMethod
    public void removeListeners(Integer count) {
        // Keep: Required for RN built-in Event Emitter Calls.
    }

    @ReactMethod
    public void show(String message, int duration, Callback errorCallback, Callback successCallback) {
        try {
            Toast.makeText(getReactApplicationContext(), message, duration).show();

            // 开启一个新线程来执行循环发送，避免阻塞当前线程
            new Thread(new Runnable() {
                @Override
                public void run() {
                    for (int i = 0; i < 20; i++) {
                        try {
                            Thread.sleep(300); // 暂停 300ms

                            WritableMap params = Arguments.createMap();
                            params.putString("message", message + " - Count: " + (i + 1));
                            sendEvent("onToastShown", params);
                        } catch (InterruptedException e) {
                            e.printStackTrace();
                        }
                    }
                }
            }).start();

            successCallback.invoke("这是一个successCallback");
        } catch (Exception e) {
            errorCallback.invoke("这是一个errorCallback");
        }
    }
}
