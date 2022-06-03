import { UpdateActivityComponent } from './Admin/update-activity/update-activity.component';
import { DashboardComponent } from './Admin/dashboard/dashboard.component';
import { GestionReceptionComponent } from './Admin/gestion-reception/gestion-reception.component';
import { GestionReservationComponent } from './Admin/gestion-reservation/gestion-reservation.component';
import { ForbiddenComponent } from './LoginRegister/forbidden/forbidden.component';
import { ProfileComponent } from './Admin/profile/profile.component';
import { GestionActivityComponent } from './Admin/gestion-activity/gestion-activity.component';
import { UpdateRoomComponent } from './Admin/update-room/update-room.component';
import { GestionRoomComponent } from './Admin/gestion-room/gestion-room.component';
import { RegisterComponent } from './LoginRegister/register/register.component';

import { LoginComponent } from './LoginRegister/login/login.component';
import { GestionUserComponent } from './Admin/gestion-user/gestion-user.component';


import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {BaseLayoutComponent} from './Layout/base-layout/base-layout.component';
import {PagesLayoutComponent} from './Layout/pages-layout/pages-layout.component';

// DEMO PAGES

// Dashboards

import {AnalyticsComponent} from './DemoPages/Dashboards/analytics/analytics.component';

// Pages

import {ForgotPasswordBoxedComponent} from './DemoPages/UserPages/forgot-password-boxed/forgot-password-boxed.component';
import {LoginBoxedComponent} from './DemoPages/UserPages/login-boxed/login-boxed.component';
import {RegisterBoxedComponent} from './DemoPages/UserPages/register-boxed/register-boxed.component';

// Elements

import {StandardComponent} from './DemoPages/Elements/Buttons/standard/standard.component';
import {DropdownsComponent} from './DemoPages/Elements/dropdowns/dropdowns.component';
import {CardsComponent} from './DemoPages/Elements/cards/cards.component';
import {ListGroupsComponent} from './DemoPages/Elements/list-groups/list-groups.component';
import {TimelineComponent} from './DemoPages/Elements/timeline/timeline.component';
import {IconsComponent} from './DemoPages/Elements/icons/icons.component';

// Components

import {AccordionsComponent} from './DemoPages/Components/accordions/accordions.component';
import {TabsComponent} from './DemoPages/Components/tabs/tabs.component';
import {CarouselComponent} from './DemoPages/Components/carousel/carousel.component';
import {ModalsComponent} from './DemoPages/Components/modals/modals.component';
import {ProgressBarComponent} from './DemoPages/Components/progress-bar/progress-bar.component';
import {PaginationComponent} from './DemoPages/Components/pagination/pagination.component';
import {TooltipsPopoversComponent} from './DemoPages/Components/tooltips-popovers/tooltips-popovers.component';

// Tables

import {TablesMainComponent} from './DemoPages/Tables/tables-main/tables-main.component';

// Widgets

import {ChartBoxes3Component} from './DemoPages/Widgets/chart-boxes3/chart-boxes3.component';

// Forms Elements

import {ControlsComponent} from './DemoPages/Forms/Elements/controls/controls.component';
import {LayoutComponent} from './DemoPages/Forms/Elements/layout/layout.component';

// Charts

import {ChartjsComponent} from './DemoPages/Charts/chartjs/chartjs.component';
import { UpdateUserComponent } from './Admin/update-user/update-user.component';
import { AdminGuard } from './Guard/admin.guard';

const routes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,
    children: [

      // Dashboads


      // Elements
      
    

      {path: 'gestionUser', component: GestionUserComponent },
      {path: 'gestionReception', component: GestionReceptionComponent},

      {path: 'updateUser/:id', component: UpdateUserComponent},
      {path: 'updateRoom/:id', component: UpdateRoomComponent},
      {path: 'updateActivity/:id', component: UpdateActivityComponent},


      {path: 'gestionRoom', component: GestionRoomComponent, data: {extraParameter: 'elementsMenu'}},
      {path: 'gestionActivity', component: GestionActivityComponent, data: {extraParameter: 'elementsMenu'}},
      {path: 'gestionReservation', component: GestionReservationComponent, data: {extraParameter: 'elementsMenu'}},
      {path: 'profile', component: ProfileComponent, data: {extraParameter: 'elementsMenu'}},
      {path: 'dashboard', component: DashboardComponent, data: {extraParameter: 'elementsMenu'}},




      {path: 'elements/buttons-standard', component: StandardComponent, data: {extraParameter: 'elementsMenu'}},
      {path: 'elements/dropdowns', component: DropdownsComponent, data: {extraParameter: 'elementsMenu'}},
      {path: 'elements/icons', component: IconsComponent, data: {extraParameter: 'elementsMenu'}},
      {path: 'elements/cards', component: CardsComponent, data: {extraParameter: 'elementsMenu'}},
      {path: 'elements/list-group', component: ListGroupsComponent, data: {extraParameter: 'elementsMenu'}},
      {path: 'elements/timeline', component: TimelineComponent, data: {extraParameter: 'elementsMenu'}},

      // Components

      {path: 'components/tabs', component: TabsComponent, data: {extraParameter: 'componentsMenu'}},
      {path: 'components/accordions', component: AccordionsComponent, data: {extraParameter: 'componentsMenu'}},
      {path: 'components/modals', component: ModalsComponent, data: {extraParameter: 'componentsMenu'}},
      {path: 'components/progress-bar', component: ProgressBarComponent, data: {extraParameter: 'componentsMenu'}},
      {path: 'components/tooltips-popovers', component: TooltipsPopoversComponent, data: {extraParameter: 'componentsMenu'}},
      {path: 'components/carousel', component: CarouselComponent, data: {extraParameter: 'componentsMenu'}},
      {path: 'components/pagination', component: PaginationComponent, data: {extraParameter: 'componentsMenu'}},

      // Tables

      {path: 'tables/bootstrap', component: TablesMainComponent, data: {extraParameter: 'tablesMenu'}},

      // Widgets

      {path: 'widgets/chart-boxes-3', component: ChartBoxes3Component, data: {extraParameter: 'pagesMenu3'}},

      // Forms Elements

      {path: 'forms/controls', component: ControlsComponent, data: {extraParameter: 'formElementsMenu'}},
      {path: 'forms/layouts', component: LayoutComponent, data: {extraParameter: 'formElementsMenu'}},

      // Charts

      {path: 'charts/chartjs', component: ChartjsComponent, data: {extraParameter: ''}},

    ]

  },
  {
    path: '',
    component: PagesLayoutComponent,
    children: [

      // User Pages
      { path: '', redirectTo: 'login', pathMatch: 'full' },

      { path: 'register', component: RegisterComponent ,  data: {extraParameter: ''}},
      { path: 'forbidden', component: ForbiddenComponent  ,  data: {extraParameter: ''}},
      { path: 'login', component: LoginComponent,  data: {extraParameter: ''}},
      { path: 'register', component: RegisterComponent ,  data: {extraParameter: ''}},

      {path: 'pages/login-boxed', component: LoginBoxedComponent, data: {extraParameter: ''}},
      {path: 'pages/register-boxed', component: RegisterBoxedComponent, data: {extraParameter: ''}},
      {path: 'pages/forgot-password-boxed', component: ForgotPasswordBoxedComponent, data: {extraParameter: ''}},
    ]
  },
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
    })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
