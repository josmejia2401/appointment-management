import * as React from 'react';
import "./styles.css";
import Template from '../../../components/template';
import CreateComponent from '../create';

class Page extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        };
    }

    render() {
        return (
            <Template title={'Clientes'}>
                <section className="section background-color-off-white">
                    <div className="row" id="table-hover-row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header">
                                    <h4 className="card-title">Listado de clientes</h4>

                                    <button type="button" className="btn icon btn-primary-custom btn-create-customer" data-bs-toggle="modal"
                                        data-bs-target="#inlineFormCreateCustomer">
                                        <i className="fa-solid fa-plus"></i>
                                    </button>

                                </div>
                                <div className="card-content">
                                    <div className="card-body">
                                        <p>A continuación se muestran los <code className="highlighter-rouge">clientes</code> disponibles.
                                        </p>
                                    </div>
                                    <div className="table-responsive">
                                        <table className="table table-hover mb-0">
                                            <thead>
                                                <tr>
                                                    <th>Nombre</th>
                                                    <th>Teléfono</th>
                                                    <th>Correo</th>
                                                    <th>Estado</th>
                                                    <th>Fecha creación</th>
                                                    <th>Acción</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td className="text-bold-500">Michael Right</td>
                                                    <td>352684525</td>
                                                    <td className="text-bold-500">josmq@gmail.com</td>
                                                    <td>Activo</td>
                                                    <td>{new Date().toDateString()}</td>
                                                    <td>
                                                        <a href="#">
                                                            <i className="fa-regular fa-pen-to-square"></i>
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="text-bold-500">Morgan Vanblum</td>
                                                    <td>$13/hr</td>
                                                    <td className="text-bold-500">Graphic concepts</td>
                                                    <td>Remote</td>
                                                    <td>Shangai,China</td>
                                                    <td>
                                                        <a href="#">
                                                            <i className="fa-regular fa-pen-to-square"></i>
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="text-bold-500">Tiffani Blogz</td>
                                                    <td>$15/hr</td>
                                                    <td className="text-bold-500">Animation</td>
                                                    <td>Remote</td>
                                                    <td>Austin,Texas</td>
                                                    <td>
                                                        <a href="#">
                                                            <i className="fa-regular fa-pen-to-square"></i>
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="text-bold-500">Ashley Boul</td>
                                                    <td>$15/hr</td>
                                                    <td className="text-bold-500">Animation</td>
                                                    <td>Remote</td>
                                                    <td>Austin,Texas</td>
                                                    <td>
                                                        <a href="#">
                                                            <i className="fa-regular fa-pen-to-square"></i>
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="text-bold-500">Mikkey Mice</td>
                                                    <td>$15/hr</td>
                                                    <td className="text-bold-500">Animation</td>
                                                    <td>Remote</td>
                                                    <td>Austin,Texas</td>
                                                    <td>
                                                        <a href="#">
                                                            <i className="fa-regular fa-pen-to-square"></i>
                                                        </a>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <CreateComponent navigation={this.props.navigation}></CreateComponent>
                </section>
            </Template>

        );
    }
}
export default Page;