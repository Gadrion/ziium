// import { firebaseJSFileLoad } from '../util/utils';

const firebaseJSFileLoad = firebaseInitFunc => {
    const scripts = [
        'https://www.gstatic.com/firebasejs/7.1.0/firebase-app.js',
        'https://www.gstatic.com/firebasejs/7.1.0/firebase-storage.js',
        'https://www.gstatic.com/firebasejs/7.1.0/firebase-firestore.js',
        'https://www.gstatic.com/firebasejs/7.1.0/firebase-auth.js',
        'https://www.gstatic.com/firebasejs/7.1.0/firebase-database.js',
    ];
    
    let count = 0;
    const recursivelyAddScript = (script, cb) => {
      const el = document.createElement('script')
      el.src = script;
      if(count < scripts.length) {
        count ++
        el.onload = () => {
            recursivelyAddScript(scripts[count]);
        };
        document.head.appendChild(el);
      } else {
        console.log('All script loaded')
        firebaseInitFunc();
        return
      }
    }
     
    recursivelyAddScript(scripts[count]);
};
  
firebaseJSFileLoad(() => {
    // Your web app's Firebase configuration
    const firebaseConfig = {
        apiKey: 'AIzaSyCIIZXVFNo0rktUqj7aadfIAMDY5kzB2gU',
        authDomain: 'ziium-bb222.firebaseapp.com',
        databaseURL: 'https://ziium-bb222.firebaseio.com',
        projectId: 'ziium-bb222',
        storageBucket: 'ziium-bb222.appspot.com',
        messagingSenderId: '361643278079',
    };

    // Initialize Firebase
    window.fb = firebase.initializeApp(firebaseConfig);
    window.db = fb.database();
    window.storage = fb.storage().ref();

    // test code
    fb.database().ref('admin').once('value', data => {
        console.log('data value', data.val());
    });

    fb.database().ref('map').once('value', data => {
        console.log('data value', data.val());
    });

    // storage.child('Image.jpg').getDownloadURL().then(url => {
    //     document.getElementById('test').src = url;
    // });
});
