import locationHelperBuilder from "redux-auth-wrapper/history4/locationHelper";
import { connectedRouterRedirect } from "redux-auth-wrapper/history4/redirect";

const locationHelper = locationHelperBuilder({});

export const benhnhanIsAuthenticated = connectedRouterRedirect({
    authenticatedSelector: state => state.benhnhan.isLoggedInBN,
    wrapperDisplayName: 'benhnhanIsAuthenticated',
    redirectPath: '/login1'
});

export const benhnhanIsNotAuthenticated = connectedRouterRedirect({
    // Want to redirect the user when they are authenticated
    authenticatedSelector: state => !state.benhnhan.isLoggedInBN,
    wrapperDisplayName: 'benhnhanIsNotAuthenticated',
    redirectPath: (state, ownProps) => locationHelper.getRedirectQueryParam(ownProps) || '/',
    allowRedirectBack: false
});