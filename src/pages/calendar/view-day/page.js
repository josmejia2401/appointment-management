import * as React from 'react';
import "./styles.css";
import Template from '../../../components/template';


function EventItem(events) {
    const eventsOut = [];
    let index = 0;
    if (events && events.length > 0) {
        for (const event of events) {
            if (index == 3) {
                // go to day detail
                eventsOut.push(<div key={index} className='event eventbegin eventend'>{'Ver más...'}</div>);
                break;
            }
            eventsOut.push(<div key={index} className='event eventbegin eventend'>{event.time} [{event.employee.name.split(" "[0])}] {event.name}</div>);
            index++;
        }
    }
    return eventsOut;
}

class Page extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            isValidForm: false,
            data: [],
            dataSelected: undefined,
        };

        this.loadData = this.loadData.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.setChangeInputEvent = this.setChangeInputEvent.bind(this);
        this.propagateState = this.propagateState.bind(this);
        this.updateState = this.updateState.bind(this);

        this.doLogInAction = this.doLogInAction.bind(this);
        this.dataSelectedAction = this.dataSelectedAction.bind(this);

        this.addMinutes = this.addMinutes.bind(this);
        this.getDayFromDate = this.getDayFromDate.bind(this);
    }


    componentDidMount() {
        this.loadData();
    }

    async loadData() {

        const data = [
            {
                id: 1,
                date: "2024-09-04",
                time: "06:03",
                name: 'Nombre del evento',
                description: 'Descripción del evento',
                status: 1,
                room: "sala 1",
                customer: {
                    id: 1,
                    name: 'customer',
                    status: 1
                },
                employee: {
                    id: 1,
                    name: 'employee',
                    status: 1
                },
                service: {
                    id: 1,
                    name: 'employee',
                    duration: 15,
                    description: '',
                    status: 1
                }
            },
            {
                id: 2,
                date: "2024-09-04",
                time: "06:55",
                name: 'Nombre del evento',
                description: 'Descripción del evento',
                status: 1,
                room: "sala 1",
                customer: {
                    id: 1,
                    name: 'customer',
                    status: 1
                },
                employee: {
                    id: 1,
                    name: 'employee',
                    status: 1
                },
                service: {
                    id: 1,
                    name: 'employee',
                    duration: 15,
                    description: '',
                    status: 1
                }
            },
            {
                id: 3,
                date: "2024-09-09",
                time: "06:50",
                name: 'Nombre del evento',
                description: 'Descripción del evento',
                status: 1,
                room: "sala 1",
                customer: {
                    id: 1,
                    name: 'customer',
                    status: 1
                },
                employee: {
                    id: 1,
                    name: 'employee',
                    status: 1
                },
                service: {
                    id: 1,
                    name: 'employee',
                    duration: 15,
                    description: '',
                    status: 1
                }
            },
            {
                id: 4,
                date: "2024-09-01",
                time: "06:40",
                name: 'Nombre del evento',
                description: 'Descripción del evento',
                status: 1,
                room: "sala 1",
                customer: {
                    id: 1,
                    name: 'customer',
                    status: 1
                },
                employee: {
                    id: 1,
                    name: 'employee',
                    status: 1
                },
                service: {
                    id: 1,
                    name: 'employee',
                    duration: 15,
                    description: '',
                    status: 1
                }
            },
            {
                id: 4,
                date: "2024-09-05",
                time: "06:01",
                name: 'Nombre del evento',
                description: 'Descripción del evento',
                status: 1,
                room: "sala 1",
                customer: {
                    id: 1,
                    name: 'customer',
                    status: 1
                },
                employee: {
                    id: 1,
                    name: 'employee',
                    status: 1
                },
                service: {
                    id: 1,
                    name: 'employee',
                    duration: 15,
                    description: '',
                    status: 1
                }
            }
        ];
        this.state.data = data;

        this.state.data.sort((a, b) => (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0))
        //this.state.data.sort((a, b) => (a.time > b.time) ? 1 : ((b.time > a.time) ? -1 : 0))

        this.updateState({
            data: this.state.data,
        });
    }


    doLogInAction = async (e) => { }
    validateForm(key) { }
    async setChangeInputEvent(key, event) { }
    propagateState() { }

    updateState(payload) {
        this.setState({ ...payload }, () => this.propagateState());
    }

    async dataSelectedAction(e, item) {
        this.updateState({ dataSelected: item });
    }

    addMinutes(time, minsToAdd) {
        function D(J) { return (J < 10 ? '0' : '') + J; };
        var piece = time.split(':');
        var mins = piece[0] * 60 + +piece[1] + +minsToAdd;

        return D(mins % (24 * 60) / 60 | 0) + ':' + D(mins % 60);
    }

    getDayFromDate(dateString) {
        const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
        const d = new Date(dateString);
        return days[d.getDay()];
    }

    render() {
        return (
            <section className="section background-color-off-white">
                <div className="row" id="table-hover-row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title title-color">Eventos asociados</h4>

                                <button type="button" className="btn icon btn-primary-custom btn-create-customer" data-bs-toggle="modal"
                                    data-bs-target="#inlineFormCreateTeam">
                                    <i className="fa-solid fa-plus"></i>
                                </button>

                            </div>
                            <div className="card-content">
                                <div className="card-body">
                                    <p className='subtitle-color'>A continuación se muestran los <code className="highlighter-rouge">eventos</code> por día.
                                    </p>
                                </div>

                                <div className="container">
                                    {this.state.data.map((item, index) => {
                                        return (<div className="row row-striped">
                                            <div className="col-12 col-md-2 text-right">
                                                <h1 className="display-4">
                                                    <span className="badge bg-secondary">{new Date(item.date).getDate()}</span>
                                                </h1>
                                                <h2>OCT</h2>
                                            </div>
                                            <div className="col-12 col-md-10">
                                                <h3 className="text-uppercase"><strong>{item.name}</strong></h3>
                                                <ul className="list-inline">
                                                    <li className="list-inline-item">
                                                        <i className="fa fa-calendar-o" aria-hidden="true"></i> {this.getDayFromDate(item.date)}
                                                    </li>
                                                    <li className="list-inline-item">
                                                        <i className="fa fa-clock-o" aria-hidden="true"></i> {item.time} - {this.addMinutes(item.time, item.service.duration)}
                                                    </li>
                                                    <li className="list-inline-item">
                                                        <i className="fa fa-location-arrow" aria-hidden="true"></i> {item.room}
                                                    </li>
                                                </ul>
                                                <p>{item.description}</p>
                                            </div>
                                        </div>);
                                    })}
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