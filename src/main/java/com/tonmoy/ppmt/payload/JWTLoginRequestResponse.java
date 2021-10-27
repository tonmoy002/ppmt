package com.tonmoy.ppmt.payload;

public class JWTLoginRequestResponse {
    private boolean success;
    private String token;

    public JWTLoginRequestResponse(boolean b, String jwt) {
        this.success = b;
        this.token = jwt;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    @Override
    public String toString() {
        return "JWTLoginRequestResponse{" +
                "success=" + success +
                ", token='" + token + '\'' +
                '}';
    }
}
