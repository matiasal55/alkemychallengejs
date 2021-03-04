import React, { Component } from 'react'

class Nav extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="#">Administración de gastos</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <form className="form-inline my-2 my-lg-0 ml-auto" action="/login" method="POST">
                        <input className="form-control mr-sm-2" type="email" placeholder="Email" aria-label="Email" />
                        <input className="form-control mr-sm-2" type="password" placeholder="Contraseña" aria-label="password" />
                        <button className="btn btn-outline-primary mr-2 my-2 my-sm-0" type="submit">Iniciar sesión</button>
                    </form>  
                </div>
            </nav>
        )
    }
}

export default Nav