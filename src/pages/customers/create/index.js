import * as React from 'react';
import "./styles.css";
import { buildPayload } from '../../../lib/form';
import Utils from '../../../lib/utils';
import Validator from './validators/validator';

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
                },
                password: {
                    value: '',
                    errors: []
                }
            },
        };

        this.doLogInAction = this.doLogInAction.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.setChangeInputEvent = this.setChangeInputEvent.bind(this);
        this.propagateState = this.propagateState.bind(this);
        this.updateState = this.updateState.bind(this);
    }


    doLogInAction = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        //const { setUserInfo, getUserInfo } = this.context;
        const form = e.target;
        const isValid = form.checkValidity();
        if (isValid === true) {
            this.setState({ loading: true });
            const data = buildPayload(form, { username: "", password: "" });
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
        const errorUsername = Validator.validateUsername(data.username.value);
        const errorPassword = Validator.validatePassword(data.password.value);
        if (Utils.isEmpty(errorUsername) && Utils.isEmpty(errorPassword)) {
            isValidForm = true;
        }
        if (!Utils.isEmpty(errorUsername) && key === 'username') {
            data.username.errors.push(errorUsername);
        }
        if (!Utils.isEmpty(errorPassword) && key === 'password') {
            data.password.errors.push(errorPassword);
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
            <div className="modal fade text-left" id="inlineFormCreateCustomer" tabindex="-1" role="dialog"
                aria-labelledby="myModalLabel33" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable"
                    role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title" id="myModalLabel33">Crear cliente </h4>
                            <button type="button" className="close btn-close" data-bs-dismiss="modal"
                                aria-label="Close">
                                <i data-feather="x"></i>
                            </button>
                        </div>
                        <form action="#">
                            <div className="modal-body">
                                <form className="needs-validation" onSubmit={this.doLogInAction} noValidate>
                                    <div className="input-group mb-3">
                                        <span className="input-group-text">
                                            <i className="fa-regular fa-user"></i>
                                        </span>

                                        <input
                                            type="text"
                                            className="form-control form-control-xl"
                                            placeholder="Usuario"
                                            name='username'
                                            id='username'
                                            value={this.state.data.username.value}
                                            onChange={(event) => this.setChangeInputEvent('username', event)}
                                            disabled={this.state.loading}
                                            autoFocus={!this.state.loading}
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
                                    <div className="input-group mb-3">

                                        <span className="input-group-text">
                                            <i className="fa-solid fa-mask"></i>
                                        </span>

                                        <input
                                            type="password"
                                            className="form-control form-control-xl"
                                            placeholder="Contraseña"
                                            name='password'
                                            id='password'
                                            value={this.state.data.password.value}
                                            onChange={(event) => this.setChangeInputEvent('password', event)}
                                            disabled={this.state.loading}
                                            autoFocus={!this.state.loading}
                                            autoComplete='off' />
                                        <div
                                            className="invalid-feedback"
                                            style={{
                                                display: this.state.data.password.errors.length > 0 ? 'block' : 'none'
                                            }}>
                                            {this.state.data.password.errors[0]}
                                        </div>
                                    </div>

                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-light-secondary"
                                    data-bs-dismiss="modal">
                                    <i className="bx bx-x d-block d-sm-none"></i>
                                    <span className="d-none d-sm-block">Cancelar</span>
                                </button>
                                <button type="button" className="btn btn-primary ms-1"
                                    data-bs-dismiss="modal">
                                    <i className="bx bx-check d-block d-sm-none"></i>
                                    <span className="d-none d-sm-block">Crear</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
export default LocalComponent;