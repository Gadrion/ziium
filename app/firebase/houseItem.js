const wirteHouseItem = (userId, name, email, imageUrl) => {
    db.ref('users/' + userId).set({
      username: name,
      email: email,
      profile_picture : imageUrl
    }, error => {
        if (error) {
            console.log('wirteHouseItem error', error);
        } else {
            console.log('wirteHouseItem success');
        }
    });
};