export const documentTypes = [
    {
        id: 1,
        name: 'Cédula de ciudadanía'
    },
    {
        id: 2,
        name: 'Tarjeta de identidad'
    },
    {
        id: 3,
        name: 'Registro civil'
    },
    {
        id: 4,
        name: 'NIT'
    },
    {
        id: 5,
        name: 'Otro'
    }
];

export function findDocumentTypeById(id) {
    return documentTypes.filter(p => p.id === Number(id))[0];
}



export const status = [
    {
        id: 1,
        name: 'ACTIVO'
    },
    {
        id: 2,
        name: 'INACTIVO'
    },
    {
        id: 3,
        name: 'PENDIENTE'
    },
    {
        id: 4,
        name: 'ELIMINADO'
    }
];

export function findStatusById(id) {
    return status.filter(p => p.id === Number(id))[0];
}

export function buildAndGetClassStatus(recordStatus) {
    const key = findStatusById(recordStatus).id;
    switch (key) {
        case 1:
            return "badge bg-success";
        case 2:
            return "badge bg-secondary";
        case 3:
            return "badge bg-warning";
        case 4:
            return "badge bg-danger";
        default:
            break;
    }
    return null;
}


export const genders = [
    {
        id: 1,
        name: 'Masculino'
    },
    {
        id: 2,
        name: 'Femenino'
    },
    {
        id: 3,
        name: 'LGTBI'
    },
    {
        id: 4,
        name: 'Otro'
    }
];

export function findGenderById(id) {
    return status.filter(p => p.id === Number(id))[0];
}