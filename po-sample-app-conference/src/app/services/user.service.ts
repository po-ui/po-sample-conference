import { Injectable } from '@angular/core';

import { PoEntity } from '@po-ui/ng-sync';
import { PoStorageService } from '@po-ui/ng-storage';
import { PoSyncService, PoHttpRequestData, PoHttpRequestType } from '@po-ui/ng-sync';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  userModel: PoEntity;

  constructor(private poSync: PoSyncService, private poStorage: PoStorageService) {
    this.userModel = this.poSync.getModel('Users');
  }

  async addFavoriteLecture(lectureId, loggedUser) {
    const user: any = await this.userModel.findById(loggedUser).exec();
    user.favoriteLectures = user.favoriteLectures || [];

    if (!user.favoriteLectures.includes(lectureId)) {
      user.favoriteLectures.push(lectureId);

      await this.userModel.save(user);

    } else {
      throw new Error();
    }

  }

  async addFavoriteLectureList(lecturesId) {
    const loggedUser = await this.getLoggedUserId();

    if (!(lecturesId instanceof Array)) {
      lecturesId = [lecturesId];
    }

    for (const lectureId of lecturesId) {
      await this.addFavoriteLecture(lectureId, loggedUser);
    }

  }

  createUser(user) {
    user.isSuperUser = false;

    const requestData: PoHttpRequestData = {
      url:  `${environment.apiURL}/users/`,
      method: PoHttpRequestType.POST,
      body: user
    };

    this.poSync.insertHttpCommand(requestData, user.username);
  }

  async getFavoriteLectures() {
    const loggedUser = await this.getLoggedUserId();
    const user: any = await this.userModel.findById(loggedUser).exec();
    return 'favoriteLectures' in user ? user.favoriteLectures : undefined;
  }

  async getLoggedUserId() {
    const login = await this.poStorage.get('login');
    return login ? login.userId : undefined;
  }

  async getLoggedUser() {
    const userid = await this.getLoggedUserId();

    return this.userModel.findById(userid).exec();
  }

  async getUsers() {
    const userData: any = await this.userModel.find().exec();
    return userData.items;
  }

  async onLogin(username, password) {
    const users: any = await this.getUsers();

    const foundUser = users.find(user => {
      return (user.username === username) && (user.password === password);
    });

    return foundUser ? this.logIn(foundUser) : Promise.reject('User not found');
  }

  async removeFavoriteLecture(lectureId) {
    const loggedUser = await this.getLoggedUserId();
    const user: any = await this.userModel.findById(loggedUser).exec();

    user.favoriteLectures = user.favoriteLectures.filter(id => lectureId !== id);
    await this.userModel.save(user);

  }

  synchronize() {
    return this.poSync.sync();
  }

  logIn(foundUser) {
    return this.poStorage.set('login', { userId: foundUser.id });
  }

}
