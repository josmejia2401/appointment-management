import * as React from 'react';
import "./styles.css";
import Utils from '../../../lib/utils';
import Validator from './validators/validator';
import ButtonPrimary from '../../../components/button-primary';
import ButtonSecondary from '../../../components/button-secondary';
import { status } from '../../../lib/list_values';
import { del } from '../../../api/services.services';

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
        this.addListeners = this.addListeners.bind(this);
        this.removeListeners = this.removeListeners.bind(this);

        //own
        this.doModifyAction = this.doModifyAction.bind(this);
        this.doGoBack = this.doGoBack.bind(this);
        this.buildAndGetStatus = this.buildAndGetStatus.bind(this);

    }


    componentDidMount() {
        this.resetData({});
        this.addListeners();
        if (this.props.data) {
            this.loadFirstData(this.props.data);
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.data !== prevProps.data) {
            this.loadFirstData(this.props.data);
        }
    }

    componentWillUnmount() {
        this.resetData();
        this.removeListeners();
    }

    defaultState() {
        return {
            loading: false,
            isValidForm: true,
            errorMessage: '',
            isSuccessfullyCreation: false,
            data: {
                id: {
                    value: '',
                    errors: []
                },
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
                recordStatus: {
                    value: '',
                    errors: []
                }
            }
        };
    }

    addListeners() {
        window.addEventListener('click', (e) => {
            const target = e.target || e.currentTarget;
            const buttonTarget = target.parentElement.parentElement || target.parentElement;
            const id = buttonTarget.id;
            if (["btnServiceRemoveNOKId", "btnServiceRemoveCloseId", "btnServiceRemoveCloseTagIId"].includes(id)) {
                this.doGoBack();
            }
        });

        document.addEventListener('keydown', (e) => {
            const key = e.key;
            if (key === "Escape") {
                this.doGoBack();
            }
        });
    }

    removeListeners() {
        window.removeEventListener('click', () => { });
        window.removeEventListener('keydown', () => { });
    }

    resetData(override = {}) {
        this.updateState({
            ...this.defaultState(),
            ...override
        });

        const element = document.getElementById("formServiceRemoveId");
        if (element) {
            element.classList.remove("was-validated");
            element.reset();
        }
    }


    loadFirstData(dataFirst) {
        if (Utils.isEmpty(dataFirst)) {
            return;
        }
        const { data } = this.state;
        data.id.value = dataFirst.id;
        data.name.value = dataFirst.name;
        data.description.value = dataFirst.description;
        data.duration.value = dataFirst.duration;
        data.recordStatus.value = dataFirst.recordStatus;
        this.updateState({ data });
    }

    loadData(e) { }

    validateForm(key) {
        let isValidForm = false;
        const data = this.state.data;
        data[key].errors = Validator.validate(key, data[key].value);
        if (Utils.isEmpty(data[key].errors)) {
            isValidForm = true;
        }
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

    buildAndGetStatus() {
        return status.filter(p => [1, 2].includes(p.id));
    }



    doModifyAction = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        const form = e.target;
        const isValid = form.checkValidity();
        if (isValid === true) {
            this.updateState({ loading: true, errorMessage: undefined });
            del(this.state.data.id.value).then(_result => {
                form.reset();
                this.updateState({ loading: false, isSuccessfullyCreation: true })
                if (this.props.handleAccept) {
                    this.props.handleAccept();
                }
            }).catch(err => {
                console.log(err.fileName, err);
                this.updateState({ loading: false, isSuccessfullyCreation: false, errorMessage: err.message })
                this.props.addNotification({ typeToast: 'error', text: err.message, title: "ERROR" });
            });
        }
        form.classList.add('was-validated');
    }


    doGoBack(e) {
        this.resetData();
        if (this.props.handleGoBack) {
            this.props.handleGoBack();
        }
        document.getElementById("btnServiceRemoveNOKId").click();
    }

    render() {
        return (
            <div className="modal fade text-left"
                id="inlineFormRemoveService"
                tabIndex="-1" r
                ole="dialog"
                aria-labelledby="modalLabelRemove"
                aria-hidden="true"
                data-keyboard="false"
                data-backdrop="static"
                data-bs-backdrop="static"
                data-bs-keyboard="false">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable"
                    role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title" id="modalLabelRemove">Eliminar servicio</h4>
                            <button type="button" className="close btn-close" data-bs-dismiss="modal"
                                aria-label="Close" id="btnServiceRemoveCloseId">
                                <i data-feather="x" id='btnServiceRemoveCloseTagIId'></i>
                            </button>
                        </div>
                        <form id="formServiceRemoveId" className="needs-validation" onSubmit={this.doModifyAction} noValidate>

                            {this.state.isSuccessfullyCreation && <div className="alert alert-success d-flex align-items-center" role="alert">
                                <i className="fa-solid fa-circle-check icon-input-color bi flex-shrink-0 me-2"></i>
                                <div>
                                    Servicio eliminado!
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
                                                <div className="card-header">
                                                    <h4 className="card-title">Información del servicio</h4>
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
                                                                        placeholder="Nombre del servicio"
                                                                        name="name"
                                                                        required={true}
                                                                        onChange={(event) => this.setChangeInputEvent('name', event)}
                                                                        value={this.state.data.name.value}
                                                                        disabled={true}
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
                                                                    <label htmlFor="description" className="form-label">Description</label>
                                                                    <input
                                                                        type="text"
                                                                        id="description"
                                                                        className="form-control"
                                                                        placeholder="Description"
                                                                        name="description"
                                                                        required={true}
                                                                        onChange={(event) => this.setChangeInputEvent('description', event)}
                                                                        value={this.state.data.description.value}
                                                                        disabled={true}
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
                                                                    <label htmlFor="duration" className="form-label">Duración (minutos)</label>
                                                                    <input
                                                                        type="number"
                                                                        id="duration"
                                                                        className="form-control"
                                                                        placeholder="Ingrese la duración en minutos"
                                                                        name="duration"
                                                                        required={true}
                                                                        onChange={(event) => this.setChangeInputEvent('duration', event)}
                                                                        value={this.state.data.duration.value}
                                                                        disabled={true}
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
                                                                    <label htmlFor="recordStatus" className="form-label">Estado</label>
                                                                    <select
                                                                        className="form-select"
                                                                        id="recordStatus"
                                                                        name='recordStatus'
                                                                        value={this.state.data.recordStatus.value}
                                                                        onChange={(event) => this.setChangeInputEvent('recordStatus', event)}
                                                                        disabled={true}>
                                                                        <option value={null}>Seleccionar...</option>
                                                                        {this.buildAndGetStatus().map((item, index) => {
                                                                            return (<option value={item.id} key={index}>{item.name}</option>);
                                                                        })}
                                                                    </select>

                                                                    <div
                                                                        className="invalid-feedback"
                                                                        style={{
                                                                            display: this.state.data.recordStatus.errors.length > 0 ? 'block' : 'none'
                                                                        }}>
                                                                        {this.state.data.recordStatus.errors[0]}
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

                                <ButtonSecondary
                                    id='btnServiceRemoveNOKId'
                                    name='btnServiceRemoveNOKId'
                                    key='btnServiceRemoveNOKId'
                                    text={'Regresar'}
                                    type="button"
                                    data-bs-dismiss="modal"
                                ></ButtonSecondary>

                                <ButtonPrimary
                                    id='btnServiceRemoveOKId'
                                    name='btnServiceRemoveOKId'
                                    key='btnServiceRemoveOKId'
                                    disabled={!this.state.isValidForm || this.state.loading || this.state.isSuccessfullyCreation}
                                    className="btn-block btn-lg background-color-primary"
                                    type='submit'
                                    loading={this.state.loading}
                                    showText={false}
                                    text='Eliminar'
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