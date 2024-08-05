import { findDocumentTypeById, findGenderById, findMaritalStatusById } from '../../../lib/list_values';
import Utils from '../../../lib/utils';

export default class Validator {

    static validate(key, value) {
        switch (key) {
            case 'firstName':
                return Validator.validateFirstName(value);
            case 'lastName':
                return Validator.validateLastName(value);
            case 'documentType':
                return Validator.validateDocumentType(value);
            case 'documentNumber':
                return Validator.validateDocumentNumber(value);
            case 'gender':
                return Validator.validateGender(value);
            case 'email':
                return Validator.validateEmail(value);
            case 'phoneNumber':
                return Validator.validatePhoneNumber(value);
            case 'birthday':
                return Validator.validateBirthday(value);
            case 'maritalStatus':
                return Validator.validateMaritalStatus(value);
            case 'occupation':
                return Validator.validateOccupation(value);
            case 'address':
                return Validator.validateAddress(value);
            case 'notes':
                return Validator.validateNotes(value);
            default:
                break;
        }
        return [];
    }

    static validateFirstName(value) {
        if (Utils.isEmpty(value)) {
            return ['Campo es requerido.'];
        }
        if (String(value).length < 2) {
            return ['Campo debe tener mínimo 2 caracteres.'];
        }
        if (String(value).length > 100) {
            return ['Campo debe tener máximo 100 caracteres.'];
        }
        return [];
    }

    static validateLastName(value) {
        if (Utils.isEmpty(value)) {
            return ['Campo es requerido.'];
        }
        if (String(value).length < 2) {
            return ['Campo debe tener mínimo 2 caracteres.'];
        }
        if (String(value).length > 100) {
            return ['Campo debe tener máximo 100 caracteres.'];
        }
        return [];
    }

    static validateEmail(value) {
        if (!Utils.isEmpty(value) && !String(value)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )) {
            return ['Campo no es válido.'];
        }
        return [];
    }


    static validateDocumentType(value) {
        if (!Utils.isEmpty(value) && Utils.isEmpty(findDocumentTypeById(value))) {
            return ['Campo no es válido.'];
        }
        return [];
    }

    static validateDocumentNumber(value) {
        if (!Utils.isEmpty(value) && String(value).length > 20) {
            return ['Campo no es válido.'];
        }
        return [];
    }


    static validateGender(value) {
        if (!Utils.isEmpty(value) && !findGenderById(value)) {
            return ['Campo no es válido.'];
        }
        return [];
    }

    static validatePhoneNumber(value) {
        if (!Utils.isEmpty(value) && String(value).length !== 10) {
            return ['Campo no es válido.'];
        }
        return [];
    }

    static validateBirthday(value) {
        if (!Utils.isEmpty(value) && new Date(value).toString() === "Invalid Date") {
            return ['Campo no es válido.'];
        }
        return [];
    }

    static validateMaritalStatus(value) {
        if (!Utils.isEmpty(value) && !findMaritalStatusById(value)) {
            return ['Campo no es válido.'];
        }
        return [];
    }


    static validateOccupation(value) {
        if (!Utils.isEmpty(value) && String(value).length > 75) {
            return ['Campo debe tener máximo 75 caracteres.'];
        }
        return [];
    }

    static validateAddress(value) {
        if (!Utils.isEmpty(value) && String(value).length > 100) {
            return ['Campo debe tener máximo 100 caracteres.'];
        }
        return [];
    }

    static validateNotes(value) {
        if (!Utils.isEmpty(value) && String(value).length > 150) {
            return ['Campo debe tener máximo 150 caracteres.'];
        }
        return [];
    }

}