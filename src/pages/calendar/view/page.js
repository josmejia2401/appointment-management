import * as React from 'react';
import "./styles.css";
import Template from '../../../components/template';
import MonthView from '../view-month';
import DayView from '../view-day';


class Page extends React.Component {

    constructor(props) {
        super(props);
        this.state = this.defaultState();
        this.defaultState = this.defaultState.bind(this);
        this.propagateState = this.propagateState.bind(this);
        this.updateState = this.updateState.bind(this);

        this.showNav = this.showNav.bind(this);
        this.hideNav = this.hideNav.bind(this);
    }


    componentDidMount() {
    }


    defaultState() {
        return {
            loading: false,
            nav: {
                month: true,
                day: false
            },
        };
    }

    propagateState() { }

    updateState(payload) {
        this.setState({ ...payload }, () => this.propagateState());
    }


    showNav(key) {
        setTimeout(() => {
            Object.keys(this.state.nav).forEach(p => {
                this.state.nav[p] = false;
            });
            this.state.nav[key] = true;
            this.updateState({ nav: this.state.nav });
        }, 100);
    }

    hideNav() {
        Object.keys(this.state.nav).forEach(p => {
            this.state.nav[p] = false;
        });
        this.updateState({ nav: this.state.nav });
    }

    render() {
        return (
            <Template title={'Equipo'} navigate={this.props.navigate} location={this.props.location}>
                <div>
                    <ul className="nav nav-tabs">
                        <li className="nav-item">
                            <a className={`nav-link ${this.state.nav.month === true ? 'active' : ''}`} aria-current="page" href="#" onClick={() => this.showNav('month')}>Mes</a>
                        </li>
                        <li className="nav-item">
                            <a className={`nav-link ${this.state.nav.day === true ? 'active' : ''}`} href="#" onClick={() => this.showNav('day')}>Día</a>
                        </li>
                    </ul>

                    <div className="col-12">
                        <div className="tab-content">
                            {this.state.nav.month === true && <div className={`tab-pane fade show active`} role="tabpanel"
                                aria-labelledby="v-pills-home-tab" style={{ paddingTop: '15px', paddingBottom: '15px' }}>
                                <MonthView navigate={this.props.navigate} location={this.props.location}></MonthView>
                            </div>}
                            {this.state.nav.day === true && <div className={`tab-pane fade show active`} role="tabpanel"
                                aria-labelledby="v-pills-profile-tab" style={{ paddingTop: '15px', paddingBottom: '15px' }}>
                                <DayView navigate={this.props.navigate} location={this.props.location}></DayView>
                            </div>}
                        </div>
                    </div>
                </div>
            </Template>

        );
    }
}
export default Page;