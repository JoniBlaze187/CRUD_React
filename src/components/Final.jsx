import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter } from 'reactstrap';

const Final = () => {
    const carreras = ['Ing. en Sistemas', 'Ing. en Quimica', 'Lic. en Administracion', "Ing. en TIC'S",
        'Ing. en Civil', 'Ing. en Logistica', 'Ing. en Electrica', 'Ing. en Mecatronica']

    const [funcion, setFunciones] = useState('Registrar')
    const [alumnos, setAlumnos] = useState([])
    const [matricula, setMatricula] = useState('')
    const [nombre, setNombre] = useState('')
    const [carrera, setCarrera] = useState('')
    const [imagen, setImagen] = useState()

    const [modalInsertar,setModalInsertar]=useState(false)



    return (
        <>
        /*para insertar */
        <Modal isOpen={modalInsertar}>
          <ModalHeader>
            <div>
              <h3>Ingresar Registro</h3>
            </div>
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <label>ID</label>
              <input className="form-control" name='id' readOnly type='text' value={data[data.length - 1].id + 1} />
            </FormGroup>
            <FormGroup>
              <label>Matricula</label>
              <input className="form-control" name='matricula' type='text' value={alumnos ? alumnos.matricula : ''} onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <label>Nombre</label>
              <input className="form-control" name='nombre' type='text' value={alumnos ? alumnos.nombre : ''} onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <label>Carrera</label>
              <div class="form-group">
                
                <select id="disabledSelect" class="form-control">
                  {carreras.map((carrera,index)=>{
                 return   <option>{carrera} </option>
                  })}
                </select>
              </div>

            </FormGroup>
            <FormGroup>
              <label>Imagen</label>
              <input className="form-control" name='imagen' type='file' />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button color='primary' onClick={() => insertar()} >Insertar</Button>
            <Button color='danger' onClick={() => setModalInsertar(false)}>Cancelar</Button>
          </ModalFooter>
        </Modal>


        </>
    )
}

export default Final