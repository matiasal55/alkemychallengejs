import React, { Component } from 'react'
import CampoForm from "./CampoForm"

export default class Home extends Component {

    constructor(){
        super()
        this.state={
            concepto:'',
            monto:'',
            fecha:'',
            id_tipo:'0',
            registros:[],
            saldo:'',
            registrosMaximos:10,
            expanded:false
        }
        // this.registro=this.registro.bind(this)
        this.cargarRegistro=this.cargarRegistro.bind(this)
        this.valores=this.valores.bind(this)
        this.mostrarTodos=this.mostrarTodos.bind(this)
    }

    cargarRegistro(e){
        e.preventDefault()
        fetch("/api/registrar",{
            method:'POST',
            body:JSON.stringify({
                concepto:this.state.concepto,
            monto:this.state.monto,
            fecha:this.state.fecha,
            id_tipo:this.state.id_tipo
            }),
            headers: {
                'Content-Type':'application/json'
            }
        }).then(res=>{
            this.setState({
                concepto:'',
            monto:'',
            fecha:'',
            id_tipo:'0'
            })
            this.obtenerSaldo()
            this.obtenerRegistros()
        })
        
    }

    eliminarRegistro(id){
        fetch("/api/eliminar/"+id,{
            method:"DELETE",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res=>{
            this.obtenerSaldo()
            this.obtenerRegistros()
        })
    }

    componentDidMount(){
        this.obtenerSaldo()
        this.obtenerRegistros()
    }

    obtenerRegistros(){
        fetch("/api/registros/1").then(res=>res.json()).then(data=>this.setState({registros:data}))
    }

    obtenerSaldo(){
        fetch("/api/saldo/1").then(res=>res.json()).then(data=>this.setState({saldo:data}))
    }

    registro(e){
        // fetch("/signup",{
        //     method:"POST",
        //     body:this.state
        // }).then(res=>$('#myModal').on('shown.bs.modal', function () {
        // $('#myInput').trigger('focus')
        // })).catch(err=>console.log(err))
        console.log(this.state)
        e.preventDefault()
    }

    valores(e){
        const { name , value }=e.target
        this.setState({
            [name]:value
        })
    }

    mostrarTodos(){
        this.state.registrosMaximos===10 ? (this.setState({registrosMaximos:this.state.registros.length, expanded:true})) : (this.setState({registrosMaximos:10, expanded:false}))
    }

    render() {
        return (
            <div className="jumbotron">
                <h1 className="display-4">Bienvenido</h1>
                <p className="lead">Saldo actual</p>
                <h2>$ {this.state.saldo}</h2>
                <hr className="my-4" />
                <div className="row">
                    <div className="card col-md-6">
                    <div className="card-body">
                        <h5 className="card-title">Últimos registros</h5>
                            <table className="table">
                                <thead>
                                <tr>
                                    <th>Fecha</th>
                                    <th>Concepto</th>
                                    <th>Monto</th>
                                    <th>Tipo</th>
                                    <th>Modificar</th>
                                    <th>Borrar</th>
                                </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.registros.slice(0,this.state.registrosMaximos).map(registro=>{
                                            return(
                                                <tr key={registro.id}>
                                                <td>{registro.fecha}</td>
                                                <td>{registro.concepto}</td>
                                                <td>{registro.monto}</td>
                                                <td>{registro.id_tipo}</td>
                                                <td><a><i class="fas fa-edit"></i></a></td>
                                                <td><a onClick={()=>this.eliminarRegistro(registro.id)}><i class="fas fa-trash-alt"></i></a></td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                            <div>
                                <a onClick={this.mostrarTodos}>{
                                    this.state.registros.length>10 ? (
                                    this.state.expanded ? (<h5 className="text-center">Mostrar menos</h5>) : (<h5 className="text-center">Mostrar más</h5>)) : (<span></span>)
                                    }
                                </a>
                            </div>
                    </div>
                </div>
                <div className="card col-md-6">
                    <div className="card-body">
                        <h5 className="card-title">Ingresar registro</h5>
                        <form onSubmit={this.cargarRegistro}>
                            <CampoForm tipo="text" campo="Concepto" nombre="concepto" capturar={this.valores} valor={this.state.concepto} />
                            <CampoForm tipo="number" campo="Monto" nombre="monto" capturar={this.valores} valor={this.state.monto} />
                            <CampoForm tipo="date" campo="Fecha" nombre="fecha" capturar={this.valores} valor={this.state.fecha} />
                            <div className="form-group">
                                <label>Tipo:</label>
                                <select name="id_tipo" className="custom-select" value={this.state.id_tipo} onChange={this.valores}>
                                    <option value="0" disabled>Seleccione una opción</option>
                                    <option value="1">Ingreso</option>
                                    <option value="2">Egreso</option>
                                </select>
                            </div>
                            <button type="submit" className="btn btn-primary">Registrar</button>
                        </form>
                    </div>
                </div>
                </div>
            </div>
            // <div className="jumbotron">
            //     <h1 className="display-4">Bienvenido</h1>
            //     <p className="lead">Al sistema de gestión de ingresos y egresos</p>
            //     <hr className="my-4" />
            //     <h2>Regístrese ahora mismo!</h2>
            //     <form onSubmit={this.registro}>
            //         <CampoForm tipo="text" campo="Nombre" nombre="nombre" valores={this.valores} />
            //         <CampoForm tipo="text" campo="Apellido" nombre="apellido" valores={this.valores} />
            //         <CampoForm tipo="email" campo="Email" nombre="email" valores={this.valores} />
            //         <CampoForm tipo="password" campo="Contraseña" nombre="password" valores={this.valores} />
            //         <CampoForm tipo="password" campo="Confirme su contraseña" nombre="repassword" valores={this.valores} />
            //         <button className="btn btn-primary btn-lg" type="submit" data-toggle="modal" data-target="#exampleModal">Registrarse</button>
            //     </form>
            // </div>
        )
    }
}