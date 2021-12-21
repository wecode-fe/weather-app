const CityWeather = props => {
    return (
        <>
            <h1>{props.city}, {props.country}</h1>
            <h3>{props.localtime}</h3>
            <img src={props.icon} alt={props.location} />
            <h1>{props.temp} C°</h1>
        </>
    )
}

export default CityWeather