import { Component, OnInit } from '@angular/core';
import { Gasto } from 'src/app/models/gasto';
import { Departamento } from 'src/app/models/departamento';

@Component({
  selector: 'app-mostrar-datos',
  templateUrl: './mostrar-datos.component.html',
  styleUrls: ['./mostrar-datos.component.css']
})
export class MostrarDatosComponent implements OnInit {

  constructor() { }
  
 gastosPorMostrar:Gasto[] = [
    {
      monto:1000,
      descripcion:"Descripcion 1",
      responsable:"Juanito",
      departamento:"TTO"
    },
    {
      monto:60000,
      descripcion:"Descripcion 2",
      responsable:"Juanita",
      departamento:"Contabilidad"
    },
    {
      monto:1000,
      descripcion:"Descripcion 3",
      responsable:"Marcela",
      departamento:"Gerencia"
    },
    {
      monto:63000,
      descripcion:"Descripcion 4",
      responsable:"Rodolfo",
      departamento:"Limpieza"
    },
    {
      monto:1000,
      descripcion:"Descripcion 4",
      responsable:"Rodolfo",
      departamento:"TTO"
    }
  ];

  departamentoMasGasto:Departamento[] = [
  ];

  gastoTotal:number = 0;


  ngOnInit(): void {
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

}
