import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./core/guards/auth.guard";
import { AdminGuard } from "./core/guards/admin.guard";
import { AccessDeniedComponent } from "./shared/components/access-denied/access-denied.component";

const routes: Routes = [
  { path: "", redirectTo: "auth/login", pathMatch: "full" },
  { path: "auth", loadChildren: () => import("./modules/auth/auth.module").then(m => m.AuthModule) },
  { path: "dashboard", loadChildren: () => import("./modules/dashboard/dashboard.module").then(m => m.DashboardModule), canActivate: [AuthGuard] },
  { path: "admin", loadChildren: () => import("./modules/admin/admin.module").then(m => m.AdminModule), canActivate: [AuthGuard, AdminGuard] },
  { path: "access-denied", component: AccessDeniedComponent },
  { path: "**", redirectTo: "auth/login" },
];

@NgModule({ imports: [RouterModule.forRoot(routes)], exports: [RouterModule] })
export class AppRoutingModule {}
