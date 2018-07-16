// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import { Task } from '../../models/task';

@Injectable()
export class TaskProvider {
  
  private dbPath = '/tasks';
  tasksRef: AngularFireList<Task> = null;

  constructor(public db: AngularFireDatabase) {
    console.log('Hello TaskProvider Provider');
    this.tasksRef = db.list(this.dbPath);
  }

  createTask(task: Task): void {
    this.tasksRef.push(task);
  }

  updateTask(key: string, value: any): void {
    this.tasksRef.update(key, value).catch(error => this.handleError(error));
  }

  deleteTask(key: string): void {
    this.tasksRef.remove(key).catch(error => this.handleError(error));
  }

  getTasksList(): AngularFireList<Task> {
    return this.tasksRef;
  }

  private handleError(error) {
    console.log(error);
  }

}
