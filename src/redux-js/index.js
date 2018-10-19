import ACTIONS from './actions/action';
import { store } from './stores';

window.store = store;
window.requestLoadingAction = ACTIONS.requestLoadingAction;
window.socialLoginServiceAction = ACTIONS.socialLoginServiceAction;
