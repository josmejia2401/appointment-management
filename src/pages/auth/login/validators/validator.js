import Utils from '../../../../lib/utils';

export default class Validator {

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