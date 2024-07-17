import * as React from 'react';
import "./styles.css";
import Template from '../../../components/template';
import CreateComponent from '../create';
import EditComponent from '../edit';
import { findDocumentTypeById, findStatusById } from '../../../lib/list_values';

class Page extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            isValidForm: false,
            data: [],
            dataSelected: undefined,
            isFocused: false,
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
                firstName: "fistName",
                lastName: "lastName",
                documentType: 1,
                documentNumber: '123',
                gender: 1,
                birthday: new Date().toDateString(),
                phoneNumber: '123456',
                email: 'aa@gmail.com',
                address: 'address',
                notes: 'nota',
                status: 1
            }]
        });
    }


    doLogInAction = async (e) => {
    }

    validateForm(key) { }

    async setChangeInputEvent(key, event) {
        const { data } = this.state;
        data[key].value = event.target.value;
        this.updateState({ data: data });
        this.validateForm(key);
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
            <Template title={'Clientes'} navigate={this.props.navigate}>
                <section className="section background-color-off-white">
                    <div className="row" id="table-hover-row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header">
                                    <h4 className="card-title title-color">Listado de clientes</h4>

                                    <button type="button" className="btn icon btn-primary-custom btn-create-customer" data-bs-toggle="modal"
                                        data-bs-target="#inlineFormCreateCustomer">
                                        <i className="fa-solid fa-plus"></i>
                                    </button>

                                </div>
                                <div className="card-content">
                                    <div className="card-body">
                                        <p className='subtitle-color'>A continuación se muestran los <code className="highlighter-rouge">clientes</code> disponibles.
                                        </p>
                                    </div>
                                    {this.state.data.length === 0 && (<div>
                                        <i className="fa-solid fa-circle-exclamation no-found-icon"></i>
                                        <h1 className="no-found-text">No hay datos</h1>
                                    </div>)}
                                    {this.state.data.length > 0 && (<div className="table-responsive">
                                        <table className="table table-hover mb-0">
                                            <thead>
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
                                                {this.state.data.map((item, index) => {
                                                    return (<tr key={index}>
                                                        <td className="text-color">{item.firstName}</td>
                                                        <td className="text-color">{item.lastName}</td>
                                                        <td className="text-color">{findDocumentTypeById(item.documentType).name}</td>
                                                        <td className="text-color">{item.documentNumber}</td>
                                                        <td><span className={findStatusById(item.status).id === 1 ? "badge bg-success" : "badge bg-danger"}>{findStatusById(item.status).name}</span></td>
                                                        <td>
                                                            <a
                                                                href="#"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#inlineFormEditCustomer"
                                                                onClick={(e) => this.dataSelectedAction(e, item)} >
                                                                <i className="fa-regular fa-pen-to-square primary-color" onClick={(e) => this.dataSelectedAction(e, item)}></i>
                                                            </a>
                                                        </td>
                                                    </tr>);
                                                })}
                                            </tbody>
                                        </table>
                                    </div>)}
                                </div>
                            </div>
                        </div>
                    </div>
                    <CreateComponent navigate={this.props.navigate}></CreateComponent>
                    <EditComponent navigate={this.props.navigate} data={this.state.dataSelected}></EditComponent>
                </section>
            </Template>

        );
    }
}
export default Page;