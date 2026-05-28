import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminComponent } from "./admin.component";
import { AdminOverviewComponent } from "./admin-overview/admin-overview.component";
import { UserManagementComponent } from "./user-management/user-management.component";
import { DelayDemoComponent } from "./delay-demo/delay-demo.component";
const routes: Routes = [{ path: "", component: AdminComponent, children: [{ path: "", component: AdminOverviewComponent }, { path: "users", component: UserManagementComponent }, { path: "delay-demo", component: DelayDemoComponent }] }];
@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class AdminRoutingModule {}
