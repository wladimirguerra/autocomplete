import * as React from "react";
import ResultListContainer from "./ResultListContainer";
import PropTypes from "prop-types";
import { theme } from "../../../../theme";
import "./result-list.css"

const itemStyle = {
    padding: theme.spacingUnit,
    ...theme.font.body,
    borderBottomLeftRadius: theme.borderRadius,
    borderBottomRightRadius: theme.borderRadius,
};

export class ResultList extends React.Component {
    constructor(props) {
        super(props);
        this.containerRef = React.createRef();
    }

    componentDidMount() {
        // Hide popup if clicked outside
        document.addEventListener("mousedown", this.handleClickOutside);
        // Hide popup if window is resized
        window.addEventListener("resize", this.handleResize);
    }

    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside);
        window.removeEventListener("resize", this.handleResize);
    }

    /**
     * Hide popup if window is resized
     */
    handleResize = () => {
        this.props.onClose?.()
    }

    /**
     * Hide popup if clicked outside
     */
    handleClickOutside = (event) => {
        if (this.containerRef && !this.containerRef.current?.contains(event.target)) {
            this.props.onClose?.();
        }
    }

    render() {
        const options = this.props.options;
        const renderOption = this.props.renderOption;

        console.assert( !(typeof options[0] !== 'string' && !renderOption), "If options are objects then renderOption must not be null")

        return (
            <ResultListContainer ref={this.containerRef} anchor={this.props.anchor} show={this.props.show}>
                <div>
                    {options && options?.map(option => {
                        const label = renderOption ? renderOption(option) : option
                            return (<div key={label} style={itemStyle} className={"item"} onClick={() => {
                                this.props.onSelect?.(option);
                            }}>
                                {label}
                            </div>);
                        }
                        ,
                    )}
                </div>
            </ResultListContainer>
        );
    };
}

ResultList.propTypes = {
    anchor: PropTypes.any,
    options: PropTypes.array,
    renderOption: PropTypes.func,
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func,
    onSelect: PropTypes.func
};

export default ResultList;
