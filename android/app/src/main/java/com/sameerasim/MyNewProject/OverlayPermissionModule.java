package com.sameerasim.cartx;

import android.content.Intent;
import android.net.Uri;
import android.provider.Settings;
import androidx.annotation.NonNull;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class OverlayPermissionModule extends ReactContextBaseJavaModule {

    private static final int REQUEST_CODE_OVERLAY = 1001;

    public OverlayPermissionModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @NonNull
    @Override
    public String getName() {
        return "OverlayPermissionModule";
    }

    @ReactMethod
    public void requestOverlayPermission(Promise promise) {
        try {
            if (!Settings.canDrawOverlays(getReactApplicationContext())) {
                Intent intent = new Intent(Settings.ACTION_MANAGE_OVERLAY_PERMISSION,
                        Uri.parse("package:" + getReactApplicationContext().getPackageName()));
                getCurrentActivity().startActivityForResult(intent, REQUEST_CODE_OVERLAY);
                promise.resolve(true);
            } else {
                promise.resolve(true);
            }
        } catch (Exception e) {
            promise.reject(e);
        }
    }

    @ReactMethod
    public void hasOverlayPermission(Promise promise) {
        try {
            promise.resolve(Settings.canDrawOverlays(getReactApplicationContext()));
        } catch (Exception e) {
            promise.reject(e);
        }
    }
}
