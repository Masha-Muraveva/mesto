export class UserInfo {
  constructor({nameSelector, descriptionSelector, avatarSelector}) {
    this._userName = document.querySelector(nameSelector);
    this._userDescription = document.querySelector(descriptionSelector);
    this._userAvatar = document.querySelector(avatarSelector);
  }
  
  getUserInfo() {
    return {
      name: this._userName.textContent,
      about: this._userDescription.textContent,
      avatar: this._userAvatar.src,
    }
  }
  
  setUserInfo(data) {
    this._userName.textContent = data.name;
    this._userDescription.textContent = data.about;
  }

  setUserAvatar(avatar) {
    this._userAvatar.src = avatar;
  }
}