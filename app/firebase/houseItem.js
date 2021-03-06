// 물건을 저장하는 기준
// 도 -> 시 -> 구 -> 동으로 폴더 기준하여 저장한다.
// 저장하는 값을 입력하는 페이지의 기준으로 작성한다.

const writeHouseItem = async (userId, itemInfo) => {
    await dbItemWrite({
        username: userId,
        ...itemInfo,
    });

    await storageItemWrite(itemInfo.imageInfo);
};

const dbItemWrite = itemInfo => {
    // db.ref()
    const addressList = itemInfo.mapData.address.split(' ');
    let tempObject = '';
    const addressListLength = addressList.length - 1; // 끝에 숫자로 된 주소를 빼기 위함
    for(let i = 1; i < addressListLength; i++) {
        tempObject += `${addressList[i]}/`;
    }
    console.log('tempObject', tempObject);
    console.log('itemInfo', itemInfo.file);
    if (itemInfo.file) {
        storageItemWrite(itemInfo.file);
    }

    return new Promise((res, rej) => {
        db.ref(`map/${tempObject}`).update({
            username: 'test',
            // imageName : 'test/png',
            // 넘겨 받는 정보 그대로 넣자.
            ...itemInfo,
            }, error => {
                if (error) {
                    console.log('wirteHouseItem error', error);
                    rej(false);
                } else {
                    console.log('wirteHouseItem success');
                    res(true);
                }
            }
        );
    })
}

const storageItemWrite = imageInfo => {
    storage.child('test/' + imageInfo.name).put(imageInfo).then(snapshot => {
        console.log('suc', snapshot);
    });
}

const getAllHouseItem = () => new Promise(resolve => {
    db.ref('map').once('value', data => {
        resolve(data.val());
        console.log('data value', data.val());
    });
});