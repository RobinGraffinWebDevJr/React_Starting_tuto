const scaleNames = {
    c: 'Celsius',
    f: 'Fahrenheit'
}

/**
 *  °F = (°C × 9/5) + 32
 *  °C = (°F − 32) x 5/9
 */

//formule de calcule pour le fahrenheit
function toCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9
}

//formule de calcule pour le celsius
function toFahrenheit(celsius) {
    return (celsius * 9 / 5) + 32
}

// fonction qui prend en parametre le celsius avec un if on regarde si cela est plus petit ou  égal a 100 ensuite on retourne une div avec un message de succés ou un message d'alert.
function BoinlingVerdict({ celsius }) {
    if (celsius >= 100) {
        return <div className="alert alert-success">L'eau bout</div>
    }
    return <div className="alert alert-info">L'eau ne bout pas</div>
}

// qui permet de reconaitre si le champs est en isNaN ou non si non n'affiche rien
function tryConvert (temperature, convert) {
    const value = parseFloat(temperature)
    if (Number.isNaN(value)) {
        return '';
    }
    return (Math.round(convert(value) *100) / 100).toString()
}


class TemperatureInput extends React.Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
        this.props.onTemperatureChange(e.target.value)
    }

    handleTemperatureChange (temperature) {
        this.setState({temperature})
    }

    render() {
        const { temperature } = this.props
        const name = 'scale' + this.props.scale
        const scaleName = scaleNames[this.props.scale]
        return <div className="form-group">
            <label htmlFor={name}>Température {scaleName}</label>
            <input type="text" id={name} value={temperature} className="form-control" onChange={this.handleChange} />
        </div>
    }
}

function Button ({type, children}) {
    const className = 'btn btn-' + type
    return <button className={className}>{children}</button>
}

function PrimaryButton ({children}) {
    return <Button type="primary">{children}</Button>
}

function SecondaryButton ({children}) {
    return <Button type="secondary">{children}</Button>
}

function Column2 ({left, right}) {
    return <div className="row">
        <div className="col-md-6">{left}</div>
        <div className="col-md-6">{right}</div>
    </div>
}

class Calculator extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            scale: 'c',
            temperature: 20
        }
        this.handleCelsiusChange = this.handleCelsiusChange.bind(this)
        this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this)
    }

    handleCelsiusChange (temperature) {
        this.setState({
            scale: 'c',
            temperature
        })
    }

    handleFahrenheitChange (temperature) {
        this.setState({
            scale: 'f',
            temperature
        })
    }

  
    render() {
        const { temperature, scale } = this.state
        const celsius = scale === 'c' ? temperature : tryConvert(temperature, toCelsius)
        const fahrenheit = scale === 'f' ? temperature : tryConvert(temperature, toFahrenheit) 
        return <div>
            <Column2 
                left={<TemperatureInput scale="c" temperature={celsius} onTemperatureChange={this.handleCelsiusChange} />}
                right={<TemperatureInput scale="f" temperature={ fahrenheit} onTemperatureChange={this.handleFahrenheitChange} />}
                />
            <BoinlingVerdict celsius={celsius} />
            <PrimaryButton>Envoyer</PrimaryButton>
        </div>
    }
}

ReactDOM.render(<Calculator />, document.getElementById('app'))