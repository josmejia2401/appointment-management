import * as React from 'react';
import "./styles.css";
import Template from '../../../components/template';
import { buildAndGetClassStatus, documentTypes, findStatusById } from '../../../lib/list_values';
import { find } from '../../../api/users.services';
import { getTokenInfo } from '../../../api/api.common';
import Validator from '../validators/validator';
import Utils from '../../../lib/utils';


class Page extends React.Component {

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
    }


    componentDidMount() {
        console.log("componentDidMount");
        this.loadData();
    }

    componentWillUnmount() {
        console.log("componentWillUnmount");
        this.resetData();
    }

    defaultState() {
        return {
            loading: false,
            isValidForm: false,
            thereIsMoreData: false,
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
                },
                createdAt: {
                    value: '',
                    errors: []
                },
                documentType: {
                    value: '',
                    errors: []
                },
                documentNumber: {
                    value: '',
                    errors: []
                },
                phoneNumber: {
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


    loadFirstData() { }

    loadData(e) {
        e?.preventDefault();
        e?.stopPropagation();
        this.updateState({ loading: true });
        const userInfo = getTokenInfo();
        find(userInfo.payload.keyid).then(result => {
            this.state.data.username.value = result.username;
            this.state.data.firstName.value = result.firstName;
            this.state.data.lastName.value = result.lastName;
            this.state.data.email.value = result.email;
            this.state.data.phoneNumber.value = result.phoneNumber;
            this.state.data.documentType.value = result.documentType;
            this.state.data.recordStatus.value = result.recordStatus;
            this.state.data.createdAt.value = result.createdAt;
            this.updateState({
                data: this.state.data,
                loading: false,
            });
        }).catch(err => {
            console.log(err.fileName, err);
            if (err.message === 'Cancelled due to new request') {
                return;
            }
            this.updateState({ loading: false });
            this.props.addNotification({ typeToast: 'error', text: err.message, title: err.error });
        });
    }


    validateForm(key) {
        let isValidForm = false;
        const data = this.state.data;
        data[key].errors = Validator.validate(key, data[key].value);
        if (Utils.isEmpty(data[key].errors)) {
            isValidForm = true;
        }
        Object.keys(this.state.data).forEach(p => {
            const errors = Validator.validate(p, data[p].value);
            if (errors.length > 0) {
                isValidForm = false;
            }
        });
        this.updateState({ isValidForm, data: data });
    }

    async setChangeInputEvent(key, event) {
        const { data } = this.state;
        data[key].value = event.target.value;
        await this.updateState({ data: data });
        this.validateForm(key);
    }



    propagateState() { }

    updateState(payload) {
        this.setState({ ...payload }, () => this.propagateState());
    }



    render() {
        return (
            <Template title={'Perfil'} navigate={this.props.navigate} location={this.props.location}>
                <div className="container">
                    <div className="row flex-lg-nowrap">
                        <div className="col">
                            <div className="row">
                                <div className="col mb-3">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="e-profile">
                                                <div className="row">
                                                    <div className="col-12 col-sm-auto mb-3">
                                                        <div className="mx-auto" style={{ width: "140px" }}>
                                                            <div className="d-flex justify-content-center align-items-center rounded" style={{ height: "140px", backgroundColor: "rgb(233, 236, 239)" }}>
                                                                <span style={{ color: "rgb(166, 168, 170)", font: "bold 8pt Arial" }}>140x140</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col d-flex flex-column flex-sm-row justify-content-between mb-3">
                                                        <div className="text-left text-sm-left mb-2 mb-sm-0">
                                                            <h4 className="pt-sm-2 pb-1 mb-0 text-nowrap">{this.state.data.firstName.value}</h4>
                                                            <p className="mb-0" style={{ textAlign: 'left' }}>@{this.state.data.username.value}</p>
                                                            <div className={`${buildAndGetClassStatus(this.state.data.recordStatus.value)} text-muted`}><small>{findStatusById(this.state.data.recordStatus.value).name}</small></div>
                                                            <div className="mt-2">
                                                                <button className="btn btn-primary" type="button">
                                                                    <i className="fa fa-fw fa-camera"></i>
                                                                    <span>Change Photo</span>
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <div className="text-center text-sm-right">
                                                            <span className="badge badge-secondary">administrator</span>
                                                            <div className="text-muted"><small>Desde el {this.state.data.createdAt.value.split("T")[0]}</small></div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <ul className="nav nav-tabs">
                                                    <li className="nav-item"><a href="" className="active nav-link">Settings</a></li>
                                                </ul>
                                                <div className="tab-content pt-3">
                                                    <div className="tab-pane active">
                                                        <form className="form" noValidate="">
                                                            <div className="row">
                                                                <div className="col">
                                                                    <div className="row">
                                                                        <div className="col-12 col-md-6 mb-3">
                                                                            <div className="form-group">
                                                                                <label htmlhtmlFor="firstName" className="form-label">Nombres</label>
                                                                                <input
                                                                                    type="text"
                                                                                    className="form-control form-control-xl input-color"
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
                                                                        </div>
                                                                        <div className="col-12 col-md-6 mb-3">
                                                                            <div className="form-group">
                                                                                <label htmlhtmlFor="lastName" className="form-label">Apellidos</label>
                                                                                <input
                                                                                    type="text"
                                                                                    className="form-control form-control-xl input-color"
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
                                                                        </div>
                                                                    </div>


                                                                    <div className="row">
                                                                        <div className="col-12 col-md-6 mb-3">
                                                                            <div className="form-group">
                                                                                <label htmlhtmlFor="documentType" className="form-label">Tipo de documento</label>
                                                                                <select
                                                                                    className="form-select"
                                                                                    id="documentType"
                                                                                    name='documentType'
                                                                                    value={this.state.data.documentType.value}
                                                                                    required={false}
                                                                                    onChange={(event) => this.setChangeInputEvent('documentType', event)}
                                                                                    disabled={this.state.loading || this.state.isSuccessfullyCreation}>
                                                                                    <option value={null}>Seleccionar...</option>
                                                                                    {documentTypes.map((item, index) => {
                                                                                        return (<option value={item.id} key={index}>{item.name}</option>);
                                                                                    })}
                                                                                </select>
                                                                                <div
                                                                                    className="invalid-feedback error-color"
                                                                                    style={{
                                                                                        display: this.state.data.documentType.errors.length > 0 ? 'block' : 'none'
                                                                                    }}>
                                                                                    {this.state.data.documentType.errors[0]}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-12 col-md-6 mb-3">
                                                                            <div className="form-group">
                                                                                <label htmlhtmlFor="documentNumber" className="form-label">Número de documento</label>
                                                                                <input
                                                                                    type="text"
                                                                                    className="form-control form-control-xl input-color"
                                                                                    name='documentNumber'
                                                                                    id='documentNumber'
                                                                                    value={this.state.data.documentNumber.value}
                                                                                    onChange={(event) => this.setChangeInputEvent('documentNumber', event)}
                                                                                    disabled={this.state.loading}
                                                                                    autoComplete='off'
                                                                                />
                                                                                <div
                                                                                    className="invalid-feedback error-color"
                                                                                    style={{
                                                                                        display: this.state.data.documentNumber.errors.length > 0 ? 'block' : 'none'
                                                                                    }}>
                                                                                    {this.state.data.documentNumber.errors[0]}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>


                                                                    <div className="row">
                                                                        <div className="col-12 col-md-6 mb-3">
                                                                            <div className="form-group">
                                                                                <label htmlhtmlFor="email" className="form-label">Correo electrónico</label>
                                                                                <input
                                                                                    type="text"
                                                                                    className="form-control form-control-xl input-color"
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
                                                                        </div>
                                                                        <div className="col-12 col-md-6 mb-3">
                                                                            <div className="form-group">
                                                                                <label htmlhtmlFor="phoneNumber" className="form-label">Número de celular</label>
                                                                                <input
                                                                                    type="text"
                                                                                    className="form-control form-control-xl input-color"
                                                                                    name='phoneNumber'
                                                                                    id='phoneNumber'
                                                                                    value={this.state.data.phoneNumber.value}
                                                                                    onChange={(event) => this.setChangeInputEvent('phoneNumber', event)}
                                                                                    disabled={this.state.loading}
                                                                                    autoComplete='off'
                                                                                />
                                                                                <div
                                                                                    className="invalid-feedback error-color"
                                                                                    style={{
                                                                                        display: this.state.data.phoneNumber.errors.length > 0 ? 'block' : 'none'
                                                                                    }}>
                                                                                    {this.state.data.phoneNumber.errors[0]}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-12 col-sm-6 mb-3">
                                                                    <div className="mb-2"><b>Change Password</b></div>
                                                                    <div className="row">
                                                                        <div className="col">
                                                                            <div className="form-group">
                                                                                <label>Current Password</label>
                                                                                <input className="form-control" type="password" placeholder="••••••" />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="row">
                                                                        <div className="col">
                                                                            <div className="form-group">
                                                                                <label>New Password</label>
                                                                                <input className="form-control" type="password" placeholder="••••••" />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="row">
                                                                        <div className="col">
                                                                            <div className="form-group">
                                                                                <label>Confirm <span className="d-none d-xl-inline">Password</span></label>
                                                                                <input className="form-control" type="password" placeholder="••••••" /></div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-12 col-sm-5 offset-sm-1 mb-3">
                                                                    <div className="mb-2"><b>Keeping in Touch</b></div>
                                                                    <div className="row">
                                                                        <div className="col">
                                                                            <label>Email Notifications</label>
                                                                            <div className="custom-controls-stacked px-2">
                                                                                <div className="custom-control custom-checkbox">
                                                                                    <input type="checkbox" className="custom-control-input" id="notifications-blog" checked="" />
                                                                                    <label className="custom-control-label" htmlFor="notifications-blog">Blog posts</label>
                                                                                </div>
                                                                                <div className="custom-control custom-checkbox">
                                                                                    <input type="checkbox" className="custom-control-input" id="notifications-news" checked="" />
                                                                                    <label className="custom-control-label" htmlFor="notifications-news">Newsletter</label>
                                                                                </div>
                                                                                <div className="custom-control custom-checkbox">
                                                                                    <input type="checkbox" className="custom-control-input" id="notifications-offers" checked="" />
                                                                                    <label className="custom-control-label" htmlFor="notifications-offers">Personal Offers</label>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col d-flex justify-content-end">
                                                                    <button className="btn btn-primary" type="submit">Save Changes</button>
                                                                </div>
                                                            </div>
                                                        </form>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-12 col-md-3 mb-3">
                                    <div className="card mb-3">
                                        <div className="card-body">
                                            <div className="px-xl-3">
                                                <button className="btn btn-block btn-secondary">
                                                    <i className="fa fa-sign-out"></i>
                                                    <span style={{ marginLeft: '5px' }}>Salir</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card">
                                        <div className="card-body">
                                            <h6 className="card-title font-weight-bold">Soporte</h6>
                                            <p className="card-text">Obtén ayuda y soluciona rápido las solicitudes.</p>
                                            <button type="button" className="btn btn-primary">Contáctanos</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </Template>

        );
    }
}
export default Page;