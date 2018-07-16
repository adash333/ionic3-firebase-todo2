import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
//import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage: any;
  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public afAuth: AngularFireAuth
  ) {

    const authObserver = afAuth.authState.subscribe( user => {
      if (user) {
        this.rootPage = HelloIonicPage;
        authObserver.unsubscribe();
      } else {
        this.rootPage = 'LoginPage';
        authObserver.unsubscribe();
      }
    });

    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'タスク登録', component: HelloIonicPage },
      { title: 'タスク一覧', component: 'TaskListPage' }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}
