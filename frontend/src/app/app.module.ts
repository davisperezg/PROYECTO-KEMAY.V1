import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';

//
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FooterComponent } from './components/footer/footer.component';
import { PaginaNoEncontradaComponent } from './components/pagina-no-encontrada/pagina-no-encontrada.component';
import { ProductosComponent } from './components/productos/productos.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { AuthGuard } from '../app/guard/auth.guard'
import { TokenInterceptorService } from '../app/token/token-interceptor.service';
import { DatosProductoComponent } from './components/datos-producto/datos-producto.component';
import { ListProductosInventarioComponent } from './components/list-productos-inventario/list-productos-inventario.component';
import { InventarioComponent } from './components/inventario/inventario.component';
import { DialogConfirmacionComponent } from './components/dialog-confirmacion/dialog-confirmacion.component';
import { InventarioHistorialComponent } from './components/inventario-historial/inventario-historial.component';
import { DialogMensajeComponent } from './components/dialog-mensaje/dialog-mensaje.component';
import { CotizacionComponent } from './components/cotizacion/cotizacion.component';
import { dialogPDF } from './components/cotizacion/dialogPDF.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { PreciosComponent } from './components/precios/precios/precios.component';
import { ClientesgpsComponent } from './components/clientes/clientesgps/clientesgps.component';
import { TipoComponent } from './components/clientes/clientesgps/tipo/tipo.component';
import { ClienteExistenteComponent } from './components/dialog-confirmacion/cliente-existente/cliente-existente.component';
import { DialogClienteInstaRegistradoComponent } from './components/dialog-confirmacion/dialog-cliente-insta-registrado/dialog-cliente-insta-registrado.component';
import { RenovacionesComponent } from './components/renovaciones/renovaciones.component';
import { VencidosComponent } from './components/vencidos/vencidos.component';
import { CajaComponent } from './components/caja/caja.component';

@NgModule({
  declarations: [
    AppComponent,
    UsuariosComponent,
    LoginComponent,
    DashboardComponent,
    FooterComponent,
    PaginaNoEncontradaComponent,
    ProductosComponent,
    DatosProductoComponent,
    ListProductosInventarioComponent,
    InventarioComponent,
    DialogConfirmacionComponent,
    InventarioHistorialComponent,
    DialogMensajeComponent,
    CotizacionComponent,
    ClientesComponent,
    dialogPDF,
    PreciosComponent,
    ClientesgpsComponent,
    TipoComponent,
    ClienteExistenteComponent,
    DialogClienteInstaRegistradoComponent,
    RenovacionesComponent,
    VencidosComponent,
    CajaComponent
  ],
  imports: [
    FormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthGuard,
    {
    provide:HTTP_INTERCEPTORS,
    useClass:TokenInterceptorService,
    multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
