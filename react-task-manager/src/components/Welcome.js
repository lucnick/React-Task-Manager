// Welcome message used in main App() in src/App.js

function Welcome({greeting, user}) {

    return (
    <>
        <h1 className="text-left">{greeting}{user}</h1>
    </>
    )
}

export default Welcome;
