import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController } from 'ionic-angular';
import { TaskProvider } from '../../providers/task/task';
import { Task } from '../../models/task';
import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-task-list',
  templateUrl: 'task-list.html',
})
export class TaskListPage {
  tasks: any;
  task: Task;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    public alertCtrl: AlertController,
    private taskProvider: TaskProvider,
    public authProvider: AuthProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TaskListPage');
    this.getTasksList();
  }

  getTasksList() {
    // Use snapshotChanges().map() to store the key
    this.taskProvider.getTasksList().snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    }).subscribe(tasks => {
      this.tasks = tasks;
    })
  }

  /*
  ionViewWillEnter() {
    if(localStorage.getItem('tasks')) {
      this.tasks = JSON.parse(localStorage.getItem('tasks'));
    }
  }
  */

  changeTask(index: number, key: string) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'タスクの変更',
      buttons: [
        {
          text: '削除',
          role: 'destructive',
          handler: () => {
            console.log('Destructive clicked');
            // this.tasks.splice(index, 1);
            // localStorage.setItem('tasks', JSON.stringify(this.tasks));
            this.taskProvider.deleteTask(key);
          }
        }, {
          text: '変更',
          handler: () => {
            console.log('Archive clicked');
            this._renameTask(index, key);
          }
        }, {
          text: '閉じる',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  _renameTask(index: number, key: string) {
    let prompt = this.alertCtrl.create({
      title: '変更後のタスク',
      inputs: [
        {
          name: 'task',
          placeholder: 'タスク',
          value: this.tasks[index].name
        },
      ],
      buttons: [
        {
          text: '閉じる'
        },
        {
          text: '保存',
          handler: data => {
            // タスクのindex番目を書き換え
            this.tasks[index] = { name: data.task};
            // localStorageに保存
            //localStorage.setItem('tasks', JSON.stringify(this.tasks));
            
            // Firebaseに保存
            this.taskProvider.updateTask(key, {
              name: this.tasks[index].name, 
            });
          }
        }
      ]
    });
    prompt.present();
  }

  logout() {
    //this.navCtrl.setRoot(LoginPage);
    this.authProvider.logoutUser();
    this.navCtrl.setRoot(LoginPage);
  }

}
