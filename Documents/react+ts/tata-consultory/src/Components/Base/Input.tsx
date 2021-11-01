import './Input.scss'
type String = {
  title: string
}
export const Input = ({ title }: String) => {
  return (
    <div className='group'>
      <input className={title} type='text' required />
      <span className='bar'></span>
      <label>{title}</label>
    </div>
  )
}
