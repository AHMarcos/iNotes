import { Injectable } from '@angular/core';
import { Lista } from '../models/lista.model';

@Injectable({
  providedIn: 'root'
})
export class DeseosService {

  public listas: Lista[] = [];

  constructor() {
    this.loadingStorage();
  }

  createList(title: string) {
    const listaNueva = new Lista(title);
    this.listas.push( listaNueva );
    this.saveStorage();

    return listaNueva.id;

  }

  getList( id: string | number) {
    id = Number(id);
    return this.listas.find( listaData => listaData.id === id );
  }

  saveStorage() {
    localStorage.setItem( 'data', JSON.stringify(this.listas) );
  }

  loadingStorage() {
    if( localStorage.getItem('data') ) {
      this.listas = JSON.parse( localStorage.getItem('data') );
    } else {
      this.listas = [];
    }
  }



}
