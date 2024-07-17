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
                name: {
                    value: '',
                    errors: []
                },
                description: {
                    value: '',
                    errors: []
                },

                duration: {
                    value: '',
                    errors: []
                },
                status: {
                    value: '',
                    errors: []
                },
            },
        };

        this.doLogInAction = this.doLogInAction.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.setChangeInputEvent = this.setChangeInputEvent.bind(this);
        this.propagateState = this.propagateState.bind(this);
        this.updateState = this.updateState.bind(this);
        this.loadFirstData = this.loadFirstData.bind(this);

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
        data.name.value = dataFirst.name;
        data.description.value = dataFirst.description;
        data.status.value = dataFirst.status;
        this.updateState({ data: data });

    }

    doLogInAction = async (e) => {
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
        const errorName = Validator.validateFirstName(data.name.value);
        const errordescription = Validator.validateLastName(data.description.value);

        if (Utils.isEmpty(errorName) &&
            Utils.isEmpty(errordescription)) {
            isValidForm = true;
        }
        if (!Utils.isEmpty(errorName) && key === 'firstName') {
            data.name.errors.push(errorName);
        }
        if (!Utils.isEmpty(errordescription) && key === 'lastName') {
            data.description.errors.push(errordescription);
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
            <div className="modal fade text-left" id="inlineFormEditService" tabIndex="-1" role="dialog"
                aria-labelledby="modalLabelEdit" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable"
                    role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title" id="modalLabelEdit">Modificar servicio</h4>
                            <button type="button" className="close btn-close" data-bs-dismiss="modal"
                                aria-label="Close">
                                <i data-feather="x"></i>
                            </button>
                        </div>
                        <form className="needs-validation" onSubmit={this.doLogInAction} noValidate>
                            <div className="modal-body">
                                <section id="multiple-column-form">
                                    <div className="row match-height">
                                        <div className="col-12">
                                            <div className="card">
                                                <div className="card-header">
                                                    <h4 className="card-title">Información del servicio a modificar</h4>
                                                </div>
                                                <div className="card-content">
                                                    <div className="card-body">
                                                        <div className="row">
                                                            <div className="col-md-6 col-12">
                                                                <div className="form-group mandatory">
                                                                    <label htmlFor="name" className="form-label">Nombre</label>
                                                                    <input
                                                                        type="text"
                                                                        id="name"
                                                                        className="form-control"
                                                                        placeholder="Nombre"
                                                                        name="name"
                                                                        data-parsley-required="true"
                                                                        value={this.state.data.name.value}
                                                                        onChange={(event) => this.setChangeInputEvent('name', event)}
                                                                        disabled={this.state.loading}
                                                                        autoFocus={true}
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
                                                            <div className="col-md-6 col-12">
                                                                <div className="form-group">
                                                                    <label htmlFor="description" className="form-label">Descripción</label>
                                                                    <input
                                                                        type="text"
                                                                        id="description"
                                                                        className="form-control"
                                                                        placeholder="Descripción"
                                                                        name="description"
                                                                        data-parsley-required="true"
                                                                        value={this.state.data.description.value}
                                                                        onChange={(event) => this.setChangeInputEvent('description', event)}
                                                                        disabled={this.state.loading}
                                                                        autoComplete='off'
                                                                    />

                                                                    <div
                                                                        className="invalid-feedback"
                                                                        style={{
                                                                            display: this.state.data.description.errors.length > 0 ? 'block' : 'none'
                                                                        }}>
                                                                        {this.state.data.description.errors[0]}
                                                                    </div>

                                                                </div>
                                                            </div>


                                                            <div className="col-md-6 col-12">
                                                                <div className="form-group">
                                                                    <label htmlFor="duration" className="form-label">Duración (min)</label>
                                                                    <input
                                                                        type="text"
                                                                        id="duration"
                                                                        className="form-control"
                                                                        placeholder="Duración en minutos"
                                                                        name="duration"
                                                                        data-parsley-required="true"
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