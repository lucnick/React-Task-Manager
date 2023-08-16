// Parameters for creating a logo, used in App() function within src/App.js

function Logo({img, width, height, classes}) {
    return (
        <>
            <img src={img} 
            width={width} height={height} 
            className={classes}
            alt='picture'
            />
        </>
    )
}

export default Logo;