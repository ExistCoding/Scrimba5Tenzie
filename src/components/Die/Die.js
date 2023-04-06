export default function Die(props) {
    return <button className={props.locked? "App__dice App__dice--locked" : "App__dice"}onClick={props.handleClick}>{props.value}</button>
}