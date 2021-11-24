# Autocomplete Component

This project contains two autocomplete components. One is a generic 
autocomplete and the second is a componsition of the first and is an
async autocomplete.

## How to run

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


## Usage

### `Autocomplete`

#### An array of strings as options

```jsx
import AutoComplete from "./AutoComplete";

const Form = () => {
    const [selectedFruit, setSelectedFruit] = useState(null);
    
    return (
        <form>
            <AutoComplete 
                name={'fruits'}
                options={[
                    'Apple',
                    'Orange',
                    'Banana'
                ]}
                onSelect={setSelectedFruit}
                />
        </form>
    )
}
```

#### An array of objects

It is possible to use any object as option but `renderOption` property 
must be parsed. It is a callback that takes the object and returns a
string.

```jsx
const Form = () => {
    const [selectedFruit, setSelectedFruit] = useState(null);
    
    return (
        <form>
            <AutoComplete 
                name={'fruits'}
                options={[
                    { name:"Apple", group: "fruit" },
                    { name:"Orange", group: "fruit" },
                    { name:"Banana", group: "fruit" },
                ]}
                renderOption={(option) => option.name}
                onSelect={setSelectedFruit}
                />
        </form>
    )
}
```

### `AsyncAutocomplete`

It takes an `asyncCallback` and handle the signaling and do the async 
handling to prevent memory leak.

```jsx
import { AsyncAutocomplete } from "./AsyncAutocomplete";

const Form = () => {
    const [selectedFruit, setSelectedFruit] = useState(null);

    return (
        <form>
            <AsyncAutocomplete
                name={'fruits'}
                asyncCallback={apiCall}
                renderOption={apiObjectRenderer}
                onSelect={setSelectedFruit}
            />
        </form>
    )
}
```
## Todo

More tests need to be done to use component in production. It also needs 
to be bundled as a library to proper build it as package.
