import Icon from './Icon'

function Header() {
  return (
    <header className="app-header">
      <div className="header-content">
        <div className="brand-mark">
          <Icon name="book" />
        </div>
        <div className="min-w-0">
          <p className="brand-title">Gestor de Actividades</p>
          <p className="brand-caption">Tu espacio académico</p>
        </div>
      </div>
    </header>
  )
}

export default Header
