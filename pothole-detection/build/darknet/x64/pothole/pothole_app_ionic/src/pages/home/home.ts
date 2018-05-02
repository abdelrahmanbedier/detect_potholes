import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { HttpClient,HttpHeaders, HttpXsrfTokenExtractor } from '@angular/common/http';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  imgUrl;
  imageName;
  imagePath;
  reading=false;
  flag=false;
  constructor(public navCtrl: NavController,public alertCtrl:AlertController,public camera: Camera,public http:HttpClient) {

  }


  capture(sourceType:number){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType:sourceType,
      
    };
    
    this.camera.getPicture(options).then((imageData) => {
     this.imageName = imageData;
     this.imgUrl = 'data:image/jpeg;base64,' + imageData;
     this.flag=true;
     this.reading=false;
     this.imagePath='';
     this.transferData()

    }, (err) => {
     // Handle error
    });
  }
  transferData(){
    let formData = new FormData();
    // formData.append('category', 1);
    // formData.append('status', 'Y');
    formData.append('image', this.imageName); 
    this.http.post("http://10.0.0.121:8000/imageapi", formData).subscribe((res:any) => {
    this.imagePath="http://10.0.0.121:8000/media/images/predictions.jpg"
    this.flag=false;
    this.reading=true;
        var message = "The image was successfully uploaded!"+res.path;
        this.showAlert(message);
      
      
    }, (err) => {
      var message = "Error in uploading file " + err.errors;
      this.showAlert(message);
    });
  }
  showAlert(message) {
    let alert = this.alertCtrl.create({
      title: 'Message',
      subTitle: message,
      buttons: ['OK']

    });
    
    alert.present();
  }



}
