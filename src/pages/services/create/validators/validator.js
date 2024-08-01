import Utils from '../../../../lib/utils';

export default class Validator {


    static validate(key, value) {
        switch (key) {
            case 'name':
                return Validator.validateName(value);
            case 'description':
                return Validator.validateDescription(value);
            case 'duration':
                return Validator.validateDuration(value);
            default:
                break;
        }
        return [];
    }
    static validateName(value) {
        if (Utils.isEmpty(value)) {
            return ['Campo es requerido.'];
        }
        if (String(value).length > 50) {
            return ['Campo debe ser inferior a 50 caracteres.'];
        }
        return [];
    }
    static validateDescription(value) {
        if (Utils.isEmpty(value)) {
            return ['Campo es requerido.'];
        }
        if (String(value).length > 150) {
            return ['Campo debe ser inferior a 150 caracteres.'];
        }
        return [];
    }
    static validateDuration(value) {
        if (!Utils.isEmpty(value) && isNaN(Number(value))) {
            return ['Duración no es válido.'];
        }
        return [];
    }
}