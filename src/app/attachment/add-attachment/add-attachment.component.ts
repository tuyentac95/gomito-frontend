import { Component, OnInit } from '@angular/core';
import {AttachmentService} from '../service/attachment.service';
import {finalize} from 'rxjs/operators';
import {GUser} from '../../user/GUser';
import {AngularFireStorage} from '@angular/fire/storage';
import {Attachment} from '../../attachment';

@Component({
  selector: 'app-add-attachment',
  templateUrl: './add-attachment.component.html',
  styleUrls: ['./add-attachment.component.css']
})
export class AddAttachmentComponent implements OnInit {
  imgSrc: string;
  selectedImage: any = null;

  constructor(private attachment: AttachmentService,
              private storage: AngularFireStorage) { }

  ngOnInit(): void {
  }

  submit(){
    if (this.selectedImage !== null){
      const filePath = `avatar/$(this.selectedImage.name.split('.').slice(0, -1).join('.'))_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);
      const $this = this;
      this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe( url => {
            this.imgSrc = url;
            const createAttachment: Attachment = {
              attachmentUrl: url,
            };
            $this.attachment.createAttachment(createAttachment).subscribe(data => {
              console.log('update ava ok');
            });
          });
        })
      ).subscribe();
    }
  }


  // tslint:disable-next-line:typedef
  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
      this.submit();
    } else {
      this.imgSrc = 'https://civilcode.ge/images/2/24/Blank-avatar.png';
      this.selectedImage = null;
    }
  }
}