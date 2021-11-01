import './ContainerLeft.scss'

export const ContainerLeft = () => {
  const features = [
    {
      icon: '/img/gl_shield-20x20-1.png',
      title: 'Cómpralo de manera fácil y rápida'
    },
    {
      icon: '/img/gl_mobile-20x20-1.png',
      title: 'Cotiza y compra tu seguro 100% digital'
    },
    {
      icon: '/img/cheque-icon.png',
      title: 'Hasta S/.12 millones de cobertura anual'
    },
    {
      icon: '/img/heal-icon.png',
      title: 'Más de 300 clinicas en todo el Peú'
    }
  ]

  return (
    <div className='container__left'>
      <h1 className='seguro-title'>
        Seguros de <strong>salud</strong>
      </h1>
      <div className='features'>
        {features.map((feature, index) => (
          <div className='features__item' key={index}>
            <img className='icon' src={feature.icon} alt='' />
            <h3 className='title'>{feature.title}</h3>
          </div>
        ))}
      </div>
    </div>
  )
}
