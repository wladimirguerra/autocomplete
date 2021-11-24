import * as React from "react";
import { queryBrazilianState } from "../api/brasilianStates";
import PropTypes from "prop-types";
import { AsyncAutocomplete } from "./AsyncAutocomplete";

class BrazilianStatesAutoComplete extends React.Component {

    render() {
        return (
            <AsyncAutocomplete
                asyncCallback={queryBrazilianState}
                renderOption={(state) => state.nome}
                onSelected={this.props.onSelected}
            />
        );
    };
}

BrazilianStatesAutoComplete.propTypes = {
    onSelected: PropTypes.func
}

export default BrazilianStatesAutoComplete
