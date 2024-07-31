import Utils from '../../../../lib/utils';

export default class Validator {


    static validate(key, value) {
        switch (key) {
            case 'username':
                return Validator.validateUsername(value);
            default:
                break;
        }
        return [];
    }
    static validateUsername(value) {
        if (Utils.isEmpty(value)) {
            return ['Usuario es requerido.'];
        }
        return [];
    }
}