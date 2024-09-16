export default Object.freeze({
    security: {
        signIn: `/dev/api/security/auth/login`,
    },
    users: {
        create: `/dev/api/core/users`,
        delete: `/dev/api/core/users/:id`,
        update: `/dev/api/core/users/:id`,
        find: `/dev/api/core/users/:id`,
        filter: `/dev/api/core/users`,
        associate_employee: `//dev/api/core/users/associate-employee/:id`,
        find_employees: `//dev/api/core/users/employees/:id`,
        find_invitations: `//dev/api/core/users/invitations/:id`
    },
    services: {
        create: `/dev/api/core/services`,
        delete: `/dev/api/core/services/:id`,
        update: `/dev/api/core/services/:id`,
        find: `/dev/api/core/services/:id`,
        filter: `/dev/api/core/services`
    },
    customers: {
        create: `/dev/api/core/customers`,
        delete: `/dev/api/core/customers/:id`,
        update: `/dev/api/core/customers/:id`,
        find: `/dev/api/core/customers/:id`,
        filter: `/dev/api/core/customers`
    },
    employees: {
        create: `/dev/api/core/employees`,
        delete: `/dev/api/core/employees/:id`,
        update: `/dev/api/core/employees/:id`,
        find: `/dev/api/core/employees/:id`,
        filter: `/dev/api/core/employees`
    }
});