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
    db.ref('test').set({
        username: 'test',
        imageName : 'test/png',
        // 넘겨 받는 정보 그대로 넣자.
        ...itemInfo,
      }, error => {
          if (error) {
              console.log('wirteHouseItem error', error);
          } else {
              console.log('wirteHouseItem success');
          }
      });
}

const storageItemWrite = imageInfo => {
    storage.child('test/' + imageInfo.name).put(imageInfo).then(snapshot => {
        console.log('suc');
    });
}