import * as React from 'react';
import "./styles.css";
import { buildPayload } from '../../../lib/form';
import Utils from '../../../lib/utils';
import Validator from '../validators/validator';
import ButtonPrimary from '../../../components/button-primary';
import ButtonSecondary from '../../../components/button-secondary';
import { create } from '../../../api/services.services';

class LocalComponent extends React.Component {

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

        this.doInviteAction = this.doInviteAction.bind(this);
    }

    componentDidMount() {
        this.resetData({});
    }

    componentWillUnmount() {
        this.resetData();
    }

    defaultState() {
        return {
            loading: false,
            isValidForm: false,
            errorMessage: '',
            isSuccessfullyCreation: false,
            data: {
                name: {
                    value: '',
                    errors: []
                },
                description: {
                    value: '',
                    errors: []
                },
                pricing: {
                    value: '',
                    errors: []
                },
                duration: {
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

    loadData(e) { }

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

    setChangeInputEvent(key, event) {
        const { data } = this.state;
        data[key].value = event.target.value;
        this.updateState({ data: data });
        this.validateForm(key);
    }

    propagateState() { }

    updateState(payload) {
        this.setState({ ...payload }, () => this.propagateState());
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
            this.updateState({ loading: true, errorMessage: undefined });
            const data = buildPayload(form, { recordStatus: 1, name: "", duration: "", description: "" });
            if (data.duration) {
                data.duration = Number(data.duration);
            } else {
                delete data.duration;
            }
            create(data).then(_result => {
                form.reset();
                this.resetData({ isSuccessfullyCreation: true });
                this.props.afterClosedDialog(true);
            }).catch(err => {
                console.log(err.fileName, err);
                this.updateState({ loading: false, isSuccessfullyCreation: false, errorMessage: err.message })
                this.props.addNotification({ typeToast: 'error', text: err.message, title: "ERROR" });
            });
        }
        form.classList.add('was-validated');
    }


    render() {
        return (
            <div className="modal fade show"
                style={{ display: 'block' }}
                tabIndex="-1"
                role="dialog"
                data-keyboard="false"
                data-backdrop="static"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl" role="document">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h4 className="modal-title" id='myModalLabel33'>Crear un servicio</h4>
                            <button type="button" className="close btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={this.props.hideDialog}>
                                <i data-feather="x" ></i>
                            </button>
                        </div>

                        <form className="needs-validation form" onSubmit={this.doInviteAction} noValidate>

                            {this.state.isSuccessfullyCreation && <div className="alert alert-success d-flex align-items-center" role="alert">
                                <i className="fa-solid fa-circle-check icon-input-color bi flex-shrink-0 me-2"></i>
                                <div>
                                    Creación exitosa!
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
                                                <div className="card-content">
                                                    <div className="card-body">
                                                        <div className="row">
                                                            <div className="col-12 col-md-12">
                                                                <div className="form-group mandatory">
                                                                    <label htmlFor="name" className="form-label">Nombre (*)</label>
                                                                    <input
                                                                        type="text"
                                                                        id="name"
                                                                        className="form-control"
                                                                        placeholder="Ingrese su nombre"
                                                                        name="name"
                                                                        required={true}
                                                                        value={this.state.data.name.value}
                                                                        onChange={(event) => this.setChangeInputEvent('name', event)}
                                                                        disabled={this.state.loading}
                                                                        autoComplete='off'
                                                                    />

                                                                    <div
                                                                        className="invalid-feedback"
                                                                        style={{
                                                                            display: this.state.data.name.errors.length > 0 ? 'block' : 'none'
                                                                        }}>
                                                                        {this.state.data.name.errors[0]}
                                                                    </div>

                                                                </div>
                                                            </div>

                                                        </div>







                                                        <div className="row">
                                                            <div className="col-12 col-md-6">
                                                                <div className="form-group mandatory">
                                                                    <label htmlFor="duration" className="form-label">Duración (Minutos)</label>
                                                                    <input
                                                                        type="number"
                                                                        id="duration"
                                                                        className="form-control"
                                                                        placeholder="Ingrese su celular"
                                                                        name="duration"
                                                                        required={false}
                                                                        value={this.state.data.duration.value}
                                                                        onChange={(event) => this.setChangeInputEvent('duration', event)}
                                                                        disabled={this.state.loading}
                                                                        autoComplete='off'
                                                                    />

                                                                    <div
                                                                        className="invalid-feedback"
                                                                        style={{
                                                                            display: this.state.data.duration.errors.length > 0 ? 'block' : 'none'
                                                                        }}>
                                                                        {this.state.data.duration.errors[0]}
                                                                    </div>


                                                                </div>
                                                            </div>


                                                            <div className="col-12 col-md-6">
                                                                <div className="form-group mandatory">
                                                                    <label htmlFor="pricing" className="form-label">Precio</label>
                                                                    <input
                                                                        type="number"
                                                                        id="pricing"
                                                                        className="form-control"
                                                                        placeholder="Ingrese el precio"
                                                                        name="pricing"
                                                                        required={false}
                                                                        value={this.state.data.pricing.value}
                                                                        onChange={(event) => this.setChangeInputEvent('pricing', event)}
                                                                        disabled={this.state.loading}
                                                                        autoComplete='off'
                                                                    />

                                                                    <div
                                                                        className="invalid-feedback"
                                                                        style={{
                                                                            display: this.state.data.pricing.errors.length > 0 ? 'block' : 'none'
                                                                        }}>
                                                                        {this.state.data.pricing.errors[0]}
                                                                    </div>


                                                                </div>
                                                            </div>
                                                        </div>


                                                        <div className="row">
                                                            <div className="col-12 col-md-12">
                                                                <div className="form-group mandatory">
                                                                    <label htmlFor="description" className="form-label">Descripción</label>

                                                                    <textarea
                                                                        id="description"
                                                                        className="form-control"
                                                                        placeholder="Ingrese la descripción"
                                                                        name="description"
                                                                        required={false}
                                                                        value={this.state.data.description.value}
                                                                        onChange={(event) => this.setChangeInputEvent('description', event)}
                                                                        disabled={this.state.loading}
                                                                        autoComplete='off'
                                                                        rows="3"></textarea>
                                                                    <div
                                                                        className="invalid-feedback"
                                                                        style={{
                                                                            display: this.state.data.description.errors.length > 0 ? 'block' : 'none'
                                                                        }}>
                                                                        {this.state.data.description.errors[0]}
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
                                <ButtonSecondary text={'Regresar'} type="button" onClick={this.props.hideDialog}></ButtonSecondary>

                                <ButtonPrimary
                                    disabled={!this.state.isValidForm || this.state.loading}
                                    className="btn-block btn-lg background-color-primary"
                                    type='submit'
                                    loading={this.state.loading}
                                    showText={true}
                                    textLoading={'Creando...'}
                                    text='Crear'
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