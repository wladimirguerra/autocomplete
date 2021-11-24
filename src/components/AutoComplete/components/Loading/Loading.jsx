import * as React from "react";
import { theme } from "../../../../theme";
import "./loading.css"

const themedLoadingStyles = {
    backgroundColor: theme.accentColor,
    margin: theme.spacingUnit,
    height: theme.spacingUnit * 2,
    width: theme.spacingUnit *2,
}

/**
 * A small circle wich pulses.
 *
 * @return {JSX.Element}
 */
export const Loading = () => {

    return (
        <div className={"loading"} style={themedLoadingStyles}/>
    );
};

