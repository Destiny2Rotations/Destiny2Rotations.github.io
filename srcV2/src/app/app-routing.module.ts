import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JetCuratedComponent } from './components/jet-curated/jet-curated.component';
import { RotationsComponent } from './components/rotations/rotations.component';

const routes: Routes = [
  { path: '', component: RotationsComponent },
  { path: 'jet-curated', component: JetCuratedComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
