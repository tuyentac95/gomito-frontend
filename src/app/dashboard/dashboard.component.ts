import { Component, OnInit } from '@angular/core';
import {UserService} from '../user/user.service';
import {AuthService} from '../auth/auth.service';
import {finalize} from 'rxjs/operators';
import {AngularFireStorage} from '@angular/fire/storage';
import {DashboardService} from './dashboard.service';
import {GUser} from '../user/GUser';

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

  constructor(private userService: UserService,
              private dashboardService: DashboardService,
              private storage: AngularFireStorage) { }

  ngOnInit(): void {
    this.userService.getUserInfo().subscribe(data => {
      console.log(data.avatarUrl);
      this.username = data.username;
      this.email = data.email;
      this.imgSrc = data.avatarUrl;
    });
  }

  // tslint:disable-next-line:typedef
  submit() {
    if (this.selectedImage !== null){
      const filePath = `attachment/$(this.selectedImage.name.split('.').slice(0, -1).join('.'))_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);
      const $this = this;

      this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe( url => {
            this.imgSrc = url;
            const updateUser: GUser = {
              avatarUrl: url
            };
            $this.userService.updateUserAvatar(updateUser).subscribe(data => {
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
