import * as React from 'react';
import "./styles.css";
import Template from '../../../components/template';
import CreateComponent from '../create';
import EditComponent from '../edit';
import RemoveComponent from '../remove';
import { buildAndGetClassStatus, findDocumentTypeById, findStatusById } from '../../../lib/list_values';
import ButtonIcon from '../../../components/button-icon';
import { filter } from '../../../api/customers.services';
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
        this.loadMoreData = this.loadMoreData.bind(this);
        this.afterClosedDialog = this.afterClosedDialog.bind(this);
        this.showDialog = this.showDialog.bind(this);
        this.hideDialog = this.hideDialog.bind(this);
        this.sortTableByColumn = this.sortTableByColumn.bind(this);


        this.checkViewDeleteAction = this.checkViewDeleteAction.bind(this);
        this.checkViewEditAction = this.checkViewEditAction.bind(this);
    }


    componentDidMount() {
        this.loadData();
    }

    componentWillUnmount() {
        this.resetData();
    }

    defaultState() {
        return {
            loading: false,
            isValidForm: false,
            thereIsMoreData: false,
            data: [],
            dataFiltered: [],
            dataSelected: undefined,
            isFocused: false,
            inputSearch: '',
            dialog: {
                create: false,
                edit: false,
                remove: false
            }
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
        filter(null).then(result => {
            result.results.sort((a, b) => (a.recordStatus > b.recordStatus) ? 1 : ((b.recordStatus > a.recordStatus) ? -1 : 0));
            let thereIsMoreData = false;
            if (!Utils.isEmpty(result.lastEvaluatedKey)) {
                thereIsMoreData = true;
            }
            this.updateState({
                data: result.results,
                dataFiltered: result.results.map(clone => ({ ...clone })),
                loading: false,
                thereIsMoreData: thereIsMoreData,
                lastEvaluatedKey: result.lastEvaluatedKey
            });
        }).catch(err => {
            console.log(err.fileName, err);
            this.updateState({ loading: false });
            this.props.addNotification({ typeToast: 'error', text: err.message, title: err.error });
        });
    }

    loadMoreData(e) {
        e?.preventDefault();
        e?.stopPropagation();
        this.updateState({ loading: true });
        filter(this.state.lastEvaluatedKey).then(result => {
            let thereIsMoreData = false;
            if (!Utils.isEmpty(result.lastEvaluatedKey)) {
                thereIsMoreData = true;
            }
            this.state.data.push(...result.results);
            this.state.dataFiltered.push(...result.results);
            this.state.dataFiltered.sort((a, b) => (a.recordStatus > b.recordStatus) ? 1 : ((b.recordStatus > a.recordStatus) ? -1 : 0));
            this.updateState({
                data: this.state.data,
                dataFiltered: this.state.dataFiltered,
                loading: false,
                thereIsMoreData: thereIsMoreData,
                lastEvaluatedKey: result.lastEvaluatedKey
            });
        }).catch(err => {
            console.log(err.fileName, err);
            this.updateState({ loading: false });
            this.props.addNotification({ typeToast: 'error', text: err.message, title: err.error });
        });
    }

    showDialog(key, item = null) {
        this.updateState({ dataSelected: item });
        setTimeout(() => {
            Object.keys(this.state.dialog).forEach(p => {
                this.state.dialog[p] = false;
            });
            this.state.dialog[key] = true;
            this.updateState({ dialog: this.state.dialog });
        }, 100);
    }

    hideDialog() {
        Object.keys(this.state.dialog).forEach(p => {
            this.state.dialog[p] = false;
        });
        this.updateState({ dialog: this.state.dialog });
    }

    validateForm(key) { }

    setChangeInputEvent(key, event) {
        this.state.inputSearch = event.target.value;
        if (this.state.inputSearch) {
            this.state.dataFiltered = this.state.data.filter(p => {
                const str = JSON.stringify(p).toLowerCase();
                if (str.includes(this.state.inputSearch.toLowerCase())) {
                    return true;
                }
                return false;
            });
        } else {
            this.state.dataFiltered = this.state.data.map(clone => ({ ...clone }));
        }
        this.updateState({ inputSearch: this.state.inputSearch, dataFiltered: this.state.dataFiltered });
    }



    propagateState() { }

    updateState(payload) {
        this.setState({ ...payload }, () => this.propagateState());
    }

    afterClosedDialog(reloadData = false) {
        if (reloadData === true) {
            this.loadData();
        }
    }

    checkViewDeleteAction(recordStatus) {
        const key = findStatusById(recordStatus).id;
        return [1, 2, 3].includes(key);
    }

    checkViewEditAction(recordStatus) {
        const key = findStatusById(recordStatus).id;
        return [1, 2].includes(key);
    }

    sortTableByColumn(columnName) {
        switch (columnName) {
            case 'firstName':
                this.state.dataFiltered.sort((a, b) => {
                    if (this.state.filterType === true) {
                        return (a.firstName > b.firstName) ? 1 : ((b.firstName > a.firstName) ? -1 : 0);
                    } else {
                        return (a.firstName < b.firstName) ? 1 : ((b.firstName < a.firstName) ? -1 : 0)
                    }
                });
                break;
            case 'recordStatus':
                this.state.dataFiltered.sort((a, b) => {
                    if (this.state.filterType === true) {
                        return (a.recordStatus > b.recordStatus) ? 1 : ((b.recordStatus > a.recordStatus) ? -1 : 0);
                    } else {
                        return (a.recordStatus < b.recordStatus) ? 1 : ((b.recordStatus < a.recordStatus) ? -1 : 0)
                    }
                });
                break;
            default:
                break;
        }
        this.updateState({
            dataFiltered: this.state.dataFiltered,
            filterType: !this.state.filterType
        });
    }

    render() {
        return (
            <Template title={'Clientes'} navigate={this.props.navigate} location={this.props.location}>
                <section className="section background-color-off-white">
                    <div className="row" id="table-hover-row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header">
                                    <h4 className="card-title title-color">Listado de clientes</h4>

                                    <div className='btn-create-customer'>
                                        <ButtonIcon type="button"
                                            className="btn icon btn-primary-custom btn-create-customer"
                                            onClick={() => this.loadData()}>
                                            <i className="fa-solid fa-rotate-right"></i>
                                        </ButtonIcon>

                                        <ButtonIcon type="button"
                                            className="btn icon btn-primary-custom btn-create-customer"
                                            style={{ marginLeft: '5px' }}
                                            onClick={() => this.showDialog('create')}>
                                            <i className="fa-solid fa-plus"></i>
                                        </ButtonIcon>

                                    </div>

                                </div>
                                <div className="card-content">
                                    <div className="card-body">
                                        <p className='subtitle-color'>A continuación se muestran los <code className="highlighter-rouge">clientes</code> disponibles.
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
                                                    <th><b>Nombres</b> <i className="fa fa-fw fa-sort" onClick={() => this.sortTableByColumn('firstName')}></i></th>
                                                    <th>Apellidos</th>
                                                    <th>Tipo documento</th>
                                                    <th>Número de documento</th>
                                                    <th><b>Estado</b> <i className="fa fa-fw fa-sort" onClick={() => this.sortTableByColumn('recordStatus')}></i></th>
                                                    <th>Acción</th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                {this.state.loading && (<tr>
                                                    <td className="text-color" colSpan={6}>
                                                        <div className="skeleton-panel">
                                                            <div className="skeleton-line" />
                                                            <div className="skeleton-line" />
                                                            <div className="skeleton-line" />
                                                        </div>
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
                                                        <td className="text-color">{item.firstName}</td>
                                                        <td className="text-color">{item.lastName}</td>
                                                        <td className="text-color">{findDocumentTypeById(item?.documentType).name}</td>
                                                        <td className="text-color">{item.documentNumber}</td>
                                                        <td><span className={buildAndGetClassStatus(item?.recordStatus)}>{findStatusById(item?.recordStatus).name}</span></td>
                                                        <td>
                                                            {this.checkViewEditAction(item.recordStatus) && (<a href="#">
                                                                <i className="fa-regular fa-pen-to-square primary-color" onClick={() => this.showDialog('edit', item)}></i>
                                                            </a>)}

                                                            {this.checkViewDeleteAction(item?.recordStatus) && (<a href="#" style={{ marginLeft: '15px' }}>
                                                                <i className="fa-solid fa-trash primary-color" onClick={() => this.showDialog('remove', item)}></i>
                                                            </a>)}
                                                        </td>
                                                    </tr>);
                                                })}
                                            </tbody>

                                            {!this.state.loading && this.state.thereIsMoreData && <tfoot>
                                                <tr>
                                                    <td colSpan="6">
                                                        <a
                                                            href="#"
                                                            className='center-text'
                                                            onClick={(e) => this.loadMoreData(e)} >Cargar más
                                                        </a>
                                                    </td>
                                                </tr>
                                            </tfoot>}

                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {this.state.dialog.create === true && <CreateComponent
                        navigate={this.props.navigate}
                        location={this.props.location}
                        data={this.state.dataSelected}
                        addNotification={this.props.addNotification}
                        afterClosedDialog={this.afterClosedDialog}
                        hideDialog={this.hideDialog}></CreateComponent>}
                    {this.state.dialog.edit === true && <EditComponent
                        navigate={this.props.navigate}
                        location={this.props.location}
                        data={this.state.dataSelected}
                        addNotification={this.props.addNotification}
                        afterClosedDialog={this.afterClosedDialog}
                        hideDialog={this.hideDialog}></EditComponent>}
                    {this.state.dialog.remove === true && <RemoveComponent
                        $navigate={this.props.navigate}
                        $location={this.props.location}
                        data={this.state.dataSelected}
                        addNotification={this.props.addNotification}
                        afterClosedDialog={this.afterClosedDialog}
                        hideDialog={this.hideDialog}></RemoveComponent>}
                </section>
            </Template>

        );
    }
}
export default Page;