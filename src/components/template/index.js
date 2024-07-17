import * as React from 'react';
import "./styles.css";

class Page extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            selected: null
        };

        this.onSelectOption = this.onSelectOption.bind(this);
    }

    async onSelectOption(e, value) {
        e.preventDefault();
        e.stopPropagation();
        this.setState({ selected: value })
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row flex-nowrap">
                    <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 sidebar-left">
                        <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-5 text-white min-vh-100">
                            <a href="/" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                                <span className="fs-5 d-none d-sm-inline title-color">Menu</span>
                            </a>

                            <hr className="divider"></hr>

                            <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start w-100" id="menu">
                                <li className='sidebar-li w-100'>
                                    <a href="#" className={`nav-link px-0 align-middle ${this.state.selected === 'Tablero' ? 'li-active' : ''}`}
                                        onClick={(e) => this.onSelectOption(e, 'Tablero')}>
                                        <i
                                            className={`fa-solid fa-house i-icon  ${this.state.selected === 'Tablero' ? 'sidebar-icon-color-active' : 'sidebar-icon-color'}`}
                                        ></i>
                                        <span
                                            className={`d-none d-sm-inline  ${this.state.selected === 'Tablero' ? 'sidebar-color-title-active' : 'sidebar-color-title'}`}>Tablero</span></a>
                                </li>
                                <li className='sidebar-li w-100'>

                                    <a href="#" className={`nav-link px-0 align-middle ${this.state.selected === 'Calendario' ? 'li-active' : ''}`}
                                        onClick={(e) => this.onSelectOption(e, 'Calendario')}>
                                        <i
                                            className={`fa-solid fa-calendar i-icon  ${this.state.selected === 'Calendario' ? 'sidebar-icon-color-active' : 'sidebar-icon-color'}`}
                                        ></i>
                                        <span
                                            className={`d-none d-sm-inline  ${this.state.selected === 'Calendario' ? 'sidebar-color-title-active' : 'sidebar-color-title'}`}>Calendario</span></a>
                                </li>

                                <li className='sidebar-li w-100'>

                                    <a href="#" className={`nav-link px-0 align-middle ${this.state.selected === 'Clientes' ? 'li-active' : ''}`}
                                        onClick={(e) => this.onSelectOption(e, 'Clientes')}>
                                        <i
                                            className={`fa-solid fa-people-group i-icon  ${this.state.selected === 'Clientes' ? 'sidebar-icon-color-active' : 'sidebar-icon-color'}`}
                                        ></i>
                                        <span
                                            className={`d-none d-sm-inline  ${this.state.selected === 'Clientes' ? 'sidebar-color-title-active' : 'sidebar-color-title'}`}>Clientes</span></a>
                                </li>

                                <li className='sidebar-li w-100'>

                                    <a href="#" className={`nav-link px-0 align-middle ${this.state.selected === 'Equipo' ? 'li-active' : ''}`}
                                        onClick={(e) => this.onSelectOption(e, 'Equipo')}>
                                        <i
                                            className={`fa-solid fa-user-plus  i-icon  ${this.state.selected === 'Equipo' ? 'sidebar-icon-color-active' : 'sidebar-icon-color'}`}
                                        ></i>
                                        <span
                                            className={`d-none d-sm-inline  ${this.state.selected === 'Equipo' ? 'sidebar-color-title-active' : 'sidebar-color-title'}`}>Equipo</span></a>
                                </li>

                                <li className='sidebar-li w-100'>
                                    <a href="#submenu2" data-bs-toggle="collapse" className="nav-link px-0 align-middle ">
                                        <i className="fa-solid fa-chart-line i-icon sidebar-icon-color"></i>
                                        <span className="d-none d-sm-inline sidebar-color-title">Reportes</span>
                                        <i className="fa-solid fa-angle-down sidebar-icon-color" style={{ marginLeft: '5px' }}></i>
                                    </a>


                                    <ul className="collapse nav flex-column ms-3" id="submenu2" data-bs-parent="#menu">
                                        <li className="w-100 sidebar-li w-100">

                                            <a href="#" className={`nav-link px-0 align-middle ${this.state.selected === 'Reporte 1' ? 'li-active' : ''}`}
                                                onClick={(e) => this.onSelectOption(e, 'Reporte 1')}>
                                                <i
                                                    className={`fa-solid fa-user-plus  i-icon  ${this.state.selected === 'Reporte 1' ? 'sidebar-icon-color-active' : 'sidebar-icon-color'}`}
                                                ></i>
                                                <span
                                                    className={`d-none d-sm-inline  ${this.state.selected === 'Reporte 1' ? 'sidebar-color-title-active' : 'sidebar-color-title'}`}>Reporte 1</span></a>

                                        </li>
                                    </ul>
                                </li>
                            </ul>
                            <hr />
                            <div className="dropdown pb-4">
                                <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                                    <img src="https://github.com/mdo.png" alt="hugenerd" width="30" height="30" className="rounded-circle" />
                                    <span className="d-none d-sm-inline mx-1">loser</span>
                                </a>
                                <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
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
                    <div className="col py-1 background-color-off-blue">
                        <div className="page-heading">
                            <header className="py-3 mb-3 border-bottom">
                                <div className="container-fluid d-grid gap-3 align-items-center" >
                                    <div className="d-flex align-items-center">
                                        <form className="w-100 me-3">
                                            <h4 className="card-title">{this.props.title}</h4>
                                        </form>
                                        <div className="flex-shrink-0 dropdown">
                                            <a href="#" className="d-block link-dark text-decoration-none dropdown-toggle" id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
                                                <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" className="rounded-circle me-2" />
                                                <strong>mdo</strong>
                                            </a>
                                            <ul className="dropdown-menu text-small shadow" aria-labelledby="dropdownUser2">
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