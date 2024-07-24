const API_BASE = "https://1xfslfeqxf.execute-api.us-east-1.amazonaws.com";

export default Object.freeze({
    security: {
        signIn: `${API_BASE}/dev/api/security/auth/login`,
        register: `${API_BASE}/dev/api/core/users`,
    },
});