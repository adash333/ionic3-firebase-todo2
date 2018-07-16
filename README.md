# ionic3_firebase_todo2

このページは、[Ionicで作る モバイルアプリ制作入門 Web/iPhone/Android対応](https://amzn.to/2miPTb9)のCHAPTER03のTODOアプリを参考に、ionic3アプリ作成の練習を行っているものです。





src/environments/environment.ts は、ご自身で作成して、ご自身のfirebaseのAPIキーその他をコピペしてください。

```javascript:environment.ts
// <>となっている部分は、自分のapiKeyを入力
export const environment = {
  production: false,
  firebase: {
    apiKey: '<your-key>',
    authDomain: '<your-project-authdomain>',
    databaseURL: '<your-database-URL>',
    projectId: '<your-project-id>',
    storageBucket: '<your-storage-bucket>',
    messagingSenderId: '<your-messaging-sender-id>'
  }
};
```

## インストール方法


`git clone https://github.com/adash333/ionic3-firebase-todo2.git`

Run `npm install`to install all dependencies.

Run `ionic serve`to start the development environment.


作成経過は以下に記載しています。

http://twosquirrel.mints.ne.jp/?p=26136

http://twosquirrel.mints.ne.jp/?p=26262
