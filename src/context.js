import React from "react";

const context = React.createContext();

context.Provider.displayName = "Router.Provider";
context.Consumer.displayName = "Router.Consumer";

export default context;