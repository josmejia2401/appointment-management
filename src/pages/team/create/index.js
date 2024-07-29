import * as React from 'react';
import "./styles.css";
import { buildPayload } from '../../../lib/form';
import Utils from '../../../lib/utils';
import Validator from './validators/validator';
import ButtonPrimary from '../../../components/button-primary';
import ButtonSecondary from '../../../components/button-secondary';
import { associateEmployee } from '../../../api/users.services';
import { getTokenInfo } from '../../../api/api.common';

class LocalComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            isValidForm: false,
            data: {
                username: {
                    value: '',
                    errors: []
                }
            },
            isSuccessfullyCreation: false,
            errorMessage: undefined
        };
        this.validateForm = this.validateForm.bind(this);
        this.setChangeInputEvent = this.setChangeInputEvent.bind(this);
        this.propagateState = this.propagateState.bind(this);
        this.updateState = this.updateState.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.reset = this.reset.bind(this);

        this.doInviteAction = this.doInviteAction.bind(this);
    }


    componentDidMount() {
        window.addEventListener("focus", this.onFocus)
        window.addEventListener("visibilitychange", this.onFocus)
        //window.addEventListener("blur", this.onFocus)
    }

    componentWillUnmount() {
        window.removeEventListener("focus", this.onFocus)
        window.removeEventListener("visibilitychange", this.onFocus)
        //window.removeEventListener("blur", this.onFocus)
    }

    reset(override) {
        this.updateState({
            loading: false,
            isValidForm: false,
            errorMessage: '',
            isSuccessfullyCreation: false,
            data: {
                username: {
                    value: '',
                    errors: []
                },
            },
            ...override
        });
    }

    onFocus = () => {
        this.reset({});
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
            const userInfo = getTokenInfo();
            this.updateState({ loading: true, errorMessage: undefined });
            const data = buildPayload(form, { username: "", recordStatus: 3 });
            associateEmployee(userInfo.payload.keyid, data).then(_result => {
                form.reset();
                this.reset({ isSuccessfullyCreation: true })
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
        const errorusernamee = Validator.validateFirstName(data.username.value);
        if (Utils.isEmpty(errorusernamee)) {
            isValidForm = true;
        }
        if (!Utils.isEmpty(errorusernamee) && key === 'username') {
            data.username.errors.push(errorusernamee);
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
            <div className="modal fade text-left" id="inlineFormCreateTeam" tabIndex="-1" role="dialog"
                aria-labelledby="myModalLabel33" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable"
                    role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title" id="myModalLabel33">Invitar integrante</h4>
                            <button type="button" className="close btn-close" data-bs-dismiss="modal"
                                aria-label="Close">
                                <i data-feather="x"></i>
                            </button>
                        </div>
                        <form className="needs-validation" onSubmit={this.doInviteAction} noValidate>

                            {this.state.isSuccessfullyCreation && <div className="alert alert-success d-flex align-items-center" role="alert">
                                <i className="fa-solid fa-circle-check icon-input-color bi flex-shrink-0 me-2"></i>
                                <div>
                                    ¡Invitación enviada!
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
                                                        <h6>El usuario debe estar previamente registrado.</h6>
                                                        <h6>Al usuario le llegará una invitación para unirse al equipo.</h6>
                                                    </div>
                                                </div>
                                                <div className="card-content">
                                                    <div className="card-body">
                                                        <div className="row">
                                                            <div className="col-md-12 col-12">
                                                                <div className="form-group mandatory">
                                                                    <label htmlFor="username" className="form-label">Usuario</label>
                                                                    <input
                                                                        type="text"
                                                                        id="username"
                                                                        className="form-control"
                                                                        placeholder="Ingrese el Usuario a invitar"
                                                                        name="username"
                                                                        data-parsley-required="true"
                                                                        value={this.state.data.username.value}
                                                                        onChange={(event) => this.setChangeInputEvent('username', event)}
                                                                        disabled={this.state.loading || this.state.isSuccessfullyCreation}
                                                                        autoFocus={true}
                                                                        autoComplete='off'
                                                                    />

                                                                    <div
                                                                        className="invalid-feedback"
                                                                        style={{
                                                                            display: this.state.data.username.errors.length > 0 ? 'block' : 'none'
                                                                        }}>
                                                                        {this.state.data.username.errors[0]}
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
                                    showText={true}
                                    textLoading={'Enviando invitación...'}
                                    text='Invitar'
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