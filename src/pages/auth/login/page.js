import * as React from 'react';
import "./styles.css";
import { buildPayload } from '../../../lib/form';
import Validator from './validators/validator';
import Utils from '../../../lib/utils';
import ButtonPrimary from '../../../components/button-primary';

import { signIn } from '../../../api/auth.services';

class Page extends React.Component {

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
        this.doRegisterAction = this.doRegisterAction.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.setChangeInputEvent = this.setChangeInputEvent.bind(this);
        this.propagateState = this.propagateState.bind(this);
        this.updateState = this.updateState.bind(this);
        this.goToHome = this.goToHome.bind(this);
    }

    doRegisterAction = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        const form = e.target;
        const isValid = form.checkValidity();
        if (isValid === true) {
            this.updateState({ loading: true });
            const data = buildPayload(form, { username: "", password: "" });
            signIn(data).then(_result => {
                form.reset();
                this.updateState({ loading: false });
                this.goToHome();
            }).catch(err => {
                console.log(err.fileName, err);
                this.updateState({ loading: false });
                this.props.addNotification({ typeToast: 'error', text: err.message, title: err.error });
            });
        }
        form.classList.add('was-validated');
    }

    validateForm(key) {
        let isValidForm = false;
        const data = this.state.data;
        data[key].errors = [];

        const errorUsername = Validator.validateUsername(data.username.value);
        const errorPassword = Validator.validatePassword(data.password.value);

        if (Utils.isEmpty(errorUsername) &&
            Utils.isEmpty(errorPassword)) {
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

    goToHome() {
        this.props.navigate("/team/view");
    }


    render() {
        return (
            <main className='form-signin w-100 m-auto' id="auth-login">
                <div className="row h-100">
                    <div className="col-12">
                        <div id="auth-left" className='center-div'>
                            <div className="auth-logo">
                                <div className="logo-holder logo-5">
                                    <h3>AppMa</h3>
                                    <p>Grandes ideas</p>
                                </div>
                            </div>




                            <form className="needs-validation bgc-white1 shadow-lg mt-5" onSubmit={this.doRegisterAction} noValidate>

                                <h3 className="auth-title mb-5">Inicia sesión</h3>


                                <div className="input-group mb-3">
                                    <span className="input-group-text">
                                        <i className="fa-regular fa-user icon-input-color"></i>
                                    </span>

                                    <input
                                        type="text"
                                        className="form-control form-control-xl input-color"
                                        placeholder="Usuario"
                                        name='username'
                                        id='username'
                                        value={this.state.data.username.value}
                                        onChange={(event) => this.setChangeInputEvent('username', event)}
                                        disabled={this.state.loading || this.state.isSuccessfullyCreation}
                                        autoComplete='off'
                                    />
                                    <div
                                        className="invalid-feedback error-color"
                                        style={{
                                            display: this.state.data.username.errors.length > 0 ? 'block' : 'none'
                                        }}>
                                        {this.state.data.username.errors[0]}
                                    </div>
                                </div>
                                <div className="input-group mb-3">

                                    <span className="input-group-text">
                                        <i className="fa-solid fa-mask icon-input-color"></i>
                                    </span>

                                    <input
                                        type="password"
                                        className="form-control form-control-xl input-color"
                                        placeholder="Contraseña"
                                        name='password'
                                        id='password'
                                        value={this.state.data.password.value}
                                        onChange={(event) => this.setChangeInputEvent('password', event)}
                                        disabled={this.state.loading || this.state.isSuccessfullyCreation}
                                        autoComplete='off' />
                                    <div
                                        className="invalid-feedback error-color"
                                        style={{
                                            display: this.state.data.password.errors.length > 0 ? 'block' : 'none'
                                        }}>
                                        {this.state.data.password.errors[0]}
                                    </div>
                                </div>

                                <ButtonPrimary
                                    type="submit"
                                    className="btn-block btn-lg mt-5"
                                    disabled={!this.state.isValidForm || this.state.loading || this.state.isSuccessfullyCreation}
                                    loading={this.state.loading}
                                    text={'Iniciar'}></ButtonPrimary>

                            </form>
                            <div className="text-center mt-5 text-lg fs-4">
                                <p className='text-gray-600'>¿No tienes cuenta?
                                    <a href="/auth/register" className="font-bold" onClick={() => this.props.navigate("/auth/register")}> Registrarme</a>.</p>
                            </div>
                        </div>
                    </div>
                </div>

            </main>
        );
    }
}
export default Page;