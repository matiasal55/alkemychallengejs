import React, { Component , Fragment } from 'react'
import FieldForm from "./FieldForm"

export default class Panel extends Component {

    constructor(){
        super()
        this.state={
            concept:'',
            amount:'',
            date:'',
            id_type:'0',
            dataList:[],
            balance:'',
            maxList:10,
            expanded:false,
            type: false,
            id_register:'',
            loading:true,
            loadingButton:false
        }
        this.createRegister=this.createRegister.bind(this)
        this.values=this.values.bind(this)
        this.showAll=this.showAll.bind(this)
    }

    createRegister(e){
        e.preventDefault()
        this.setState({loading:true, loadingButton:true})
        if(this.state.id_register){
            fetch("/api/modify/"+this.state.id_register,{
                method:'PUT',
                body:JSON.stringify({
                    concept:this.state.concept,
                    amount:this.state.amount,
                    date:this.state.date
                }),
                headers: {
                    'Content-Type':'application/json'
                }
            }).then(res=>{
                this.setState(this.stateDefault())
                this.getBalance()
                this.getData()
            })
        }
        else {
            fetch("/api/save",{
            method:'POST',
            body:JSON.stringify({
                concept:this.state.concept,
                amount:this.state.amount,
                date:this.state.date,
                id_type:this.state.id_type
            }),
            headers: {
                'Content-Type':'application/json'
            }
        }).then(res=>{
            this.setState(this.stateDefault())
            this.getBalance()
            this.getData()
        })
        }
        
    }

    stateDefault(){
        return {
            concept:'',
            amount:'',
            date:'',
            id_type:'0',
            id_register:'',
            type:false,
            loadingButton:false
        }
    }

    modifyData(id){
        fetch("/api/data/"+id).then(res=>res.json()).then(data=>{
            this.setState({
                concept:data.concept,
                amount:data.amount,
                date:data.date,
                type: true,
                id_type:data.id_type,
                id_register:id
            })
            console.log(this.state.date)
        })
        
    }

    deleteData(id){
        if(confirm("¿Está seguro de eliminar el registro?")){
            this.setState({loading:true})
            fetch("/api/delete/"+id,{
                method:"DELETE",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(res=>{
                this.getBalance()
                this.getData()
            })
        }
    }

    componentDidMount(){
        this.getBalance()
        this.getData()
    }

    getData(){
        fetch("/api/data").then(res=>res.json()).then(data=>this.setState({loading:false,dataList:data}))
    }

    getBalance(){
        fetch("/api/balance").then(res=>res.json()).then(data=>this.setState({balance:data}))
    }

    values(e){
        const { name , value }=e.target
        this.setState({
            [name]:value
        })
    }

    showAll(){
        this.state.maxList===10 ? (this.setState({maxList:this.state.dataList.length, expanded:true})) : (this.setState({maxList:10, expanded:false}))
    }

    render() {
        return (
            <div className="jumbotron">
                <h1 className="display-4">Bienvenido</h1>
                <p className="lead">Saldo actual</p>
                <h2 className={this.state.balance<0 ? ("text-danger") : ("")}>$ {this.state.balance}</h2>
                <hr className="my-4" />
                <div className="row">
                    <div className="card col-md-6">
                    <div className="card-body">
                        {
                            this.state.loading ? (
                                <div className="d-flex justify-content-center">
                                    <div className="spinner-border" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                </div>
                            ) : (
                                <Fragment>
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
                                            this.state.dataList.slice(0,this.state.maxList).map(data=>{
                                                return(
                                                    <tr key={data.id}>
                                                    <td>{data.date}</td>
                                                    <td>{data.concept}</td>
                                                    <td>{data.amount}</td>
                                                    <td className={data.id_type==1 ? ("text-success") : ("text-danger")}>{data.description}</td>
                                                    <td><a onClick={()=>this.modifyData(data.id)}><i className="fas fa-edit"></i></a></td>
                                                    <td><a onClick={()=>this.deleteData(data.id)}><i className="fas fa-trash-alt"></i></a></td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                                </Fragment>
                            )
                                    }
                            <div>
                                <a onClick={this.showAll}>{
                                    this.state.dataList.length>10 ? (
                                    this.state.expanded ? (<h5 className="text-center">Mostrar menos</h5>) : (<h5 className="text-center">Mostrar más</h5>)) : (<span></span>)
                                    }
                                </a>
                            </div>
                    </div>
                </div>
                <div className="card col-md-6">
                    <div className="card-body">
                        <h5 className="card-title">Ingresar registro</h5>
                        <form className="was-validated" onSubmit={this.createRegister}>
                            <FieldForm type="text" field="Concepto" name="concept" capture={this.values} value={this.state.concept} />
                            <FieldForm type="number" field="Monto" name="amount" capture={this.values} value={this.state.amount} />
                            <FieldForm type="date" field="Fecha" name="date" capture={this.values} value={this.state.date} />
                            <div className="form-group">
                                <label>Tipo:</label>
                                <select name="id_type" required className="custom-select" value={this.state.id_type} disabled={this.state.type} onChange={this.values}>
                                    <option value="0" disabled>Seleccione una opción</option>
                                    <option value="1">Ingreso</option>
                                    <option value="2">Egreso</option>
                                </select>
                                <div className="invalid-feedback">
                                    Por favor seleccione el tipo
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary">{
                                this.state.loadingButton ? (<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>) : (<span></span>)
                            } Registrar</button>
                        </form>
                    </div>
                </div>
                </div>
            </div>
        )
    }
}