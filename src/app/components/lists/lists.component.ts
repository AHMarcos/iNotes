import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonList } from '@ionic/angular';

import { DeseosService } from '../../services/deseos.service';

import { Lista } from '../../models/lista.model';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss'],
})
export class ListsComponent implements OnInit {


  @ViewChild( IonList ) lista: IonList;
  @Input() finish = true;


  constructor( public deseosService: DeseosService,
               private router: Router,
               private alertCtrl: AlertController ) {}


  ngOnInit() {}


  listaSeleccionada( lista: Lista ) {
    if (this.finish === true) {
      this.router.navigateByUrl(`/tabs/tab2/add/${ lista.id }`);
    } else {
      this.router.navigateByUrl(`/tabs/tab1/add/${ lista.id }`);
    }
  }

  deleteList( lista: Lista ) {

    this.deseosService.deleteList( lista );
    console.log({lista});

  }

  async editList( lista: Lista ) {

    const alert = await this.alertCtrl.create({
      header: 'Edit List',
      inputs: [
        {
          name: 'title',
          type: 'text',
          value: lista.titulo,
          placeholder: 'New list name'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler:  () => {
            console.log('se canceló');
            this.lista.closeSlidingItems();
          }
        },
        {
          text: 'Update',
          handler: ( data ) => {
            console.log(data);
            if( data.title.lenght === 0) {
              return;
            }
            lista.titulo = data.title;
            this.deseosService.saveStorage();
            this.lista.closeSlidingItems();
          }
        }
      ]
    });

    alert.present();

  }

}
