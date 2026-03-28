import { inject } from '@angular/core';

import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { firstValueFrom } from 'rxjs';

import { TaskInterface } from '../interfaces/task.interface';
import { MainService } from '../main-service/main.service';

type tasksState = {
  tasks: TaskInterface[];
  loading: boolean;
};

//definicja bazowego stanu - źródło prawdy
const initialState: tasksState = {
  tasks: [],
  loading: false,
};

export const tasksStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, mainService = inject(MainService)) => ({
    //GET
    async loadAllTasks() {
      //patchState() - bezpieczne aktualizowanie elementów tasks (w tym wypadku) pod względem typów
      //pierwszy parametr, to źródło prawdy (initialState), drugi parametr elementy aktualizowane
      patchState(store, { loading: true });

      try {
        //firstValueFrom - zmienia typ Observable na Promise -> await znosi Promise -> zostaje sam typ tasks (TaskInterface[])
        //Dodatkowo pobiera pierwszą wartość ze strumienia - GET zwraca tylko jedną wartość
        const tasks = await firstValueFrom(mainService.getAllTasks());
        patchState(store, { tasks, loading: false });
      } catch (error) {
        console.error(error);
        patchState(store, { loading: false });
      }
    },

    //CREATE
    async createTask(task: TaskInterface) {
      try {
        const newTask = await firstValueFrom(mainService.createNewTask(task));
        patchState(store, {
          tasks: [...store.tasks(), newTask], //to, co było w tablicy tasków + nowy task
        });
      } catch (error) {
        console.error(error);
      }
    },

    //UPDATE
    async editTask(id: string, editedTask: TaskInterface) {
      try {
        const updatedTask = await firstValueFrom(
          mainService.updateTask(id, editedTask),
        );
        patchState(store, {
          tasks: store
            .tasks()
            .map((task) => (task._id === updatedTask._id ? updatedTask : task)),
        });
      } catch (error) {
        console.error(error);
      }
    },

    //DELETE
    async removeTask(id: string) {
      try {
        await firstValueFrom(mainService.deleteTask(id));
        patchState(store, {
          tasks: store.tasks().filter((val) => val._id !== id),
        });
      } catch (error) {
        console.error(error);
      }
    },
  })),
  withHooks({
    //withHooks - odpowiednik lifecycle hooks z komponentu
    onInit(store) {
      //onInit() - odpowiednik ngOnInit z komponentu z inicjalizacją metod ze store
      store.loadAllTasks();
    },
  }),
);

//TODO: Napisać sobie notki o metodach ze store i jak działają (może z przykładami - who knows)
