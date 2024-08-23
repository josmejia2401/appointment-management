const API_BASE = "https://9largh2a49.execute-api.us-east-1.amazonaws.com";

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
    },
    services: {
        create: `${API_BASE}/dev/api/core/services`,
        delete: `${API_BASE}/dev/api/core/services/:id`,
        update: `${API_BASE}/dev/api/core/services/:id`,
        find: `${API_BASE}/dev/api/core/services/:id`,
        filter: `${API_BASE}/dev/api/core/services`
    },
    customers: {
        create: `${API_BASE}/dev/api/core/customers`,
        delete: `${API_BASE}/dev/api/core/customers/:id`,
        update: `${API_BASE}/dev/api/core/customers/:id`,
        find: `${API_BASE}/dev/api/core/customers/:id`,
        filter: `${API_BASE}/dev/api/core/customers`
    },
    employees: {
        create: `${API_BASE}/dev/api/core/employees`,
        delete: `${API_BASE}/dev/api/core/employees/:id`,
        update: `${API_BASE}/dev/api/core/employees/:id`,
        find: `${API_BASE}/dev/api/core/employees/:id`,
        filter: `${API_BASE}/dev/api/core/employees`
    }
});