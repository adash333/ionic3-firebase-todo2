import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TaskProvider } from '../../providers/task/task';
import { Task } from '../../models/task';
import { AuthProvider } from '../../providers/auth/auth';

@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {
  title: string = 'タスク登録';
  /*
  tasks: { name: string }[] = [
    { name: 'タスク１'},
    { name: 'タスク２'},
  ];
  task: string;
  */
  tasks: any;
  task: Task;
  newTask = {name: ''};

  constructor(
    public navCtrl: NavController,
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

  addTask(newTask) {
    this.taskProvider.createTask(newTask);
    this.newTask = {name: ''};
  }

  /*
  addTask() {
    this.tasks.push({
      name: this.task
    });
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
    this.task='';
  }
  */

 logout() {
  //this.navCtrl.setRoot(LoginPage);
  this.authProvider.logoutUser();
  this.navCtrl.setRoot('LoginPage');
}

}
