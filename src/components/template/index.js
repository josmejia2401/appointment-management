import * as React from 'react';
import "./styles.css";

class Page extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            selectedId: null,
            isShowSettings: false,
            isShowSettings2: false,
            data: [
                {
                    id: "1",
                    name: "Tablero",
                    icon: "fa-house",
                    path: "/dashboard/view",
                    href: "",
                    children: null
                },
                {
                    id: "2",
                    name: "Calendario",
                    icon: "fa-calendar",
                    path: "/calendar/view",
                    href: "",
                    children: null
                },
                {
                    id: "3",
                    name: "Clientes",
                    icon: "fa-people-group",
                    path: "/customers/view",
                    href: "",
                    children: null
                },
                {
                    id: "4",
                    name: "Equipo",
                    icon: "fa-user-plus",
                    path: "/team/view",
                    href: "",
                    children: null
                },
                {
                    id: "5",
                    name: "Servicios",
                    icon: "fa-microchip",
                    path: "/services/view",
                    href: "",
                    children: null
                },
                {
                    id: "6",
                    name: "Reportes",
                    icon: "fa-chart-line",
                    path: "/reports/view",
                    href: "6.1",
                    children: [
                        {
                            id: "6.1",
                            name: "Reporte 1",
                            icon: "fa-chart-line",
                            path: "/reports/view2",
                            href: "6.1"
                        }
                    ]
                },
                {
                    id: "7",
                    name: "Perfil",
                    icon: "fa-chart-line",
                    path: "/profile/edit",
                    href: "",
                    children: null
                }
            ]
        };

        this.onSelectOption = this.onSelectOption.bind(this);
        this.loadData = this.loadData.bind(this);
        this.showSettings = this.showSettings.bind(this);
        this.showSettings2 = this.showSettings2.bind(this);
        this.handleDropdownClick = this.handleDropdownClick.bind(this);
    }

    componentDidMount() {
        this.loadData();
        window.addEventListener("click", (event) => this.handleDropdownClick(event));
    }

    componentWillUnmount() {
        window.removeEventListener("click", this.handleDropdownClick);
    }

    async loadData() {
        let loc = this.state.data.filter(p => p.path === this.props.location.pathname)[0];
        if (!loc) {
            loc = this.state.data.filter(p => p.children && p.children.length > 0).filter(p => p.path === this.props.location.pathname)[0];
        }
        this.setState({ selectedId: loc.id });


    }

    async handleDropdownClick(event) {
        let id = event.currentTarget.id || event.target.id || event.srcElement.id || "";
        if (!id) {
            id = event.target.parentNode.id;
        }
        if (!["dropdownSetting2", "dropdownSetting"].includes(id)) {
            this.setState({
                isShowSettings: false,
                isShowSettings2: false,
            });
        }
    }

    async onSelectOption(e, value) {
        e.preventDefault();
        e.stopPropagation();
        this.setState({ selectedId: value });
        let loc = this.state.data.filter(p => p.id === value)[0];
        if (!loc) {
            loc = this.state.data.filter(p => p.children && p.children.length > 0).filter(p => p.id === value)[0];
        } else if (loc.children && loc.children.length > 0) {
            return;
        }
        this.props.navigate(loc.path);
    }

    showSettings() {
        this.setState({
            isShowSettings: !this.state.isShowSettings
        });
    }

    showSettings2() {
        this.setState({
            isShowSettings2: !this.state.isShowSettings2
        });
    }

    render() {
        return (
            <div className="container-fluid" style={{
                maxHeight: "100vh"
            }}>
                <div className="row flex-nowrap">
                    <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 sidebar-left">
                        <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-5 text-white min-vh-100">
                            <a href="/" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                                <span className="fs-5 d-none d-sm-inline title-color">Menú</span>
                            </a>

                            <hr className="divider"></hr>

                            <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start w-100" id="menu">
                                {this.state.data.map((item, index) => {
                                    return (<li className='sidebar-li w-100' key={item.id}>
                                        <a href={`#${item.href}`}
                                            data-bs-toggle="collapse"
                                            className={`nav-link px-0 align-middle ${this.state.selectedId === item.id ? 'li-active' : ''}`}
                                            onClick={(e) => this.onSelectOption(e, item.id)}>
                                            <i className={`fa-solid ${item.icon} i-icon ${this.state.selectedId === item.id ? 'sidebar-icon-color-active' : 'sidebar-icon-color'}`} style={{ marginLeft: '5px' }}></i>
                                            <span className={`d-none d-sm-inline  ${this.state.selectedId === item.id ? 'sidebar-color-title-active' : 'sidebar-color-title'}`}>{item.name}</span>
                                            {item.children && item.children.length > 0 && <i className={`fa-solid fa-angle-down ${this.state.selectedId === item.id ? 'sidebar-icon-color-active' : 'fa-solid fa-angle-down sidebar-icon-color'}`} style={{ marginLeft: '5px' }}></i>}
                                        </a>

                                        <ul className="collapse nav flex-column ms-3" data-bs-parent="#menu" id={item.href}>
                                            {item.children && item.children.map((item2, index2) => {
                                                return (
                                                    <li className="sidebar-li w-100" key={item2.id}>

                                                        <a href="#" className={`nav-link px-0 align-middle ${this.state.selectedId === item2.id ? 'li-active' : ''}`}
                                                            onClick={(e) => this.onSelectOption(e, item2.id)}>
                                                            <i
                                                                className={`fa-solid ${item.icon} i-icon  ${this.state.selectedId === item2.id ? 'sidebar-icon-color-active' : 'sidebar-icon-color'}`}
                                                            ></i>
                                                            <span
                                                                className={`d-none d-sm-inline  ${this.state.selectedId === item2.id ? 'sidebar-color-title-active' : 'sidebar-color-title'}`}>{item2.name}</span></a>

                                                    </li>
                                                )
                                            })}
                                        </ul>
                                    </li>);
                                })}

                            </ul>
                            <hr />
                            <div className="pb-4 dropup">
                                <a href="#"
                                    className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                    onClick={this.showSettings}
                                    id="dropdownSetting">
                                    <img
                                        src="https://github.com/mdo.png"
                                        alt="hugenerd"
                                        width="30"
                                        height="30"
                                        className="rounded-circle"
                                        onClick={this.showSettings} />
                                    <span className="d-none d-sm-inline mx-1">loser</span>
                                </a>
                                <ul className={`dropdown-menu text-small shadow ${this.state.isShowSettings === true ? "show show-dropdown" : ""}`}>
                                    <li><a className="dropdown-item" href="#">New project...</a></li>
                                    <li><a className="dropdown-item" href="#">Settings</a></li>
                                    <li><a className="dropdown-item" href="#">Profile</a></li>
                                    <li>
                                        <hr className="dropdown-divider" />
                                    </li>
                                    <li><a className="dropdown-item" href="#">Sign out</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col py-1 background-color-off-blue panel-view">
                        <div className="page-heading">
                            <header className="py-3 mb-3 border-bottom">
                                <div className="container-fluid d-grid gap-3 align-items-center" >
                                    <div className="d-flex align-items-center">
                                        <form className="w-100 me-3">
                                            <h4 className="card-title">{this.props.title}</h4>
                                        </form>
                                        <div className="flex-shrink-0 dropstart">
                                            <a href="#"
                                                className="d-block link-dark text-decoration-none dropdown-toggle"
                                                data-bs-toggle="dropdown"
                                                aria-expanded="false"
                                                onClick={this.showSettings2}
                                                id="dropdownSetting2">
                                                <img
                                                    src="https://github.com/mdo.png"
                                                    alt="mdo"
                                                    width="32"
                                                    height="32"
                                                    className="rounded-circle me-2"
                                                    onClick={this.showSettings2} />
                                                <strong>mdo</strong>
                                            </a>
                                            <ul className={`dropdown-menu text-small shadow ${this.state.isShowSettings2 === true ? "show show-dropdown-start" : ""}`} >
                                                <li><a className="dropdown-item" href="#">New project...</a></li>
                                                <li><a className="dropdown-item" href="#">Settings</a></li>
                                                <li><a className="dropdown-item" href="#">Profile</a></li>
                                                <li><hr className="dropdown-divider" /></li>
                                                <li><a className="dropdown-item" href="#">Sign out</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </header>
                        </div>
                        {React.Children.only(this.props.children)}
                    </div>
                </div>
            </div>
        );
    }
}
export default Page;