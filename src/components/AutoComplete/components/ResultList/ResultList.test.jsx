import renderer from "react-test-renderer";
import ResultList from "./ResultList";
import React from "react";

const options = ["Apple", "Orange", "Banana"];

const anchor = { current: {} };

test("renders string options correctly", () => {
    const tree = renderer.create(<ResultList anchor={anchor} show={true} options={options}/>).toJSON();

    expect(tree).toMatchSnapshot();
});

const objectOptions = [
    {
        name: "Apple",
        group: "Fruit",
    },
    {
        name: "Orange",
        group: "Fruit",
    },
    {
        name: "Banana",
        group: "Fruit",
    },
];

test("render object options correctly", () => {
    const tree = renderer.create(<ResultList anchor={anchor} show={true} options={objectOptions}
                                             renderOption={(option) => option.name ?? "no name"}/>).toJSON();

    expect(tree).toMatchSnapshot();
});

