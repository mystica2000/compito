import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Task } from '@compito/api-interfaces';
import { Breadcrumb } from '@compito/web/ui';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { TasksActions } from './state/tasks.actions';
import { TasksState } from './state/tasks.state';

@Component({
  selector: 'compito-tasks',
  templateUrl: './tasks.component.html',
  styles: [
    `
      .tasks {
        &__container {
          @apply pb-10;
        }
        &__list {
          @apply pt-8;
          @apply grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 2xl:grid-cols-4 gap-4;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksComponent implements OnInit {
  breadcrumbs: Breadcrumb[] = [{ label: 'Home', link: '/' }];

  @Select(TasksState.getMyTasks)
  tasks$!: Observable<Task[]>;
  constructor(private store: Store, private auth: AuthService) {}

  ngOnInit(): void {
    this.store.dispatch(new TasksActions.GetMyTasks());
  }
}
