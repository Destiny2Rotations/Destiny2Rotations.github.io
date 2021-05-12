import * as fromCommon from './common/common.reducer'
import { ActionReducerMap } from '@ngrx/store'
import { from } from 'rxjs'

export interface AppState {
    common: fromCommon.State;
}

export const appReducer: ActionReducerMap<AppState> = {
    common: fromCommon.reducer
}
