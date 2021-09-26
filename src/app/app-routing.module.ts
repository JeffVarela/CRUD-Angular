import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { listenerCount } from 'process';
import { ListEmpleadosComponent } from './components/list-empleados/list-empleados.component';
import { CreateEmpleadosComponent } from './components/create-empleados/create-empleados.component';

/* Agregamos las rutas */
const routes: Routes = [
  {path: '', redirectTo: 'list-empleados', pathMatch:'full'},
  {path: 'list-empleados', component: ListEmpleadosComponent},
  {path: 'create-empleado', component: CreateEmpleadosComponent},
  {path: 'editEmpleado/:id', component: CreateEmpleadosComponent}, /* /id indica que le estaremos eviando el parametro id */
  {path: '**', redirectTo: 'list-empleados', pathMatch:'full'} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
