import * as firebase from 'firebase';

export const handleLogOut = async () => {
    firebase.auth().signOut();
};