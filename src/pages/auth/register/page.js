import * as React from 'react';
import "./styles.css";
import { buildPayload } from '../../../lib/form';
import Validator from './validators/validator';
import Utils from '../../../lib/utils';
import ButtonPrimary from '../../../components/button-primary';

import { register } from '../../../api/auth.services';

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
            animations: {
                value: [
                    "Es gratis",
                    "Ahora puedes gestionar tu agenda de forma simple y sencilla",
                    "Úsalo en empresas, cuentas personales y equipos"
                ],
                intervalId: null,
                timeoutId: null,
                currentValue: null,
            }

        };
        this.doRegisterAction = this.doRegisterAction.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.setChangeInputEvent = this.setChangeInputEvent.bind(this);
        this.propagateState = this.propagateState.bind(this);
        this.updateState = this.updateState.bind(this);
        this.startAnimations = this.startAnimations.bind(this);
        this.processAnimation = this.processAnimation.bind(this);
        this.addAnimations = this.addAnimations.bind(this);
        this.goToLogin = this.goToLogin.bind(this);
    }

    doRegisterAction = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        const form = e.target;
        const isValid = form.checkValidity();
        if (isValid === true) {
            this.setState({ loading: true });
            const data = buildPayload(form, { username: "", password: "", firstName: "", email: "", lastName: "" });
            register(data).then(_result => {
                form.reset();
                this.updateState({ isSuccessfullyCreation: true });
            }).catch(err => {
                console.log(err.fileName, err);
                this.props.addNotification({ typeToast: 'error', text: err.message, title: err.error });
            }).finally(() => this.setState({ loading: false }));
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

    componentDidMount() {
        this.startAnimations();
    }

    componentWillUnmount() {
        clearInterval(this.state.animations.intervalId);
        clearTimeout(this.state.animations.timeoutId);
    }

    async startAnimations() {
        const animations = this.state.animations;
        animations.currentValue = this.state.animations.value[0];
        animations.intervalId = setInterval(this.processAnimation, 3500);
        await this.updateState({ animations: animations });
    }

    async processAnimation() {
        let currentValue = this.state.animations.currentValue;
        if (currentValue) {
            let index = this.state.animations.value.findIndex(p => p === currentValue);
            const maxLength = this.state.animations.value.length - 1;
            if (index >= maxLength) {
                currentValue = this.state.animations.value[0];
            } else {
                currentValue = this.state.animations.value[index + 1];
            }
        } else {
            currentValue = this.state.animations.value[0];
        }
        this.state.animations.currentValue = currentValue;
        const element = document.getElementById("h1-current-value");
        if (element) {
            element.classList.remove('fade-in-text');
            element.classList.add('fade-out-text');
            if (this.state.animations.timeoutId) {
                clearTimeout(this.state.animations.timeoutId);
            }
            this.state.animations.timeoutId = setTimeout(this.addAnimations, 300);
        }
        await this.updateState({ animations: this.state.animations });
    }

    addAnimations() {
        const element = document.getElementById("h1-current-value");
        if (element) {
            element.classList.remove('fade-out-text');
            element.classList.add('fade-in-text');
        }
    }

    goToLogin() {
        this.props.navigate("/auth/login");
    }


    render() {
        if (this.state.isSuccessfullyCreation) {
            return (<div className="center-div">
                <h1 className='center-text'>¡Registro exitoso!</h1>
                <i className="fa-regular fa-thumbs-up center-text" style={{ fontSize: "150px" }}></i>
                <ButtonPrimary
                    type="button"
                    className="btn-block btn-lg mt-5 center-text"
                    style={{ width: '100%' }}
                    onClick={this.goToLogin}
                    text={'Ir a Iniciar Sesión'}></ButtonPrimary>
            </div>);
        }
        return (
            <main className='form-signin w-100 m-auto' id="auth-register">
                <div className="row h-100">
                    <div className="col-lg-5 col-12">
                        <div id="auth-left">
                            <div className="auth-logo">
                                <a href="/">
                                    <img src="https://cdn5.f-cdn.com/contestentries/366848/10688121/56e5395903343_thumb900.jpg" alt="Logo" />
                                </a>
                            </div>
                            <h1 className="auth-title">Registro</h1>
                            <p className="auth-subtitle mb-5">Digita los datos para registrarte en el sistema</p>

                            <form className="needs-validation" onSubmit={this.doRegisterAction} noValidate>

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
                                        disabled={this.state.loading}
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
                                        disabled={this.state.loading}
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
                                        disabled={this.state.loading}
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
                                        disabled={this.state.loading}
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
                                        disabled={this.state.loading}
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
                                    disabled={!this.state.isValidForm}
                                    loading={this.state.loading}
                                    text={'Registrar ahora'}></ButtonPrimary>

                            </form>
                            <div className="text-center mt-5 text-lg fs-4">
                                <p className='text-gray-600'>Ya tienes cuenta?
                                    <a href="#" className="font-bold" onClick={() => this.props.navigate("/auth/login")}>Inicar sesión</a>.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-7 d-none d-lg-block">
                        <div id="auth-right">
                            <h1 id="h1-current-value" className='center-text fade-in-text h1-current-value'>{this.state.animations.currentValue}</h1>
                        </div>
                    </div>
                </div>

            </main>
        );
    }
}
export default Page;