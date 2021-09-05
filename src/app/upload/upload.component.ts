import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  constructor(private storage: AngularFireStorage) { }
  cv: any;

  ngOnInit(): void {
  }
  // tslint:disable-next-line:typedef
  upload(event: any) {
    if (event.target.files && event.target.files[0]) {
      const read = new FileReader();
      read.readAsDataURL(event.target.files[0]);
      this.cv = event.target.files[0];
      const pathfile = 'resumees/' + new Date().getTime();
      const fileref = this.storage.ref(pathfile);
      this.storage
        .upload(pathfile, this.cv)
        .snapshotChanges()
        .pipe(
          finalize(() => {

            fileref.getDownloadURL().subscribe((url) => {
              console.log(url);

            });
          })
        )
        .subscribe();

    }
  }
}
