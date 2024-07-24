import Utils from '../../../../lib/utils';

export default class Validator {


    static validateFirstName(value) {
        if (Utils.isEmpty(value)) {
            return 'El Nombre es requerido.'
        }
        if (String(value).length < 4) {
            return 'El Nombre debe tener mínimo 4 caracteres.'
        }
        if (String(value).length > 100) {
            return 'El Nombre debe tener máximo 100 caracteres.'
        }
        return;
    }

    static validateLastName(value) {
        if (Utils.isEmpty(value)) {
            return 'El Apellido es requerido.'
        }
        if (String(value).length < 4) {
            return 'El Apellido debe tener mínimo 4 caracteres.'
        }
        if (String(value).length > 100) {
            return 'El Apellido debe tener máximo 100 caracteres.'
        }
        return;
    }

    static validateEmail(value) {
        if (Utils.isEmpty(value)) {
            return 'El Correo es requerido.'
        }

        if (!String(value)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )) {
            return 'El Correo no es válido.'
        }
        return;
    }


    static validateUsername(value) {
        if (Utils.isEmpty(value)) {
            return 'El Usuario es requerido.'
        }
        if (String(value).length < 6) {
            return 'El Usuario debe tener mínimo 6 caracteres.'
        }
        if (String(value).length > 20) {
            return 'El Usuario debe tener máximo 20 caracteres.'
        }
        return;
    }

    static validatePassword(value) {
        if (Utils.isEmpty(value)) {
            return 'La Contraseña es requerida.'
        }
        if (String(value).length < 6) {
            return 'La Contraseña debe tener mínimo 6 caracteres.'
        }
        if (String(value).length > 20) {
            return 'La Contraseña debe tener máximo 20 caracteres.'
        }
        return;
    }
}