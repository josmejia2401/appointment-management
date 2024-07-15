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
            <main className='form-signin w-100 m-auto' id="auth-login">
                <div id="error-403">
                    <div className="error-page container">
                        <div className="col-md-8 col-12 offset-md-2">
                            <div className="text-center">
                                <img className="img-error" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6HBQhk8M7s2gegHB8kP1TqOwOZ4l6CtDjvw&s" alt="Not Found" />
                                <h1 className="error-title">Error del sistema</h1>
                                <p className="fs-5 text-gray-600">El sitio web no está disponible actualmente. Vuelve a intentarlo más tarde o ponte en contacto con el desarrollador.</p>
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