import * as React from 'react';
import "./styles.css";
import { buildPayload } from '../../../lib/form';
import Utils from '../../../lib/utils';
import Validator from './validators/validator';
import ButtonPrimary from '../../../components/button-primary';
import ButtonSecondary from '../../../components/button-secondary';
import { status } from '../../../lib/list_values';
import { getTokenInfo } from '../../../api/api.common';
import { associateEmployee } from '../../../api/users.services';

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
            isValidForm: true,
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
            }
        };
    }

    addListeners() {
        window.addEventListener('click', (e) => {
            const target = e.target || e.currentTarget;
            const buttonTarget = target.parentElement.parentElement || target.parentElement;
            const id = buttonTarget.id;
            if (["btnTeamRemoveNOKId", "btnTeamRemoveCloseId", "btnTeamRemoveCloseTagIId"].includes(id)) {
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

        const element = document.getElementById("formTeamRemoveId");
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
        data.username.value = dataFirst.username;
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
            const userInfo = getTokenInfo();
            this.updateState({ loading: true, errorMessage: undefined });
            const data = buildPayload(form, { username: this.state.data.username.value, recordStatus: 4 });
            data.recordStatus = 4;
            associateEmployee(userInfo.payload.keyid, data).then(_result => {
                form.reset();
                this.updateState({ loading: false, isSuccessfullyCreation: true });
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
    }

    render() {
        return (
            <div className="modal fade text-left"
                id="inlineFormRemoveTeam"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="modalLabelRemove"
                aria-hidden="true"
                data-keyboard="false"
                data-backdrop="static"
                data-bs-backdrop="static"
                data-bs-keyboard="false">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable"
                    role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title" id="modalLabelRemove">Eliminar integrante</h4>
                            <button type="button" className="close btn-close" data-bs-dismiss="modal"
                                aria-label="Close" id="btnTeamRemoveCloseId">
                                <i data-feather="x" id='btnTeamRemoveCloseTagIId'></i>
                            </button>
                        </div>
                        <form id="formTeamRemoveId" className="needs-validation" onSubmit={this.doModifyAction} noValidate>

                            {this.state.isSuccessfullyCreation && <div className="alert alert-success d-flex align-items-center" role="alert">
                                <i className="fa-solid fa-circle-check icon-input-color bi flex-shrink-0 me-2"></i>
                                <div>
                                    ¡Usuario eliminado!
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
                                                        <h4 className="card-title">Precondiciones</h4>
                                                        <h6>El usuario debe estar en estado PENDIENTE, ACTIVO O INACTIVO.</h6>
                                                    </div>
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
                                                                        required={true}
                                                                        value={this.state.data.firstName.value}
                                                                        disabled={true}
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
                                                                        required={true}
                                                                        value={this.state.data.lastName.value}
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
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                            <div className="modal-footer">

                                <ButtonSecondary
                                    id='btnTeamRemoveNOKId'
                                    name='btnTeamRemoveNOKId'
                                    key='btnTeamRemoveNOKId'
                                    text={'Regresar'}
                                    type="button"
                                    data-bs-dismiss="modal"
                                ></ButtonSecondary>

                                <ButtonPrimary
                                    id='btnTeamEditOKId'
                                    name='btnTeamEditOKId'
                                    key='btnTeamEditOKId'
                                    disabled={!this.state.isValidForm || this.state.loading || this.state.isSuccessfullyCreation}
                                    className="btn-block btn-lg background-color-primary"
                                    type='submit'
                                    loading={this.state.loading}
                                    showText={false}
                                    text='Eliminar'
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