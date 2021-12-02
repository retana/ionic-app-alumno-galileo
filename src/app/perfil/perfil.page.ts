import { Component, OnInit, Sanitizer } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Camera, CameraResultType } from '@capacitor/camera';
import { DomSanitizer } from '@angular/platform-browser';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  public actualStudent;
  public urlImagen: any = 'https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y';
  public  position: any ={
    latitud: 59,
    longitud: 14
  };
  constructor(private router: ActivatedRoute, public toastController: ToastController, public sanitizer: DomSanitizer) { 
    this.printCurrentPosition().then();
  }

  ngOnInit() {
    this.router.params.subscribe(async res=> {
      this.actualStudent = res;
      this.presentToast('La información del alumno fue cargada.', 2000);
    });
  }
  async presentToast(_message: string, _duration: number) {
    const toast = await this.toastController.create({
      message: _message,
      duration: _duration
    });
    toast.present();
  }
  public takePicture = async () => {
    console.log('Dio clic en avatar');
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri
    });
    this.urlImagen = this.sanitizer.bypassSecurityTrustUrl(image.webPath);
    //imageElement.src = imageUrl;
    //console.log('Url',imageUrl);
  }

  public printCurrentPosition = async () => {
    const coordinates = await Geolocation.getCurrentPosition();
    console.log('Current position:', coordinates);
    this.position.latitud = coordinates.coords.latitude;
    this.position.longitud = coordinates.coords.longitude;
  };

  public  openMap(){
    window.open('https://www.google.com/maps/?q='+this.position.latitud+','+this.position.longitud);
  }
}