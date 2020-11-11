import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {finalize} from 'rxjs/operators';
import {AngularFireStorage} from '@angular/fire/storage';
import {DashboardService} from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  username: string;
  email: string;
  selectedImage: any = null;
  imgSrc: string;

  constructor(private authService: AuthService,
              private dashboardService: DashboardService,
              private storage: AngularFireStorage) { }

  ngOnInit(): void {
    this.authService.getUserInfo().subscribe(data => {
      this.username = data.username;
      this.email = data.email;
      // this.imgSrc = data.imgSrc;
    });
  }

  // tslint:disable-next-line:typedef
  submit() {
    if (this.selectedImage !== null){
      const filePath = `avatar/$(this.selectedImage.name.split('.').slice(0, -1).join('.'))_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe( url => {
            this.imgSrc = url;
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
