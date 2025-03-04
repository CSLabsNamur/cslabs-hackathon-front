import React, { ComponentType } from "react";
import { Location, NavigateFunction, Params, useLocation, useNavigate, useParams } from "react-router-dom";

interface RouterProps {
  navigate: NavigateFunction;
  readonly params: Params;
  location: Location;
}

export type WithRouterProps<T> = T & RouterProps;
type OmitRouter<T> = Omit<T, keyof RouterProps>;

export function withRouter<T>(
  Component: ComponentType<OmitRouter<T> & RouterProps>,
) {
  return (props: OmitRouter<T>) => {
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();
    return (
      <Component
        location={location}
        navigate={navigate}
        params={params}
        {...props}
      />
    );
  };
}