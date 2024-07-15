import * as React from 'react';
import "./styles.css";

class Page extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        };
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row flex-nowrap">
                    <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 background-color-off-white">
                        <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                            <a href="/" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                                <span className="fs-5 d-none d-sm-inline">Menu</span>
                            </a>
                            <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                                <li>
                                    <a href="#" className="nav-link px-0 align-middle">
                                        <i className="fa-solid fa-house i-icon color-primary"></i>
                                        <span className="ms-1 d-none d-sm-inline color-primary">Tablero</span></a>
                                </li>
                                <li>
                                    <a href="#" className="nav-link px-0 align-middle">
                                        <i className="fa-solid fa-calendar i-icon color-primary"></i>
                                        <span className="ms-1 d-none d-sm-inline color-primary">Calendario</span></a>
                                </li>
                                <li>
                                    <a href="#" className="nav-link px-0 align-middle">
                                        <i className="fa-solid fa-people-group i-icon color-primary"></i>
                                        <span className="ms-1 d-none d-sm-inline color-primary">Clientes</span></a>
                                </li>
                                <li>
                                    <a href="#" className="nav-link px-0 align-middle">
                                        <i className="fa-solid fa-user-plus i-icon color-primary"></i>
                                        <span className="ms-1 d-none d-sm-inline color-primary">Equipo</span></a>
                                </li>

                                <li>
                                    <a href="#submenu2" data-bs-toggle="collapse" className="nav-link px-0 align-middle ">
                                        <i className="fa-solid fa-chart-line i-icon color-primary"></i>

                                        <span className="ms-1 d-none d-sm-inline color-primary">Reportes</span></a>
                                    <ul className="collapse nav flex-column ms-1" id="submenu2" data-bs-parent="#menu">
                                        <li className="w-100">
                                            <a href="#" className="nav-link px-0  color-primary"> <span className="d-none d-sm-inline color-primary">Reporte </span> general</a>
                                        </li>
                                        <li>
                                            <a href="#" className="nav-link px-0  color-primary"> <span className="d-none d-sm-inline  color-primary">Reporte </span> día</a>
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