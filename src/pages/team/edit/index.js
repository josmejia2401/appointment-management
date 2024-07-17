import * as React from 'react';
import "./styles.css";
import { buildPayload } from '../../../lib/form';
import Utils from '../../../lib/utils';
import Validator from './validators/validator';
import ButtonPrimary from '../../../components/button-primary';
import ButtonSecondary from '../../../components/button-secondary';
import { documentTypes, genders } from '../../../lib/list_values';

class LocalComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            isValidForm: false,
            data: {
                firstName: {
                    value: '',
                    errors: []
                },
                lastName: {
                    value: '',
                    errors: []
                },

                documentType: {
                    value: '',
                    errors: []
                },
                documentNumber: {
                    value: '',
                    errors: []
                },

                gender: {
                    value: '',
                    errors: []
                },
                birthday: {
                    value: '',
                    errors: []
                },

                phoneNumber: {
                    value: '',
                    errors: []
                },
                email: {
                    value: '',
                    errors: []
                },

                address: {
                    value: '',
                    errors: []
                },

                notes: {
                    value: '',
                    errors: []
                },
            },
        };

        this.doLogInAction = this.doLogInAction.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.setChangeInputEvent = this.setChangeInputEvent.bind(this);
        this.propagateState = this.propagateState.bind(this);
        this.updateState = this.updateState.bind(this);
        this.loadFirstData = this.loadFirstData.bind(this);

        this.delay = this.delay.bind(this);
    }


    componentDidMount() {
        console.log(this.props.data);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.data !== prevProps.data) {
            this.loadFirstData(this.props.data);
        }
    }

    delay(ms) {
        return new Promise(res => setTimeout(res, ms));
    }


    loadFirstData(dataFirst) {
        const { data } = this.state;
        data.firstName.value = dataFirst.firstName;
        data.lastName.value = dataFirst.lastName;
        data.documentType.value = dataFirst.documentType;
        data.documentNumber.value = dataFirst.documentNumber;
        data.gender.value = dataFirst.gender;
        data.birthday.value = new Date(dataFirst.birthday).toISOString().split("T")[0];
        data.phoneNumber.value = dataFirst.phoneNumber;
        data.address.value = dataFirst.address;
        data.email.value = dataFirst.email;
        data.notes.value = dataFirst.notes;
        this.updateState({ data: data });

    }

    doLogInAction = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        const form = e.target;
        const isValid = form.checkValidity();
        if (isValid === true) {
            this.setState({ loading: true });
            const data = buildPayload(form, { username: "", password: "" });
            console.log(data);
            await this.delay(3000);
            /*signIn(data).then(_result => {
                form.reset();
                this.props.navigate("/home");
            }).catch(err => {
                console.log(err.fileName, err);
                this.props.addNotification({ typeToast: 'error', text: err.message, title: "ERROR" });
            }).finally(() => this.setState({ loading: false }));*/
        }
        form.classList.add('was-validated');
    }

    validateForm(key) {
        let isValidForm = false;
        const data = this.state.data;
        data[key].errors = [];
        const errorfirstName = Validator.validateFirstName(data.firstName.value);
        const errorlastName = Validator.validateLastName(data.lastName.value);
        const errordocumentType = Validator.validateDocumentType(data.documentType.value);
        const errordocumentNumber = Validator.validateDocumentNumber(data.documentNumber.value);
        const errorgender = Validator.validateGender(data.gender.value);
        const errorbirthday = Validator.validateBirthday(data.birthday.value);
        const errorphoneNumber = Validator.validatePhoneNumber(data.phoneNumber.value);
        const erroremail = Validator.validateEmail(data.email.value);
        const erroraddress = Validator.validateAddress(data.address.value);
        const errornotes = Validator.validateNotes(data.notes.value);

        if (Utils.isEmpty(errorfirstName) &&
            Utils.isEmpty(errorlastName) &&
            Utils.isEmpty(errordocumentType) &&
            Utils.isEmpty(errordocumentNumber) &&
            Utils.isEmpty(errorgender) &&
            Utils.isEmpty(errorbirthday) &&
            Utils.isEmpty(errorphoneNumber) &&
            Utils.isEmpty(erroremail) &&
            Utils.isEmpty(erroraddress) &&
            Utils.isEmpty(errornotes)) {
            isValidForm = true;
        }
        if (!Utils.isEmpty(errorfirstName) && key === 'firstName') {
            data.firstName.errors.push(errorfirstName);
        }
        if (!Utils.isEmpty(errorlastName) && key === 'lastName') {
            data.lastName.errors.push(errorlastName);
        }
        if (!Utils.isEmpty(errordocumentType) && key === 'documentType') {
            data.documentType.errors.push(errordocumentType);
        }
        if (!Utils.isEmpty(errordocumentNumber) && key === 'documentNumber') {
            data.documentNumber.errors.push(errordocumentNumber);
        }
        if (!Utils.isEmpty(errorgender) && key === 'gender') {
            data.gender.errors.push(errorgender);
        }
        if (!Utils.isEmpty(errorbirthday) && key === 'birthday') {
            data.birthday.errors.push(errorbirthday);
        }
        if (!Utils.isEmpty(errorphoneNumber) && key === 'phoneNumber') {
            data.phoneNumber.errors.push(errorphoneNumber);
        }
        if (!Utils.isEmpty(erroremail) && key === 'email') {
            data.email.errors.push(erroremail);
        }
        if (!Utils.isEmpty(erroraddress) && key === 'address') {
            data.address.errors.push(erroraddress);
        }
        if (!Utils.isEmpty(errornotes) && key === 'notes') {
            data.notes.errors.push(errornotes);
        }
        this.updateState({ isValidForm, data: data });
    }

    async setChangeInputEvent(key, event) {
        const { data } = this.state;
        data[key].value = key === 'termCond' ? !this.state.data.termCond.value : event.target.value;
        await this.updateState({ data: data });
        this.validateForm(key);
    }

    propagateState() { }

    async updateState(payload) {
        this.setState({ ...payload }, () => this.propagateState());
    }


    render() {
        return (
            <div className="modal fade text-left" id="inlineFormEditTeam" tabIndex="-1" role="dialog"
                aria-labelledby="modalLabelEdit" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable"
                    role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title" id="modalLabelEdit">Modificar integrante</h4>
                            <button type="button" className="close btn-close" data-bs-dismiss="modal"
                                aria-label="Close">
                                <i data-feather="x"></i>
                            </button>
                        </div>
                        <form className="needs-validation" onSubmit={this.doLogInAction} noValidate>
                            <div className="modal-body">
                                <section id="multiple-column-form">
                                    <div className="row match-height">
                                        <div className="col-12">
                                            <div className="card">
                                                <div className="card-header">
                                                    <h4 className="card-title">Información del integrante</h4>
                                                </div>
                                                <div className="card-content">
                                                    <div className="card-body">
                                                        <div className="row">
                                                            <div className="col-md-6 col-12">
                                                                <div className="form-group mandatory">
                                                                    <label htmlFor="firstName" className="form-label">Nombres</label>
                                                                    <input
                                                                        type="text"
                                                                        id="firstName"
                                                                        className="form-control"
                                                                        placeholder="Nombres"
                                                                        name="firstName"
                                                                        data-parsley-required="true"
                                                                        value={this.state.data.firstName.value}
                                                                        onChange={(event) => this.setChangeInputEvent('firstName', event)}
                                                                        disabled={this.state.loading}
                                                                        autoFocus={true}
                                                                        autoComplete='off'
                                                                    />

                                                                    <div
                                                                        className="invalid-feedback"
                                                                        style={{
                                                                            display: this.state.data.firstName.errors.length > 0 ? 'block' : 'none'
                                                                        }}>
                                                                        {this.state.data.firstName.errors[0]}
                                                                    </div>

                                                                </div>
                                                            </div>
                                                            <div className="col-md-6 col-12">
                                                                <div className="form-group">
                                                                    <label htmlFor="lastName" className="form-label">Apellidos</label>
                                                                    <input
                                                                        type="text"
                                                                        id="lastName"
                                                                        className="form-control"
                                                                        placeholder="Apellidos"
                                                                        name="lastName"
                                                                        data-parsley-required="true"
                                                                        value={this.state.data.lastName.value}
                                                                        onChange={(event) => this.setChangeInputEvent('lastName', event)}
                                                                        disabled={this.state.loading}
                                                                        autoComplete='off'
                                                                    />

                                                                    <div
                                                                        className="invalid-feedback"
                                                                        style={{
                                                                            display: this.state.data.lastName.errors.length > 0 ? 'block' : 'none'
                                                                        }}>
                                                                        {this.state.data.lastName.errors[0]}
                                                                    </div>

                                                                </div>
                                                            </div>
                                                            <div className="col-md-6 col-12">
                                                                <div className="form-group">
                                                                    <label htmlFor="documentType" className="form-label">Tipo documento</label>
                                                                    <select
                                                                        className="form-select"
                                                                        id="documentType"
                                                                        name='documentType'
                                                                        value={this.state.data.documentType.value}
                                                                        onChange={(event) => this.setChangeInputEvent('documentType', event)}
                                                                        disabled={this.state.loading}>
                                                                        <option value={null}>Seleccionar...</option>
                                                                        {documentTypes.map((item, index) => {
                                                                            return (<option value={item.id} key={index}>{item.name}</option>);
                                                                        })}
                                                                    </select>

                                                                    <div
                                                                        className="invalid-feedback"
                                                                        style={{
                                                                            display: this.state.data.documentType.errors.length > 0 ? 'block' : 'none'
                                                                        }}>
                                                                        {this.state.data.documentType.errors[0]}
                                                                    </div>

                                                                </div>
                                                            </div>
                                                            <div className="col-md-6 col-12">
                                                                <div className="form-group">
                                                                    <label htmlFor="documentNumber" className="form-label">Número de documento</label>
                                                                    <input
                                                                        type="text"
                                                                        id="documentNumber"
                                                                        className="form-control"
                                                                        name="documentNumber"
                                                                        placeholder="Número de documento"
                                                                        data-parsley-required="true"
                                                                        value={this.state.data.documentNumber.value}
                                                                        onChange={(event) => this.setChangeInputEvent('documentNumber', event)}
                                                                        disabled={this.state.loading}
                                                                        autoComplete='off'
                                                                    />

                                                                    <div
                                                                        className="invalid-feedback"
                                                                        style={{
                                                                            display: this.state.data.documentNumber.errors.length > 0 ? 'block' : 'none'
                                                                        }}>
                                                                        {this.state.data.documentNumber.errors[0]}
                                                                    </div>

                                                                </div>
                                                            </div>
                                                            <div className="col-md-6 col-12">
                                                                <div className="form-group">
                                                                    <label htmlFor="gender" className="form-label">Género</label>
                                                                    <select
                                                                        className="form-select"
                                                                        id="gender"
                                                                        name='gender'
                                                                        value={this.state.data.gender.value}
                                                                        onChange={(event) => this.setChangeInputEvent('gender', event)}
                                                                        disabled={this.state.loading}>
                                                                        <option value={null}>Seleccionar...</option>
                                                                        {genders.map((item, index) => {
                                                                            return (<option value={item.id} key={index}>{item.name}</option>);
                                                                        })}
                                                                    </select>



                                                                    <div
                                                                        className="invalid-feedback"
                                                                        style={{
                                                                            display: this.state.data.gender.errors.length > 0 ? 'block' : 'none'
                                                                        }}>
                                                                        {this.state.data.gender.errors[0]}
                                                                    </div>

                                                                </div>
                                                            </div>
                                                            <div className="col-md-6 col-12">
                                                                <div className="form-group mandatory">
                                                                    <label htmlFor="birthday" className="form-label">Fecha de nacimiento</label>
                                                                    <input
                                                                        type="date"
                                                                        className="form-control mb-3 flatpickr-no-config"
                                                                        id="birthday"
                                                                        name="birthday"
                                                                        placeholder="Fecha de nacimiento"
                                                                        data-parsley-required="true"
                                                                        value={this.state.data.birthday.value}
                                                                        onChange={(event) => this.setChangeInputEvent('birthday', event)}
                                                                        disabled={this.state.loading}
                                                                        autoComplete='off'
                                                                    />


                                                                    <div
                                                                        className="invalid-feedback"
                                                                        style={{
                                                                            display: this.state.data.birthday.errors.length > 0 ? 'block' : 'none'
                                                                        }}>
                                                                        {this.state.data.birthday.errors[0]}
                                                                    </div>

                                                                </div>
                                                            </div>

                                                            <div className="col-md-6 col-12">
                                                                <div className="form-group mandatory">
                                                                    <label htmlFor="phoneNumber" className="form-label">Celular</label>
                                                                    <input
                                                                        type="text"
                                                                        id="phoneNumber"
                                                                        className="form-control"
                                                                        placeholder="Número de celular"
                                                                        name="phoneNumber"
                                                                        data-parsley-required="true"
                                                                        value={this.state.data.phoneNumber.value}
                                                                        onChange={(event) => this.setChangeInputEvent('phoneNumber', event)}
                                                                        disabled={this.state.loading}
                                                                        autoComplete='off'
                                                                    />

                                                                    <div
                                                                        className="invalid-feedback"
                                                                        style={{
                                                                            display: this.state.data.phoneNumber.errors.length > 0 ? 'block' : 'none'
                                                                        }}>
                                                                        {this.state.data.phoneNumber.errors[0]}
                                                                    </div>

                                                                </div>
                                                            </div>

                                                            <div className="col-md-6 col-12">
                                                                <div className="form-group">
                                                                    <label htmlFor="email" className="form-label">Correo electrónico</label>
                                                                    <input
                                                                        type="email"
                                                                        id="email"
                                                                        className="form-control"
                                                                        placeholder="Correo"
                                                                        name="email"
                                                                        data-parsley-required="true"
                                                                        value={this.state.data.email.value}
                                                                        onChange={(event) => this.setChangeInputEvent('email', event)}
                                                                        disabled={this.state.loading}
                                                                        autoComplete='off'
                                                                    />

                                                                    <div
                                                                        className="invalid-feedback"
                                                                        style={{
                                                                            display: this.state.data.email.errors.length > 0 ? 'block' : 'none'
                                                                        }}>
                                                                        {this.state.data.email.errors[0]}
                                                                    </div>


                                                                </div>
                                                            </div>

                                                            <div className="col-md-12 col-12">
                                                                <div className="form-group mandatory">
                                                                    <label htmlFor="address" className="form-label">Dirección</label>
                                                                    <input
                                                                        type="text"
                                                                        id="address"
                                                                        className="form-control"
                                                                        placeholder="Dirección"
                                                                        name="address"
                                                                        data-parsley-required="true"
                                                                        value={this.state.data.address.value}
                                                                        onChange={(event) => this.setChangeInputEvent('address', event)}
                                                                        disabled={this.state.loading}
                                                                        autoComplete='off'
                                                                    />

                                                                    <div
                                                                        className="invalid-feedback"
                                                                        style={{
                                                                            display: this.state.data.address.errors.length > 0 ? 'block' : 'none'
                                                                        }}>
                                                                        {this.state.data.address.errors[0]}
                                                                    </div>

                                                                </div>
                                                            </div>

                                                            <div className="col-md-12 col-12">
                                                                <div className="form-group mandatory">
                                                                    <label htmlFor="notes" className="form-label">Notas</label>
                                                                    <textarea
                                                                        className="form-control"
                                                                        id="notes"
                                                                        name='notes'
                                                                        rows="3"
                                                                        data-parsley-required="false"
                                                                        value={this.state.data.notes.value}
                                                                        onChange={(event) => this.setChangeInputEvent('notes', event)}
                                                                        disabled={this.state.loading}
                                                                        autoComplete='off'
                                                                    />

                                                                    <div
                                                                        className="invalid-feedback"
                                                                        style={{
                                                                            display: this.state.data.notes.errors.length > 0 ? 'block' : 'none'
                                                                        }}>
                                                                        {this.state.data.notes.errors[0]}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                            <div className="modal-footer">

                                <ButtonSecondary text={'Cancelar'} type="button" data-bs-dismiss="modal"></ButtonSecondary>

                                <ButtonPrimary
                                    disabled={!this.state.isValidForm || this.state.loading}
                                    className="btn-block btn-lg background-color-primary"
                                    type='submit'
                                    loading={this.state.loading}
                                    showText={false}
                                    text='Actualizar'
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
export default LocalComponent;