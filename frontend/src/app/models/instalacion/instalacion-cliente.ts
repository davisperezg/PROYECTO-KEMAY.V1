import { Vehiculos } from './../vehiculos/vehiculos';

export class InstalacionCliente {

  constructor(idVeh='', idUsu='', idTec='', idOpe='',
    fechIni='',fechTer='',  username='', password='', numOpe='', chip='', idTip='', fechCre=''){

    this.idVeh=idVeh
    this.idUsu=idUsu
    this.idTec=idTec
    this.idOpe=idOpe
    this.fechIni=fechIni
    this.fechTer=fechTer
    this.username=username
    this.password=password
    this.numOpe=numOpe
    this.chip=chip
    this.idTip=idTip
    this.fechCre=fechCre

  }

  idIns:string;
  idVeh:string; //foreign
  idUsu:string; //foreign
  idTec:string; //foreign visible
  idOpe:string; //foreign visible
  fechIni:string;
  fechTer:string;
  username:string; //visible
  password:string; //visible
  numOpe:string; //visible
  chip:string; //visible
  idTip:string; //foreign visible
  fechCre:string;
  idVehiculoOficial:Vehiculos //revisando intento de foreign
}
