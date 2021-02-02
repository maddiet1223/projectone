import {AppState} from './reducer';
import {AppAction, getReimbersements} from './actions';
import {ThunkAction} from 'redux-thunk';
import reimbursementService from './reimbursement/reimbursement.service';

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, AppAction>;

export const thunkGetReimbursements = (): AppThunk => async dispatch => {
    const asyncResp = await reimbursementService.getReimbursements();
    console.log('before thunk dispatch');
    dispatch(getReimbersements(asyncResp));
}





