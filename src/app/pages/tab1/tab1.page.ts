import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

import { DeseosService } from '../../services/deseos.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor( public deseosService: DeseosService,
               private router: Router,
               private alertCtrl: AlertController) {}

  async addList() {

    const alert = await this.alertCtrl.create({
      header: 'New list',
      inputs: [
        {
          name: 'title',
          type: 'text',
          placeholder: 'List name'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler:  () => {
            console.log('se canceló');
          }
        },
        {
          text: 'OK',
          handler: ( data ) => {
            console.log(data);
            if( data.title.lenght === 0) {
              return;
            }
            const listaId = this.deseosService.createList( data.title );
            this.router.navigateByUrl(`/tabs/tab1/add/${ listaId }`);
          }
        }
      ]
    });

    alert.present();

  }


}
