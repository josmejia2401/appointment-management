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
            <main className='form-signin w-100 m-auto'>
                <div id="error-403">
                    <div className="error-page container">
                        <div className="col-md-8 col-12 offset-md-2">
                            <div className="text-center">
                                <img className="img-error" src="https://hostinglatam.net/wp-content/uploads/2023/07/403.jpg" alt="Not Found" />
                                <h1 className="error-title">Acción prohibida</h1>
                                <p className="fs-5 text-gray-600">No estas autorizado para ver esta página.</p>
                                <a href="/login" className="btn btn-lg btn-outline-primary mt-3">Ir a inicio</a>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}
export default Page;