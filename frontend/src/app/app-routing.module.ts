import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Componentes
import { UsuariosComponent } from './components/usuarios/usuarios.component'
import { LoginComponent } from './components/login/login.component'
import { DashboardComponent } from './components/dashboard/dashboard.component'
import { PaginaNoEncontradaComponent } from './components/pagina-no-encontrada/pagina-no-encontrada.component'
import { ProductosComponent } from './components/productos/productos.component'
import { AuthGuard } from '../app/guard/auth.guard'
import { InventarioComponent } from './components/inventario/inventario.component'
import { CotizacionComponent } from './components/cotizacion/cotizacion.component';
import { PreciosComponent } from './components/precios/precios/precios.component';
import { ClientesgpsComponent } from './components/clientes/clientesgps/clientesgps.component';
import { RenovacionesComponent } from './components/renovaciones/renovaciones.component';
import { VencidosComponent } from './components/vencidos/vencidos.component';
import { CajaComponent } from './components/caja/caja.component';
const routes: Routes = [
  {
    path:'',
    component:DashboardComponent,
    children: [
      {
        path: 'usuarios',
        component: UsuariosComponent,
        canActivate: [AuthGuard]
     },
     {
        path: 'productos',
        component: ProductosComponent,
        canActivate: [AuthGuard]
     },
     {
      path: 'inventario',
      component: InventarioComponent,
      canActivate: [AuthGuard]
     },
     {
      path: 'cotizar',
      component: CotizacionComponent,
      canActivate: [AuthGuard]
     },
     {
      path: 'precios',
      component: PreciosComponent,
      canActivate: [AuthGuard]
     },
     {
      path: 'clientes',
      component: ClientesgpsComponent,
      canActivate: [AuthGuard]
     },
     {
      path: 'renovaciones',
      component: RenovacionesComponent,
      canActivate: [AuthGuard]
     },
     {
      path: 'vencidos',
      component: VencidosComponent,
      canActivate: [AuthGuard]
     },
     {
      path: 'caja',
      component: CajaComponent,
      canActivate: [AuthGuard]
     },
    ],
    canActivate:[AuthGuard]
  },
  {
    path:'login',
    component: LoginComponent
  },
  {
    path: '**',
    component: PaginaNoEncontradaComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes),
  RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
