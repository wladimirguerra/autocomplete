import * as React from "react";
import PropTypes from "prop-types";
import AutoComplete from "./AutoComplete/AutoComplete";
import { makeCancelable } from "../utils";


/**
 * This is an async autocomplete component that takes
 * a callback that takes a string as argument and return a Promise
 * of an array of objects.
 */
export class AsyncAutocomplete extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            options:[],
            isLoading: false,
        }
    }

    queryOptions = (query) => {

        // To prevent state update on an unmounted component make the promise cancelable
        const [promise, cancel] = makeCancelable(this.props.asyncCallback(query))

        this.cancelPromise = cancel

        this.setState(state => ({...state, isLoading: true}))
        promise.then(options => {
            this.setState(state => ({
                ...state,
                options,
                isLoading: false
            }));
        }).catch((e) => {
            if(!e.isCanceled){
                // show an error message
                console.error(e)
            }
        })

    }

    componentWillUnmount() {
        // Cancel the asyncCallback promise to prevent
        this.cancelPromise()
    }

    render() {
        return (
            <AutoComplete
                {...this.props}
                options={this.state.options}
                isLoading={this.state.isLoading}
                onChange={this.queryOptions}
            />
        );
    };
}

AsyncAutocomplete.propTypes = {
    asyncCallback: PropTypes.func.isRequired
}
