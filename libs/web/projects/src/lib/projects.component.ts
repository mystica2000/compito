import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'compito-projects',
  template: ` <section class="p-8">
    <compito-page-header title="Projects"> </compito-page-header>
    <div class="projects__list">
      <compito-project-card></compito-project-card>
      <compito-project-card></compito-project-card>
      <compito-project-card></compito-project-card>
      <compito-project-card></compito-project-card>
      <compito-project-card></compito-project-card>
      <compito-project-card></compito-project-card>
      <compito-project-card></compito-project-card>
      <compito-project-card></compito-project-card>
    </div>
  </section>`,
  styles: [
    `
      .projects__list {
        @apply mt-8;
        @apply grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}