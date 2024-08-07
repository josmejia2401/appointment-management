import * as React from 'react';
import "./styles.css";
import Template from '../../../components/template';
import InvitationView from '../invitation/view';
import EmployeesView from '../employees/view';


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
                employees: true,
                invitations: false
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
            <Template title={'Clientes'} navigate={this.props.navigate} location={this.props.location}>
                <div>
                    <ul className="nav nav-tabs">
                        <li className="nav-item">
                            <a className={`nav-link ${this.state.nav.employees === true ? 'active' : ''}`} aria-current="page" href="#" onClick={() => this.showNav('employees')}>Empleados</a>
                        </li>
                        <li className="nav-item">
                            <a className={`nav-link ${this.state.nav.invitations === true ? 'active' : ''}`} href="#" onClick={() => this.showNav('invitations')}>Invitados</a>
                        </li>
                    </ul>

                    <div className="col-12">
                        <div className="tab-content">
                            <div className={`tab-pane fade ${this.state.nav.employees === true ? 'show active' : ''}`} role="tabpanel"
                                aria-labelledby="v-pills-home-tab" style={{ paddingTop: '15px', paddingBottom: '15px' }}>
                                <EmployeesView navigate={this.props.navigate} location={this.props.location}></EmployeesView>
                            </div>
                            <div className={`tab-pane fade ${this.state.nav.invitations === true ? 'show active' : ''}`} role="tabpanel"
                                aria-labelledby="v-pills-profile-tab" style={{ paddingTop: '15px', paddingBottom: '15px' }}>
                                <InvitationView navigate={this.props.navigate} location={this.props.location}></InvitationView>
                            </div>
                        </div>
                    </div>
                </div>
            </Template>

        );
    }
}
export default Page;