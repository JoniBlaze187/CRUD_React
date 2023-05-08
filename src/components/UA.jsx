import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button, Container,} from 'reactstrap';

const UA = () => {
    const carreras = ['Ing. en Sistemas', 'Ing. en Quimica', 'Lic. en Administracion', "Ing. en TIC'S",
        'Ing. en Civil', 'Ing. en Logistica', 'Ing. en Electrica', 'Ing. en Mecatronica']

    const [funcion, setFunciones] = useState('Registrar')
    const [alumnos, setAlumnos] = useState([])
    const [matricula, setMatricula] = useState('')
    const [nombre, setNombre] = useState('')
    const [carrera, setCarrera] = useState('')
    const [imagen, setImagen] = useState()

    const handleMatriculaChanged = (event) => {
        setMatricula(event.target.value)
    }
    const handleNombreChanged = (event) => {
        setNombre(event.target.value)
    }
    const handleCarreraChanged = (event) => {
        setCarrera(event.target.value)
    }
    const handleImageChanged = (event) => {
        const file = event.target.files[0]
        setImagen(file)
    }
    const sumbitform = (event) => {
        event.preventDefault()
        if (funcion == 'Registrar') {
            const indice=alumnos.findIndex((alumno)=>alumno.matricula==matricula)
            if(indice==-1){
                window.confirm("Registrando Alumno ")
            const objeto = { matricula: matricula, nombre: nombre, carrera: carrera, foto: imagen }
            setAlumnos([...alumnos, objeto])
            limpiar()
            }else{
                window.confirm("La matricula ya existe")
            }

           
        }else{
            const indice=alumnos.findIndex((alumno)=>alumno.matricula === matricula)
            const datosAct=alumnos[indice]
            datosAct.nombre=nombre
            datosAct.carrera=carrera
            if(imagen!=null){
                datosAct.foto=imagen
            }      
        const copia=[...alumnos]

        copia[indice]=datosAct

        setAlumnos(copia)
        setFunciones('Registrar')
        const bmat=document.getElementById('mat')
        bmat.disabled = false
        limpiar()


        }
  

    }
    const eliminar = (indice) => {
        setAlumnos(alumnos.filter((_, index) => index !== indice));
    }
    const limpiar = () => {
        setMatricula('')
        setNombre('')
        setCarrera('')
        setImagen(null)
    }
    const editar = (datos) => {
        const bmat=document.getElementById('mat')
        bmat.disabled = true
        setFunciones('Guardar')

        setMatricula(datos.matricula)
        setNombre(datos.nombre)
        setCarrera(datos.carrera)
        setImagen(datos.imagen)
        
    }
    

    return (

        <>
        <Container className='d-flex justify-content-flex center ' >
            <form className='col-5' onSubmit={sumbitform} id='f'>
            <h4>Registro Alumnos</h4>
        <br />
                <h6>Matricula</h6> <input id='mat' class='form-control form-control-sm' type="text" placeholder='Numero de Control' 
                onChange={handleMatriculaChanged} value={matricula} required />
                <h6>Nombre</h6><input class='form-control form-control-sm' type="text" placeholder='Nombre'
                 onChange={handleNombreChanged} value={nombre} required/>
                <h6>Carrera</h6>
                
                <select onChange={handleCarreraChanged} value={carrera} >
                    <option selected>seleccionar carrera</option>
                    {carreras.map((carr, index) => {
                        return <option key={index}>{carr}</option>
                    })}
                </select>
                <br></br>
                <h6>Seleccione Una Foto de perfil</h6>
                <br></br>
                <input type='file' accept='image/*' onChange={handleImageChanged} ref={imagen} />
                <br></br>
                <Button type='sumbit' color='primary'>{funcion}</Button>


            </form>
            </Container>
            <Container className='shadow'>
                <Table className='table table-striped table-hover mt-5 shadow-lg' id='tablef' >
                    <thead>
                        <tr className='bg-curso text-Black'>

                            <th>Matricula </th>
                            <th>Nombre</th>
                            <th>Carrera</th>
                            <th>Foto</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {alumnos.map((alumno, index) => (
                            <tr>
                                <td>{alumno.matricula}</td>
                                <td>{alumno.nombre}</td>
                                <td>{alumno.carrera}</td>
                                <td>{alumno.foto ? <img width={100} src={URL.createObjectURL(alumno.foto)} alt='Foto' /> : ''}</td>
                                <td>
                                    <Button  color="primary" onClick={() => editar(alumno)}>Editar</Button>
                                    {"  "}
                                    <Button color="danger" onClick={() => eliminar(index)}>Eliminar</Button>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </Table>
            </Container>
        </>
    )
}

export default UA