import * as React from 'react';
import "./styles.css";
import Template from '../../../components/template';
import CreateComponent from '../create';
import EditComponent from '../edit';
import { findDocumentTypeById, findStatusById } from '../../../lib/list_values';
import ButtonIcon from '../../../components/button-icon';
import { findEmployees } from '../../../api/users.services';
import { getTokenInfo } from '../../../api/api.common';


class Page extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            isValidForm: false,
            data: [],
            dataFiltered: [],
            dataSelected: undefined,
            isFocused: false,
            inputSearch: ''
        };

        this.loadData = this.loadData.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.setChangeInputEvent = this.setChangeInputEvent.bind(this);
        this.propagateState = this.propagateState.bind(this);
        this.updateState = this.updateState.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.reset = this.reset.bind(this);

        this.doLogInAction = this.doLogInAction.bind(this);
        this.dataSelectedAction = this.dataSelectedAction.bind(this);
    }


    componentDidMount() {
        window.addEventListener("focus", this.onFocus)
        window.addEventListener("visibilitychange", this.onFocus)
        this.loadData(null);
    }

    componentWillUnmount() {
        window.removeEventListener("focus", this.onFocus)
        window.removeEventListener("visibilitychange", this.onFocus)
    }

    reset(override) {
        this.updateState({
            loading: false,
            isValidForm: false,
            data: [],
            dataFiltered: [],
            dataSelected: undefined,
            isFocused: false,
            inputSearch: '',
            ...override
        });
    }

    onFocus = () => { }

    async loadData(e) {
        e?.preventDefault();
        e?.stopPropagation();
        this.updateState({ loading: true });
        const userInfo = getTokenInfo();
        findEmployees(userInfo.payload.keyid).then(result => {
            this.updateState({ data: result, dataFiltered: result, loading: false });
        }).catch(err => {
            console.log(err.fileName, err);
            this.updateState({ loading: false });
            this.props.addNotification({ typeToast: 'error', text: err.message, title: err.error });
        });
    }


    doLogInAction = async (e) => {
    }

    validateForm(key) { }

    async setChangeInputEvent(key, event) {
        this.state.inputSearch = event.target.value;
        if (this.state.inputSearch) {
            this.state.dataFiltered = this.state.data.filter(p => {
                const str = JSON.stringify(p);
                if (str.includes(this.state.inputSearch)) {
                    return true;
                }
                return false;
            });
        } else {
            this.state.dataFiltered = this.state.data;
        }
        this.updateState({ inputSearch: this.state.inputSearch, dataFiltered: this.state.dataFiltered });
        console.log(this.state.dataFiltered);
    }

    propagateState() { }

    updateState(payload) {
        this.setState({ ...payload }, () => this.propagateState());
    }



    async dataSelectedAction(e, item) {
        this.updateState({ dataSelected: item });
    }

    render() {
        return (
            <Template title={'Equipo'} navigate={this.props.navigate} location={this.props.location}>
                <section className="section background-color-off-white">
                    <div className="row" id="table-hover-row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header">
                                    <h4 className="card-title title-color">Listado de integrantes</h4>

                                    <div className='btn-create-customer'>
                                        <ButtonIcon type="button"
                                            className="btn icon btn-primary-custom btn-create-customer"
                                            onClick={this.loadData}>
                                            <i className="fa-solid fa-rotate-right"></i>
                                        </ButtonIcon>

                                        <ButtonIcon type="button"
                                            className="btn icon btn-primary-custom btn-create-customer"
                                            data-bs-toggle="modal"
                                            data-bs-target="#inlineFormCreateTeam"
                                            style={{ marginLeft: '5px' }}>
                                            <i className="fa-solid fa-plus"></i>
                                        </ButtonIcon>

                                    </div>

                                </div>
                                <div className="card-content">
                                    <div className="card-body">
                                        <p className='subtitle-color'>A continuación se muestran los <code className="highlighter-rouge">integrantes</code> disponibles.
                                        </p>
                                    </div>

                                    <div className="table-responsive">
                                        <table className="table table-hover mb-0">
                                            <thead>
                                                <tr>
                                                    <th colSpan={6}>
                                                        <input
                                                            placeholder='Buscar...'
                                                            type="text"
                                                            className="form-control form-control-xl input-color w-100"
                                                            name='inputSearch'
                                                            id='inputSearch'
                                                            value={this.state.inputSearch}
                                                            onChange={(event) => this.setChangeInputEvent('inputSearch', event)}
                                                            autoComplete='off'
                                                        ></input>
                                                    </th>
                                                </tr>
                                                <tr>
                                                    <th>Nombres</th>
                                                    <th>Apellidos</th>
                                                    <th>Tipo documento</th>
                                                    <th>Número documento</th>
                                                    <th>Estado</th>
                                                    <th>Acción</th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                {this.state.loading && (<tr>
                                                    <td className="text-color" colSpan={6}>
                                                        <i className="fa-solid fa-circle-info no-found-icon"></i>
                                                        <h1 className="no-found-text">Buscando datos...</h1>
                                                    </td>
                                                </tr>)}

                                                {!this.state.loading && this.state.dataFiltered.length === 0 && (<tr>
                                                    <td className="text-color" colSpan={6}>
                                                        <i className="fa-solid fa-circle-exclamation no-found-icon"></i>
                                                        <h1 className="no-found-text">No hay datos</h1>
                                                    </td>
                                                </tr>)}

                                                {!this.state.loading && this.state.dataFiltered.length > 0 && this.state.dataFiltered.map((item, index) => {
                                                    return (<tr key={index}>
                                                        <td className="text-color">{item.firstName || JSON.stringify(item)}</td>
                                                        <td className="text-color">{item.lastName}</td>
                                                        <td className="text-color">{''}</td>
                                                        <td className="text-color">{item.documentNumber}</td>
                                                        <td><span className={findStatusById(item.recordStatus).id === 1 ? "badge bg-success" : "badge bg-danger"}>{findStatusById(item.recordStatus).name}</span></td>
                                                        <td>
                                                            <a
                                                                href="#"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#inlineFormEditTeam"
                                                                onClick={(e) => this.dataSelectedAction(e, item)} >
                                                                <i className="fa-regular fa-pen-to-square primary-color" onClick={(e) => this.dataSelectedAction(e, item)}></i>
                                                            </a>
                                                        </td>
                                                    </tr>);
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <CreateComponent navigate={this.props.navigate} location={this.props.location} data={this.state.dataSelected} addNotification={this.props.addNotification}></CreateComponent>
                    <EditComponent navigate={this.props.navigate} location={this.props.location} data={this.state.dataSelected} addNotification={this.props.addNotification}></EditComponent>
                </section>
            </Template>

        );
    }
}
export default Page;