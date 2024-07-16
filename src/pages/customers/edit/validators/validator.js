import Utils from '../../../../lib/utils';

export default class Validator {

    static validateFirstName(value) {
        if (Utils.isEmpty(value)) {
            return '<<Nombres>> es requerido.'
        }
        if (String(value).length > 75) {
            return '<<Nombres>> debe tener máximo 75 carácteres.'
        }
        return;
    }

    static validateLastName(value) {
        if (Utils.isEmpty(value)) {
            return '<<Apellidos>> es requerido.'
        }
        if (String(value).length > 75) {
            return '<<Apellidos>> debe tener máximo 75 carácteres.'
        }
        return;
    }

    static validateDocumentType(value) {
        if (Utils.isEmpty(value)) {
            return '<<Tipo documento>> es requerido.'
        }
        return;
    }

    static validateDocumentNumber(value) {
        if (Utils.isEmpty(value)) {
            return '<<Número documento>> es requerido.'
        }
        return;
    }

    static validateGender(value) {
        if (Utils.isEmpty(value)) {
            return '<<Género>> es requerido.'
        }
        return;
    }

    static validateBirthday(value) {
        if (Utils.isEmpty(value)) {
            return '<<Fecha nacimiento>> es requerido.'
        }
        return;
    }


    static validatePhoneNumber(value) {
        if (Utils.isEmpty(value)) {
            return '<<Número de celular>> es requerido.'
        }
        return;
    }

    static validateEmail(value) {
        if (Utils.isEmpty(value)) {
            return '<<Correo electrónico>> es requerido.'
        }
        if (!String(value)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )) {
            return '<<Correo electrónico>> no es válido.'
        }
        return;
    }

    static validateAddress(value) {
        if (Utils.isEmpty(value)) {
            return '<<Dirección>> es requerido.'
        }
        return;
    }

    static validateNotes(value) {
        return;
    }

    static validateHistory(value) {
        return;
    }

    static validateTermCond(value) {
        if (Utils.isEmpty(value)) {
            return '<<Términos y condiciones>> es requerido.';
        }
        if (value === 'false' || value === false) {
            return '<<Términos y condiciones>> es requerido.';
        }
        return;
    }

}