const API_BASE = "https://b75vb6zrw5.execute-api.us-east-1.amazonaws.com";

export default Object.freeze({
    security: {
        signIn: `${API_BASE}/dev/api/security/auth/sign-in`,
        register: `${API_BASE}/dev/api/security/auth/register`,
    },
});