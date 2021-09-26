import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
/* import { threadId } from 'worker_threads'; */
import { EmpleadoService } from '../../services/empleado.service';

@Component({
  selector: 'app-create-empleados',
  templateUrl: './create-empleados.component.html',
  styleUrls: ['./create-empleados.component.css']
})
export class CreateEmpleadosComponent implements OnInit {

  createEmpleado: FormGroup;
  submitted = false;
  loading = false;
  id: string | null;
  titulo = 'Agregar Empleado';
  tituloBotton = 'Agregar';
                                         /* inyectamos el servicio empleadoService, se suelen poner los servicios con guion bajo */
  constructor(private fb: FormBuilder,
              private _empleadoService: EmpleadoService,
              private router: Router,
              private toastr: ToastrService,
              private aRoute: ActivatedRoute) {
    this.createEmpleado = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      apellido: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      documento: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(20)]],
      salario: ['', [Validators.required, Validators.min(0)]]
    })
    this.id = this.aRoute.snapshot.paramMap.get('id');
    console.log(this.id);
  }
  get form(){ /* para obtener los datos del formulario por separado */
    return this.createEmpleado.controls;
  }

  ngOnInit(): void {
    this.esEditar(); /* se ejecuta en el oninit por que primero queremos saber si es editar o no */
  }
  agregarEditarEmpleado() {
    this.submitted = true;
    if (this.createEmpleado.invalid) {
      return;
    }
    if (this.id === null) {
      this.agregarEmpleado();
    } else {
      this.editarEmpleado(this.id);
    }
    
  }
 

  agregarEmpleado(){
    const empleado: any = {
      nombre: this.createEmpleado.value.nombre,
      apellido: this.createEmpleado.value.apellido,
      documento: this.createEmpleado.value.documento,
      salario: this.createEmpleado.value.salario,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date()
    }
    this.loading = true;
    this._empleadoService.agregarEmpleado(empleado).then(() => {
      /* console.log("empleado registrado con exito!!!"); */
      this.toastr.success('El empleado fue registrado con exito', 'empleado registrado', {
        positionClass: 'toast-bottom-right'
      });
      this.loading = false;
      this.router.navigate(['/list-empleados'])
    }).catch (error => {
      console.log(error);
      this.loading = false;
    })
  }
  
  editarEmpleado(id: string){
    /* primero creamos el objeto */
    const empleado: any = {
      nombre: this.createEmpleado.value.nombre,
      apellido: this.createEmpleado.value.apellido,
      documento: this.createEmpleado.value.documento,
      salario: this.createEmpleado.value.salario,
      fechaActualizacion: new Date()
    }
    this.loading = true;
    this._empleadoService.actualizarEmpleado(id, empleado).then(()=> {
      this.loading = false;
      this.toastr.info('El empleado fue actualizado con exito','Empleado actualizado', {
        positionClass:'toast-bottom-right'
      })
      this.router.navigate(['/list-empleados'])
    })
  }

  esEditar(){
    if (this.id !== null) { /* queremos saber si resivimos el id, para saber si es editar o agregar */
      this.titulo = 'Editar Empleado'
      this.tituloBotton = 'Editar'
      this.loading= true;
      this._empleadoService.getEmpleados(this.id).subscribe(data => {
      this.loading = false;  
        console.log(data.payload.data()['nombre']);
        this.createEmpleado.setValue({
          nombre: data.payload.data()['nombre'], /* escribir los datos en el input */
          apellido: data.payload.data()['apellido'],
          documento: data.payload.data()['documento'],
          salario: data.payload.data()['salario'],
        })
      })
    }
  }

  /* get nombre() {return this.createEmpleado.get('nombre');} */

}
