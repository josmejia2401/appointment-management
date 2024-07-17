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
            data: {
                fullName: {
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
    }

    doRegisterAction = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        //const { setUserInfo, getUserInfo } = this.context;
        const form = e.target;
        const isValid = form.checkValidity();
        if (isValid === true) {
            this.setState({ loading: true });
            const data = buildPayload(form, { username: "", password: "", fullName: "", email: "" });
            register(data).then(_result => {
                form.reset();
                this.props.navigate("/home");
            }).catch(err => {
                console.log(err.fileName, err);
                this.props.addNotification({ typeToast: 'error', text: err.message, title: "ERROR" });
            }).finally(() => this.setState({ loading: false }));
        }
        form.classList.add('was-validated');
    }

    validateForm(key) {
        let isValidForm = false;
        const data = this.state.data;
        data[key].errors = [];
        const errorUsername = Validator.validateUsername(data.username.value);
        const errorPassword = Validator.validatePassword(data.password.value);
        const errorFullName = Validator.validateFullName(data.fullName.value);
        const errorEmail = Validator.validateEmail(data.email.value);

        if (Utils.isEmpty(errorUsername) && Utils.isEmpty(errorPassword) && Utils.isEmpty(errorFullName) && Utils.isEmpty(errorEmail)) {
            isValidForm = true;
        }
        if (!Utils.isEmpty(errorUsername) && key === 'username') {
            data.username.errors.push(errorUsername);
        }
        if (!Utils.isEmpty(errorPassword) && key === 'password') {
            data.password.errors.push(errorPassword);
        }
        if (!Utils.isEmpty(errorFullName) && key === 'fullName') {
            data.fullName.errors.push(errorFullName);
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


    render() {
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
                                        placeholder="Nombre completo"
                                        name='fullName'
                                        id='fullName'
                                        value={this.state.data.fullName.value}
                                        onChange={(event) => this.setChangeInputEvent('fullName', event)}
                                        disabled={this.state.loading}
                                        autoComplete='off'
                                    />
                                    <div
                                        className="invalid-feedback error-color"
                                        style={{
                                            display: this.state.data.fullName.errors.length > 0 ? 'block' : 'none'
                                        }}>
                                        {this.state.data.fullName.errors[0]}
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