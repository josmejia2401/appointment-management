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
            <section className="background-primary-color py-3 py-md-5 py-xl-8 center-div">
                <div className="container">
                    <div className="row gy-4 align-items-center">
                        <div className="col-12 col-md-6 col-xl-7">
                            <div className="d-flex justify-content-center">
                                <div className="col-12 col-xl-9">
                                    <img className="img-fluid rounded mb-4" loading="lazy" src="https://cdn-icons-png.flaticon.com/512/3301/3301556.png" width="245" height="80" alt="BootstrapBrain Logo" />
                                    <hr className="border-primary-subtle mb-4" />
                                    <h2 className="h1 mb-4 color-text-title">Hacemos más simple la manera de gestionar agendamientos</h2>
                                    <p className="lead mb-5">AppMa es un sistema de automatización de gestión y programación de agendamientos que simplifica y unifica las programaciones.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-xl-5">
                            <div className="card border-0 rounded-4">
                                <div className="card-body p-3 p-md-4 p-xl-5">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="mb-4">
                                                <h3>Registro</h3>
                                                <p>¿Tienes una cuenta? <a href="#" onClick={this.goToLogin}>Inicia sesión</a></p>
                                            </div>
                                        </div>
                                    </div>
                                    <form className="needs-validation" onSubmit={this.doRegisterAction} noValidate>
                                        <div className="row gy-3 overflow-hidden">

                                            <div className="col-12">
                                                <div className="form-floating">
                                                    <input
                                                        type="text"
                                                        className="form-control form-control-xl input-color"
                                                        name='firstName'
                                                        id='firstName'
                                                        value={this.state.data.firstName.value}
                                                        onChange={(event) => this.setChangeInputEvent('firstName', event)}
                                                        disabled={this.state.loading || this.state.isSuccessfullyCreation}
                                                        autoComplete='off'
                                                    />
                                                    <label htmlFor="firstName" className="form-label">Nombres</label>
                                                    <div
                                                        className="invalid-feedback error-color"
                                                        style={{
                                                            display: this.state.data.firstName.errors.length > 0 ? 'block' : 'none'
                                                        }}>
                                                        {this.state.data.firstName.errors[0]}
                                                    </div>
                                                </div>
                                            </div>


                                            <div className="col-12">
                                                <div className="form-floating">
                                                    <input
                                                        type="text"
                                                        className="form-control form-control-xl input-color"
                                                        name='lastName'
                                                        id='lastName'
                                                        value={this.state.data.lastName.value}
                                                        onChange={(event) => this.setChangeInputEvent('lastName', event)}
                                                        disabled={this.state.loading || this.state.isSuccessfullyCreation}
                                                        autoComplete='off'
                                                    />
                                                    <label htmlFor="lastName" className="form-label">Apellidos</label>
                                                    <div
                                                        className="invalid-feedback error-color"
                                                        style={{
                                                            display: this.state.data.lastName.errors.length > 0 ? 'block' : 'none'
                                                        }}>
                                                        {this.state.data.lastName.errors[0]}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-12">
                                                <div className="form-floating">
                                                    <input
                                                        type="email"
                                                        className="form-control form-control-xl input-color"
                                                        name='email'
                                                        id='email'
                                                        value={this.state.data.email.value}
                                                        onChange={(event) => this.setChangeInputEvent('email', event)}
                                                        disabled={this.state.loading || this.state.isSuccessfullyCreation}
                                                        autoComplete='off'
                                                    />
                                                    <label htmlFor="email" className="form-label">Email</label>
                                                    <div
                                                        className="invalid-feedback error-color"
                                                        style={{
                                                            display: this.state.data.email.errors.length > 0 ? 'block' : 'none'
                                                        }}>
                                                        {this.state.data.email.errors[0]}
                                                    </div>
                                                </div>
                                            </div>


                                            <div className="col-12">
                                                <div className="form-floating">
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
                                                    <label htmlFor="username" className="form-label">Usuario</label>
                                                    <div
                                                        className="invalid-feedback error-color"
                                                        style={{
                                                            display: this.state.data.username.errors.length > 0 ? 'block' : 'none'
                                                        }}>
                                                        {this.state.data.username.errors[0]}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="form-floating">
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
                                                    <label htmlFor="password" className="form-label">Password</label>

                                                    <div
                                                        className="invalid-feedback error-color"
                                                        style={{
                                                            display: this.state.data.password.errors.length > 0 ? 'block' : 'none'
                                                        }}>
                                                        {this.state.data.password.errors[0]}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="d-grid">
                                                    <ButtonPrimary
                                                        type="submit"
                                                        className="btn-block btn-lg mt-3"
                                                        disabled={!this.state.isValidForm || this.state.loading || this.state.isSuccessfullyCreation}
                                                        loading={this.state.loading}
                                                        text={'Registrarme ahora'}></ButtonPrimary>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
export default Page;