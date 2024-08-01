import { status } from '../../../../lib/list_values';
import Utils from '../../../../lib/utils';

export default class Validator {

    static validate(key, value) {
        switch (key) {
            case 'recordStatus':
                return Validator.validateStatus(value);
            default:
                break;
        }
        return [];
    }

    static validateStatus(value) {
        if (Utils.isEmpty(value)) {
            return ['<<Estado>> es requerido.']
        }
        if (Utils.isEmpty(status.filter(p => p.id === Number(value))[0])) {
            return ['<<Estado>> no es válido.']
        }
        return []
    }
}