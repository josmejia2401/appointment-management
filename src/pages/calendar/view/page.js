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
            eventsOut.push(<div key={index} className='event eventbegin eventend'>[{event.employee.name.split(" "[0])}] {event.name}</div>);
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
            days: [],
            daysOfWeek: [] //{day: 28, events: [{}]}
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

    splitToNChunks(array, n) {
        const result = array.reduce((resultArray, item, index) => {
            const chunkIndex = Math.floor(index / n);

            if (!resultArray[chunkIndex]) {
                resultArray[chunkIndex] = [] // start a new chunk
            }

            resultArray[chunkIndex].push(item);

            return resultArray;
        }, []);

        return result;
    }

    range(start, end) {
        return Array(end - start + 1).fill().map((_, idx) => start + idx);
    }

    async loadData() {

        const data = [
            {
                id: 1,
                day: '2024/08/01',
                name: 'Nombre del evento',
                description: 'Descripción del evento',
                customer: {
                    id: 1,
                    name: 'customer',
                    status: {
                        id: 1,
                        name: 'ACTIVO'
                    }
                },
                employee: {
                    id: 1,
                    name: 'employee',
                    status: {
                        id: 1,
                        name: 'ACTIVO'
                    }
                },
                service: {
                    id: 1,
                    name: 'employee',
                    duration: 15,
                    description: '',
                    status: {
                        id: 1,
                        name: 'ACTIVO'
                    }
                }
            },
            {
                id: 2,
                day: '2024/08/01',
                name: 'Nombre del evento',
                description: 'Descripción del evento',
                customer: {
                    id: 1,
                    name: 'customer',
                    status: {
                        id: 1,
                        name: 'ACTIVO'
                    }
                },
                employee: {
                    id: 1,
                    name: 'employee',
                    status: {
                        id: 1,
                        name: 'ACTIVO'
                    }
                },
                service: {
                    id: 1,
                    name: 'employee',
                    duration: 15,
                    description: '',
                    status: {
                        id: 1,
                        name: 'ACTIVO'
                    }
                }
            },
            {
                id: 3,
                day: '2024/08/01',
                name: 'Nombre del evento',
                description: 'Descripción del evento',
                customer: {
                    id: 1,
                    name: 'customer',
                    status: {
                        id: 1,
                        name: 'ACTIVO'
                    }
                },
                employee: {
                    id: 1,
                    name: 'employee',
                    status: {
                        id: 1,
                        name: 'ACTIVO'
                    }
                },
                service: {
                    id: 1,
                    name: 'employee',
                    duration: 15,
                    description: '',
                    status: {
                        id: 1,
                        name: 'ACTIVO'
                    }
                }
            },
            {
                id: 4,
                day: '2024/08/01',
                name: 'Nombre del evento',
                description: 'Descripción del evento',
                customer: {
                    id: 1,
                    name: 'customer',
                    status: {
                        id: 1,
                        name: 'ACTIVO'
                    }
                },
                employee: {
                    id: 1,
                    name: 'employee',
                    status: {
                        id: 1,
                        name: 'ACTIVO'
                    }
                },
                service: {
                    id: 1,
                    name: 'employee',
                    duration: 15,
                    description: '',
                    status: {
                        id: 1,
                        name: 'ACTIVO'
                    }
                }
            },
            {
                id: 4,
                day: '2024/08/01',
                name: 'Nombre del evento',
                description: 'Descripción del evento',
                customer: {
                    id: 1,
                    name: 'customer',
                    status: {
                        id: 1,
                        name: 'ACTIVO'
                    }
                },
                employee: {
                    id: 1,
                    name: 'employee',
                    status: {
                        id: 1,
                        name: 'ACTIVO'
                    }
                },
                service: {
                    id: 1,
                    name: 'employee',
                    duration: 15,
                    description: '',
                    status: {
                        id: 1,
                        name: 'ACTIVO'
                    }
                }
            }
        ];

        const date = new Date();
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

        const firstDayNumber = firstDay.getDate();
        const lastDayNumber = lastDay.getDate();

        this.state.days = this.range(firstDayNumber, lastDayNumber);

        this.state.days = this.state.days.map(day => ({
            day: day,
            events: []
        }));
        for (let i = 0; i < this.state.days.length; i++) {
            const dayEvent = this.state.days[i];
            const daysFounded = data.filter(p => new Date(p.day).getDate() === Number(dayEvent.day));
            this.state.days[i].events.push(...daysFounded);
        }


        this.state.daysOfWeek = this.splitToNChunks(this.state.days, 7);

        this.updateState({
            data: [
                {
                    id: 1,
                    day: '2024/01/01',
                    description: 'una descripcion del evento',
                    customer: {
                        id: 1,
                        name: 'customer',
                        status: {
                            id: 1,
                            name: 'ACTIVO'
                        }
                    },
                    employee: {
                        id: 1,
                        name: 'employee',
                        status: {
                            id: 1,
                            name: 'ACTIVO'
                        }
                    },
                    service: {
                        id: 1,
                        name: 'employee',
                        duration: 15,
                        description: '',
                        status: {
                            id: 1,
                            name: 'ACTIVO'
                        }
                    }
                }
            ],
            days: this.state.days,
            daysOfWeek: this.state.daysOfWeek,
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

    render() {
        return (
            <Template title={'Calendario'} navigate={this.props.navigate} location={this.props.location}>
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
                                        <p className='subtitle-color'>A continuación se muestran los <code className="highlighter-rouge">eventos</code> por mes.
                                        </p>
                                    </div>

                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead>
                                                <tr id="weekHeader">
                                                    <th className='headerDay'>Domingo</th>
                                                    <th className='headerDay'>Lunes</th>
                                                    <th className='headerDay'>Martes</th>
                                                    <th className='headerDay'>Miércoles</th>
                                                    <th className='headerDay'>Jueves</th>
                                                    <th className='headerDay'>Viernes</th>
                                                    <th className='headerDay'>Sábado</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.daysOfWeek.map((item, index) => {
                                                    return (<tr key={index}>
                                                        {item.map((day, iday) => <td className="custom-td" key={iday}>
                                                            <div class="day">
                                                                <div className='day-parent'>
                                                                    <div className='timetitle'>{day.day}</div>
                                                                    {EventItem(day.events)}
                                                                </div>
                                                            </div>
                                                        </td>)}
                                                    </tr>);
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </Template>

        );
    }
}
export default Page;