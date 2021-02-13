import * as firebase from 'firebase';
// import { RootStore } from 'src/store/store';
export const provider = new firebase.default.auth.GoogleAuthProvider();

export const handleOpenGoogleAuthPopUp = (store: RootStore) => {
  return firebase
    .auth()
    .signInWithPopup(provider)
    .then(res => {
      const token = res?.credential;
      const user = res.user;
      if (user?.displayName) {
        store.LoginStore.profileName = user?.displayName;
      }
      return user;
    })
    .catch(err => console.log(err));
};

export const handleSignInWithGoogle = (store: RootStore) => {
  firebase
    .default
    .auth()
    .setPersistence(firebase.default.auth.Auth.Persistence.LOCAL)
    .then(() => handleOpenGoogleAuthPopUp(store));
};
