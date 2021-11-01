import { Input } from '../Base/Input'
import './FormRegister.scss'
export const FormRegister = () => {
  return (
    <div className='form-register'>
      Hola Juan miguel
      <span>Valida que todos los datos sean correctos.</span>
      <form action=''>
        <div className='form__id'>
          <select id='document' name='document'>
            <option value='dni'>DNI</option>
            <option value='ruc'>RUC</option>
          </select>
          <Input title='Nro de Documento' />
        </div>

        <Input title='Primer Nombre' />
        <Input title='Segundo Nombre' />
        <Input title='Primer Apellido' />
        <Input title='Segudo Apellido' />
        <div className='form__date'>
          <input
            placeholder='Fecha de Nacimiento'
            id='birthday'
            type='date'
            name='birthday'
          />
          <span></span>
        </div>
        {/* make a genre input */}
        <div className='form__genre'>
          <p className='form__genre__subtitle'>Selecciona tu genero</p>
          <div>
            <input type='radio' id='dewey' name='drone' value='dewey' />
            <span>Dewey</span>
          </div>

          <div>
            <input type='radio' id='louie' name='drone' value='louie' />
            <span>Louie</span>
          </div>
        </div>
        <div className='form__genre'>
          <p className='form__genre__subtitle'>Aquien vamos a asegurar</p>
          <div>
            <input type='radio' id='dewey' name='drone' value='dewey' />
            <span>Solo ami</span>
          </div>

          <div>
            <input type='radio' id='louie' name='drone' value='louie' />
            <span>Ami y a mi familia</span>
          </div>
        </div>
        <button type='submit' className='btn btn-primary'>
          Continuar
        </button>
      </form>
    </div>
  )
}
