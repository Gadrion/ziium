const emailLogin = (email, password) => {
    return new Promise((resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
            console.log('succes');
            resolve(true);
        }).catch(error => {
            console.log('emailLogin error', error);
            reject(false);
        });
    });
};
