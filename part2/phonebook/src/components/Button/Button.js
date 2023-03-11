const Button = (props) => {
  return <button onClick={props.onDeleteClick}>{props.children}</button>
}

export default Button
