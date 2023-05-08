import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter } from 'reactstrap';

function App2() {

  //lista de objetos Array Alumnos
  const dataAlumnos = [
    { id: 1, matricula: '201923258', nombre: 'Jonathan' },
    { id: 2, matricula: '201948557', nombre: 'Perez' },
    { id: 3, matricula: '201948846', nombre: 'Carla' }
  ]
  const carreras = ['Sistemas', 'Civil','TICS','Administracion']
  //creacion de hoocks
  const [data, setData] = useState(dataAlumnos);
  const [carrera,setcarrera]=useState(carreras);
  const [modalEditar, setmodalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [image,setImage]=useState();
  const [alumnos, setAlumnos] = useState({
    id: '',
    matricula: '',
    nombre: '',
    carrera: '',
  
  });
  const seleccionarAlumno = (elemento, caso) => {
    setAlumnos(elemento);
    (caso === 'Editar') ? setmodalEditar(true) : setModalEliminar(true)
  }
  const handleChange = e => {
    const { name, value } = e.target;
    setAlumnos((prevState) => ({
      ...prevState,
      [name]: value,
 
    }));

  }
  const editar = () => {
    var dataNueva = data;
    dataNueva.map(alumno => {
      if (alumno.id === alumnos.id) {
        alumno.matricula = alumnos.matricula;
        alumno.nombre = alumnos.nombre;
        alumno.carrera = alumnos.carrera;
      }
    });
    setData(dataNueva);
    setmodalEditar(false);
  }
  const eliminar = () => {
    setData(data.filter(alumno => alumno.id !== alumnos.id));
    setModalEliminar(false);
  }
  const abrirModalInsertar = () => {
    setAlumnos(null);
    setModalInsertar(true);
  }
  const insertar = () => {
    var valorInsertar = alumnos;
    valorInsertar.id = data[data.length - 1].id + 1;
    var dataNueva = data;
    dataNueva.push(valorInsertar);
    setData(dataNueva);
    setModalInsertar(false);
  }


  return (
    <div>
      <body>
        <hr></hr><h4>Ingresar Datos</h4>
        <Container>
          <br />
          <Button color="success" onClick={() => abrirModalInsertar()} > Agregar Alumno</Button>
          {""} {"  "}

          <br /><br />
          <Table className='table table-striped table-hover mt-5 shadow-lg' >
            <thead>
              <tr className='bg-curso text-Black'>
                <th>Id</th>
                <th>Matricula </th>
                <th>Nombre</th>
                <th>Carrera</th>
                <th>Imagen</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {data.map((elemento) => (
                <tr>
                  <td>{elemento.id}</td>
                  <td>{elemento.matricula}</td>
                  <td>{elemento.nombre}</td>
                  <td>{elemento.carrera}</td>
                  <td>   </td>
                  <td>
                    <Button color="primary" onClick={() => seleccionarAlumno(elemento, 'Editar')} >Editar</Button>
                    {"  "}
                    <Button color="danger" onClick={() => seleccionarAlumno(elemento, 'Eliminar')}>Eliminar</Button>
                  </td>

                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
        <Modal isOpen={modalEditar}>
          <ModalHeader>
            <div>
              <h3>Editar Registro</h3>
            </div>
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <label>ID</label>
              <input className="form-control" name='id' readOnly type='text' value={alumnos && alumnos.id} />
            </FormGroup>
            <FormGroup>
              <label>Matricula</label>
              <input className="form-control" name='matricula' type='text' value={alumnos && alumnos.matricula} onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <label>Nombre</label>
              <input className="form-control" name='nombre' type='text' value={alumnos && alumnos.nombre} onChange={handleChange} />
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
            <Button color='primary' onClick={() => editar()} >Insertar</Button>
            <Button color='danger' onClick={() => setmodalEditar(false)}>Cancelar</Button>
          </ModalFooter>
        </Modal>
        <Modal isOpen={modalEliminar}>
          <ModalBody>
            Estas Seguro de Eliminar a {alumnos && alumnos.nombre}
          </ModalBody>
          <ModalFooter>
            <Button className='btn btn-danger' onClick={() => eliminar()}>Si</Button>
            <Button className='btn btn-secondary' onClick={() => setModalEliminar(false)} >No </Button>

          </ModalFooter>
        </Modal>
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
                
                <select id="carreras" class="form-control">
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
      </body>
    </div>
  )
}


export default App2;





