import { Component, OnInit } from '@angular/core';
import { Gasto } from 'src/app/models/gasto';
import { Departamento } from 'src/app/models/departamento';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-mostrar-datos',
  templateUrl: './mostrar-datos.component.html',
  styleUrls: ['./mostrar-datos.component.css']
})
export class MostrarDatosComponent implements OnInit {

  constructor(private api:DataService) { }
  
 gastosPorMostrar:Gasto[] = [
  ];

  departamentoMasGasto:Departamento[] = [
  ];

  gastoTotal:number = 0;
  mesActual:number = new Date().getMonth();


  ngOnInit(): void {
    this.obtenerDatos();
    this.reordenarDepartamentos();
  }

  reordenarDepartamentos(){
    this.gastoTotal = 0;
    for(let gasto of this.gastosPorMostrar){      
      this.gastoTotal+=gasto.monto;
      const found = this.departamentoMasGasto.find((obj) =>{
        return obj.departamento === gasto.departamento; 
      });

      if (found != undefined) found.gasto += gasto.monto
      else{
        let tmp:Departamento = {departamento:gasto.departamento, gasto:gasto.monto}
        this.departamentoMasGasto.push(tmp);
      }       
    }

    this.departamentoMasGasto.sort((a,b) => a.gasto > b.gasto ? -1 : 1)

  }

  obtenerDatos(){
    this.api.obtenerGastos()
    .subscribe(response=>{
      for(let gasto of response){
        let date = new Date(gasto.fecha);

        if(date.getMonth() == this.mesActual)  this.gastosPorMostrar.push(gasto)
      }
      this.reordenarDepartamentos()

    });

  }

}
