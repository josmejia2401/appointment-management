import * as React from 'react';
import "./styles.css";
import Template from '../../../components/template';
import CreateComponent from '../create';
import EditComponent from '../edit';
import { findStatusById } from '../../../lib/list_values';

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

        this.doLogInAction = this.doLogInAction.bind(this);
        this.dataSelectedAction = this.dataSelectedAction.bind(this);
    }


    componentDidMount() {
        this.loadData();
    }

    async loadData() {
        this.updateState({
            data: [{
                id: 1,
                name: "fistName",
                description: "lastName",
                status: 1,
                duration: 15
            }],
            dataFiltered: [{
                id: 1,
                name: "servicio 1",
                description: "servicio 1",
                status: 1,
                duration: 20
            }],
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
            <Template title={'Servicios'} navigate={this.props.navigate} location={this.props.location}>
                <section className="section background-color-off-white">
                    <div className="row" id="table-hover-row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header">
                                    <h4 className="card-title title-color">Listado de servicios</h4>

                                    <button type="button" className="btn icon btn-primary-custom btn-create-customer" data-bs-toggle="modal"
                                        data-bs-target="#inlineFormCreateService">
                                        <i className="fa-solid fa-plus"></i>
                                    </button>

                                </div>
                                <div className="card-content">
                                    <div className="card-body">
                                        <p className='subtitle-color'>A continuación se muestran los <code className="highlighter-rouge">servicios</code> disponibles.
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
                                                    <th>Nombre</th>
                                                    <th>Descripción</th>
                                                    <th>Duración (min)</th>
                                                    <th>Estado</th>
                                                    <th>Acción</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.dataFiltered.length === 0 && (<tr>
                                                    <td className="text-color" colSpan={6}>
                                                        <i className="fa-solid fa-circle-exclamation no-found-icon"></i>
                                                        <h1 className="no-found-text">No hay datos</h1>
                                                    </td>
                                                </tr>)}

                                                {this.state.dataFiltered.length > 0 && this.state.dataFiltered.map((item, index) => {
                                                    return (<tr key={index}>
                                                        <td className="text-color">{item.name}</td>
                                                        <td className="text-color">{item.description}</td>
                                                        <td className="text-color">{item.duration}</td>
                                                        <td><span className={findStatusById(item.status).id === 1 ? "badge bg-success" : "badge bg-danger"}>{findStatusById(item.status).name}</span></td>
                                                        <td>
                                                            <a
                                                                href="#"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#inlineFormEditService"
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
                    <CreateComponent navigate={this.props.navigate} location={this.props.location}></CreateComponent>
                    <EditComponent navigate={this.props.navigate} location={this.props.location} data={this.state.dataSelected}></EditComponent>
                </section>
            </Template>

        );
    }
}
export default Page;