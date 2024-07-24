import * as React from 'react';
import "./styles.css";
import { buildPayload } from '../../../lib/form';
import Utils from '../../../lib/utils';
import Validator from './validators/validator';
import ButtonPrimary from '../../../components/button-primary';
import ButtonSecondary from '../../../components/button-secondary';
import { status } from '../../../lib/list_values';

class LocalComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            isValidForm: false,
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
                status: {
                    value: '',
                    errors: []
                },
                notes: {
                    value: '',
                    errors: []
                },
                clientId: {
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


        this.doModifyAction = this.doModifyAction.bind(this);
        this.delay = this.delay.bind(this);
    }


    componentDidMount() {
        console.log(this.props.data);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.data !== prevProps.data) {
            this.loadFirstData(this.props.data);
        }
    }

    delay(ms) {
        return new Promise(res => setTimeout(res, ms));
    }


    loadFirstData(dataFirst) {
        const { data } = this.state;
        data.id.value = dataFirst.id;
        data.firstName.value = dataFirst.firstName;
        data.lastName.value = dataFirst.lastName;
        data.status.value = dataFirst.status;
        data.clientId.value = dataFirst.clientId;
        this.updateState({ data: data });
    }


    /**
     * El sistema modifica el estado de la asociacion del usuario principal y el empleado.
     * 
     * nombre de tabla en dynamodb: apma_users_$env
     * {
     *  id: 1,
     *  firstName: 'nombre de la empresa o administrador',
     *  lastName: '',
     *  email: '',
     *  username: '',
     *  password: '',
     *  documentType: '',
     *  documentNumber: '',
     *  recordStatus: 1,
     *  createdAt: new Date(),
     *  updateAt: new Date(),
     *  customers: [
     *      {
     *       id: 1,
     *       firstName: 'nombre de la empresa o administrador',
     *       lastName: '',
     *       email: '',
     *       phoneNumber: '',
     *       documentType: '',
     *       documentNumber: '',
     *       birthday: '',
     *       gender: 1,
     *       status: 1,
     *       createdAt: new Date(),
     *       notes: [{id: 1, description: '', createdAt: '', userId: ''}]
     *      }
     *  ],
     *  employees:[
     *      {
     *       id: 1,
     *       note: '',
     *       createdAt: ,
     *       status: 1 = activo, inactivo, pendiente
     *      }
     *  ],
     *  invitations: [
     *      {
     *       id: 1,
     *       userFrom: '',
     *       userTo: '',
     *       createdAt: ,
     *       note: '',
     *       status: 1, activo, inactivo, pendiente
     *       history: [
     *          {id: 1, description: 'Se realiza la invitación', createdAt: ''},
     *          {id: 2, description: 'Se acepta la invitación', createdAt: ''}
     *       ]
     *      }
     *  ]
     * }
     * @param {*} e 
     */
    doModifyAction = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        const form = e.target;
        const isValid = form.checkValidity();
        if (isValid === true) {
            this.setState({ loading: true });
            const data = buildPayload(form, { username: "", password: "" });
            console.log(data);
            await this.delay(3000);
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

        const errorstatus = Validator.validateStatus(data.status.value);
        const errornotes = Validator.validateNotes(data.notes.value);

        if (Utils.isEmpty(errornotes) || Utils.isEmpty(errorstatus)) {
            isValidForm = true;
        }

        if (!Utils.isEmpty(errornotes) && key === 'notes') {
            data.notes.errors.push(errornotes);
        }
        if (!Utils.isEmpty(errorstatus) && key === 'status') {
            data.status.errors.push(errorstatus);
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
                                                                    <label htmlFor="status" className="form-label">Estado</label>
                                                                    <select
                                                                        className="form-select"
                                                                        id="status"
                                                                        name='status'
                                                                        value={this.state.data.status.value}
                                                                        onChange={(event) => this.setChangeInputEvent('status', event)}
                                                                        disabled={this.state.loading}>
                                                                        <option value={null}>Seleccionar...</option>
                                                                        {status.map((item, index) => {
                                                                            return (<option value={item.id} key={index}>{item.name}</option>);
                                                                        })}
                                                                    </select>

                                                                    <div
                                                                        className="invalid-feedback"
                                                                        style={{
                                                                            display: this.state.data.status.errors.length > 0 ? 'block' : 'none'
                                                                        }}>
                                                                        {this.state.data.status.errors[0]}
                                                                    </div>

                                                                </div>
                                                            </div>

                                                            <div className="col-md-12 col-12">
                                                                <div className="form-group mandatory">
                                                                    <label htmlFor="notes" className="form-label">Notas</label>
                                                                    <textarea
                                                                        className="form-control"
                                                                        id="notes"
                                                                        name='notes'
                                                                        rows="3"
                                                                        data-parsley-required="false"
                                                                        value={this.state.data.notes.value}
                                                                        onChange={(event) => this.setChangeInputEvent('notes', event)}
                                                                        disabled={this.state.loading}
                                                                        autoComplete='off'
                                                                    />

                                                                    <div
                                                                        className="invalid-feedback"
                                                                        style={{
                                                                            display: this.state.data.notes.errors.length > 0 ? 'block' : 'none'
                                                                        }}>
                                                                        {this.state.data.notes.errors[0]}
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
                                    disabled={!this.state.isValidForm || this.state.loading}
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