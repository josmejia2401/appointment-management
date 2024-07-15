import Utils from '../../../../lib/utils';

export default class Validator {


    static validateFullName(value) {
        if (Utils.isEmpty(value)) {
            return 'El Nombre es requerido.'
        }
        if (String(value).length < 4) {
            return 'El Nombre debe tener mínimo 4 dígitos.'
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
            return 'El Usuario debe tener mínimo 6 dígitos.'
        }
        if (String(value).length > 12) {
            return 'El Usuario debe tener máximo 12 dígitos.'
        }
        return;
    }

    static validatePassword(value) {
        if (Utils.isEmpty(value)) {
            return 'La Contraseña es requerida.'
        }
        if (String(value).length < 6) {
            return 'La Contraseña debe tener mínimo 6 dígitos.'
        }
        if (String(value).length > 12) {
            return 'La Contraseña debe tener máximo 12 dígitos.'
        }
        return;
    }
}