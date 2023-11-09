import React, { useReducer } from 'react';
import Context from './utils/context';
import * as ACTIONS from './store/actions/actions';
import * as Reducer1 from './store/reducers/plain_reducer';
import * as AuthReducer from './store/reducers/auth_reducer';
import * as FormReducer from './store/reducers/form_reducer';
import * as PostsReducer from './store/reducers/post_reducer'
import Routes from './routes';
import Auth from './utils/auth';

const auth = new Auth();

const ContextState = () => {

    // Plain Reducer
    const [stateReducer1, dispatchReducer1] = useReducer(Reducer1.Reducer1, Reducer1.initialState);

    const handleDispatchTrue = () => {
        dispatchReducer1(ACTIONS.success());
    }

    const handleDispatchFalse = () => {
        dispatchReducer1(ACTIONS.failure());
    }


    // Auth Reducer
    const [stateAuthReducer, dispatchAuthReducer] = useReducer(AuthReducer.AuthReducer, AuthReducer.initialState);

    const handleLogin = () => {
        dispatchAuthReducer(ACTIONS.login_success);
    }

    const handleLogout = () => {
        dispatchAuthReducer(ACTIONS.login_failure);
    }

    const handleAddProfile = (profile) => {
        dispatchAuthReducer(ACTIONS.add_profile(profile));
    }

    const handleRemoveProfile = () => {
        dispatchAuthReducer(ACTIONS.remove_profile());
    }

    const handleDBProfile = (profile) => {
        dispatchAuthReducer(ACTIONS.set_db_profile(profile));
    }

    const handleRemoveDBProfile = () => {
        dispatchAuthReducer(ACTIONS.remove_db_profile());
    }


    // Form Reducer
    const [stateFormReducer, dispatchFormReducer] = useReducer(FormReducer.FormReducer, FormReducer.initialState);

    const handleFormChange = (event) => {
        dispatchFormReducer(ACTIONS.user_input_change(event.target.value));
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();
        event.persist();
        dispatchFormReducer(ACTIONS.user_input_submit(event.target.useContext.value));
    }

    // Posts Reducer
    const [statePosts, dispatchPosts] = useReducer(PostsReducer.PostReducer, PostsReducer.initialState);

    const handleSetPosts = (posts) => {
        dispatchPosts(ACTIONS.set_db_posts(posts));
    }

    const handleRemovePosts = () => {
        dispatchPosts(ACTIONS.remove_db_posts());
    }

    // Handle authentication form callback
    const handleAuthentication = (props) => {
        if (props.location.hash) {
            auth.handleAuth();
        }
    }

    return (
        <div>
            <Context.Provider
                value={{
                    //Reducer 1
                    stateProp1: stateReducer1.stateprop1,
                    stateProp2: stateReducer1.stateprop2,
                    dispatchContectTrue: () => handleDispatchTrue(),
                    dispatchContextFalse: () => handleDispatchFalse(),

                    //Form Reducer
                    useContextChangeState: stateFormReducer.user_textChange,
                    sueContextSubmitState: stateFormReducer.user_textSubmit,
                    useContextSubmit: (event) => handleFormSubmit(event),
                    useConteChange: (event) => handleFormChange(event),

                    //Auth reducer
                    authState: stateAuthReducer.is_authenticated,
                    profileState: stateAuthReducer.profile,
                    dbProfileState: stateAuthReducer.db_profile,
                    handleuserLogin: () => handleLogin(),
                    handleUserLogout: () => handleLogout(),
                    handleUserAddprofile: (profile) => handleAddProfile(profile),
                    handleUserRemoveProfile: () => handleRemoveProfile(),
                    handleDBProfile: (profile) => handleDBProfile(profile),
                    handleRemoveDBProfile: () => handleRemoveDBProfile(),

                    // handle posts
                    postsState: statePosts.db_profile,
                    handleAddPosts: (posts) => handleSetPosts(posts),
                    handleRemovePosts: () => handleRemovePosts(),

                    //handle Auth
                    handleAuth: (props) => handleAuthentication(props),
                    authObj: auth
                }}>
                <Routes />
            </Context.Provider>
        </div>
    )
}

export default ContextState;