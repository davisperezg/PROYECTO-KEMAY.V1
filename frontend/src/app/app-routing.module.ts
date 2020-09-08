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
