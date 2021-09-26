import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
/* utilizaremos este servicio para poder hacer las peticiones al backend */
@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
/* inyectamos el metodo de angular al constructor */
  constructor(private firestore: AngularFirestore) { }

  agregarEmpleado(empleado: any): Promise<any> { /* este metodo retorna una promesa */
   return this.firestore.collection('empleado').add(empleado)
  }
  /* metodo para mostrar los empleados en la tabla */
  getEmpleado(): Observable<any>{
    return this.firestore.collection('empleado', ref => ref.orderBy('fechaCreacion', 'asc')).snapshotChanges();
    /* ref los ordena por fecha de creacion */
  }
  eliminarEmpleado(id: string):Promise<any>{
    return this.firestore.collection('empleado').doc(id).delete();

  }
  /* el metodo para obtener los datos de los empleados en el formulario */
  getEmpleados(id: string): Observable<any>{
    return this.firestore.collection('empleado').doc(id).snapshotChanges();
  }
  actualizarEmpleado(id: string, data: any): Promise<any>{
    return this.firestore.collection('empleado').doc(id).update(data);
  }
}
