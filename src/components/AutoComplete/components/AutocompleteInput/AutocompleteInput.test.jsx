import renderer from "react-test-renderer";
import AutocompleteInput from "./AutocompleteInput";
import { fireEvent, render } from "@testing-library/react";

test("AutocompleteInput renders correctly", () => {
    const tree = renderer.create(<AutocompleteInput/>).toJSON();

    expect(tree).toMatchSnapshot();
});

test("AutocompleteInput loading signal render correctly", () => {
    const tree = renderer.create(<AutocompleteInput isLoading={true}/>).toJSON();

    expect(tree).toMatchSnapshot();
});

test("AutocompleteInput is focused", () => {
    const { getByTestId, asFragment } = render(<AutocompleteInput/>);
    const input = getByTestId("autocomplete-input-container");

    fireEvent.focus(input);

    expect(asFragment()).toMatchSnapshot();
});
