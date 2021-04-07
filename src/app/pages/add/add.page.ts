import { Component, OnInit } from '@angular/core';
import { DeseosService } from '../../services/deseos.service';
import { ActivatedRoute } from '@angular/router';
import { Lista } from '../../models/lista.model';
import { ListaItem } from '../../models/lista-item.model';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {


  lista: Lista;
  nombreItem = '';


  constructor( private deseosService: DeseosService,
               private route: ActivatedRoute ) {

    const listaId = this.route.snapshot.paramMap.get('listaId');
    console.log(listaId);

    this.lista = this.deseosService.getList( listaId );
    console.log(this.lista);

  }


  ngOnInit() {
  }


  addItem() {
    if( this.nombreItem.length === 0) {
      return;
    }

    const newItem = new ListaItem( this.nombreItem );
    this.lista.items.push( newItem );

    this.nombreItem = '';
    this.deseosService.saveStorage();
  }

  cambioCkeck( item: ListaItem) {

    const pending = this.lista.items.filter( itemData => !itemData.completado ).length;

    if(pending === 0){
      this.lista.terminadaEn = new Date();
      this.lista.completada = true;
    } else {
      this.lista.terminadaEn = null;
      this.lista.completada = false;
    }

    this.deseosService.saveStorage();
    console.log(this.deseosService.listas);

  }

}
