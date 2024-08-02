import * as React from 'react';
import "./styles.css";
import { buildPayload } from '../../../lib/form';
import Utils from '../../../lib/utils';
import Validator from './validators/validator';
import ButtonPrimary from '../../../components/button-primary';
import ButtonSecondary from '../../../components/button-secondary';
import { documentTypes, genders, status } from '../../../lib/list_values';
import { update } from '../../../api/customers.services';

class LocalComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = this.defaultState();
        this.defaultState = this.defaultState.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.setChangeInputEvent = this.setChangeInputEvent.bind(this);
        this.propagateState = this.propagateState.bind(this);
        this.updateState = this.updateState.bind(this);
        this.loadFirstData = this.loadFirstData.bind(this);
        this.loadData = this.loadData.bind(this);
        this.addListeners = this.addListeners.bind(this);
        this.removeListeners = this.removeListeners.bind(this);

        //own
        this.doModifyAction = this.doModifyAction.bind(this);
        this.doGoBack = this.doGoBack.bind(this);
        this.buildAndGetStatus = this.buildAndGetStatus.bind(this);

    }


    componentDidMount() {
        this.resetData({});
        this.addListeners();
        if (this.props.data) {
            this.loadFirstData(this.props.data);
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.data !== prevProps.data) {
            this.loadFirstData(this.props.data);
        }
    }

    componentWillUnmount() {
        this.resetData();
        this.removeListeners();
    }

    defaultState() {
        return {
            loading: false,
            isValidForm: false,
            errorMessage: '',
            isSuccessfullyCreation: false,
            data: {
                id: {
                    value: '',
                    errors: []
                },
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
                email: {
                    value: '',
                    errors: []
                },
                phoneNumber: {
                    value: '',
                    errors: []
                },
                birthday: {
                    value: '',
                    errors: []
                }
            }
        };
    }

    addListeners() {
        window.addEventListener('click', (e) => {
            const target = e.target || e.currentTarget;
            const buttonTarget = target.parentElement.parentElement || target.parentElement;
            const id = buttonTarget.id;
            if (["btnCustomerEditNOKId", "btnCustomerEditCloseId", "btnCustomerEditCloseTagIId"].includes(id)) {
                this.doGoBack();
            }
        });

        document.addEventListener('keydown', (e) => {
            const key = e.key;
            if (key === "Escape") {
                this.doGoBack();
            }
        });
    }

    removeListeners() {
        window.removeEventListener('click', () => { });
        window.removeEventListener('keydown', () => { });
    }

    resetData(override = {}) {
        this.updateState({
            ...this.defaultState(),
            ...override
        });

        const element = document.getElementById("formCustomerEditId");
        if (element) {
            element.classList.remove("was-validated");
            element.reset();
        }
    }


    loadFirstData(dataFirst) {
        if (Utils.isEmpty(dataFirst)) {
            return;
        }
        const { data } = this.state;

        data.id.value = dataFirst.id;
        data.firstName.value = dataFirst.firstName;
        data.lastName.value = dataFirst.lastName;
        data.documentType.value = dataFirst.documentType;
        data.documentNumber.value = dataFirst.documentNumber;

        data.gender.value = dataFirst.gender;
        data.email.value = dataFirst.email;
        data.phoneNumber.value = dataFirst.phoneNumber;
        data.birthday.value = dataFirst.birthday;

        this.updateState({ data });
    }

    loadData(e) { }

    validateForm(key) {
        let isValidForm = false;
        const data = this.state.data;
        data[key].errors = Validator.validate(key, data[key].value);
        if (Utils.isEmpty(data[key].errors)) {
            isValidForm = true;
        }
        this.updateState({ isValidForm, data: data });
    }

    setChangeInputEvent(key, event) {
        const { data } = this.state;
        data[key].value = event.target.value;
        this.updateState({ data: data });
        this.validateForm(key);
    }

    propagateState() { }

    updateState(payload) {
        this.setState({ ...payload }, () => this.propagateState());
    }

    buildAndGetStatus() {
        return status.filter(p => [1, 2].includes(p.id));
    }



    doModifyAction = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        const form = e.target;
        const isValid = form.checkValidity();
        if (isValid === true) {
            this.updateState({ loading: true, errorMessage: undefined });
            const data = buildPayload(form, {
                name: '',
                description: '',
                duration: 0,
                recordStatus: 1
            });
            data.recordStatus = Number(data.recordStatus);
            update(this.state.data.id.value, data).then(_result => {
                form.reset();
                this.updateState({ loading: false, isSuccessfullyCreation: true })
                if (this.props.handleAccept) {
                    this.props.handleAccept();
                }
            }).catch(err => {
                console.log(err.fileName, err);
                this.updateState({ loading: false, isSuccessfullyCreation: false, errorMessage: err.message })
                this.props.addNotification({ typeToast: 'error', text: err.message, title: "ERROR" });
            });
        }
        form.classList.add('was-validated');
    }


    doGoBack(e) {
        this.resetData();
        if (this.props.handleGoBack) {
            this.props.handleGoBack();
        }
        document.getElementById("btnCustomerEditNOKId").click();
    }

    render() {
        return (
            <div className="modal fade text-left"
                id="inlineFormEditCustomer"
                tabIndex="-1" r
                ole="dialog"
                aria-labelledby="modalLabelEdit"
                aria-hidden="true"
                data-keyboard="false"
                data-backdrop="static"
                data-bs-backdrop="static"
                data-bs-keyboard="false">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable"
                    role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title" id="modalLabelEdit">Modificar servicio</h4>
                            <button type="button" className="close btn-close" data-bs-dismiss="modal"
                                aria-label="Close" id="btnCustomerEditCloseId">
                                <i data-feather="x" id='btnCustomerEditCloseTagIId'></i>
                            </button>
                        </div>
                        <form id="formCustomerEditId" className="needs-validation" onSubmit={this.doModifyAction} noValidate>

                            {this.state.isSuccessfullyCreation && <div className="alert alert-success d-flex align-items-center" role="alert">
                                <i className="fa-solid fa-circle-check icon-input-color bi flex-shrink-0 me-2"></i>
                                <div>
                                    Actualización exitosa!
                                </div>
                            </div>}

                            {this.state.errorMessage && <div className="alert alert-danger d-flex align-items-center" role="alert">
                                <i className="fa-solid fa-circle-exclamation icon-input-color bi flex-shrink-0 me-2"></i>
                                <div>
                                    {this.state.errorMessage}
                                </div>
                            </div>}

                            <div className="modal-body">
                                <section id="multiple-column-form">
                                    <div className="row match-height">
                                        <div className="col-12">
                                            <div className="card">
                                                <div className="card-header">
                                                    <div style={{ flexDirection: "column" }}>
                                                        <h4 className="card-title">Información del cliente</h4>
                                                    </div>
                                                </div>
                                                <div className="card-content">
                                                    <div className="card-body">
                                                        <div className="row">
                                                            <div className="col-md-12 col-12">
                                                                <div className="form-group mandatory">
                                                                    <label htmlFor="firstName" className="form-label">Nombres *</label>
                                                                    <input
                                                                        type="text"
                                                                        id="firstName"
                                                                        className="form-control"
                                                                        placeholder="Ingrese su nombre"
                                                                        name="firstName"
                                                                        required={true}
                                                                        value={this.state.data.firstName.value}
                                                                        onChange={(event) => this.setChangeInputEvent('firstName', event)}
                                                                        disabled={this.state.loading || this.state.isSuccessfullyCreation}

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
                                                        </div>

                                                        <div className="row">
                                                            <div className="col-md-12 col-12">
                                                                <div className="form-group mandatory">
                                                                    <label htmlFor="lastName" className="form-label">Apellidos *</label>
                                                                    <input
                                                                        type="text"
                                                                        id="lastName"
                                                                        className="form-control"
                                                                        placeholder="Ingrese sus apellidos"
                                                                        name="lastName"
                                                                        required={false}
                                                                        value={this.state.data.lastName.value}
                                                                        onChange={(event) => this.setChangeInputEvent('lastName', event)}
                                                                        disabled={this.state.loading || this.state.isSuccessfullyCreation}
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
                                                        </div>



                                                        <div className="row">
                                                            <div className="col-12 col-md-6">
                                                                <div className="form-group mandatory">
                                                                    <label htmlFor="documentType" className="form-label">Tipo documento *</label>
                                                                    <select
                                                                        className="form-select"
                                                                        id="documentType"
                                                                        name='documentType'
                                                                        value={this.state.data.documentType.value}
                                                                        onChange={(event) => this.setChangeInputEvent('documentType', event)}
                                                                        disabled={this.state.loading || this.state.isSuccessfullyCreation}>
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


                                                            <div className="col-12 col-md-6">
                                                                <div className="form-group mandatory">
                                                                    <label htmlFor="documentNumber" className="form-label">Número documento *</label>
                                                                    <input
                                                                        type="text"
                                                                        id="documentNumber"
                                                                        className="form-control"
                                                                        placeholder="Ingrese su número de documento"
                                                                        name="documentNumber"
                                                                        required={true}
                                                                        value={this.state.data.documentNumber.value}
                                                                        onChange={(event) => this.setChangeInputEvent('documentNumber', event)}
                                                                        disabled={this.state.loading || this.state.isSuccessfullyCreation}

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
                                                        </div>




                                                        <div className="row">
                                                            <div className="col-12 col-md-6">
                                                                <div className="form-group mandatory">
                                                                    <label htmlFor="gender" className="form-label">Género *</label>
                                                                    <select
                                                                        className="form-select"
                                                                        id="gender"
                                                                        name='gender'
                                                                        value={this.state.data.gender.value}
                                                                        required={true}
                                                                        onChange={(event) => this.setChangeInputEvent('gender', event)}
                                                                        disabled={this.state.loading || this.state.isSuccessfullyCreation}>
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


                                                            <div className="col-12 col-md-6">
                                                                <div className="form-group mandatory">
                                                                    <label htmlFor="birthday" className="form-label">Fecha nacimiento *</label>
                                                                    <input
                                                                        type="date"
                                                                        id="birthday"
                                                                        className="form-control"
                                                                        placeholder="Ingrese su fecha de nacimiento"
                                                                        name="birthday"
                                                                        required={true}
                                                                        value={this.state.data.birthday.value}
                                                                        onChange={(event) => this.setChangeInputEvent('birthday', event)}
                                                                        disabled={this.state.loading || this.state.isSuccessfullyCreation}
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
                                                        </div>





                                                        <div className="row">
                                                            <div className="col-12 col-md-6">
                                                                <div className="form-group mandatory">
                                                                    <label htmlFor="phoneNumber" className="form-label">Celular</label>
                                                                    <input
                                                                        type="text"
                                                                        id="phoneNumber"
                                                                        className="form-control"
                                                                        placeholder="Ingrese su celular"
                                                                        name="phoneNumber"
                                                                        required={false}
                                                                        value={this.state.data.phoneNumber.value}
                                                                        onChange={(event) => this.setChangeInputEvent('phoneNumber', event)}
                                                                        disabled={this.state.loading || this.state.isSuccessfullyCreation}

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


                                                            <div className="col-12 col-md-6">
                                                                <div className="form-group mandatory">
                                                                    <label htmlFor="email" className="form-label">Correo electrónico</label>
                                                                    <input
                                                                        type="text"
                                                                        id="email"
                                                                        className="form-control"
                                                                        placeholder="Ingrese su email"
                                                                        name="email"
                                                                        required={false}
                                                                        value={this.state.data.email.value}
                                                                        onChange={(event) => this.setChangeInputEvent('email', event)}
                                                                        disabled={this.state.loading || this.state.isSuccessfullyCreation}

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
                                                        </div>




                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                            <div className="modal-footer">
                                <ButtonSecondary id="btnCustomerEditNOKId" text={'Regresar'} type="button" data-bs-dismiss="modal"></ButtonSecondary>

                                <ButtonPrimary
                                    disabled={!this.state.isValidForm || this.state.loading || this.state.isSuccessfullyCreation}
                                    className="btn-block btn-lg background-color-primary"
                                    type='submit'
                                    loading={this.state.loading}
                                    showText={true}
                                    textLoading={'Actualizando...'}
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