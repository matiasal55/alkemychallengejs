import React, { Component } from 'react'

export default class FieldForm extends Component {
    render() {
        return (
             <div className="form-group">
                <label>{this.props.field}</label>
                <input className="form-control" required type={this.props.type} name={this.props.name} onChange={this.props.capture} value={this.props.value} placeholder={`Ingrese ${this.props.field.toLowerCase()}`}></input>
                <div className="invalid-feedback">
                    Por favor ingrese {this.props.field.toLowerCase()}
                </div>
            </div>
        )
    }
}
