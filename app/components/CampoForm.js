import React, { Component } from 'react'

export default class CampoForm extends Component {
    render() {
        return (
             <div className="form-group">
                <label>{this.props.campo}</label>
                <input className="form-control" type={this.props.tipo} name={this.props.nombre} onChange={this.props.capturar} value={this.props.valor} placeholder={`Ingrese su ${this.props.nombre}`}></input>
            </div>
        )
    }
}
