import {store} from './stores';
import ACTIONS from './actions/action';

window.store = store;
window.requestLoadingAction = ACTIONS.requestLoadingAction;
