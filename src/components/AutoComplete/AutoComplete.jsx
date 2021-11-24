import * as React from "react";
import PropTypes from "prop-types";
import ResultList from "./components/ResultList/ResultList";
import AutocompleteInput from "./components/AutocompleteInput/AutocompleteInput";

/**
 *
 */
class AutoComplete extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showResults: props.options ? props.options.length > 0 : false,
            query: "",
        };
        this.anchorRef = React.createRef();
        this.componentDidUpdate = this.componentDidUpdate.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.options !== this.props.options) {
            const show = this.props.options ? this.props.options.length > 0 : false;
            this.setState(state => ({
                ...state,
                showResults: show,
            }));
        }
    }

    handleOnInputChange = (event) => {
        const value = event.target.value;

        this.setState(state => ({ ...state, query: value, showResults: false }));

        this.props.onChange?.(value ?? "");
    };

    handleCloseResults = () => {
        this.setState(state => ({ ...state, showResults: false }));
    };

    handleSelect = (selected) => {
        const value = this.props.renderOption?.(selected);
        this.setState(state => ({
            ...state,
            showResults: false,
            query: value ?? state.query
        }));

        this.props.onSelect?.(selected);
    };

    render() {
        return (
            <div>
                <AutocompleteInput
                    ref={this.anchorRef}
                    isLoading={this.props.isLoading}
                    onChange={this.handleOnInputChange}
                    value={this.state.query}
                    name={this.props.name}
                />
                <ResultList
                    show={this.state.showResults && !this.props.isLoading}
                    anchor={this.anchorRef}
                    onClose={this.handleCloseResults}
                    options={this.props.options}
                    renderOption={this.props.renderOption}
                    onSelect={this.handleSelect}
                />
            </div>
        );
    };
}

AutoComplete.propTypes = {
    onChange: PropTypes.func,
    /**
     * A {@link TextInput} props
     */
    inputProps: PropTypes.object,
    options: PropTypes.array,
    isLoading: PropTypes.bool,
    renderOption: PropTypes.func,
    onSelect: PropTypes.func,
    name: PropTypes.string
};

export default AutoComplete;
