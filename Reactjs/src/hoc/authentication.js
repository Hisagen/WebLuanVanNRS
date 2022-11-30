import locationHelperBuilder from "redux-auth-wrapper/history4/locationHelper";
import { connectedRouterRedirect } from "redux-auth-wrapper/history4/redirect";

const locationHelper = locationHelperBuilder({});

export const VienchucIsAuthenticated = connectedRouterRedirect({
  authenticatedSelector: (state) => state.vienchuc.isLoggedIn,
  wrapperDisplayName: "VienchucIsAuthenticated",
  redirectPath: "/login",
});

export const VienchucIsNotAuthenticated = connectedRouterRedirect({
  // Want to redirect the user when they are authenticated
  authenticatedSelector: (state) => !state.vienchuc.isLoggedIn,
  wrapperDisplayName: "VienchucIsNotAuthenticated",
  redirectPath: (state, ownProps) =>
    locationHelper.getRedirectQueryParam(ownProps) || "/",
  allowRedirectBack: false,
});
