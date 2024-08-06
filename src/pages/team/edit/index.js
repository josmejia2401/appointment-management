import * as React from 'react';
import "./styles.css";
import { buildPayload } from '../../../lib/form';
import Utils from '../../../lib/utils';
import Validator from '../validators/validator';
import ButtonPrimary from '../../../components/button-primary';
import ButtonSecondary from '../../../components/button-secondary';
import { status } from '../../../lib/list_values';
import { associateEmployee } from '../../../api/users.services';
import { getTokenInfo } from '../../../api/api.common';

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

        //own
        this.doModifyAction = this.doModifyAction.bind(this);
        this.buildAndGetStatus = this.buildAndGetStatus.bind(this);

    }


    componentDidMount() {
        this.resetData({});
        this.loadFirstData(this.props.data);
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
                username: {
                    value: '',
                    errors: []
                },
                recordStatus: {
                    value: '',
                    errors: []
                },
            },
        };
    }


    resetData(override = {}) {
        this.updateState({
            ...this.defaultState(),
            ...override
        });
    }

    loadFirstData(dataFirst) {
        if (Utils.isEmpty(dataFirst)) {
            return;
        }
        const { data } = this.state;

        data.id.value = dataFirst.id;
        data.firstName.value = dataFirst.firstName;
        data.lastName.value = dataFirst.lastName;
        data.username.value = dataFirst.username;
        data.recordStatus.value = dataFirst.recordStatus;

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
            const data = buildPayload(form, { username: this.state.data.username.value, recordStatus: 3 });
            data.recordStatus = Number(data.recordStatus);
            const userInfo = getTokenInfo();
            associateEmployee(userInfo.payload.keyid, data).then(_result => {
                form.reset();
                this.updateState({ loading: false, isSuccessfullyCreation: true })
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
            <div className="modal fade text-left show"
                style={{ display: 'block' }}
                tabIndex="-1"
                role="dialog"
                aria-hidden="true"
                data-keyboard="false"
                data-backdrop="static"
                data-bs-backdrop="static"
                data-bs-keyboard="false">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable"
                    role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Modificar un cliente</h4>
                            <button type="button" className="close btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={this.props.hideDialog}>
                                <i data-feather="x"></i>
                            </button>
                        </div>
                        <form id="formCustomerEditId" className="needs-validation form" onSubmit={this.doModifyAction} noValidate>

                            {this.state.isSuccessfullyCreation === true && <div className="alert alert-success d-flex align-items-center" role="alert">
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
                                                                        placeholder="Ingrese su nombre"
                                                                        name="firstName"
                                                                        required={true}
                                                                        value={this.state.data.firstName.value}
                                                                        onChange={(event) => this.setChangeInputEvent('firstName', event)}
                                                                        disabled={true}

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
                                                                        placeholder="Ingrese sus apellidos"
                                                                        name="lastName"
                                                                        required={true}
                                                                        value={this.state.data.lastName.value}
                                                                        onChange={(event) => this.setChangeInputEvent('lastName', event)}
                                                                        disabled={true}
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

                                                        <div className='row'>
                                                            <div className="col-12 col-md-6">
                                                                <div className="form-group mandatory required">
                                                                    <label htmlFor="recordStatus" className="form-label control-label">Estado</label>
                                                                    <select
                                                                        className="form-select"
                                                                        id="recordStatus"
                                                                        name='recordStatus'
                                                                        value={this.state.data.recordStatus.value}
                                                                        required={false}
                                                                        onChange={(event) => this.setChangeInputEvent('recordStatus', event)}
                                                                        disabled={this.state.loading || this.state.isSuccessfullyCreation}>
                                                                        <option value={null}>Seleccionar...</option>
                                                                        {this.buildAndGetStatus().map((item, index) => {
                                                                            return (<option value={item.id} key={index}>{item.name}</option>);
                                                                        })}
                                                                    </select>

                                                                    <div
                                                                        className="invalid-feedback"
                                                                        style={{
                                                                            display: this.state.data.recordStatus.errors.length > 0 ? 'block' : 'none'
                                                                        }}>
                                                                        {this.state.data.recordStatus.errors[0]}
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
                                <ButtonSecondary id="btnCustomerEditNOKId" text={'Regresar'} type="button" onClick={this.props.hideDialog}></ButtonSecondary>

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