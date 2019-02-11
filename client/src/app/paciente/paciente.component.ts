import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import { Paciente } from './paciente';
import { PacienteService } from './paciente.service';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';

@Component({
    selector: 'app-productos',
    templateUrl: './paciente.component.html',
    styleUrls: ['./paciente.component.css'],
    animations: [routerTransition()]
})
export class PacienteComponent implements OnInit {
  model: any = {};
  pacientes: Paciente[] = [];
  cols: any[];
  selectedPaciente: Paciente;
  modalAgregarPaciente = false;
  modalEditarPaciente = false;
  modalEliminarPaciente = false;
  


  constructor(
    private pacienteService: PacienteService
  ) {}


  ngOnInit() {
      this.getPacientes();

      this.cols = [
        { field: 'dni', header: 'DNI' },       
        { field: 'nombre', header: 'Nombre' },       
        { field: 'apellido', header: 'Apellido' },
        { field: 'telefono', header: 'Telefono' },
        { field: 'direccion', header: 'Direccion' },        
        { field: 'barrio', header: 'Barrio' },
        { field: 'fechaNacimiento', header: 'Fecha de Nacimiento' }
      ];
  }

  // GET MEDICAMENTOS
    getPacientes() {
      this.pacienteService.getPacientes()
      .then(pacientes => {
          this.pacientes = pacientes;
          console.log(pacientes);
      });
    }

  // CARGAR MEDICAMENTO
    cargarPaciente(
      dniPaciente: string,
      nombrePaciente: string,
      apellidoPaciente: string,
      telefonoPaciente: string,
      direccionPaciente:string,
      barrioPaciente: string,
      fechaNacimientoPaciente: Date,
      f: NgForm) {
      this.modalAgregarPaciente = false;
      this.pacienteService.cargarPaciente(dniPaciente, nombrePaciente, apellidoPaciente,telefonoPaciente,direccionPaciente, barrioPaciente,fechaNacimientoPaciente)
      .then(pacienteAgregado => {
        // Muestro un mensajito de Agregado con Éxito
        swal({
          title: 'Agregado!',
          text: 'Se ha creado el paciente correctamente.',
          type: 'success',
          timer: 4000
        }).then(
          function () {


          },
          // handling the promise rejection
          function (dismiss) {
            if (dismiss === 'timer') {

            }
          }
        );

        // Agrego el Médico al Arreglo de Médicos (actualiza la tabla)
        this.pacientes.push(pacienteAgregado);

        // Reseteo el formulario/modal para que no haya nada en los input cuando se vuelva a abrir
        f.resetForm();
      });
    }

  // EDITAR MEDICOS
    editarPaciente(f: NgForm) {
      this.pacienteService.editarPaciente(this.selectedPaciente._id,
                                      this.selectedPaciente.nombre,
                                      this.selectedPaciente.apellido,
                                      this.selectedPaciente.telefono,
                                      this.selectedPaciente.direccion,
                                      this.selectedPaciente.barrio,
                                      this.selectedPaciente.fechaNacimiento)
      .then(pacienteEditado => {
        // Muestro un mensajito de Actualizado con Éxito
        swal({
          title: 'Actualizado!',
          text: 'Se ha actualizado el paciente correctamente.',
          type: 'success',
          timer: 4000
        }).then(
          function () {


          },
          // handling the promise rejection
          function (dismiss) {
            if (dismiss === 'timer') {

            }
          }
        );

        // PARA ACTUALIZAR VISTA (TABLA)
        this.pacientes.forEach(elementoPaciente => {
          if (elementoPaciente._id === pacienteEditado._id) {
            elementoPaciente.nombre = pacienteEditado.nombre;
            elementoPaciente.apellido = pacienteEditado.apellido;
            elementoPaciente.telefono = pacienteEditado.telefono;
            elementoPaciente.direccion=pacienteEditado.direccion;
            elementoPaciente.barrio = pacienteEditado.barrio;
            elementoPaciente.fechaNacimiento=pacienteEditado.fechaNacimiento;
          }
        });

        // Reseteo el selectedPaciente y el formulario de editar
        this.selectedPaciente = null;
        f.resetForm();
      });
    }

  // ELIMINAR MEDICAMENTO
    eliminarPaciente() {
      // Mensajito: ¿ESTAS SEGURO?
      swal({
        title: 'Estas seguro?',
          text: 'Esta acción no se puede revertir!',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, eliminar!'
      })
      .then((willDelete) => {
        if (willDelete.value) {
          // SI ACEPTA
          this.pacienteService.deletePaciente(this.selectedPaciente._id)
          .then(pacienteEliminado => {
            swal(
                'Eliminado!',
                'Paciente eliminado correctamente',
                'success'
            );
            // Elimino el medico del arreglo de medicos (actualiza la tabla)
              let i;

              // Con el forEach busco la posicion (index) del medico eliminado
              this.pacientes.forEach(function(paciente, index) {
                  if (paciente._id === pacienteEliminado._id) {
                      i = index;
                  }
              });

              // "splice" corta el arreglo justo en el indice "i"
              this.pacientes.splice(i, 1);

              // Reseteo el medico seleccionado a null
              this.selectedPaciente = null;
          });
        } else {
          // Reseteo el medico seleccionado a null
          this.selectedPaciente = null;
        }
      });

  }

  mostrarModalAgregarPaciente() {
    this.modalAgregarPaciente = true;
  }

  mostrarModalEditar() {
    if (this.selectedPaciente != null) {
      this.modalEditarPaciente = true;
    }

  }

  cerrarModalEditar() {
    this.modalEditarPaciente = false;
  }
}

