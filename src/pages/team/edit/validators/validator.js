import { status } from '../../../../lib/list_values';
import Utils from '../../../../lib/utils';

export default class Validator {

    static validateStatus(value) {
        if (Utils.isEmpty(value)) {
            return '<<Estado>> es requerido.'
        }
        if (Utils.isEmpty(status.filter(p => p.id === Number(value))[0])) {
            return '<<Estado>> no es válido.'
        }
        return;
    }



    static validateNotes(value) {
        if (!Utils.isEmpty(value) && String(value).length > 75) {
            return '<<Nota>> debe tener máximo 75 carácteres.'
        }
        return;
    }


}