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
        this.state = {
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
                recordStatus: {
                    value: '',
                    errors: []
                },

                username: {
                    value: '',
                    errors: []
                }
            },
        };


        this.validateForm = this.validateForm.bind(this);
        this.setChangeInputEvent = this.setChangeInputEvent.bind(this);
        this.propagateState = this.propagateState.bind(this);
        this.updateState = this.updateState.bind(this);
        this.loadFirstData = this.loadFirstData.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.reset = this.reset.bind(this);

        this.doModifyAction = this.doModifyAction.bind(this);
        this.delay = this.delay.bind(this);
    }


    componentDidMount() {
        window.addEventListener("focus", this.onFocus)
        window.addEventListener("visibilitychange", this.onFocus)
        if (this.props.data) {
            this.loadFirstData(this.props.data);
        }

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.data !== prevProps.data) {
            this.loadFirstData(this.props.data);
        } else if (prevState.isValidForm || prevState.errorMessage) {
            this.updateState({
                loading: false,
                isValidForm: false,
                errorMessage: '',
                isSuccessfullyCreation: false,
            });
        }
    }

    componentWillUnmount() {
        window.removeEventListener("focus", this.onFocus)
        window.removeEventListener("visibilitychange", this.onFocus)
    }

    reset(override) {
        this.updateState({
            loading: false,
            isValidForm: false,
            errorMessage: '',
            isSuccessfullyCreation: false,
            ...override
        });
    }

    onFocus = () => {
        this.reset({});
    }


    delay(ms) {
        return new Promise(res => setTimeout(res, ms));
    }


    loadFirstData(dataFirst) {
        const { data } = this.state;
        data.id.value = dataFirst.id;
        data.firstName.value = dataFirst.firstName;
        data.lastName.value = dataFirst.lastName;
        data.recordStatus.value = dataFirst.recordStatus;
        data.username.value = dataFirst.username;
        this.updateState({
            data: data,
            loading: false,
            isValidForm: false,
            errorMessage: '',
            isSuccessfullyCreation: false,
        });
    }

    doModifyAction = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        const form = e.target;
        const isValid = form.checkValidity();
        if (isValid === true) {
            const userInfo = getTokenInfo();
            this.updateState({ loading: true, errorMessage: undefined });
            const data = buildPayload(form, { username: this.state.data.username.value, recordStatus: 3 });
            data.recordStatus = Number(data.recordStatus);
            associateEmployee(userInfo.payload.keyid, data).then(_result => {
                form.reset();
                this.updateState({ loading: false, isSuccessfullyCreation: true })
            }).catch(err => {
                console.log(err.fileName, err);
                this.updateState({ loading: false, isSuccessfullyCreation: false, errorMessage: err.message })
                this.props.addNotification({ typeToast: 'error', text: err.message, title: "ERROR" });
            });
        }
        //form.classList.add('was-validated');
    }

    validateForm(key) {
        let isValidForm = false;
        const data = this.state.data;
        data[key].errors = [];

        const errorrecordStatus = Validator.validateStatus(data.recordStatus.value);

        if (Utils.isEmpty(errorrecordStatus)) {
            isValidForm = true;
        }
        if (!Utils.isEmpty(errorrecordStatus) && key === 'recordStatus') {
            data.recordStatus.errors.push(errorrecordStatus);
        }
        this.updateState({ isValidForm, data: data });
    }

    async setChangeInputEvent(key, event) {
        const { data } = this.state;
        data[key].value = event.target.value;
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
                        <form className="needs-validation" onSubmit={this.doModifyAction} noValidate>

                            {this.state.isSuccessfullyCreation && <div className="alert alert-success d-flex align-items-center" role="alert">
                                <i className="fa-solid fa-circle-check icon-input-color bi flex-shrink-0 me-2"></i>
                                <div>
                                    ¡Usuario actualizado!
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
                                                                        data-parsley-required="true"
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

                                                            <div className="col-md-6 col-12">
                                                                <div className="form-group">
                                                                    <label htmlFor="recordStatus" className="form-label">Estado</label>
                                                                    <select
                                                                        className="form-select"
                                                                        id="recordStatus"
                                                                        name='recordStatus'
                                                                        value={this.state.data.recordStatus.value}
                                                                        onChange={(event) => this.setChangeInputEvent('recordStatus', event)}
                                                                        disabled={this.state.loading || this.state.isSuccessfullyCreation}>
                                                                        <option value={null}>Seleccionar...</option>
                                                                        {status.map((item, index) => {
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

                                <ButtonSecondary text={'Cancelar'} type="button" data-bs-dismiss="modal"></ButtonSecondary>

                                <ButtonPrimary
                                    disabled={!this.state.isValidForm || this.state.loading || this.state.isSuccessfullyCreation}
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