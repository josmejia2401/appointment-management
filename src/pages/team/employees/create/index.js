import * as React from 'react';
import "./styles.css";
import { buildPayload } from '../../../../lib/form';
import Utils from '../../../../lib/utils';
import Validator from '../validators/validator';
import ButtonPrimary from '../../../../components/button-primary';
import ButtonSecondary from '../../../../components/button-secondary';
import { create } from '../../../../api/employees.services';
import { documentTypes, genders, maritalStatus } from '../../../../lib/list_values';

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
        this.showAccordion = this.showAccordion.bind(this);
        this.hideAccordion = this.hideAccordion.bind(this);


        this.doInviteAction = this.doInviteAction.bind(this);
    }




    componentDidMount() {
        this.resetData({});
    }

    componentWillUnmount() {
        this.resetData();
    }

    defaultState() {
        return {
            loading: false,
            isValidForm: false,
            errorMessage: '',
            isSuccessfullyCreation: false,
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
                },
                maritalStatus: {
                    value: '',
                    errors: []
                },
                occupation: {
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
                }
            },
            accordion: {
                item1: false,
            }
        };
    }

    resetData(override = {}) {
        this.updateState({
            ...this.defaultState(),
            ...override
        });
    }


    loadFirstData() { }

    loadData(e) { }

    validateForm(key) {
        let isValidForm = false;
        const data = this.state.data;
        data[key].errors = Validator.validate(key, data[key].value);
        if (Utils.isEmpty(data[key].errors)) {
            isValidForm = true;
        }
        Object.keys(this.state.data).forEach(p => {
            const errors = Validator.validate(p, data[p].value);
            if (errors.length > 0) {
                isValidForm = false;
            }
        });
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

    showAccordion(key) {
        const realStatus = !this.state.accordion[key];
        Object.keys(this.state.accordion).forEach(p => {
            this.state.accordion[p] = false;
        });
        this.state.accordion[key] = realStatus;
        this.updateState({ accordion: this.state.accordion });
    }

    hideAccordion() {
        Object.keys(this.state.accordion).forEach(p => {
            this.state.accordion[p] = false;
        });
        this.updateState({ accordion: this.state.accordion });
    }



    /**
     * Invita a un usuario del sistema, para ser empleado o miembro del equipo.
     * se modifica la tabla de usuarios, y se agrega a invitaciones la invitación, 
     * y al usuario principal, empleados.
     * 
     * @param {*} e 
     */
    doInviteAction = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        const form = e.target;
        const isValid = form.checkValidity();
        if (isValid === true) {
            this.updateState({ loading: true, errorMessage: undefined });
            const data = buildPayload(form, { recordStatus: 1, name: "", duration: "", description: "" });
            if (data.duration) {
                data.duration = Number(data.duration);
            } else {
                delete data.duration;
            }
            create(data).then(_result => {
                form.reset();
                this.resetData({ isSuccessfullyCreation: true });
                this.props.afterClosedDialog(true);

            }).catch(err => {
                console.log(err.fileName, err);
                this.updateState({ loading: false, isSuccessfullyCreation: false, errorMessage: err.message })
                this.props.addNotification({ typeToast: 'error', text: err.message, title: "ERROR" });
            });
        }
        form.classList.add('was-validated');
    }


    render() {
        return (
            <div className="modal fade show"
                style={{ display: 'block' }}
                tabIndex="-1"
                role="dialog"
                aria-labelledby="myModalLabel33"
                data-keyboard="false"
                data-backdrop="static"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl" role="document">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h4 className="modal-title" id='myModalLabel33'>Crear un empleado</h4>
                            <button type="button" className="close btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={this.props.hideDialog}>
                                <i data-feather="x" ></i>
                            </button>
                        </div>

                        <form id="formCustomerCreateId" className="needs-validation form" onSubmit={this.doInviteAction} noValidate>

                            {this.state.isSuccessfullyCreation && <div className="alert alert-success d-flex align-items-center" role="alert" style={{
                                marginLeft: '15px', marginRight: '15px'
                            }}>
                                <i className="fa-solid fa-circle-check icon-input-color bi flex-shrink-0 me-2"></i>
                                <div>
                                    Creación exitosa.
                                </div>
                            </div>}

                            {this.state.errorMessage && <div className="alert alert-danger d-flex align-items-center" role="alert" style={{
                                marginLeft: '15px', marginRight: '15px'
                            }}>
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
                                                <div className="card-content">
                                                    <div className="card-body">
                                                        <div className="row">
                                                            <div className="col-12 col-md-6">
                                                                <div className="form-group mandatory required">
                                                                    <label htmlFor="firstName" className="form-label control-label">Nombres</label>
                                                                    <input
                                                                        type="text"
                                                                        id="firstName"
                                                                        className="form-control"
                                                                        placeholder="Ingrese nombres"
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

                                                            <div className="col-12 col-md-6">
                                                                <div className="form-group mandatory required">
                                                                    <label htmlFor="lastName" className="form-label control-label">Apellidos</label>
                                                                    <input
                                                                        type="text"
                                                                        id="lastName"
                                                                        className="form-control"
                                                                        placeholder="Ingrese apellidos"
                                                                        name="lastName"
                                                                        required={true}
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
                                                                    <label htmlFor="phoneNumber" className="form-label">Celular</label>
                                                                    <input
                                                                        type="text"
                                                                        id="phoneNumber"
                                                                        className="form-control"
                                                                        placeholder="Ingrese el número de celular"
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
                                                                        placeholder="Ingrese el correo electrónico"
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








                                                        <div className="accordion" style={{ marginTop: '15px' }}>
                                                            <div className="accordion-item">
                                                                <h2 className="accordion-header" onClick={() => this.showAccordion('item1')}>
                                                                    <button className={`${this.state.accordion.item1 !== true ? 'collapsed' : ''} accordion-button`} type="button">
                                                                        Información adicional
                                                                    </button>
                                                                </h2>
                                                                <div id="collapseOne" className={`${this.state.accordion.item1 === true ? 'show' : ''} accordion-collapse collapse`}>
                                                                    <div className="accordion-body">
                                                                        <div className="row">
                                                                            <div className="col-12 col-md-6">
                                                                                <div className="form-group mandatory">
                                                                                    <label htmlFor="documentType" className="form-label">Tipo documento</label>
                                                                                    <select
                                                                                        className="form-select"
                                                                                        id="documentType"
                                                                                        name='documentType'
                                                                                        value={this.state.data.documentType.value}
                                                                                        required={false}
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
                                                                                    <label htmlFor="documentNumber" className="form-label">Número documento</label>
                                                                                    <input
                                                                                        type="text"
                                                                                        id="documentNumber"
                                                                                        className="form-control"
                                                                                        placeholder="Ingrese el número de documento"
                                                                                        name="documentNumber"
                                                                                        required={false}
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
                                                                                    <label htmlFor="gender" className="form-label">Género</label>
                                                                                    <select
                                                                                        className="form-select"
                                                                                        id="gender"
                                                                                        name='gender'
                                                                                        value={this.state.data.gender.value}
                                                                                        required={false}
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
                                                                                    <label htmlFor="birthday" className="form-label">Fecha nacimiento</label>
                                                                                    <input
                                                                                        type="date"
                                                                                        id="birthday"
                                                                                        className="form-control"
                                                                                        placeholder="Ingrese la fecha de nacimiento"
                                                                                        name="birthday"
                                                                                        required={false}
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
                                                                                    <label htmlFor="maritalStatus" className="form-label">Estado civil</label>
                                                                                    <select
                                                                                        className="form-select"
                                                                                        id="maritalStatus"
                                                                                        name='maritalStatus'
                                                                                        value={this.state.data.maritalStatus.value}
                                                                                        required={false}
                                                                                        onChange={(event) => this.setChangeInputEvent('maritalStatus', event)}
                                                                                        disabled={this.state.loading || this.state.isSuccessfullyCreation}>
                                                                                        <option value={null}>Seleccionar...</option>
                                                                                        {maritalStatus.map((item, index) => {
                                                                                            return (<option value={item.id} key={index}>{item.name}</option>);
                                                                                        })}
                                                                                    </select>

                                                                                    <div
                                                                                        className="invalid-feedback"
                                                                                        style={{
                                                                                            display: this.state.data.maritalStatus.errors.length > 0 ? 'block' : 'none'
                                                                                        }}>
                                                                                        {this.state.data.maritalStatus.errors[0]}
                                                                                    </div>

                                                                                </div>
                                                                            </div>


                                                                            <div className="col-12 col-md-6">
                                                                                <div className="form-group mandatory">
                                                                                    <label htmlFor="occupation" className="form-label">Ocupación</label>
                                                                                    <input
                                                                                        type="text"
                                                                                        id="occupation"
                                                                                        className="form-control"
                                                                                        placeholder="Ingrese la ocupación"
                                                                                        name="occupation"
                                                                                        required={false}
                                                                                        value={this.state.data.occupation.value}
                                                                                        onChange={(event) => this.setChangeInputEvent('occupation', event)}
                                                                                        disabled={this.state.loading || this.state.isSuccessfullyCreation}
                                                                                        autoComplete='off'
                                                                                    />

                                                                                    <div
                                                                                        className="invalid-feedback"
                                                                                        style={{
                                                                                            display: this.state.data.occupation.errors.length > 0 ? 'block' : 'none'
                                                                                        }}>
                                                                                        {this.state.data.occupation.errors[0]}
                                                                                    </div>

                                                                                </div>
                                                                            </div>
                                                                        </div>




                                                                        <div className="row">
                                                                            <div className="col-12 col-md-12">
                                                                                <div className="form-group mandatory">
                                                                                    <label htmlFor="address" className="form-label">Dirección</label>
                                                                                    <input
                                                                                        type="text"
                                                                                        id="address"
                                                                                        className="form-control"
                                                                                        placeholder="Ingrese dirección de residencia"
                                                                                        name="address"
                                                                                        required={false}
                                                                                        value={this.state.data.address.value}
                                                                                        onChange={(event) => this.setChangeInputEvent('address', event)}
                                                                                        disabled={this.state.loading || this.state.isSuccessfullyCreation}
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
                                                                        </div>


                                                                        <div className="row">
                                                                            <div className="col-12 col-md-12">
                                                                                <div className="form-group mandatory">
                                                                                    <label htmlFor="notes" className="form-label">Notas</label>

                                                                                    <textarea
                                                                                        id="notes"
                                                                                        className="form-control"
                                                                                        placeholder="Ingrese una nota del empleado"
                                                                                        name="notes"
                                                                                        required={false}
                                                                                        value={this.state.data.notes.value}
                                                                                        onChange={(event) => this.setChangeInputEvent('notes', event)}
                                                                                        disabled={this.state.loading || this.state.isSuccessfullyCreation}
                                                                                        autoComplete='off'
                                                                                        rows="3"></textarea>


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
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                            <div className="modal-footer">
                                <ButtonSecondary text={'Regresar'} type="button" onClick={this.props.hideDialog}></ButtonSecondary>

                                <ButtonPrimary
                                    disabled={!this.state.isValidForm || this.state.loading || this.state.isSuccessfullyCreation}
                                    className="btn-block btn-lg background-color-primary"
                                    type='submit'
                                    loading={this.state.loading}
                                    showText={true}
                                    textLoading={'Creando...'}
                                    text='Crear'
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