const API_BASE = "https://1xfslfeqxf.execute-api.us-east-1.amazonaws.com";

export default Object.freeze({
    security: {
        signIn: `${API_BASE}/dev/api/security/auth/login`,
    },
    users: {
        create: `${API_BASE}/dev/api/core/users`,
        delete: `${API_BASE}/dev/api/core/users/:id`,
        update: `${API_BASE}/dev/api/core/users/:id`,
        find: `${API_BASE}/dev/api/core/users/:id`,
        filter: `${API_BASE}/dev/api/core/users`,
        associate_employee: `${API_BASE}//dev/api/core/users/associate-employee/:id`,
        find_employees: `${API_BASE}//dev/api/core/users/employees/:id`,
        find_invitations: `${API_BASE}//dev/api/core/users/invitations/:id`
    }
});