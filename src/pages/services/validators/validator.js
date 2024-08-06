import { findDocumentTypeById, findGenderById, findMaritalStatusById, findStatusById } from '../../../lib/list_values';
import Utils from '../../../lib/utils';

export default class Validator {

    static validate(key, value) {
        switch (key) {
            case 'name':
                return Validator.validateName(value);
            case 'description':
                return Validator.validateDescription(value);
            case 'duration':
                return Validator.validateDuration(value);
            case 'pricing':
                return Validator.validatePricing(value);
            case 'recordStatus':
                return Validator.validatePricing(value);
            default:
                break;
        }
        return [];
    }

    static validateName(value) {
        if (Utils.isEmpty(value)) {
            return ['Campo es requerido.'];
        }
        if (String(value).length < 2) {
            return ['Campo debe tener mínimo 2 caracteres.'];
        }
        if (String(value).length > 50) {
            return ['Campo debe tener máximo 50 caracteres.'];
        }
        return [];
    }

    static validateDescription(value) {
        if (!Utils.isEmpty(value) && value.length > 150) {
            return ['Campo no es válido.'];
        }
        return [];
    }

    static validateDuration(value) {
        if (!Utils.isEmpty(value) && isNaN(Number(value))) {
            return ['Campo no es válido.'];
        }
        return [];
    }

    static validatePricing(value) {
        if (!Utils.isEmpty(value) && isNaN(Number(value))) {
            return ['Campo no es válido.'];
        }
        return [];
    }

    static validateRecordStatus(value) {
        if (Utils.isEmpty(value)) {
            return ['Campo es requerido.'];
        }
        if (!Utils.isEmpty(value) && Utils.isEmpty(findStatusById(value))) {
            return ['Campo no es válido.'];
        }
        return [];
    }
}