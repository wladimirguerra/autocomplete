import * as React from "react";
import PropTypes from "prop-types";
import { theme } from "../../../../theme";
import TextInput from "./TextInput";
import { Loading } from "../Loading/Loading";
import "./autocomplete-input.css";

const rootStyle = {
    backgroundColor: theme.backgroundColor,
    borderColor: theme.primaryColor,
    borderRadius: theme.borderRadius,
};

const statusContainerStyle = {};

const inputContainerStyle = {
    flex: 1,
};

class AutocompleteInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            backgroundColor: theme.backgroundColor,
        };
    }

    handleFocusIn = () => {
        this.setState({
            backgroundColor: theme.focusedBackgroundColor,
        });
    };

    handleFocusOut = () => {
        this.setState({
            backgroundColor: theme.backgroundColor,
        });
    };

    render() {
        const { isLoading, inputRef, ...inputProps } = this.props;

        return (
            <div ref={this.props.inputRef} className={"autocomplete-input"} style={{ ...rootStyle, backgroundColor: this.state.backgroundColor }}>
                <div style={inputContainerStyle}>
                    <TextInput
                        {...inputProps}
                        onChange={this.props.onChange}
                        onFocus={this.handleFocusIn}
                        onBlur={this.handleFocusOut}
                        data-testid="autocomplete-input-container"
                    />
                </div>
                <div style={{ ...statusContainerStyle, visibility: isLoading ? "visible" : "hidden" }}>
                    <Loading/>
                </div>
            </div>
        );
    }
}

AutocompleteInput.propTypes = {
    isLoading: PropTypes.bool,
    onChange: PropTypes.func,
    value: PropTypes.string,
    name: PropTypes.string
};

export default React.forwardRef((props, ref) => <AutocompleteInput {...props} inputRef={ref}/>);
