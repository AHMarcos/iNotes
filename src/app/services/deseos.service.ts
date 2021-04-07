import { Injectable } from '@angular/core';
import { Lista } from '../models/lista.model';
import { ListaItem } from '../models/lista-item.model';

@Injectable({
  providedIn: 'root'
})
export class DeseosService {

  public listas : Lista[] = [];

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

  deleteList( lista: Lista ) {

    this.listas = this.listas.filter( listaData => {
      return listaData.id !== lista.id;
    });

    this.saveStorage();

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
