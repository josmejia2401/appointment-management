import * as React from 'react';
import "./styles.css";
import { buildPayload } from '../../../lib/form';
import Validator from './validators/validator';
import Utils from '../../../lib/utils';
import ButtonPrimary from '../../../components/button-primary';

import { create } from '../../../api/users.services';

class Page extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            isValidForm: false,
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
                email: {
                    value: '',
                    errors: []
                },
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
        this.goToLogin = this.goToLogin.bind(this);
    }

    doRegisterAction = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        const form = e.target;
        const isValid = form.checkValidity();
        if (isValid === true) {
            this.updateState({ loading: true, isSuccessfullyCreation: false });
            const data = buildPayload(form, { username: "", password: "", firstName: "", email: "", lastName: "" });
            create(data).then(_result => {
                form.reset();
                this.updateState({ isSuccessfullyCreation: true, loading: false });
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

        const errorfirstName = Validator.validateFirstName(data.firstName.value);
        const errorLastName = Validator.validateLastName(data.firstName.value);

        const errorUsername = Validator.validateUsername(data.username.value);
        const errorPassword = Validator.validatePassword(data.password.value);

        const errorEmail = Validator.validateEmail(data.email.value);

        if (Utils.isEmpty(errorUsername) &&
            Utils.isEmpty(errorPassword) &&
            Utils.isEmpty(errorfirstName) &&
            Utils.isEmpty(errorLastName) &&
            Utils.isEmpty(errorEmail)) {
            isValidForm = true;
        }
        if (!Utils.isEmpty(errorUsername) && key === 'username') {
            data.username.errors.push(errorUsername);
        }
        if (!Utils.isEmpty(errorPassword) && key === 'password') {
            data.password.errors.push(errorPassword);
        }
        if (!Utils.isEmpty(errorfirstName) && key === 'firstName') {
            data.firstName.errors.push(errorfirstName);
        }
        if (!Utils.isEmpty(errorLastName) && key === 'lastName') {
            data.lastName.errors.push(errorLastName);
        }
        if (!Utils.isEmpty(errorEmail) && key === 'email') {
            data.email.errors.push(errorEmail);
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

    goToLogin() {
        this.props.navigate("/auth/login");
    }


    render() {
        return (
            <main className='form-signin w-100 m-auto' id="auth-register">
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

                                {this.state.isSuccessfullyCreation && <div className="alert alert-success d-flex align-items-center" role="alert">
                                    <i className="fa-solid fa-circle-check icon-input-color bi flex-shrink-0 me-2"></i>
                                    <div>
                                        ¡Cuenta creada con éxito!
                                    </div>
                                </div>}

                                <h3 className="auth-title mb-5">Obtenga su cuenta GRATIS</h3>



                                <div className="input-group mb-3">
                                    <span className="input-group-text">
                                        <i className="fa-solid fa-person icon-input-color"></i>
                                    </span>

                                    <input
                                        type="text"
                                        className="form-control form-control-xl input-color"
                                        placeholder="Nombres"
                                        name='firstName'
                                        id='firstName'
                                        value={this.state.data.firstName.value}
                                        onChange={(event) => this.setChangeInputEvent('firstName', event)}
                                        disabled={this.state.loading || this.state.isSuccessfullyCreation}
                                        autoComplete='off'
                                    />
                                    <div
                                        className="invalid-feedback error-color"
                                        style={{
                                            display: this.state.data.firstName.errors.length > 0 ? 'block' : 'none'
                                        }}>
                                        {this.state.data.firstName.errors[0]}
                                    </div>
                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text">
                                        <i className="fa-solid fa-file-signature icon-input-color"></i>
                                    </span>

                                    <input
                                        type="text"
                                        className="form-control form-control-xl input-color"
                                        placeholder="Apellidos"
                                        name='lastName'
                                        id='lastName'
                                        value={this.state.data.lastName.value}
                                        onChange={(event) => this.setChangeInputEvent('lastName', event)}
                                        disabled={this.state.loading || this.state.isSuccessfullyCreation}
                                        autoComplete='off'
                                    />
                                    <div
                                        className="invalid-feedback error-color"
                                        style={{
                                            display: this.state.data.lastName.errors.length > 0 ? 'block' : 'none'
                                        }}>
                                        {this.state.data.lastName.errors[0]}
                                    </div>
                                </div>


                                <div className="input-group mb-3">
                                    <span className="input-group-text">
                                        <i className="fa-solid fa-envelope icon-input-color"></i>
                                    </span>

                                    <input
                                        type="email"
                                        className="form-control form-control-xl input-color"
                                        placeholder="Correo electrónico"
                                        name='email'
                                        id='email'
                                        value={this.state.data.email.value}
                                        onChange={(event) => this.setChangeInputEvent('email', event)}
                                        disabled={this.state.loading || this.state.isSuccessfullyCreation}
                                        autoComplete='off'
                                    />
                                    <div
                                        className="invalid-feedback error-color"
                                        style={{
                                            display: this.state.data.email.errors.length > 0 ? 'block' : 'none'
                                        }}>
                                        {this.state.data.email.errors[0]}
                                    </div>
                                </div>


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
                                    text={'Registrar ahora'}></ButtonPrimary>

                            </form>
                            <div className="text-center mt-5 text-lg fs-4">
                                <p className='text-gray-600'>¿Ya tienes cuenta?
                                    <a href="#" className="font-bold" onClick={() => this.props.navigate("/auth/login")}> Inicar sesión</a>.</p>
                            </div>
                        </div>
                    </div>
                </div>

            </main>
        );
    }
}
export default Page;