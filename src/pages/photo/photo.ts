import {Component} from '@angular/core';
import {
    NavController, ModalController, ActionSheetController,
    ToastController, Platform, LoadingController, Loading, ViewController
} from 'ionic-angular';
import {Camera, File, Transfer, FilePath} from 'ionic-native';
import {ModalPhotoPage} from "../modal-photo/modal-photo";
import {GaleriaService} from '../../../services/galeria.service';
import {Galeria} from '../../../services/galeria';

declare var cordova: any;

@Component({
    selector: 'page-photo',
    templateUrl: 'photo.html'
})
export class PhotoPage {
    lastImage: string = null;
    loading: Loading;
    newest: any;
    listaGal: Galeria[];

    constructor(public navCtrl: NavController, public actionSheetCtrl: ActionSheetController,
        public toastCtrl: ToastController, public platform: Platform, public loadingCtrl: LoadingController,
        public modalCtrl: ModalController, public viewCtrl: ViewController, private servicio: GaleriaService) {
        this.newest = localStorage.getItem('establec');
        this.loadGaleria(this.newest);
    }

    loadGaleria(newest) {
        this.servicio.getGaleria(newest)
            .subscribe(
            data => this.listaGal = data,
            er => console.log(er),
            () => console.log('ok')
            );
    }

    insertGaleria(img: string) {
        let idest = this.newest;
        let imagen = img;
        let ppal = 0;
        this.servicio.insertGaleria({idest, imagen, ppal})
            .subscribe(
            res => console.log(res),
            er => console.log(er),
            () => console.log('OK!')
            )
    }

    public presentActionSheet() {
        let actionSheet = this.actionSheetCtrl.create({
            title: 'Seleccione origen de la foto',
            buttons: [
                {
                    text: 'Galeria',
                    handler: () => {
                        this.takePicture(Camera.PictureSourceType.PHOTOLIBRARY);
                    }
                },
                {
                    text: 'Camara',
                    handler: () => {
                        this.takePicture(Camera.PictureSourceType.CAMERA);
                    }
                },
                {
                    text: 'Cancelar',
                    role: 'cancelar'
                }
            ]
        });
        actionSheet.present();
    }

    public takePicture(sourceType) {
        // Create options for the Camera Dialog
        let options = {
            quality: 100,
            sourceType: sourceType,
            saveToPhotoAlbum: false,
            correctOrientation: true
        };

        // Get the data of an image
        Camera.getPicture(options).then((imagePath) => {
            // Special handling for Android library
            if (this.platform.is('android') && sourceType === Camera.PictureSourceType.PHOTOLIBRARY) {
                FilePath.resolveNativePath(imagePath)
                    .then(filePath => {
                        let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
                        let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
                        this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
                    });
            } else {
                let currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
                let correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
                this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
            }
        }, (err) => {
            this.presentToast('No se selecciono imagen!');
        });
    }

    private createFileName() {
        let d = new Date(),
            n = d.getTime(),
            newFileName = n + ".jpg";
        return newFileName;
    }

    // Copy the image to a local folder
    private copyFileToLocalDir(namePath, currentName, newFileName) {
        File.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
            this.lastImage = newFileName;
        }, error => {
            this.presentToast('Error al almacenar la imagen!');
        });
    }

    private presentToast(text) {
        let toast = this.toastCtrl.create({
            message: text,
            duration: 3000,
            position: 'top'
        });
        toast.present();
    }

    // Always get the accurate path to your apps folder
    public pathForImage(img) {
        if (img === null) {
            return '';
        } else {
            return cordova.file.dataDirectory + img;
        }
    }

    public uploadImage() {
        // Destination URL
        let url = "http://54.68.202.167/arl-est/igal.php";

        // File for Upload
        let targetPath = this.pathForImage(this.lastImage);

        // File name only
        let filename = this.lastImage;

        let options = {
            fileKey: "file",
            fileName: filename,
            chunkedMode: false,
            mimeType: "image/jpeg",
            params: {'fileName': filename}
        };
        this.insertGaleria(filename);
        const fileTransfer = new Transfer();

        this.loading = this.loadingCtrl.create({
            content: 'Subiendo...',
        });
        this.loading.present();

        // Use the FileTransfer to upload the image
        fileTransfer.upload(targetPath, url, options).then(data => {
            this.loading.dismissAll();
            this.navCtrl.setRoot(PhotoPage);
            this.presentToast('Se ha subido su foto!');
        }, err => {
            this.loading.dismissAll();
            this.presentToast('Error al subir su foto!');
        });
    }

    ionViewWillEnter() {
        this.loadGaleria(this.newest);
    }

    doRefresh(refresher) {
        this.loadGaleria(this.newest);
        this.lastImage === null;
        setTimeout(() => {
            refresher.complete();
        }, 200);
    }

    openModal(title: number) {
        let item = {idGal: title};
        let modal = this.modalCtrl.create(ModalPhotoPage, item);
        modal.present();
    }



}