import renderer from "react-test-renderer";
import AutoComplete from "./AutoComplete";

test("renders correctly", () => {
    const tree = renderer.create(<AutoComplete options={["Apple","Banana"]}/>).toJSON()

    expect(tree).toMatchSnapshot()
});
test("renders correctly when loading", () => {
    const tree = renderer.create(<AutoComplete options={["Apple","Banana"]} isLoading={true}/>).toJSON()

    expect(tree).toMatchSnapshot()
});
