import React from "react";
import { User } from "../domain/user";

export const UserContext = React.createContext<{
  user?: User | null
}>({user: null});
