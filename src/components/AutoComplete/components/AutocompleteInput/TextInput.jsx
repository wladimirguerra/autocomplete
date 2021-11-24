import React from "react";
import { theme } from "../../../../theme";
import "./autocomplete-text-input.css"

const inputStyle = {
    padding: theme.spacingUnit,
};

class TextInput extends React.Component {
    render() {
        const { forwardedRef, ...inputProps} = this.props

        return (
            <input style={inputStyle} className={"autocomplete-text-input"}  {...inputProps} ref={this.props.forwardedRef} type={"text"}/>
        );
    }
}

export default React.forwardRef((props, ref) => <TextInput {...props} forwardedRef={ref}/>) ;
